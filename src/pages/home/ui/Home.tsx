import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X,
  SearchX
} from 'lucide-react';
import { HeroSection } from '@/components/hero';
import { NavBar } from '@/components/nav';
import { Chat } from '@/features/chat';
import { HOME_COMPONENT_REGISTRY } from '@/shared/component-registry';

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
  const [loading, setLoading] = useState(false);
  
  const [apiData, setApiData] = useState<any>(null);
  
  const activeTheme = 'emerald';
  const t = themes[activeTheme];

  const handleSearch = (overridePrompt?: string) => {
    const finalPrompt = overridePrompt || prompt;
    if (!finalPrompt) return;
    setPrompt(finalPrompt);
    setApiData(null); 
    setLoading(true);
    setView('results');
  };

  const handleExecute = (e?: { preventDefault: () => void; }) => {
    e?.preventDefault();
    handleSearch();
  };

  useEffect(() => {
    if (loading && view === 'results') {
      const fetchContent = async () => {
        const delay = new Promise(resolve => setTimeout(resolve, 1500));
        
        try {
          const apiCall = fetch('/api/get-web-content', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              messages: [{ 
                role: 'user', 
                content: `Based on "${prompt}", return ONLY a JSON array` 
              }] 
            }),
          });

          const [response] = await Promise.all([apiCall, delay]);
          const rawData = await response.json();
          setApiData(rawData);

        } catch (error) {
          console.error("API Error:", error);
          setApiData({ active_sections: ['none'] });
        } finally {
          setLoading(false);
        }
      };
      fetchContent();
    }
  }, [loading]);

  // Determine if there are any valid sections to show
  const sectionsToShow = apiData?.active_sections?.filter((key: string) => 
    apiData.render_logic?.[key] === true && HOME_COMPONENT_REGISTRY[key]
  ) || [];

  return (
    <div className={`w-full transition-colors duration-700 ${isDarkMode ? 'bg-[#111827] text-slate-100' : 'bg-[#F9FAFB] text-slate-900'} font-light min-h-[100dvh] ${view === 'landing' ? 'md:h-screen md:overflow-hidden overflow-y-auto' : 'overflow-y-auto'}`}>
      
      <div className="hidden md:block fixed left-6 bottom-12 z-[60] cursor-pointer select-none" onClick={() => setView('landing')}>
        <h1 className={`text-[15px] font-bold tracking-[0.5em] uppercase whitespace-nowrap ${isDarkMode ? 'text-white/40 hover:text-white' : 'text-slate-400 hover:text-slate-900'} transition-colors`}
          style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}>
          NISHAN SHASHINTHA
        </h1>
      </div>
      <NavBar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} view={view} setView={setView} onSearch={handleSearch} />

      <AnimatePresence mode="wait">
        {view === 'landing' ? (
          <motion.div key="landing" className="flex flex-col min-h-[100dvh]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <HeroSection isDarkMode={isDarkMode} t={t} prompt={prompt} setPrompt={setPrompt} handleExecute={handleExecute} />
          </motion.div>
        ) : (
          <motion.main key="results" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }}
            className="pt-32 md:pt-40 pb-20 flex flex-col items-center px-6"
          >
            <div className="w-full max-w-7xl space-y-16 md:pl-16">
              {loading ? (
                <div className="animate-pulse space-y-12">
                  <div className="space-y-4">
                    <div className={`h-3 w-32 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`} />
                    <div className={`h-10 w-3/4 rounded-xl ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`} />
                  </div>
                  <div className={`h-64 w-full rounded-3xl ${isDarkMode ? 'bg-white/5' : 'bg-slate-100'}`} />
                </div>
              ) : (
                <div className="w-full space-y-20">
                  {sectionsToShow.length > 0 ? (
                    sectionsToShow.map((key: string) => {
                      const Component = HOME_COMPONENT_REGISTRY[key];
                      return (
                        <motion.div key={key} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                          <Component isDarkMode={isDarkMode} t={t} />
                        </motion.div>
                      );
                    })
                  ) : (
                    <div className="py-20 flex flex-col items-center text-center space-y-6">
                      <div className={`p-6 rounded-full ${isDarkMode ? 'bg-white/5' : 'bg-slate-100'}`}>
                        <SearchX size={40} className="opacity-20" />
                      </div>
                      <div className="space-y-2">
                        <h2 className="text-2xl font-bold">No direct match found</h2>
                        <p className="text-slate-500 max-w-sm">The agent couldn't find a specific section for "{prompt}".</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              <div className="text-center pt-20 border-t border-white/5">
                <button onClick={() => { setView('landing'); setPrompt(''); }} 
                  className={`text-sm font-bold uppercase tracking-widest flex items-center gap-2 mx-auto transition-colors ${isDarkMode ? 'text-slate-500 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}>
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