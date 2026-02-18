import { 
  Github, Sun, Moon
} from 'lucide-react';

export function NavBar({ isDarkMode, setIsDarkMode, view, setView }: { isDarkMode: boolean; setIsDarkMode: (value: boolean) => void; view: string; setView: (value: string) => void }) {
  return (
    <nav className={`fixed top-0 w-full z-50 flex justify-between items-center px-8 md:px-16 py-8 transition-all duration-500 ${view === 'results' ? (isDarkMode ? 'bg-[#111827]/90 border-white/5' : 'bg-white/90 border-black/5 shadow-sm') + ' backdrop-blur-2xl border-b' : 'bg-transparent'}`}>
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('landing')}>
          <h1 className={`text-sm font-bold tracking-[0.4em] uppercase ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            NISHAN SHASHINTHA
          </h1>
        </div>

        <div className="flex items-center gap-6">
          {/* THEME & MODE CONTROLS */}
          <div className={`flex items-center gap-4 p-1.5 rounded-2xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/5'}`}>
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-xl transition-all ${isDarkMode ? 'text-yellow-400 hover:bg-white/10' : 'text-slate-500 hover:bg-black/5'}`}
            >
              {isDarkMode ? <Sun size={18}/> : <Moon size={18}/>}
            </button>
          </div>

          <div className="hidden md:flex gap-6">
            <Github size={22} className="text-slate-400 hover:text-cyan-500 cursor-pointer transition-colors" />
          </div>
        </div>
      </nav>
  );    
}