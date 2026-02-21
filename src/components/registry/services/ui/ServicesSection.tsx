import { motion } from 'framer-motion';
import { Layers, Code2, BrainCircuit, Globe, Zap, Boxes, ArrowUpRight } from 'lucide-react';

const services = [
  { 
    title: "Modern Web Development", 
    desc: "Building full-stack applications with a focus on seamless integration between frontend and backend. Proficient in creating dynamic, responsive user experiences using the MERN stack.", 
    icon: <Code2 size={20} />,
    tags: ["React.js", "Node.js", "MongoDB", "Express"]
  },
  { 
    title: "AI-Enhanced Workflows", 
    desc: "Leveraging AI tools to accelerate the development lifecycle without compromising code quality. I focus on using intelligence to solve complex logic and speed up delivery.", 
    icon: <Zap size={20} />,
    tags: ["AI Integration", "Smart Development", "Efficiency"]
  },
  { 
    title: "WordPress Ecosystems", 
    desc: "Extensive experience in the WordPress space, ranging from custom theme development to building complex plugins and tailoring solutions for business needs.", 
    icon: <Globe size={20} />,
    tags: ["WordPress", "PHP", "Plugin Dev", "Theme Dev"]
  },
  { 
    title: "Agentic Logic & AI Agents", 
    desc: "Exploring and developing agentic workflows. I work on integrating AI agents into web platforms to automate tasks and create more interactive, intelligent applications.", 
    icon: <BrainCircuit size={20} />,
    tags: ["AI Agents", "Agentic Workflows", "Automation"]
  },
  { 
    title: "Custom Plugin Engineering", 
    desc: "Experienced in building specialized tools and plugins for platforms like Bubble and WordPress, ensuring unique functionality that standard tools can't provide.", 
    icon: <Boxes size={20} />,
    tags: ["Bubble Plugins", "API Integration", "Custom Logic"]
  },
  { 
    title: "Adaptable Backend Systems", 
    desc: "Versatile background in backend frameworks. From building robust APIs in Laravel to earlier work in Spring Boot, I adapt the tech stack to project requirements.", 
    icon: <Layers size={20} />,
    tags: ["Laravel", "PHP", "REST APIs", "Database Design"]
  }
];

export function ServicesSection({ isDarkMode, t }: any) {
  return (
    <section className="w-full">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header Block: Following your Vertical/Minimalist style */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-24">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className={`h-[1px] w-12 ${isDarkMode ? 'bg-white/20' : 'bg-black/20'}`} />
              <span className={`text-xs font-bold uppercase tracking-[0.4em] ${t.text}`}>
                Expertise & Services
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none">
              Digital <br /> Engineering.
            </h2>
          </div>
          <p className="max-w-xs text-sm md:text-base opacity-50 font-light leading-relaxed">
            A versatile skill set built on years of traditional development, now enhanced by modern AI methodologies.
          </p>
        </div>

        {/* Services Grid: Glassmorphic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5 overflow-hidden rounded-[2.5rem]">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ backgroundColor: isDarkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" }}
              className={`relative p-10 group transition-colors duration-500 border border-white/5`}
            >
              {/* Corner Accent */}
              <div className={`absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity ${t.text}`}>
                <ArrowUpRight size={20} />
              </div>

              <div className="space-y-8">
                {/* Icon Circle */}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${isDarkMode ? 'bg-white/5 group-hover:bg-white/10' : 'bg-slate-100 group-hover:bg-slate-200'}`}>
                  <div className={`${t.text} group-hover:scale-110 transition-transform duration-500`}>
                    {service.icon}
                  </div>
                </div>

                <div className="space-y-4">
                  <span className="text-[10px] font-bold tracking-[0.2em] opacity-30 uppercase">
                    Module 0{idx + 1}
                  </span>
                  <h3 className="text-xl font-bold tracking-tight group-hover:translate-x-1 transition-transform duration-500">
                    {service.title}
                  </h3>
                  <p className="text-sm opacity-50 font-light leading-relaxed min-h-[80px]">
                    {service.desc}
                  </p>
                </div>

                {/* Tech Tags: Clean & Semantic */}
                <div className="flex flex-wrap gap-2 pt-4">
                  {service.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className={`px-3 py-1 text-[9px] font-bold uppercase tracking-wider rounded-full border transition-all duration-500
                        ${isDarkMode 
                          ? 'border-white/5 bg-white/5 text-white/40 group-hover:border-emerald-500/30 group-hover:text-emerald-400' 
                          : 'border-black/5 bg-black/5 text-black/40 group-hover:border-emerald-500/30 group-hover:text-emerald-600'
                        }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}