export function NavButton({ label, icon, isDarkMode, onClick }: any) {
    return (
        <button onClick={onClick} className={`flex items-center gap-4 p-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all ${isDarkMode ? 'hover:bg-white/5 text-slate-300 hover:text-white' : 'hover:bg-white hover:shadow-lg text-slate-600 hover:text-slate-900'}`}>
            <span className="text-emerald-500">{icon}</span>
            {label}
        </button>
    );
}