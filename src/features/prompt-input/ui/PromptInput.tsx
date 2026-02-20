import { 
  Bot,
  Terminal,
  Layers,
  Cpu,
  Activity,
  ArrowRight,
  MessageSquare,
  Mail,
  FileSpreadsheet,
} from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

export function PromptInput(
    { isDarkMode, t, prompt, setPrompt, handleExecute }: 
    { isDarkMode: boolean; t: any; prompt: string; setPrompt: (value: string) => void; handleExecute: (e: { preventDefault: () => void }) => void }) {
  
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [activeTab, setActiveTab] = useState('Ask');

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${Math.max(textAreaRef.current.scrollHeight, 80)}px`;
    }
  }, [prompt]);

  const clientActions = [
    { id: 'Ask', label: 'Ask', fullLabel: 'Ask Anything', icon: <MessageSquare size={16}/>, placeholder: "Ask about my experience..." },
    { id: 'Email', label: 'Email', fullLabel: 'Send Email', icon: <Mail size={16}/>, placeholder: "Leave your message here..." },
    { id: 'Quote', label: 'Quote', fullLabel: 'Get Quotation', icon: <FileSpreadsheet size={16}/>, placeholder: "Project scope and timeline..." },
  ];

  return (
    <div className="w-full max-w-3xl mt-6 md:mt-10 px-4 mx-auto">
        {/* Responsive Tabs: Scrollable on very small screens, gap reduced */}
        <div className="flex flex-wrap sm:flex-nowrap gap-4 md:gap-6 mb-4 ml-1">
            {clientActions.map((opt) => (
                <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                        setActiveTab(opt.id);
                        setPrompt("");
                    }}
                    className={`flex items-center gap-2 text-xs md:text-sm font-medium transition-all relative pb-2
                    ${activeTab === opt.id 
                        ? (isDarkMode ? 'text-white' : 'text-slate-900') 
                        : 'text-slate-400 hover:text-slate-600'}`}
                >
                    {opt.icon}
                    {/* Shows short label on mobile, full label on desktop */}
                    <span className="hidden xs:inline">{opt.fullLabel}</span>
                    <span className="xs:hidden">{opt.label}</span>
                    
                    {activeTab === opt.id && (
                        <div className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r ${t.gradient}`} />
                    )}
                </button>
            ))}
        </div>

        <form onSubmit={handleExecute} className="relative group">
            <div className={`absolute -inset-[1px] rounded-2xl blur-[2px] opacity-10 group-focus-within:opacity-30 transition duration-500`} />
            
            <div className={`relative flex flex-col transition-all duration-300 
            ${isDarkMode ? 'bg-[#1F2937]/40 border-white/10' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'} 
            backdrop-blur-xl border rounded-2xl p-3 md:p-4`}
            >
            
            <div className="flex items-start gap-3 md:gap-4">
                <div className={`mt-2 hidden sm:flex h-8 w-8 items-center justify-center`}>
                    <Terminal size={16} className={isDarkMode ? t.text : 'text-slate-400'} />
                </div>

                <textarea 
                    ref={textAreaRef}
                    rows={2}
                    value={prompt} 
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleExecute(e);
                        }
                    }}
                    placeholder={clientActions.find(a => a.id === activeTab)?.placeholder}
                    className={`w-full bg-transparent py-2 outline-none text-sm md:text-base font-normal resize-none min-h-[40] max-h-40
                    ${isDarkMode ? 'text-slate-100 placeholder:text-slate-500' : 'text-slate-900 placeholder:text-slate-400'}`}
                />
            </div>

            <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-500/10">
                <p className="hidden xs:block text-[10px] text-slate-500 font-medium">
                    Press <span className="px-1 py-0.5 rounded border border-slate-400/30 font-bold">Enter</span>
                </p>
                
                <button 
                    type="submit"
                    className={`${t.buttonBg} ${t.buttonHover} text-white px-4 md:px-5 h-9 md:h-10 rounded-xl font-bold text-[10px] tracking-widest transition-all active:scale-95 flex items-center gap-2 shadow-md shrink-0 ml-auto`}
                >
                    <span>{activeTab === 'Ask' ? 'SEND' : `REQUEST ${activeTab.toUpperCase()}`}</span>
                    <ArrowRight size={14} />
                </button>
            </div>
            </div>
        </form>

        {/* Suggested Quick Links - Fixed Wrapping */}
        <div className="mt-5 flex flex-wrap justify-start gap-2 mb-10">
            <span className="text-[10px] w-full mb-1 ml-1 uppercase tracking-widest font-bold opacity-30">Suggested Topics</span>
            {[
                { label: "Portfolio", icon: <Layers size={12}/> },
                { label: "AI Experience", icon: <Bot size={12}/> },
                { label: "Tech Stack", icon: <Cpu size={12}/> },
                { label: "Timeline", icon: <Activity size={12}/> }
            ].map((option) => (
                <button
                    key={option.label}
                    type="button"
                    onClick={() => setPrompt(`I'd like to see your ${option.label.toLowerCase()}...`)}
                    className={`flex items-center gap-2 px-2 md:px-3 py-1.5 md:py-2 rounded-lg text-[10px] md:text-[11px] font-medium transition-all border
                    ${isDarkMode 
                        ? 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-white' 
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                >
                    <span className={isDarkMode ? t.text : `text-slate-400`}>{option.icon}</span>
                    {option.label}
                </button>
            ))}
        </div>
    </div>
  );
}