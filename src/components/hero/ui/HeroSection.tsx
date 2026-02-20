import { PromptInput } from '@/features/prompt-input';
import { motion } from 'framer-motion';

const GridOverlay = ({ isDark }: { isDark: boolean }) => (
  <div className={`absolute inset-0 bg-[linear-gradient(to_right,${isDark ? '#ffffff03' : '#00000005'}_1px,transparent_1px),linear-gradient(to_bottom,${isDark ? '#ffffff03' : '#00000005'}_1px,transparent_1px)] bg-[size:50px_50px]`} />
);

const HeroSection = ({ isDarkMode, t, prompt, setPrompt, handleExecute }: { isDarkMode: boolean; t: any; prompt: string; setPrompt: (value: string) => void; handleExecute: (e: { preventDefault: () => void }) => void }) => {
  return (
    <motion.main 
      key="home"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
      className="h-full min-h-screen w-full flex flex-col items-center justify-center relative px-6 py-12"
    >
      {/* --- VISIBLE TECH BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
          <GridOverlay isDark={isDarkMode} />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-6xl">
        
        {/* ROW 1: Image and Content Split */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-12 w-full">
          
          {/* Left: Image Container */}
          <div className="relative group shrink-0 mt-10">
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }} 
              className={`absolute -inset-4 border border-dashed ${isDarkMode ? 'border-white/10' : 'border-black/10'} rounded-full`} 
            />
            <img 
              src="https://avatars.githubusercontent.com/u/45489545?v=4" 
              className={`relative w-40 h-40 md:w-45 md:h-45 rounded-full border-4 ${isDarkMode ? 'border-[#1F2937] bg-[#1F2937]' : 'border-white bg-white shadow-xl'}`} 
              alt="Nishan" 
            />
          </div>

          {/* Right: Text Content */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}
            className="text-center md:text-left max-w-xl"
          >
            <h2 className={`text-4xl uppercase md:text-5xl font-bold mb-4 leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Full Stack Developer
            </h2>
            <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'} text-lg md:text-xl font-light tracking-wide`}>
              Specializing in Agentic AI and high-performance ecosystems with <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>4+ years</span> of production experience.
            </p>
          </motion.div>
        </div>

        {/* ROW 2: Prompt Input */}
        <div className="w-full max-w-3xl">
          <PromptInput 
            isDarkMode={isDarkMode} 
            t={t} 
            prompt={prompt} 
            setPrompt={setPrompt} 
            handleExecute={handleExecute} 
          />
        </div>

      </div>
    </motion.main>
  );
};

export { HeroSection };