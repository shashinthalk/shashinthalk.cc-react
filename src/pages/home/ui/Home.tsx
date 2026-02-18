import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity,
  X
} from 'lucide-react';
import { HeroSection } from '@/components/hero';
import { NavBar } from '@/components/nav';
import { ContactMe } from '@/features/contact-me';
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
    <div className={`w-full transition-colors duration-700 ${isDarkMode ? 'bg-[#111827] text-slate-100' : 'bg-[#F9FAFB] text-slate-900'} font-light ${view === 'landing' ? 'h-screen overflow-hidden' : 'min-h-screen overflow-y-auto'}`}>
      
      <NavBar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} view={view} setView={setView} />

      <AnimatePresence mode="wait">
        {view === 'landing' ? (
          <HeroSection 
            isDarkMode={isDarkMode} 
            t={t} 
            prompt={prompt} 
            setPrompt={setPrompt} 
            handleExecute={handleExecute} 
          />
        ) : (
          <motion.main 
            key="results"
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="pt-40 pb-32 flex flex-col items-center px-6"
          >
            <div className="w-full max-w-3xl space-y-16">
              
              {/* DYNAMIC CONTENT RENDERER */}
              {(() => {
                const query = prompt.toLowerCase();

                // 1. CONTACT SECTION
                if (query.includes('contact') || query.includes('email') || query.includes('hire')) {
                  return <ContactMe isDarkMode={isDarkMode} t={t} />;
                }

                // 2. PROJECTS / EXPERIENCE (Default)
                if (query.includes('project') || query.includes('work') || query.includes('exp') || prompt === "") {
                  return (
                    <section className="space-y-12">
                      <div className="space-y-4">
                        <h3 className={`${t.text} font-mono text-xs tracking-[0.4em] uppercase`}>Deployment / Active</h3>
                        <h2 className={`text-4xl font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Advanced System Architecture.</h2>
                      </div>
                      {/* Map your project data here as you did before */}
                      {/* {renderProjectCards()}  */}
                    </section>
                  );
                }

                if(query.includes('chat') || query.includes('agent') || query.includes('ai')) {
                  return (
                    <section className="space-y-12">
                      <div className="space-y-4">
                        <h3 className={`${t.text} font-mono text-xs tracking-[0.4em] uppercase`}>AI Capabilities</h3>
                        <h2 className={`text-4xl font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Intelligent Agent at Your Service.</h2>
                      </div>
                      {/* You can add more AI-related content here */}
                      
                    </section>
                  );
                }

                // 3. FALLBACK (If no keyword matches)
                return (
                  <div className="text-center py-20">
                    <Activity size={48} className={`mx-auto mb-6 opacity-20 ${t.text}`} />
                    <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>No direct match found.</h2>
                    <p className="text-slate-500">The Agent couldn't find a specific section for "{prompt}". Try searching 'Projects' or 'Contact'.</p>
                  </div>
                );
              })()}

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