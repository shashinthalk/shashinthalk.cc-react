import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Sun, Moon, LayoutGrid, ArrowRight, Zap, MessageSquare, BookOpen, BriefcaseBusiness } from 'lucide-react';
import { FreelanceCard, NavButton } from '@/components';

export function NavBar({ isDarkMode, setIsDarkMode, view, setView, onSearch }: { isDarkMode: boolean; setIsDarkMode: (value: boolean) => void; view: string; setView: (value: string) => void; onSearch: (val: string) => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showBackground = view === 'results' || isScrolled;
  const navBgClasses = showBackground
    ? isDarkMode
      ? 'bg-[#111827]/90 border-white/5 backdrop-blur-2xl border-b shadow-lg'
      : 'bg-white/90 border-black/5 shadow-sm backdrop-blur-2xl border-b'
    : 'bg-transparent border-transparent';

  return (
    <>
      <nav className={`fixed top-0 w-full z-[100] flex justify-between items-center transition-all duration-500 
        px-6 md:px-16 ${isScrolled ? 'py-3 md:py-4' : 'py-5 md:py-8'} 
        ${navBgClasses}`}>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsOpen(true)}
            className={`group flex items-center gap-3 px-4 py-2 rounded-full border transition-all
              ${isDarkMode ? 'border-white/10 bg-white/5 hover:border-emerald-500/50' : 'border-black/5 bg-black/5 hover:border-emerald-500/30'}`}
          >
            <div className="relative w-4 h-3 flex flex-col justify-between">
              <span className={`h-[1.5px] w-full bg-emerald-500 rounded-full transition-transform ${isOpen ? 'rotate-45 translate-y-1' : ''}`} />
              <span className={`h-[1.5px] w-full bg-emerald-500 rounded-full ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`h-[1.5px] w-full bg-emerald-500 rounded-full transition-transform ${isOpen ? '-rotate-45 -translate-y-1' : ''}`} />
            </div>
            <span className={`text-[11px] font-bold tracking-[0.2em] uppercase hidden sm:block ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Explore</span>
          </button>
        </div>

        <div className="md:hidden flex-1 flex justify-center pointer-events-none">
          <h1 className={`text-[11px] font-black tracking-[0.3em] uppercase ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>NISHAN</h1>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2.5 rounded-xl text-emerald-500">
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <div className="h-8 w-[1px] bg-emerald-500/20 hidden md:block" />
          <Github onClick={() => window.open('https://github.com/shashinthalk', '_blank')} size={18} className="hidden md:block text-slate-400 hover:text-emerald-500 cursor-pointer transition-colors" />
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[110]"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -8 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className={`absolute top-20 left-6 md:left-24 z-[120] rounded-2xl border w-[calc(100vw-48px)] md:w-96 overflow-hidden
                ${isDarkMode ? 'bg-[#111827]/95 border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)]' : 'bg-white/95 border-black/5 shadow-[0_20px_40px_rgba(0,0,0,0.1)]'} backdrop-blur-xl`}
            >
              <div className="p-5 md:p-6">
                <div className="space-y-8">

                  {/* ── NAVIGATION ── */}
                  <div className="space-y-4">
                    <h3 className={`text-[11px] font-black tracking-[0.2em] uppercase ${isDarkMode ? 'text-white/60' : 'text-slate-500'}`}>
                      Navigation
                    </h3>
                    <div className="flex flex-col gap-2">
                      <NavButton label="Experience"  icon={<BriefcaseBusiness size={16} />} isDarkMode={isDarkMode} onClick={() => { setView('experience'); setIsOpen(false); onSearch('I would like to know about your experience.'); }} />
                      <NavButton label="Projects"    icon={<LayoutGrid size={16} />}         isDarkMode={isDarkMode} onClick={() => { setView('projects');   setIsOpen(false); onSearch('I would like to see your projects.');         }} />
                      <NavButton label="Blogs"       icon={<Zap size={16} />}                isDarkMode={isDarkMode} onClick={() => { setView('blogs');      setIsOpen(false); onSearch('I would like to read your blogs.');           }} />
                      <NavButton label="Contact"     icon={<MessageSquare size={16} />}      isDarkMode={isDarkMode} onClick={() => { setView('contact');    setIsOpen(false); onSearch('I would like to contact you.');              }} />
                    </div>
                  </div>

                  {/* ── FREELANCE ── */}
                  <div className={`pt-6 border-t space-y-4 ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
                    <h3 className={`text-[11px] font-black tracking-[0.2em] uppercase ${isDarkMode ? 'text-white/60' : 'text-slate-500'}`}>
                      Freelance
                    </h3>
                    <div className="grid gap-2">
                      <FreelanceCard
                        name="Fiverr"
                        status="Level 2 Seller"
                        isDarkMode={isDarkMode}
                        color="text-emerald-500"
                        link="https://www.fiverr.com/shashinthalk"
                        imgSrc="https://static.vecteezy.com/system/resources/previews/025/732/716/non_2x/fiverr-logo-icon-online-platform-for-freelancers-free-vector.jpg"
                      />
                      <FreelanceCard
                        name="Upwork"
                        status="Rising Talent"
                        isDarkMode={isDarkMode}
                        color="text-emerald-500"
                        link="https://www.upwork.com/freelancers/~0130f2e174f55f8b61"
                        imgSrc="https://cdn.worldvectorlogo.com/logos/upwork-roundedsquare-1.svg"
                      />
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}