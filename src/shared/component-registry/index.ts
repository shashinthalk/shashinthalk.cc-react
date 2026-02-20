// src/pages/home/ui/component-registry.ts

import { HeroSection } from '@/components/hero';
import { ExperienceSection } from '@/components/experience';
import { ServicesSection } from '@/components/services';
// import { Projects } from '@/features/projects';
import { ContactMe } from '@/features/contact-me';
// import { ChatComponent } from '@/features/chat';

/**
 * Registry mapping JSON keys to actual React Components.
 * This makes the HomePage clean and easy to scale.
 */
export const HOME_COMPONENT_REGISTRY: Record<string, React.ComponentType<any>> = {
  hero_banner: HeroSection,
  experience_section: ExperienceSection,
  services_grid: ServicesSection,
  // portfolio_gallery: Projects,
  contact_form: ContactMe,
  //chat_interface: ChatComponent,
};