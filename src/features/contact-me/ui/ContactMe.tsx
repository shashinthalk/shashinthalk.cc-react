import { Terminal } from 'lucide-react';

export function ContactMe({ isDarkMode, t }: { isDarkMode: boolean; t: any }) {
    return (
        <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-4">
                <h3 className={`${t.text} font-mono text-xs tracking-[0.4em] uppercase`}>Communication / Secure</h3>
                <h2 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Let's Build the Future.</h2>
            </div>
            <div className={`p-10 rounded-[2.5rem] border ${isDarkMode ? 'bg-[#1F2937]/50 border-white/5' : 'bg-white border-black/5 shadow-xl'}`}>
                <p className={`text-lg mb-8 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Available for specialized Agentic AI consulting and Full Stack architecture roles.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a href="mailto:your@email.com" className={`p-6 rounded-2xl border transition-all flex items-center gap-4 ${isDarkMode ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-slate-50 border-black/5 hover:bg-slate-100'}`}>
                    <div className={`${t.buttonBg} p-3 rounded-xl text-white`}><Terminal size={20}/></div>
                    <div>
                    <div className="text-[10px] uppercase opacity-50 font-bold">Direct Email</div>
                    <div className="font-bold">nishan@dev.com</div>
                    </div>
                </a>
                {/* Add more contact cards here */}
                </div>
            </div>
        </section>
    );
}