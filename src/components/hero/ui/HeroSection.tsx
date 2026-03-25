'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const GridOverlay = ({ isDark }: { isDark: boolean }) => (
  <div className={`absolute inset-0 bg-[linear-gradient(to_right,${isDark ? '#ffffff03' : '#00000005'}_1px,transparent_1px),linear-gradient(to_bottom,${isDark ? '#ffffff03' : '#00000005'}_1px,transparent_1px)] bg-[size:50px_50px]`} />
);

function BgCodeCard({ isDark, lines, className }: { isDark: boolean; lines: string[]; className?: string }) {
  return (
    <div className={`absolute pointer-events-none select-none rounded-xl border px-4 py-3 text-[10px] font-mono leading-[1.8] opacity-[0.20] ${
      isDark ? 'bg-white/[0.03] border-white/10 text-slate-400' : 'bg-black/[0.03] border-black/10 text-slate-500'
    } ${className}`}>
      <div className="flex gap-1.5 mb-2">
        <span className="w-2 h-2 rounded-full bg-red-400/50" />
        <span className="w-2 h-2 rounded-full bg-yellow-400/50" />
        <span className="w-2 h-2 rounded-full bg-emerald-400/50" />
      </div>
      {lines.map((l, i) => <div key={i}>{l}</div>)}
    </div>
  );
}

type TailDir = 'bottom-left' | 'top-right' | 'top-left';

function StatBubble({ isDark, value, label, delay, tailDir, style }: {
  isDark: boolean;
  value: string;
  label: string;
  delay: number;
  tailDir: TailDir;
  style?: React.CSSProperties;
}) {
  // The SVG tail — a small curved triangle that points toward the photo
  const Tail = () => {
    if (tailDir === 'bottom-left') {
      // Tail at bottom-left corner, points down-left toward photo centre
      return (
        <></>
      );
    }
    if (tailDir === 'top-right') {
      // Tail at top-right corner, points up-right toward photo centre
      return (
        <></>
      );
    }
    // top-left
    return (
      <></>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
      className="absolute pointer-events-none select-none"
      style={style}
    >
      <div className={`relative flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border backdrop-blur-[2px] ${
        isDark
          ? 'bg-[#111827]/95 border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.72),0_0_0_1px_rgba(255,255,255,0.04),inset_0_1px_0_rgba(255,255,255,0.10)]'
          : 'bg-white/98 border-black/10 shadow-[0_10px_30px_rgba(0,0,0,0.14),0_0_0_1px_rgba(255,255,255,0.95),inset_0_1px_0_rgba(255,255,255,1)]'
      }`}>
        {/* Emerald left bar */}
        <div className="w-1 h-8 rounded-full bg-linear-to-b from-emerald-400 to-emerald-600 shrink-0 opacity-95" />
        <div className="flex flex-col">
          <span className={`text-base font-extrabold leading-none tabular-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>{value}</span>
          <span className={`text-[10px] font-semibold tracking-[0.13em] uppercase mt-1 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>{label}</span>
        </div>
        <Tail />
      </div>
    </motion.div>
  );
}

// ─── Typing role ──────────────────────────────────────────────────
const ROLES = ['Full Stack Developer', 'API Architect', 'Open Source Builder', 'Automation Expert'];
function TypedRole({ isDark }: { isDark: boolean }) {
  const [idx, setIdx] = useState(0);
  const [chars, setChars] = useState('');
  const [del, setDel] = useState(false);
  useEffect(() => {
    const target = ROLES[idx];
    const timer = setTimeout(() => {
      if (!del && chars.length < target.length) setChars(target.slice(0, chars.length + 1));
      else if (!del) setDel(true);
      else if (chars.length > 0) setChars(target.slice(0, chars.length - 1));
      else { setDel(false); setIdx(i => (i + 1) % ROLES.length); }
    }, del ? 30 : chars.length === target.length ? 2000 : 58);
    return () => clearTimeout(timer);
  }, [chars, del, idx]);
  return (
    <span className={`text-xs tracking-[0.22em] uppercase font-light ${isDark ? 'text-white/35' : 'text-slate-400'}`}>
      {chars}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
        className="inline-block w-px h-3 ml-0.5 align-middle bg-emerald-500"
      />
    </span>
  );
}

const HeroSection = ({ isDarkMode, setView, setIsOpen, onSearch }: {
  isDarkMode: boolean;
  setView: (value: string) => void;
  setIsOpen: (value: boolean) => void;
  onSearch: (val: string) => void;
  t?: any;
  prompt?: string;
  setPrompt?: (v: string) => void;
  handleExecute?: (e: { preventDefault: () => void }) => void;
}) => {

  return (
    <motion.main
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
      className="w-full flex flex-col items-center justify-center relative px-4 sm:px-6 py-24 md:py-28 min-h-screen md:h-screen md:max-h-screen md:overflow-hidden"
    >

      {/* ── Layer 0: background ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <GridOverlay isDark={isDarkMode} />
        <div className="absolute inset-0" style={{
          background: isDarkMode
            ? 'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 20%, rgba(0,0,0,0.75) 100%)'
            : 'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 20%, rgba(244,244,243,0.9) 100%)',
        }} />
        {/* BG code cards — desktop only */}
        <BgCodeCard isDark={isDarkMode} className="top-26 left-16 w-44 hidden lg:block" lines={['// schema.prisma','model User {','  id    String @id','  email String @unique','}']} />
        <BgCodeCard isDark={isDarkMode} className="bottom-16 left-56 w-48 hidden lg:block" lines={['# docker-compose.yml','services:','  app:','    image: node:20-alpine',"    ports: ['3000:3000']"]} />
        <BgCodeCard isDark={isDarkMode} className="top-26 right-36 w-48 hidden lg:block" lines={['// api/projects.ts','export async function','  getProjects() {','  return await db','    .select(projects)','}']} />
        <BgCodeCard isDark={isDarkMode} className="bottom-30 right-66 w-44 hidden lg:block" lines={['// useAuth.ts','const { user } =','  useSession()','if (!user)','  redirect("/login")']} />
      </div>

      {/* ── Layer 1: content ── */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">

        <motion.div
          className="relative shrink-0 flex items-center justify-center"
          style={{ width: 340, height: 340 }}
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Tilt wrapper — photo only */}
          <motion.div
            style={{
              transformStyle: 'preserve-3d',
              perspective: 800,
              position: 'relative',
              width: 220,
              height: 220,
            }}
          >
            {/* Spinning dashed ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              className={`absolute -inset-4 border border-dashed rounded-full ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}
            />
            {/* Counter ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
              className={`absolute -inset-8 border rounded-full ${isDarkMode ? 'border-white/[0.05]' : 'border-black/[0.04]'}`}
            />
            {/* 3D shadow */}
            <div className="absolute inset-0 rounded-full -z-10" style={{
              transform: 'translateZ(-28px) scale(0.88)',
              filter: 'blur(22px)',
              background: isDarkMode ? 'rgba(0,0,0,0.72)' : 'rgba(0,0,0,0.1)',
            }} />
            {/* Photo */}
            <img
              src="https://avatars.githubusercontent.com/u/45489545?v=4"
              className={`w-full h-full rounded-full border-4 object-cover ${isDarkMode ? 'border-[#1F2937] bg-[#1F2937]' : 'border-white bg-white shadow-xl'}`}
              style={{
                transform: 'translateZ(20px)',
                boxShadow: isDarkMode
                  ? '0 20px 56px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.07)'
                  : '0 20px 56px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.05)',
              }}
              alt="Nishan"
            />
            
          </motion.div>

          {/* 4+ Years — top-right, tail bottom-left */}
          <StatBubble
            isDark={isDarkMode}
            value="4+"
            label="Years Exp"
            delay={0.55}
            tailDir="bottom-left"
            style={{
              top: 6,
              right: -8,
            }}
          />

          {/* 100+ Projects — bottom-left, tail top-right */}
          <StatBubble
            isDark={isDarkMode}
            value="100+"
            label="Projects"
            delay={0.7}
            tailDir="top-right"
            style={{
              bottom: 6,
              left: -10,
            }}
          />

          {/* 98% Satisfied — bottom-right, tail top-left */}
          <StatBubble
            isDark={isDarkMode}
            value="98%"
            label="Satisfied"
            delay={0.85}
            tailDir="top-left"
            style={{
              bottom: 8,
              right: -10,
            }}
          />
        </motion.div>

        {/* ── Text block ── */}
        <div className="flex flex-col text-center md:text-left max-w-xl w-full">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center gap-3 mb-3 justify-center md:justify-start"
          >
            <span className="h-px w-6 bg-emerald-500/70" />
            <TypedRole isDark={isDarkMode} />
          </motion.div>

          {/* H2 */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`text-5xl md:text-7xl font-semibold mb-5 leading-[1.08] tracking-[-0.02em] ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
            style={{ textShadow: isDarkMode ? '0 4px 0 rgba(0,0,0,0.5), 0 10px 30px rgba(0,0,0,0.4)' : '0 4px 0 rgba(255,255,255,0.8)' }}
          >
            <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-900'} font-light`}>Build</span>{' '}
            <span className={`${isDarkMode ? 'text-white' : 'text-slate-900'} font-light`}>the vision</span>{' '}
            <br />
            <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-900'} font-medium`}>Skip the</span>{' '}
            <span className={`${isDarkMode ? 'text-white' : 'text-slate-900'} font-bold`}>technical overhead</span>
          </motion.h2>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.36, duration: 0.5 }}
            className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'} text-lg md:text-xl font-light tracking-wide mb-6`}
          >
            High-performance web and AI systems, built without the overhead. I handle the complexity so you can focus on the vision. Clean code. Smart automation. Zero friction.
          </motion.p>

          {/* Skill pills */}
          {/* <div className="flex flex-wrap gap-2.5 mb-7 justify-center md:justify-start">
            {['React', 'Node.js', 'WordPress', 'Automation(n8n)', 'Laravel', 'PostgreSQL', 'Docker'].map((s, i) => (
              <motion.span key={s}
                initial={{ opacity: 0, y: 6, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.42 + i * 0.07, duration: 0.3, ease: 'backOut' }}
                whileHover={{ y: -2, scale: 1.06 }}
                className={`text-sm font-medium px-3.5 py-1.5 rounded-full border cursor-default transition-all duration-200 ${
                  isDarkMode
                    ? 'border-white/10 text-slate-400 hover:border-emerald-500/40 hover:text-emerald-400'
                    : 'border-black/10 text-slate-500 hover:border-emerald-500/40 hover:text-emerald-600'
                }`}
              >{s}</motion.span>
            ))}
          </div> */}

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            className="flex flex-wrap gap-3.5 justify-center md:justify-start"
          >
            <motion.button
              onClick={() => { setView('experience'); setIsOpen(false); onSearch('I would like to know about your experience.'); }}
              whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
              className="relative overflow-hidden px-7 py-3 rounded-xl text-base font-bold tracking-wide text-white cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                boxShadow: '0 8px 24px rgba(16,185,129,0.35), inset 0 1px 0 rgba(255,255,255,0.15)',
              }}
            >
              <span className="relative z-10 pointer-events-none">Journey</span>
              <motion.span className="absolute inset-0 bg-white/10 pointer-events-none"
                initial={{ x: '-100%' }} whileHover={{ x: '100%' }}
                transition={{ duration: 0.4 }} />
            </motion.button>
              
            <motion.button
              onClick={() => window.open('https://drive.google.com/file/d/1IuswrkamPGRO0DqxlTEWB0ORKqIzHWiT/view?usp=sharing', '_blank')}
              whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
              className={`px-7 py-3 rounded-xl text-base font-bold tracking-wide border transition-all duration-300 cursor-pointer ${
                isDarkMode
                  ? 'border-white/10 text-slate-300 hover:border-emerald-500/40 hover:text-emerald-400'
                  : 'border-black/10 text-slate-600 hover:border-emerald-500/40 hover:text-emerald-600'
              }`}
            >Resume</motion.button>
          </motion.div>

        </div>
      </div>
    </motion.main>
  );
};

export { HeroSection };