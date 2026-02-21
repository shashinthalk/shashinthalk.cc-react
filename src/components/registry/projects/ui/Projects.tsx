import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: "Quantum AI Orchestrator",
    category: "Machine Learning / SaaS",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    description: "Multi-agent system for automated workflow optimization using LLMs.",
    tags: ["React", "Python", "FastAPI"],
    link: "#",
    github: "#",
    size: "large" // Spans 2 columns
  },
  {
    title: "SecurePay Gateway",
    category: "Fintech",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
    description: "High-security payment processing with real-time fraud detection.",
    tags: ["Node.js", "Redis"],
    link: "#",
    github: "#",
    size: "small"
  },
  {
    title: "Echo CMS",
    category: "Web Architecture",
    image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&q=80&w=800",
    description: "Headless content management system optimized for edge delivery.",
    tags: ["Next.js", "Postgres"],
    link: "#",
    github: "#",
    size: "small"
  },
  {
    title: "Nebula Dashboard",
    category: "Infrastructure",
    image: "https://images.unsplash.com/photo-1551288049-bbdac8a28a1e?auto=format&fit=crop&q=80&w=800",
    description: "Cloud monitoring suite with predictive scaling analytics.",
    tags: ["TypeScript", "D3.js", "AWS"],
    link: "#",
    github: "#",
    size: "wide" // Spans bottom row
  }
];

export function ProjectGrid({ isDarkMode, t }: { isDarkMode: boolean; t: any }) {
  return (
    <section className="py-24 w-full">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className={`h-[1px] w-12 ${isDarkMode ? 'bg-white/20' : 'bg-black/20'}`} />
              <span className={`${t.text} font-mono text-xs tracking-[0.4em] uppercase`}>Selected Works</span>
            </div>
            <h2 className={`text-5xl md:text-7xl font-bold tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Digital <br /> Architecture.
            </h2>
          </div>
          <p className="max-w-xs text-sm opacity-50 font-light leading-relaxed mb-2">
            A showcase of full-stack engineering, combining aesthetic precision with technical performance.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} isDarkMode={isDarkMode} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, isDarkMode, t }: any) {
  const isLarge = project.size === "large";
  const isWide = project.size === "wide";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className={`relative group rounded-[2rem] overflow-hidden border transition-all duration-500 
        ${isLarge ? 'md:col-span-2 md:row-span-2' : ''} 
        ${isWide ? 'lg:col-span-2' : ''}
        ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-black/5 bg-slate-50'}`}
    >
      {/* Project Image */}
      <img 
        src={project.image} 
        alt={project.title} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
      />
      
      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-500
        ${isDarkMode ? 'from-[#030712] via-[#030712]/40 to-transparent' : 'from-white via-white/40 to-transparent opacity-80 group-hover:opacity-100'}`} 
      />

      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <div className="space-y-3 transform transition-transform duration-500 group-hover:translate-y-[-10px]">
          <div className="flex gap-2">
            {project.tags.slice(0, 2).map((tag: string) => (
              <span key={tag} className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded border ${isDarkMode ? 'border-white/20 text-white/60' : 'border-black/10 text-black/60'}`}>
                {tag}
              </span>
            ))}
          </div>
          
          <h3 className={`text-2xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {project.title}
          </h3>
          
          <p className={`text-sm line-clamp-2 font-light max-w-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {project.description}
          </p>

          <div className="flex items-center gap-4 pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <a href={project.github} className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors ${t.text} hover:text-emerald-500`}>
              <Github size={16} /> Code
            </a>
            <a href={project.link} className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors ${t.text} hover:text-emerald-500`}>
              <ExternalLink size={16} /> Live
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}