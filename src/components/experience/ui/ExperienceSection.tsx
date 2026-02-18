import { useState } from 'react';
import { ArrowUpRight, Calendar, MapPin } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const experiences = [
  {
    company: "Transpire Consultants",
    role: "Full Stack Developer",
    period: "Nov 2023 — Present",
    location: "Australia (Remote)",
    description: "Architecting dynamic web solutions and microservices with a focus on seamless integration and modern workflows.",
    points: [
      "Developing full-stack applications using React.js and Node.js with an AI-augmented approach for faster delivery.",
      "Engineering custom WordPress ecosystems, bridging the gap between traditional CMS and modern web features.",
      "Building and maintaining microservices to ensure high-quality, responsive, and user-friendly digital experiences."
    ],
    stack: ["React.js", "Node.js", "MongoDB", "WordPress", "Microservices"]
  },
  {
    company: "Fiverr",
    role: "Full Stack Web Developer",
    period: "Jul 2021 — May 2024",
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
    company: "Sprig",
    role: "Full Stack Web Developer",
    period: "Dec 2022 — Mar 2024",
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
    company: "Sotros Infotech",
    role: "Frontend Developer",
    period: "May 2021 — Jan 2023",
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
    company: "ACECAM (Pvt) Ltd",
    role: "Associate Software Engineer",
    period: "Oct 2020 — Apr 2021",
    location: "Sri Lanka",
    description: "Contributed to an Enterprise Asset Management Solution as part of the core engineering team.",
    points: [
      "Developed secure backend APIs using the Spring framework, implementing LDAP and Spring Security.",
      "Engineered robust application logic using Laravel to ensure system reliability and scalability.",
      "Collaborated on the frontend development using Bootstrap to create intuitive, enterprise-grade interfaces."
    ],
    stack: ["Spring Framework", "Laravel", "Bootstrap", "AJAX"]
  }
];

export function ExperienceSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleExperiences = isExpanded ? experiences : experiences.slice(0, 3);

  return (
    <section id="experience" className="py-14 px-6 bg-background relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-muted pb-10">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic">
              Experience
            </h2>
            <p className="text-lg text-muted-foreground max-w-md font-medium">
              A journey from enterprise engineering to AI-accelerated development.
            </p>
          </div>
        </div>

        {/* Experience List Container */}
        <div className="relative">
          <div className="space-y-20">
            {visibleExperiences.map((exp, idx) => (
              <div key={idx} className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                {/* Left Column */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="lg:sticky lg:top-24">
                    <div className="flex items-center gap-3 mb-4">
                       <span className="text-primary font-mono text-base">0{idx + 1}</span>
                       <div className="h-px w-6 bg-primary/30" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold tracking-tight group-hover:text-primary transition-colors">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-xl font-medium text-muted-foreground">
                      <span>{exp.company}</span>
                      <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-all" />
                    </div>
                    
                    <div className="flex flex-wrap gap-4 mt-6 text-xs font-mono text-muted-foreground/60">
                      <div className="flex items-center gap-1.5 border border-muted px-2 py-0.5 rounded-full">
                        <Calendar size={12} /> {exp.period}
                      </div>
                      <div className="flex items-center gap-1.5 border border-muted px-2 py-0.5 rounded-full">
                        <MapPin size={12} /> {exp.location}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-7">
                  <div className="space-y-6">
                    <p className="text-xl leading-snug font-medium text-foreground/90">
                      {exp.description}
                    </p>
                    <ul className="space-y-4">
                      {exp.points.map((point, i) => (
                        <li key={i} className="flex gap-4">
                          <div className="mt-2.5 h-1 w-1 rounded-full bg-primary shrink-0 opacity-40" />
                          <p className="text-base text-muted-foreground leading-relaxed transition-colors">
                            {point}
                          </p>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-6 flex flex-wrap gap-2">
                      {exp.stack.map((tech) => (
                        <Badge key={tech} variant="outline" className="bg-muted/20 border-none text-muted-foreground px-2 py-0.5 text-[10px] uppercase font-bold tracking-widest">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* --- The Fade Overlay --- */}
          {!isExpanded && experiences.length > 3 && (
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/80 to-transparent z-10 flex flex-col items-center justify-end">
              <button 
                onClick={() => setIsExpanded(true)}
                className="text-sm font-black uppercase tracking-[0.2em] text-foreground hover:text-primary transition-colors pb-2 border-b-2 border-primary/20 hover:border-primary pointer-events-auto"
              >
                Reveal History
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}