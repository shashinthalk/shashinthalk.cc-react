export function ChatNavButton({ label, isDarkMode, onClick }: any) {
    return (
        <button 
            onClick={onClick} 
            className={`
                relative overflow-hidden flex items-center justify-center gap-4 p-4 rounded-2xl 
                font-bold text-xs uppercase tracking-widest 
                transition-all duration-500 ease-out
                transform hover:-translate-y-1 active:scale-95
                ${isDarkMode 
                    ? 'bg-slate-900 border border-emerald-500/30 text-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]' 
                    : 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/40 hover:bg-emerald-600'
                }
            `}
        >
            {/* Animated Shimmer Overlay */}
            <div className="absolute top-0 -left-[75%] h-full w-[50%] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] animate-shimmer" />

            {/* AI Icon (Optional but recommended for the vibe) */}
            <span className="relative z-10 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {label}
            </span>
            
            {/* Ambient Glow Pulse */}
            <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500 ring-2 ring-emerald-400 ring-offset-2 ring-offset-transparent" />
        </button>
    );
}