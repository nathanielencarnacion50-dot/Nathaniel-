import React from 'react';
import { ArrowUp, Code2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 py-8 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-indigo-400" />
          <span>
            © {currentYear} <strong className="text-slate-400">DevVision</strong>. Portafolio Web Interactivo con Previsualización Multidispositivo.
          </span>
        </div>

        <div className="flex items-center space-x-6">
          <a href="#proyectos" className="hover:text-slate-300 transition-colors">
            Proyectos
          </a>
          <a href="#habilidades" className="hover:text-slate-300 transition-colors">
            Habilidades
          </a>
          <button
            onClick={scrollToTop}
            className="hover:text-indigo-400 transition-colors flex items-center gap-1.5 cursor-pointer font-medium"
          >
            <span>Volver arriba</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
