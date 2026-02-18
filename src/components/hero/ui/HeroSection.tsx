import { PromptInput } from '@/features/prompt-input';
import { motion } from 'framer-motion';

const GridOverlay = ({ isDark }: { isDark: boolean }) => (
  <div className={`absolute inset-0 bg-[linear-gradient(to_right,${isDark ? '#ffffff03' : '#00000005'}_1px,transparent_1px),linear-gradient(to_bottom,${isDark ? '#ffffff03' : '#00000005'}_1px,transparent_1px)] bg-[size:50px_50px]`} />
);

const HeroSection = ({ isDarkMode, t, prompt, setPrompt, handleExecute }: { isDarkMode: boolean; t: any; prompt: string; setPrompt: (value: string) => void; handleExecute: (e: { preventDefault: () => void }) => void }) => {
  return (
    <motion.main 
      key="home"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
      className="h-full w-full flex flex-col items-center justify-center relative px-6"
    >
      {/* --- VISIBLE TECH BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
          <GridOverlay isDark={isDarkMode} />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl text-center">
        <div className="mb-10 relative group">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className={`absolute -inset-4 border border-dashed ${isDarkMode ? 'border-white/10' : 'border-black/10'} rounded-full`} />
          <img src="https://avatars.githubusercontent.com/u/45489545?v=4" className={`relative w-36 h-36 md:w-44 md:h-44 rounded-full border-4 ${isDarkMode ? 'border-[#1F2937] bg-[#1F2937]' : 'border-white bg-white shadow-xl'}`} alt="Nishan" />
        </div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h2 className={`text-5xl md:text-7xl font-bold tracking-tighter mb-4 leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Full Stack Developer
          </h2>
          <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'} text-lg md:text-xl font-light tracking-wide max-w-xl mx-auto`}>
            Specializing in Agentic AI and high-performance ecosystems with <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>4+ years</span> of production experience.
          </p>
        </motion.div>

        <PromptInput isDarkMode={isDarkMode} t={t} prompt={prompt} setPrompt={setPrompt} handleExecute={handleExecute} />
      </div>
    </motion.main>
  );
};

export { HeroSection };