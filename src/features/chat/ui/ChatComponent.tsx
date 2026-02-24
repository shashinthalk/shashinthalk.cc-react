'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, MessageSquare, X, Minimize2 } from 'lucide-react';
import { ChatNavButton } from '@/components';

interface UIAction {
  show_button: boolean;
  sections: string[];
  generated_prompt: string;
  button_label: string;
}

interface Message {
  role: 'user' | 'ai';
  content: string;
  uiAction?: UIAction;
}

export function ChatComponent({ isDarkMode, onSearch }: { isDarkMode: boolean; setIsDarkMode: (value: boolean) => void; view: string; setView: (value: string) => void; onSearch: (val: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      if (!response.body) return;
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      
      setMessages(prev => [...prev, { role: 'ai', content: '' }]);
      let accumulatedFullRaw = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        accumulatedFullRaw += chunk;

        setMessages(prev => {
          const lastMsg = prev[prev.length - 1];
          if (lastMsg && lastMsg.role === 'ai') {
            let displayContent = accumulatedFullRaw;
            let extractedUI: UIAction | undefined = undefined;

            if (displayContent.includes('|UI_DATA|')) {
              const parts = displayContent.split('|UI_DATA|');
              displayContent = parts[0]; 
              try {
                extractedUI = JSON.parse(parts[1]);
              } catch (e) {
                console.error("Metadata parsing error", e);
              }
            }

            return [
              ...prev.slice(0, -1),
              { ...lastMsg, content: displayContent, uiAction: extractedUI }
            ];
          }
          return prev;
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[380px] md:w-[420px] h-[550px] flex flex-col relative rounded-2xl border border-emerald-500/20 bg-[#111827] shadow-[0_0_50px_-12px_rgba(16,185,129,0.25)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

            <div className="relative z-10 px-5 py-4 border-b border-emerald-500/10 flex items-center justify-between bg-[#111827]/90 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <h4 className="text-sm font-bold text-white leading-none">Nishan's AI Buddy</h4>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                <Minimize2 size={18} />
              </button>
            </div>

            <div ref={scrollRef} className="relative z-10 flex-1 overflow-y-auto p-5 space-y-5 scrollbar-hide">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center px-6">
                  <Bot size={32} className="text-emerald-500/20 mb-4" />
                  <p className="text-slate-400 text-sm font-light">Initialization complete. Ask me anything.</p>
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center border text-[10px] ${
                    m.role === 'user' ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' : 'border-white/10 bg-white/5 text-slate-400'
                  }`}>
                    {m.role === 'user' ? 'You' : 'AI'}
                  </div>
                  <div className={`px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed max-w-[80%] ${
                    m.role === 'user' ? 'bg-emerald-600 text-white' : 'bg-white/5 text-slate-300 border border-white/5 shadow-sm'
                  }`}>
                    {m.content}
                    
                    {/* Render button ONLY if the AI actually sent one */}
                    {m.role === 'ai' && m.uiAction?.show_button && (
                      <div className="mt-3 pt-2 border-t border-white/10 flex flex-col gap-2">
                        <ChatNavButton 
                          label={m.uiAction.button_label} 
                          isDarkMode={isDarkMode} 
                          onClick={() => {
                            // Ensure the generated prompt is passed to the search logic
                            onSearch(m.uiAction?.generated_prompt || "");
                            setIsOpen(false);
                          }} 
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && <div className="text-[10px] text-emerald-500/50 animate-pulse font-mono px-10">Thinking...</div>}
            </div>

            <form onSubmit={handleSend} className="relative z-10 p-4 bg-[#0B0F1A]">
              <div className="relative flex items-center">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask the Agent..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-sm text-white focus:outline-none focus:border-emerald-500/40 transition-all"
                />
                <button type="submit" className="absolute right-2 p-1.5 text-emerald-400 hover:text-emerald-300 transition-colors">
                  <Send size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_30px_-5px_rgba(16,185,129,0.5)] border-2 border-[#111827] text-[#111827] relative group"
      >
        <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-20 group-hover:hidden" />
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>
    </div>
  );
}