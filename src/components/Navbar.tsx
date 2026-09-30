import React, { useState } from 'react';
import { Plus, Menu, X, Code2 } from 'lucide-react';

interface NavbarProps {
  onOpenAddModal: () => void;
  projectsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAddModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full glass-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element Brand mark */}
          <a href="#inicio" className="flex items-center space-x-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white font-extrabold shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-indigo-300">
              DevVision<span className="text-cyan-400">.</span>
            </span>
          </a>

          {/* Zone 2: 4-6 Clean navigation links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
            <a href="#inicio" className="hover:text-indigo-400 transition-colors">Inicio</a>
            <a href="#proyectos" className="hover:text-indigo-400 transition-colors">Proyectos</a>
            <a href="#habilidades" className="hover:text-indigo-400 transition-colors">Habilidades</a>
            <a href="#contacto" className="hover:text-indigo-400 transition-colors">Contacto</a>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenAddModal}
              className="px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 rounded-xl transition-all shadow-md shadow-indigo-500/20 flex items-center gap-2 hover:shadow-lg hover:shadow-indigo-500/30 active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>Añadir Proyecto</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-1.5 border-t border-slate-800 bg-slate-950/95 backdrop-blur-xl">
          <a
            href="#inicio"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-900"
          >
            Inicio
          </a>
          <a
            href="#proyectos"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-900"
          >
            Proyectos
          </a>
          <a
            href="#habilidades"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-900"
          >
            Habilidades
          </a>
          <a
            href="#contacto"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-900"
          >
            Contacto
          </a>
        </div>
      )}
    </header>
  );
};
