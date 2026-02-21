import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send } from 'lucide-react';

export function ContactMe({ isDarkMode, t }: { isDarkMode: boolean; t: any }) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <section className="relative w-full overflow-hidden">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="max-w-6xl mx-auto px-6"
      >
        {/* Header */}
        <div className="space-y-4 mb-16">
          <div className="flex items-center gap-4">
            <div className={`h-[1px] w-12 ${isDarkMode ? 'bg-white/20' : 'bg-black/20'}`} />
            <span className={`${t.text} font-mono text-xs tracking-[0.4em] uppercase`}>
              Communication / Secure
            </span>
          </div>
          <h2 className={`text-5xl md:text-7xl font-bold tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Let's Build <br /> the Future.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Side: Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <p className={`text-xl font-light leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Available for specialized Agentic AI consulting, Full Stack architecture, and high-performance web solutions.
            </p>

            <div className="space-y-4">
              <ContactCard 
                icon={<Mail size={20} />}
                label="Direct Email"
                value="nishan@dev.com"
                href="mailto:nishan@dev.com"
                isDarkMode={isDarkMode}
                t={t}
              />
              <div className="grid grid-cols-2 gap-4">
                <ContactCard 
                  icon={<Linkedin size={20} />}
                  label="LinkedIn"
                  value="Connect"
                  href="#"
                  isDarkMode={isDarkMode}
                  t={t}
                />
                <ContactCard 
                  icon={<Github size={20} />}
                  label="Github"
                  value="Source"
                  href="#"
                  isDarkMode={isDarkMode}
                  t={t}
                />
              </div>
            </div>

            <div className={`p-8 rounded-3xl border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-black/5'}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-2 h-2 rounded-full bg-emerald-500 animate-pulse`} />
                <span className="text-xs font-bold uppercase tracking-widest opacity-60">Status: Accepting Projects</span>
              </div>
              <p className="text-sm opacity-50">Current focus: LLM Orchestration & React Server Components.</p>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="lg:col-span-7">
            <motion.form 
              variants={itemVariants}
              className={`p-8 md:p-12 rounded-[2.5rem] border backdrop-blur-sm ${
                isDarkMode ? 'bg-[#1F2937]/30 border-white/10' : 'bg-white border-black/5 shadow-2xl'
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest opacity-60 ml-1">Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className={`w-full px-6 py-4 rounded-2xl border bg-transparent outline-none transition-all focus:ring-2 ${
                      isDarkMode ? 'border-white/10 focus:border-white/30 focus:ring-white/5' : 'border-black/10 focus:border-black/30 focus:ring-black/5'
                    }`}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest opacity-60 ml-1">Email</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    className={`w-full px-6 py-4 rounded-2xl border bg-transparent outline-none transition-all focus:ring-2 ${
                      isDarkMode ? 'border-white/10 focus:border-white/30 focus:ring-white/5' : 'border-black/10 focus:border-black/30 focus:ring-black/5'
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-2 mb-8">
                <label className="text-xs font-bold uppercase tracking-widest opacity-60 ml-1">Message</label>
                <textarea 
                  rows={4}
                  placeholder="Tell me about your project..."
                  className={`w-full px-6 py-4 rounded-2xl border bg-transparent outline-none transition-all focus:ring-2 resize-none ${
                    isDarkMode ? 'border-white/10 focus:border-white/30 focus:ring-white/5' : 'border-black/10 focus:border-black/30 focus:ring-black/5'
                  }`}
                />
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-5 rounded-2xl flex items-center justify-center gap-3 font-bold text-white transition-all shadow-lg hover:shadow-xl ${t.buttonBg}`}
              >
                <span>Send Encryption</span>
                <Send size={18} />
              </motion.button>
            </motion.form>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function ContactCard({ icon, label, value, href, isDarkMode, t }: any) {
  return (
    <motion.a 
      href={href}
      whileHover={{ y: -5 }}
      className={`p-6 rounded-2xl border transition-all flex items-center gap-4 w-full ${
        isDarkMode ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-white border-black/5 hover:bg-slate-50 shadow-sm'
      }`}
    >
      <div className={`${t.buttonBg} p-3 rounded-xl text-white shadow-inner`}>
        {icon}
      </div>
      <div>
        <div className="text-[10px] uppercase opacity-50 font-bold tracking-tighter">{label}</div>
        <div className="font-bold text-sm md:text-base">{value}</div>
      </div>
    </motion.a>
  );
}