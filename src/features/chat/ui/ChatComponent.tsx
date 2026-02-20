'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, Sparkles, MessageSquare, X, Minimize2 } from 'lucide-react';

/**
 * PERSONAL WEBSITE: Nishan Shashintha
 * Floating Agent Widget (Emerald Theme)
 */
export function ChatComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = { role: 'user' as const, content: input };
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

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1].content += chunk;
          return updated;
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
            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 px-5 py-4 border-b border-emerald-500/10 flex items-center justify-between bg-[#111827]/90 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <Sparkles size={16} className="text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white leading-none">Agent Nishan</h4>
                  <span className="text-[9px] text-emerald-500 font-mono tracking-widest uppercase">4+ Years Exp</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                <Minimize2 size={18} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="relative z-10 flex-1 overflow-y-auto p-5 space-y-5 scrollbar-hide">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center px-6">
                  <Bot size={32} className="text-emerald-500/20 mb-4" />
                  <p className="text-slate-400 text-sm font-light">
                    Initialization complete. Ask me anything about my production experience.
                  </p>
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center border text-[10px] ${
                    m.role === 'user' ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' : 'border-white/10 bg-white/5 text-slate-400'
                  }`}>
                    {m.role === 'user' ? 'You' : 'Nishan\'s Buddy'}
                  </div>
                  <div className={`px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed max-w-[80%] ${
                    m.role === 'user' 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-white/5 text-slate-300 border border-white/5 shadow-sm'
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && <div className="text-[10px] text-emerald-500/50 animate-pulse font-mono px-10">STREAMING_CONTENT...</div>}
            </div>

            {/* Input */}
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

      {/* Trigger Button */}
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