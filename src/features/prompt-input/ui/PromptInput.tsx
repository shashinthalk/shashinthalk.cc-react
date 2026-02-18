import { 
  Bot,
  Terminal,
  Layers,
  Cpu,
  Activity,
  ArrowRight
} from 'lucide-react';

export function PromptInput(
    { isDarkMode, t, prompt, setPrompt, handleExecute }: 
    { isDarkMode: boolean; t: any; prompt: string; setPrompt: (value: string) => void; handleExecute: (e: { preventDefault: () => void }) => void }) {
  return (
    <div className="w-full max-w-2xl mt-14 px-4">
        <form onSubmit={handleExecute} className="relative group">
            {/* Dynamic Background Glow - Pulses when focused */}
            <div className={`absolute -inset-1 bg-gradient-to-r ${t.gradient} rounded-3xl blur opacity-20 group-focus-within:opacity-40 transition duration-500`} />
            
            <div className={`relative flex items-center transition-all duration-500 
            ${isDarkMode ? 'bg-[#1F2937]/90 border-white/10' : 'bg-white border-black/5 shadow-2xl'} 
            backdrop-blur-2xl border rounded-3xl p-2 md:p-3 shadow-2xl`}
            >
            {/* Icon Section with State Color */}
            <div className="pl-6 pr-4 hidden sm:block">
                <Terminal size={24} className={isDarkMode ? t.text : `text-${t.primary}`} />
            </div>

            {/* Input Field */}
            <input 
                type="text" 
                value={prompt} 
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Search projects, stack, or experience..."
                className={`w-full bg-transparent py-4 outline-none text-base md:text-lg font-normal 
                ${isDarkMode ? 'text-white placeholder:text-slate-500' : 'text-slate-900 placeholder:text-slate-400'}`}
            />

            {/* Action Button - High Contrast */}
            <button 
                type="submit"
                className={`${t.buttonBg} ${t.buttonHover} text-white px-8 md:px-10 rounded-2xl font-black text-xs tracking-[0.2em] h-14 transition-all active:scale-95 flex items-center gap-2 shadow-lg`}
            >
                <span className="hidden sm:inline">EXECUTE</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            </div>
        </form>

        {/* NEW: Quick Option Suggestions Hub */}
        <div className="mt-6 flex flex-wrap justify-center gap-2 overflow-hidden">
            <span className={`text-[10px] w-full mb-2 uppercase tracking-[0.3em] font-bold opacity-40 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Quick Intelligence Triggers
            </span>
            
            {[
            { label: "Full Stack Exp", icon: <Layers size={12}/> },
            { label: "AI Agent Projects", icon: <Bot size={12}/> },
            { label: "Tech Stack", icon: <Cpu size={12}/> },
            { label: "Contact Info", icon: <Activity size={12}/> }
            ].map((option) => (
            <button
                key={option.label}
                onClick={() => setPrompt(option.label)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-medium tracking-wide transition-all border
                ${isDarkMode 
                    ? 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-white hover:border-white/20' 
                    : 'bg-black/5 border-black/5 text-slate-600 hover:bg-white hover:shadow-md hover:text-slate-900'
                }`}
            >
                <span className={isDarkMode ? t.text : `text-${t.primary}`}>{option.icon}</span>
                {option.label}
            </button>
            ))}
        </div>
    </div>
  );
}