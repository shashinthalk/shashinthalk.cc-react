import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X
} from 'lucide-react';
import { HeroSection } from '@/components/hero';
import { NavBar } from '@/components/nav';
import { Chat } from '@/features/chat';

const themes: Record<string, {
    primary: string;
    text: string;
    bgAccent: string;
    border: string;
    glow: string;
    gradient: string;
    buttonBg: string;
    buttonHover: string;
  }> = {
  emerald: {
    primary: "emerald-500",
    text: "text-emerald-600 dark:text-emerald-400",
    bgAccent: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    glow: "rgba(16,185,129,0.4)",
    gradient: "from-emerald-500 to-teal-600",
    buttonBg: "bg-emerald-500",
    buttonHover: "hover:bg-emerald-400"
  }
};

const HomePage = () => {
  const [prompt, setPrompt] = useState('');
  const [view, setView] = useState('landing');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const activeTheme = 'emerald';
  const t = themes[activeTheme];

  const handleExecute = (e: { preventDefault: () => void; }) => {
    e?.preventDefault();
    if (!prompt) return;
    setTimeout(() => {
      setView('results');
    }, 1000);
  };

  return (
    /* Changed h-screen to min-h-[100dvh] and added conditional overflow for mobile */
    <div className={`w-full transition-colors duration-700 ${isDarkMode ? 'bg-[#111827] text-slate-100' : 'bg-[#F9FAFB] text-slate-900'} font-light min-h-[100dvh] ${view === 'landing' ? 'md:h-screen md:overflow-hidden overflow-y-auto' : 'overflow-y-auto'}`}>
      
      {/* LEFT SIDE VERTICAL NAME - Hidden on mobile */}
      <div 
        className="hidden md:block fixed left-6 bottom-12 z-[60] cursor-pointer select-none"
        onClick={() => setView('landing')}
      >
        <h1 
          className={`text-[15px] font-bold tracking-[0.5em] uppercase whitespace-nowrap ${isDarkMode ? 'text-white/40 hover:text-white' : 'text-slate-400 hover:text-slate-900'} transition-colors`}
          style={{ 
            writingMode: 'vertical-lr', 
            transform: 'rotate(180deg)' 
          }}
        >
          NISHAN SHASHINTHA
        </h1>
      </div>

      <NavBar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} view={view} setView={setView} />

      <AnimatePresence mode="wait">
        {view === 'landing' ? (
          <motion.div 
            key="landing"
            className="flex flex-col min-h-[100dvh]" /* Ensures Hero has enough room */
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <HeroSection 
              isDarkMode={isDarkMode} 
              t={t} 
              prompt={prompt} 
              setPrompt={setPrompt} 
              handleExecute={handleExecute} 
            />
          </motion.div>
        ) : (
          <motion.main 
            key="results"
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            /* Adjusted padding-top for mobile to prevent header overlap */
            className="pt-32 md:pt-40 pb-20 flex flex-col items-center px-6"
          >
            <div className="w-full max-w-3xl space-y-16 md:pl-16"> 
              
              {/* DYNAMIC CONTENT RENDERER LOGIC */}
              {/* Your existing content logic goes here */}
              
              <div className="text-center pt-20 border-t border-white/5">
                <button onClick={() => setView('landing')} className={`text-sm font-bold uppercase tracking-widest flex items-center gap-2 mx-auto transition-colors ${isDarkMode ? 'text-slate-500 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}>
                  <X size={16}/> Reset Session
                </button>
              </div>
            </div>
          </motion.main>
        )}
      </AnimatePresence>
      <Chat />
    </div>
  );
};

export { HomePage };