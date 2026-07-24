import { Code2, Layout, Smartphone, Database, GitBranch, Palette, Figma, Globe, Github, Linkedin, Mail, Phone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const PROFILE_IMAGE = '/assets/profile.webp';

export interface Skill { icon: LucideIcon; level: number; }
export const skills: Skill[] = [
  { icon: Code2, level: 95 }, { icon: Code2, level: 90 }, { icon: Code2, level: 85 },
  { icon: Layout, level: 90 }, { icon: Smartphone, level: 92 }, { icon: Palette, level: 80 },
  { icon: GitBranch, level: 88 }, { icon: Layout, level: 85 }, { icon: Figma, level: 75 },
  { icon: Database, level: 78 }, { icon: Code2, level: 70 }, { icon: Globe, level: 72 },
];

export interface Project { title: string; category: string; description: string; tags: string[]; image: string; link: string; featured: boolean; }
export const projects: Project[] = [
  { title: 'Gammal Tech — Company Website', category: 'Website', description: 'A modern, fully responsive company website for Gammal Tech showcasing services, team, and portfolio.', tags: ['HTML','CSS','JavaScript','Responsive'], image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800', link: 'https://abrahymbdh703-dev.github.io/portfolio-website/', featured: true },
  { title: 'Blood LabCare', category: 'Healthcare', description: 'A healthcare-focused website for a blood laboratory care service with appointment booking.', tags: ['HTML','CSS','JavaScript','Bootstrap'], image: 'https://images.pexels.com/photos/4226219/pexels-photo-4226219.jpeg?auto=compress&cs=tinysrgb&w=800', link: 'https://abrahymbdh703-dev.github.io/labcare-website/', featured: true },
  { title: 'Sign Up Page', category: 'UI Component', description: 'A beautifully crafted sign-up / authentication page with form validation and polished design.', tags: ['HTML','CSS','JavaScript','Forms'], image: 'https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=800', link: 'https://abrahymbdh703-dev.github.io/signup-website/', featured: false },
];

export interface SocialLink { label: string; href: string; icon: LucideIcon; }
export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/abrahymbdh703-dev', icon: Github },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/abd-elftah-ebrahem-38a49240a/', icon: Linkedin },
  { label: 'Email', href: 'mailto:abrahymbdh703@gmail.com', icon: Mail },
  { label: 'Phone', href: 'tel:+201037849789', icon: Phone },
];

export const serviceIcons: { icon: LucideIcon }[] = [
  { icon: Smartphone }, { icon: Code2 }, { icon: Globe }, { icon: Palette },
];

export const GITHUB_URL = 'https://github.com/abrahymbdh703-dev';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/abd-elftah-ebrahem-38a49240a/';
export const EMAIL = 'abrahymbdh703@gmail.com';
export const PHONE = '+201037849789';
export const PHONE_DISPLAY = '+20 103 784 9789';
