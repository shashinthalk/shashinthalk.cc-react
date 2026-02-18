import { Layers, Code2, BrainCircuit, Globe, Zap, Boxes } from 'lucide-react';

const services = [
  { 
    title: "Modern Web Development", 
    desc: "Building full-stack applications with a focus on seamless integration between frontend and backend. Proficient in creating dynamic, responsive user experiences using the MERN stack.", 
    icon: <Code2 className="h-5 w-5" />,
    tags: ["React.js", "Node.js", "MongoDB", "Express"]
  },
  { 
    title: "AI-Enhanced Workflows", 
    desc: "Leveraging AI tools to accelerate the development lifecycle without compromising code quality. I focus on using intelligence to solve complex logic and speed up delivery.", 
    icon: <Zap className="h-5 w-5" />,
    tags: ["AI Integration", "Smart Development", "Efficiency"]
  },
  { 
    title: "WordPress Ecosystems", 
    desc: "Extensive experience in the WordPress space, ranging from custom theme development to building complex plugins and tailoring out-of-the-box solutions for business needs.", 
    icon: <Globe className="h-5 w-5" />,
    tags: ["WordPress", "PHP", "Plugin Dev", "Theme Dev"]
  },
  { 
    title: "Agentic Logic & AI Agents", 
    desc: "Exploring and developing agentic workflows. I work on integrating AI agents into web platforms to automate tasks and create more interactive, intelligent applications.", 
    icon: <BrainCircuit className="h-5 w-5" />,
    tags: ["AI Agents", "Agentic Workflows", "Automation"]
  },
  { 
    title: "Custom Plugin Engineering", 
    desc: "Experienced in building specialized tools and plugins for platforms like Bubble and WordPress, ensuring unique functionality that standard tools can't provide.", 
    icon: <Boxes className="h-5 w-5" />,
    tags: ["Bubble Plugins", "API Integration", "Custom Logic"]
  },
  { 
    title: "Adaptable Backend Systems", 
    desc: "Versatile background in backend frameworks. From building robust APIs in Laravel to earlier work in Spring Boot, I adapt the tech stack to fit the project's requirements.", 
    icon: <Layers className="h-5 w-5" />,
    tags: ["Laravel", "PHP", "REST APIs", "Database Design"]
  }
];

export function ServicesSection() {
  return (
    <section id="services" className="py-14 px-6 border-t border-muted">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic">
              Expertise
            </h2>
            <p className="text-lg text-muted-foreground max-w-md font-medium">
              A versatile skill set built on years of traditional development, now enhanced by modern AI methodologies.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {services.map((service, idx) => (
            <div key={idx} className="group space-y-6">
              {/* Top Row: Number and Icon */}
              <div className="flex items-center justify-between border-b border-muted pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-primary font-mono text-sm">0{idx + 1}</span>
                  <div className="text-foreground/70 group-hover:text-primary transition-colors">
                    {service.icon}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold tracking-tight">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-base">
                  {service.desc}
                </p>
              </div>

              {/* Minimal Tech Tags */}
              <div className="flex flex-wrap gap-x-4 gap-y-2 pt-2">
                {service.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground/50 group-hover:text-primary/60 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}