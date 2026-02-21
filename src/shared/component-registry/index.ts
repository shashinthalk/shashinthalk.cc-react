// src/pages/home/ui/component-registry.ts

import { ExperienceSection } from '@/components/registry/experience';
import { ServicesSection } from '@/components/registry/services';
import { ProjectGrid } from '@/components/registry/projects';
import { ContactMe } from '@/components/registry/contact-me';
// import { ChatComponent } from '@/features/chat';

/**
 * Registry mapping JSON keys to actual React Components.
 * This makes the HomePage clean and easy to scale.
 */
export const HOME_COMPONENT_REGISTRY: Record<string, React.ComponentType<any>> = {
  // hero_banner: HeroSection,
  experience_section: ExperienceSection,
  services_grid: ServicesSection,
  portfolio_gallery: ProjectGrid,
  contact_form: ContactMe,
  //chat_interface: ChatComponent,
};