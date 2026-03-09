import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Calendar, MapPin } from 'lucide-react';

const experiences = [
  {
    company: "ACECAM (Pvt) Ltd",
    role: "Associate Software Engineer",
    period: "Oct 2020 — Apr 2021",
    year: "2020",
    location: "Sri Lanka",
    description: "Contributed to an Enterprise Asset Management Solution as part of the core engineering team.",
    points: [
      "Developed secure backend APIs using the Spring framework, implementing LDAP and Spring Security.",
      "Engineered robust application logic using Laravel to ensure system reliability and scalability.",
      "Collaborated on the frontend development using Bootstrap to create intuitive, enterprise-grade interfaces."
    ],
    stack: ["Spring Framework", "Laravel", "Bootstrap", "AJAX"]
  },
  {
    company: "Sotros Infotech",
    role: "Frontend Developer",
    period: "May 2021 — Jan 2023",
    year: "2021",
    location: "India (Remote)",
    description: "Contributed to project success through high-fidelity UI development and responsive design.",
    points: [
      "Translated complex designs into functional, high-performance web interfaces.",
      "Worked closely with clients to refine technical specifications and meet strict project deadlines.",
      "Ensured cross-browser compatibility and mobile-first responsiveness across all deliverables."
    ],
    stack: ["Web Development", "UI/UX", "Plugin Development", "JavaScript"]
  },
  {
    company: "Sprig",
    role: "Full Stack Web Developer",
    period: "Dec 2022 — Mar 2024",
    year: "2022",
    location: "Colombo, Sri Lanka",
    description: "Focused on frontend-heavy web development and complex CMS management.",
    points: [
      "Led the development of custom themes and plugins within the WordPress and Webflow frameworks.",
      "Streamlined hosting management and deployment processes for internal and client projects.",
      "Collaborated on improving site performance and user experience through iterative frontend refinements."
    ],
    stack: ["WordPress", "Webflow", "Wix", "Hosting Management"]
  },
  {
    company: "Fiverr",
    role: "Full Stack Web Developer",
    period: "Jul 2021 — May 2024",
    year: "2023",
    location: "Freelance",
    description: "Delivering bespoke web applications and custom plugin solutions for a global client base.",
    points: [
      "Specialized in the Laravel framework for building robust, scalable, and secure web applications.",
      "Developed custom WordPress and Bubble plugins to meet unique client-specific requirements.",
      "Managed end-to-end client communication and project delivery with a 100% on-time success rate."
    ],
    stack: ["Laravel", "PHP", "WordPress", "Bubble", "Client Management"]
  },
  {
    company: "Transpire Consultants",
    role: "Full Stack Developer",
    period: "Nov 2023 — Present",
    year: "2024",
    location: "Australia (Remote)",
    description: "Architecting dynamic web solutions and microservices with a focus on seamless integration and modern workflows.",
    points: [
      "Developing full-stack applications using React.js and Node.js with an AI-augmented approach for faster delivery.",
      "Engineering custom WordPress ecosystems, bridging the gap between traditional CMS and modern web features.",
      "Building and maintaining microservices to ensure high-quality, responsive, and user-friendly digital experiences."
    ],
    stack: ["React.js", "Node.js", "MongoDB", "WordPress", "Microservices"]
  }
];

export function ExperienceSection({ isDarkMode, t }: any) {
  return (
    <section className="w-full relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-12 md:mb-20">
          <div className="space-y-4 md:space-y-6">
            <div className="flex items-center gap-4">
              <div className={`h-[1px] w-12 ${isDarkMode ? 'bg-emerald-500/30' : 'bg-emerald-500/20'}`} />
              <span className={`text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] ${t.text}`}>
                Career Path
              </span>
            </div>
            <h2 className={`text-5xl md:text-8xl font-bold tracking-tighter leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Professional <br /> Timeline.
            </h2>
          </div>
          <p className={`max-w-xs text-sm md:text-lg font-light leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            How I gained my experience and evolved as a developer over the years, from my first role to the present day.
          </p>
        </div>

        {/* Timeline List */}
        <div className="relative">
          {experiences.map((exp, idx) => (
            <ExperienceItem key={idx} exp={exp} idx={idx} isDarkMode={isDarkMode} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceItem({ exp, idx, isDarkMode, t }: any) {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0.1, 0.4, 0.9], [0.8, 1.1, 1.4]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.4, 0.7], [0, 0.05, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.8], [0.4, 1, 0.4]);

  return (
    <div ref={targetRef} className="relative min-h-[70vh] md:min-h-[90vh] flex items-center py-10 md:py-0 overflow-visible">
      
      {/* Background Boom Year */}
      <motion.div 
        style={{ scale, opacity }}
        className={`absolute inset-0 flex items-center justify-center pointer-events-none z-0 font-black italic select-none
          ${isDarkMode ? 'text-emerald-500' : 'text-emerald-900'}`}
      >
        <span className="text-[45vw] md:text-[25vw] leading-none">{exp.year}</span>
      </motion.div>

      {/* Experience Layout */}
      <motion.div 
        style={{ opacity: contentOpacity }}
        className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 group w-full z-10`}
      >
        {/* Timeline Node */}
        <div className={`absolute left-0 md:left-1/2 top-0 md:-translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 transition-all duration-500 z-10
          ${isDarkMode ? 'bg-[#111827] border-white/20' : 'bg-white border-black/20'} group-hover:border-emerald-500 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.5)]`} 
        />

        {/* Left Side: Meta Data */}
        <div className={`pl-8 md:pl-0 ${idx % 2 === 0 ? 'md:text-right' : 'md:order-2'} space-y-4`}>
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-700'}`}>
             <Calendar size={12} />
             {exp.period}
          </div>
          <div>
            <h3 className={`text-3xl md:text-5xl font-bold tracking-tight mb-1 leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{exp.role}</h3>
            <p className={`text-lg md:text-2xl font-medium flex items-center gap-2 ${t.text} ${idx % 2 === 0 ? 'md:justify-end' : ''}`}>
              {exp.company}
              <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </p>
          </div>
          <div className={`flex items-center gap-2 text-[10px] opacity-40 uppercase tracking-widest ${idx % 2 === 0 ? 'md:justify-end' : ''}`}>
            <MapPin size={12} /> {exp.location}
          </div>
        </div>

        {/* Right Side: Details Card */}
        <div className={`pl-8 md:pl-0 ${idx % 2 === 0 ? '' : 'md:text-right'}`}>
          <div className={`p-6 md:p-14 rounded-[1.5rem] md:rounded-[2.5rem] border transition-all duration-700 h-full backdrop-blur-md
            ${isDarkMode ? 'bg-white/[0.03] border-white/5 group-hover:bg-white/[0.08] group-hover:border-emerald-500/30' : 'bg-slate-50 border-black/5 group-hover:bg-slate-100/80 group-hover:border-emerald-500/20'}`}>
            <p className={`text-base md:text-xl leading-relaxed mb-6 font-light ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              {exp.description}
            </p>
            
            <ul className={`space-y-3 mb-8 text-sm md:text-base font-light ${idx % 2 !== 0 ? 'md:items-end' : ''}`}>
              {exp.points.map((point: string, i: number) => (
                <li key={i} className={`flex gap-3 items-start ${idx % 2 !== 0 ? 'md:justify-end' : ''}`}>
                  <span className={`mt-2 h-1 w-1 rounded-full shrink-0 ${t.buttonBg} md:${idx % 2 !== 0 ? 'hidden' : 'block'}`} />
                  <span className={`opacity-60 group-hover:opacity-100 transition-opacity ${idx % 2 !== 0 ? 'md:text-right' : ''}`}>{point}</span>
                  <span className={`mt-2 h-1 w-1 rounded-full shrink-0 ${t.buttonBg} hidden md:${idx % 2 !== 0 ? 'block' : 'none'}`} />
                </li>
              ))}
            </ul>

            <div className={`flex flex-wrap gap-2 ${idx % 2 !== 0 ? 'md:justify-end' : ''}`}>
              {exp.stack.map((tech: string) => (
                <span key={tech} className={`text-[9px] md:text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded border transition-colors
                  ${isDarkMode ? 'border-white/10 text-white/40 group-hover:border-emerald-500/40 group-hover:text-emerald-400' : 'border-black/10 text-black/40 group-hover:border-emerald-500/40 group-hover:text-emerald-600'}`}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Vertical Accent Line */}
      <div className={`absolute left-0 md:left-1/2 top-0 bottom-0 w-px ${isDarkMode ? 'bg-white/5' : 'bg-black/5'} md:-translate-x-1/2 z-0`} />
    </div>
  );
}