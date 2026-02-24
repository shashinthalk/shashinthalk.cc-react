import { ExternalLink } from 'lucide-react';

export function FreelanceCard({ name, status, isDarkMode, color, link, imgSrc }: any) {
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
