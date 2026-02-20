import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Sun, Moon, LayoutGrid, ArrowRight, Zap, ExternalLink, MessageSquare, BookOpen, BriefcaseBusiness } from 'lucide-react';

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
            <span className={`text-[10px] font-bold tracking-[0.2em] uppercase hidden sm:block ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Explore</span>
          </button>
        </div>

        <div className="md:hidden flex-1 flex justify-center pointer-events-none">
            <h1 className={`text-[11px] font-black tracking-[0.3em] uppercase ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>NISHAN</h1>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2.5 rounded-xl text-emerald-500">
            {isDarkMode ? <Sun size={18}/> : <Moon size={18}/>}
          </button>
          <div className="h-8 w-[1px] bg-emerald-500/20 hidden md:block" />
          <Github size={18} className="hidden md:block text-slate-400 hover:text-emerald-500 cursor-pointer transition-colors" />
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[110]"
            />

            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className={`fixed bottom-0 left-0 right-0 z-[120] rounded-t-[2.5rem] border-t max-h-[90vh] overflow-y-auto
                ${isDarkMode ? 'bg-[#0B111D] border-white/10' : 'bg-[#F9FAFB] border-black/5'} shadow-[0_-20px_50px_rgba(0,0,0,0.3)]`}
            >
              {/* Top Handle Bar */}
              <div className="w-12 h-1.5 bg-slate-500/20 rounded-full mx-auto mt-4 mb-2 md:hidden" />

              <div className="max-w-7xl mx-auto p-6 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
                  
                  {/* 1. FREELANCE PLATFORMS (Col-span 4) */}
                  <div className="md:col-span-4 space-y-4">
                    <h3 className="text-[10px] font-black tracking-[0.2em] uppercase opacity-40 ml-1">Freelance</h3>
                    <p className="text-sm text-center opacity-50 line-clamp-2 mb-4">Contact me on freelance platforms</p>
                    <div className="grid gap-3">
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

                  {/* 2. MAIN NAVIGATION (Col-span 3) */}
                  <div className="md:col-span-3 space-y-4">
                    <h3 className="text-[10px] font-black tracking-[0.2em] uppercase opacity-40 ml-1">Navigation</h3>
                    <div className="flex flex-col gap-2">
                        <NavButton label="Experience" icon={<BriefcaseBusiness size={16}/>} isDarkMode={isDarkMode} onClick={() => {setView('experience'); setIsOpen(false); onSearch('I would like to know about your experience.');}} />
                        <NavButton label="Projects" icon={<LayoutGrid size={16}/>} isDarkMode={isDarkMode} onClick={() => {setView('projects'); setIsOpen(false); onSearch('I would like to see your projects.');}} />
                        <NavButton label="Blogs" icon={<Zap size={16}/>} isDarkMode={isDarkMode} onClick={() => {setView('blogs'); setIsOpen(false); onSearch('I would like to read your blogs.');}} />
                        <NavButton label="Contact" icon={<MessageSquare size={16}/>} isDarkMode={isDarkMode} onClick={() => {setView('contact'); setIsOpen(false); onSearch('I would like to contact you.');}} />
                    </div>
                  </div>

                  {/* 3. BLOG SECTION (Col-span 5) */}
                  <div className="md:col-span-5 space-y-4">
                    <h3 className="text-[10px] font-black tracking-[0.2em] uppercase opacity-40 ml-1">Latest Insights</h3>
                    <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-black/5'} group cursor-pointer`}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500"><BookOpen size={18}/></div>
                            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Article</span>
                        </div>
                        <h4 className={`text-xl font-bold leading-tight mb-2 group-hover:text-emerald-500 transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            Building Scalable AI Interfaces with React & Framer Motion
                        </h4>
                        <p className="text-sm opacity-50 line-clamp-2 mb-4">How to handle complex state and high-performance animations in modern AI SaaS products...</p>
                        <div className="flex items-center text-xs font-bold gap-2 text-emerald-500">
                            READ ARTICLE <ArrowRight size={14} />
                        </div>
                    </div>
                  </div>

                </div>

                {/* Footer bar */}
                <div className={`mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-6 ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
                   <p className="text-[10px] font-bold tracking-widest opacity-30">© 2026 NISHAN SHASHINTHA — ALL RIGHTS RESERVED</p>
                   <div className="flex gap-8">
                        <a href="#" className="text-xs font-black hover:text-emerald-500 transition-colors uppercase tracking-widest">Resume</a>
                        <a href="#" className="text-xs font-black hover:text-emerald-500 transition-colors uppercase tracking-widest">LinkedIn</a>
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

// Sub-components for cleaner code
function FreelanceCard({ name, status, isDarkMode, color, link, imgSrc }: any) {
    return (
        <a href={link} target="_blank" className={`flex items-center justify-between p-4 rounded-2xl border transition-all hover:scale-[1.02] active:scale-95 ${isDarkMode ? 'bg-white/5 border-white/5 hover:border-emerald-500/30' : 'bg-white border-black/5 hover:shadow-xl shadow-slate-200'}`}>
            <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs ${isDarkMode ? 'bg-emerald-500/10' : 'bg-emerald-500/5'} ${color}`}>
                    <img className="w-6 h-6 rounded-full" src={imgSrc} alt="" />
                </div>
                <div>
                    <p className={`text-xs font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{name}</p>
                    <p className="text-[10px] font-bold opacity-40 uppercase">{status}</p>
                </div>
            </div>
            <ExternalLink size={14} className="opacity-20" />
        </a>
    );
}

function NavButton({ label, icon, isDarkMode, onClick }: any) {
    return (
        <button onClick={onClick} className={`flex items-center gap-4 p-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all ${isDarkMode ? 'hover:bg-white/5 text-slate-300 hover:text-white' : 'hover:bg-white hover:shadow-lg text-slate-600 hover:text-slate-900'}`}>
            <span className="text-emerald-500">{icon}</span>
            {label}
        </button>
    );
}