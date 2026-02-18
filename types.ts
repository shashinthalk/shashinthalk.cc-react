import { ReactNode } from 'react';

export interface ThemeConfig {
  primary: string;
  text: string;
  bgAccent: string;
  border: string;
  glow: string;
  gradient: string;
  buttonBg: string;
  buttonHover: string;
}

export type ThemeType = 'cyan' | 'emerald' | 'amber' | 'rose';

export interface Suggestion {
  label: string;
  icon: ReactNode;
}

export interface ProjectItem {
  title: string;
  type: string;
  desc: string;
}