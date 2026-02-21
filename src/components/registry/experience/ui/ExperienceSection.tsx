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
    /* Added overflow-hidden to prevent horizontal scroll from the large animated text */
    <section className="w-full relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-40">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className={`h-[1px] w-12 ${isDarkMode ? 'bg-white/20' : 'bg-black/20'}`} />
              <span className={`text-xs font-bold uppercase tracking-[0.4em] ${t.text}`}>
                Career Path
              </span>
            </div>
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none">
              Professional <br /> Timeline.
            </h2>
          </div>
          <p className="max-w-xs text-base md:text-lg opacity-50 font-light leading-relaxed">
            A chronological evolution from enterprise engineering to AI-accelerated development.
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

  const scale = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.9, 1.2, 1.8]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 0.08, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0.3, 1, 0.3]);

  return (
    /* Added overflow-x-clip as a secondary safety for the scaling year text */
    <div ref={targetRef} className="relative min-h-[90vh] flex items-center py-20 overflow-x-clip md:overflow-x-visible">
      {/* Background Boom Year */}
      <motion.div 
        style={{ scale, opacity }}
        className={`absolute inset-0 flex items-center justify-center pointer-events-none z-0 font-black italic
          ${isDarkMode ? 'text-white' : 'text-black'}`}
      >
        <span className="text-[35vw] md:text-[25vw] leading-none">{exp.year}</span>
      </motion.div>

      {/* Experience Layout */}
      <motion.div 
        style={{ opacity: contentOpacity }}
        className={`relative grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 group w-full z-10`}
      >
        {/* Timeline Node */}
        <div className={`absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 transition-all duration-500 z-10 hidden md:block
          ${isDarkMode ? 'bg-[#111827] border-white/20 group-hover:border-emerald-500' : 'bg-white border-black/20 group-hover:border-emerald-500'}`} 
        />

        {/* Left Side: Meta Data */}
        <div className={`${idx % 2 === 0 ? 'md:text-right' : 'md:order-2'} space-y-6`}>
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[11px] font-bold uppercase tracking-widest ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
             <Calendar size={14} className={t.text} />
             {exp.period}
          </div>
          <div>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 leading-tight">{exp.role}</h3>
            <p className={`text-xl md:text-2xl font-medium opacity-70 flex items-center gap-3 ${idx % 2 === 0 ? 'md:justify-end' : ''}`}>
              {exp.company}
              <ArrowUpRight size={20} className={`transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 ${t.text}`} />
            </p>
          </div>
          <div className={`flex items-center gap-2 text-sm opacity-40 uppercase tracking-widest ${idx % 2 === 0 ? 'md:justify-end' : ''}`}>
            <MapPin size={14} /> {exp.location}
          </div>
        </div>

        {/* Right Side: Details */}
        <div className={`${idx % 2 === 0 ? '' : 'md:text-right'}`}>
          <div className={`p-10 md:p-14 rounded-[2.5rem] border transition-all duration-700 h-full backdrop-blur-sm
            ${isDarkMode ? 'bg-white/[0.03] border-white/5 group-hover:bg-white/[0.08] group-hover:border-white/10' : 'bg-slate-50 border-black/5 group-hover:bg-slate-100/80'}`}>
            <p className="text-lg md:text-xl opacity-80 leading-relaxed mb-8 font-light">
              {exp.description}
            </p>
            
            <ul className={`space-y-4 mb-10 text-base opacity-60 font-light ${idx % 2 !== 0 ? 'md:flex md:flex-col md:items-end' : ''}`}>
              {exp.points.map((point: string, i: number) => (
                <li key={i} className="flex gap-4 items-start">
                  {idx % 2 === 0 && <span className={`mt-2.5 h-1.5 w-1.5 rounded-full shrink-0 ${t.primary} bg-current`} />}
                  <span className={idx % 2 !== 0 ? 'md:text-right' : ''}>{point}</span>
                  {idx % 2 !== 0 && <span className={`mt-2.5 h-1.5 w-1.5 rounded-full shrink-0 ${t.primary} bg-current hidden md:block`} />}
                </li>
              ))}
            </ul>

            <div className={`flex flex-wrap gap-3 ${idx % 2 !== 0 ? 'md:justify-end' : ''}`}>
              {exp.stack.map((tech: string) => (
                <span key={tech} className={`text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded border ${isDarkMode ? 'border-white/10 text-white/40' : 'border-black/10 text-black/40'}`}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Vertical Accent Line */}
      <div className={`absolute left-0 md:left-1/2 top-0 bottom-0 w-px ${isDarkMode ? 'bg-white/5' : 'bg-black/5'} -translate-x-1/2 hidden md:block z-0`} />
    </div>
  );
}