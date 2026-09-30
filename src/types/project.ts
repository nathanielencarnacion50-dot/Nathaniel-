export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  category: 'E-Commerce' | 'SaaS' | 'Herramientas' | 'Creative' | 'Full Stack' | 'Mobile';
  tags: string[];
  image: string;
  githubUrl: string;
  liveUrl?: string;
  interactiveHtml?: string;
  features: string[];
  metrics?: ProjectMetric[];
  isFavorite?: boolean;
  featured?: boolean;
  createdAt?: string;
}

export type DeviceMode = 'desktop' | 'tablet' | 'mobile';
export type DeviceOrientation = 'portrait' | 'landscape';
