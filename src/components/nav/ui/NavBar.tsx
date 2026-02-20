import { useState, useEffect } from 'react';
import { Github, Sun, Moon } from 'lucide-react';

export function NavBar({ isDarkMode, setIsDarkMode, view, setView }: { isDarkMode: boolean; setIsDarkMode: (value: boolean) => void; view: string; setView: (value: string) => void }) {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine if we should show the background
  // Show background if we are in 'results' view OR if the user has scrolled down
  const showBackground = view === 'results' || isScrolled;

  const navBgClasses = showBackground
    ? isDarkMode 
      ? 'bg-[#111827]/90 border-white/5 backdrop-blur-2xl border-b shadow-lg' 
      : 'bg-white/90 border-black/5 shadow-sm backdrop-blur-2xl border-b'
    : 'bg-transparent border-transparent';

  return (
    <nav className={`fixed top-0 w-full z-50 flex justify-between items-center transition-all duration-300 
      px-4 md:px-16 ${isScrolled ? 'py-3 md:py-4' : 'py-4 md:py-8'} 
      ${navBgClasses}`}>
        
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('landing')}>
          <div className="block md:hidden">
            <h1 className={`text-[10px] font-bold tracking-[0.2em] uppercase leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              NISHAN SHASHINTHA
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          <div className={`flex items-center gap-2 md:gap-4 p-1 md:p-1.5 rounded-2xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/5'}`}>
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-1.5 md:p-2 rounded-xl transition-all ${isDarkMode ? 'text-yellow-400 hover:bg-white/10' : 'text-slate-500 hover:bg-black/5'}`}
            >
              {isDarkMode ? <Sun size={16} className="md:w-[18px]"/> : <Moon size={16} className="md:w-[18px]"/>}
            </button>
          </div>

          <div className="hidden md:flex gap-6">
            <Github size={22} className="text-slate-400 hover:text-cyan-500 cursor-pointer transition-colors" />
          </div>
        </div>
      </nav>
  );    
}