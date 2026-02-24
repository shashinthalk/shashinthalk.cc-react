import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, Phone } from 'lucide-react';

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
        <div className="space-y-4 mb-10 md:mb-16">
          <div className="flex items-center gap-4">
            <div className={`h-[1px] w-8 md:w-12 ${isDarkMode ? 'bg-white/20' : 'bg-black/20'}`} />
            <span className={`${t.text} font-mono text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] uppercase`}>
              Communication / Secure
            </span>
          </div>
          <h2 className={`text-4xl md:text-7xl font-bold tracking-tighter leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Let's Build <br /> the Future.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          {/* Left Side: Contact Info */}
          <div className="lg:col-span-5 space-y-6 md:space-y-8">
            <p className={`text-lg md:text-xl font-light leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Available for specialized Agentic AI consulting, Full Stack architecture, and high-performance web solutions.
            </p>

            <div className="space-y-3 md:space-y-4">
              <ContactCard 
                icon={<Mail size={18} />}
                label="Direct Email"
                value="shashinthalk.cc@outlook.com"
                href="mailto:shashinthalk.cc@outlook.com"
                isDarkMode={isDarkMode}
                t={t}
              />
              <ContactCard 
                icon={<Phone size={18} />}
                label="Mobile Contact"
                value="+47 677 62443311"
                href="tel:+4767762443311"
                isDarkMode={isDarkMode}
                t={t}
              />
              
              {/* Responsive Grid for socials: stack on very small, side-by-side on medium+ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <ContactCard 
                  icon={<Linkedin size={18} />}
                  label="LinkedIn"
                  value="Connect"
                  href="https://www.linkedin.com/in/nishan-shashintha/"
                  isDarkMode={isDarkMode}
                  t={t}
                />
                <ContactCard 
                  icon={<Github size={18} />}
                  label="Github"
                  value="Source"
                  href="https://github.com/shashinthalk/"
                  isDarkMode={isDarkMode}
                  t={t}
                />
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="lg:col-span-7">
            <motion.form 
              variants={itemVariants}
              className={`p-6 md:p-10 lg:p-12 rounded-[1.5rem] md:rounded-[2.5rem] border backdrop-blur-sm ${
                isDarkMode ? 'bg-[#1F2937]/30 border-white/10' : 'bg-white border-black/5 shadow-xl'
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-60 ml-1">Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className={`w-full px-5 py-3.5 md:px-6 md:py-4 rounded-xl md:rounded-2xl border bg-transparent outline-none transition-all focus:ring-2 text-sm md:text-base ${
                      isDarkMode ? 'border-white/10 focus:border-white/30 focus:ring-white/5' : 'border-black/10 focus:border-black/30 focus:ring-black/5'
                    }`}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-60 ml-1">Email</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    className={`w-full px-5 py-3.5 md:px-6 md:py-4 rounded-xl md:rounded-2xl border bg-transparent outline-none transition-all focus:ring-2 text-sm md:text-base ${
                      isDarkMode ? 'border-white/10 focus:border-white/30 focus:ring-white/5' : 'border-black/10 focus:border-black/30 focus:ring-black/5'
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-2 mb-6 md:mb-8">
                <label className="text-[10px] font-bold uppercase tracking-widest opacity-60 ml-1">Message</label>
                <textarea 
                  rows={4}
                  placeholder="Tell me about your project..."
                  className={`w-full px-5 py-3.5 md:px-6 md:py-4 rounded-xl md:rounded-2xl border bg-transparent outline-none transition-all focus:ring-2 resize-none text-sm md:text-base ${
                    isDarkMode ? 'border-white/10 focus:border-white/30 focus:ring-white/5' : 'border-black/10 focus:border-black/30 focus:ring-black/5'
                  }`}
                />
              </div>

              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`w-full py-4 md:py-5 rounded-xl md:rounded-2xl flex items-center justify-center gap-3 font-bold text-white transition-all shadow-lg hover:shadow-xl ${t.buttonBg}`}
              >
                <span className="text-sm md:text-base">Send Encryption</span>
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
      target='_blank'
      whileHover={{ y: -3 }}
      className={`p-4 md:p-6 rounded-xl md:rounded-2xl border transition-all flex items-center gap-4 w-full overflow-hidden ${
        isDarkMode ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-white border-black/5 hover:bg-slate-50 shadow-sm'
      }`}
    >
      <div className={`${t.buttonBg} p-2.5 md:p-3 rounded-lg md:rounded-xl text-white shadow-inner shrink-0`}>
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[9px] md:text-[10px] uppercase opacity-50 font-bold tracking-tighter truncate">{label}</div>
        <div className="font-bold text-xs md:text-base truncate">{value}</div>
      </div>
    </motion.a>
  );
}