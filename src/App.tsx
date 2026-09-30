import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Project } from './types/project';
import { DEFAULT_PROJECTS } from './data/defaultProjects';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectCard } from './components/ProjectCard';
import { LivePreviewModal } from './components/LivePreviewModal';
import { AddProjectModal } from './components/AddProjectModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { ResetConfirmModal } from './components/ResetConfirmModal';
import { SkillsSection } from './components/SkillsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Search, RotateCcw, FolderOpen, Star, Sparkles, Filter, X, Download, Check, LayoutGrid, List, Plus, CheckCircle2 } from 'lucide-react';

const STORAGE_KEY = 'devvision_projects_v2';
const VIEW_MODE_KEY = 'devvision_view_mode';

const gridContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const projectCardMotionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    y: 12,
    transition: {
      duration: 0.22,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function App() {
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading projects from storage', e);
    }
    return DEFAULT_PROJECTS;
  });

  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSkillFilter, setActiveSkillFilter] = useState<string>('');
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [viewMode, setViewMode] = useState<'grid' | 'list'>(() => {
    try {
      const saved = localStorage.getItem(VIEW_MODE_KEY);
      if (saved === 'grid' || saved === 'list') return saved;
    } catch (e) {
      console.error('Error loading view mode', e);
    }
    return 'grid';
  });

  // Sync viewMode to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(VIEW_MODE_KEY, viewMode);
    } catch (e) {
      console.error('Error saving view mode', e);
    }
  }, [viewMode]);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (e) {
      console.error('Error saving projects to storage', e);
    }
  }, [projects]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleExportJSON = () => {
    try {
      const dataStr = JSON.stringify(projects, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const dateStr = new Date().toISOString().slice(0, 10);
      link.href = url;
      link.download = `devvision-proyectos-${dateStr}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setDownloadSuccess(true);
      showToast('Respaldo JSON descargado con éxito.');
      setTimeout(() => setDownloadSuccess(false), 2500);
    } catch (err) {
      console.error('Error al exportar proyectos:', err);
      showToast('Hubo un error al exportar la lista de proyectos.');
    }
  };

  const categories = useMemo(() => {
    return ['Todos', 'E-Commerce', 'SaaS', 'Herramientas', 'Creative', 'Full Stack', 'Favoritos'];
  }, []);

  // Filter logic
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // Category match
      if (activeCategory === 'Favoritos' && !p.isFavorite) {
        return false;
      }
      if (activeCategory !== 'Todos' && activeCategory !== 'Favoritos' && p.category !== activeCategory) {
        return false;
      }

      // Skill filter match
      if (activeSkillFilter) {
        const matchesSkill =
          p.tags.some((t) => t.toLowerCase().includes(activeSkillFilter.toLowerCase())) ||
          p.title.toLowerCase().includes(activeSkillFilter.toLowerCase()) ||
          p.description.toLowerCase().includes(activeSkillFilter.toLowerCase());
        if (!matchesSkill) return false;
      }

      // Search query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesQuery =
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesQuery) return false;
      }

      return true;
    });
  }, [projects, activeCategory, activeSkillFilter, searchQuery]);

  const handleToggleFavorite = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p))
    );
  };

  const handleRequestDelete = (id: string) => {
    const target = projects.find((p) => p.id === id);
    if (target) {
      setProjectToDelete(target);
    }
  };

  const handleConfirmDelete = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    if (previewProject?.id === id) {
      setPreviewProject(null);
    }
    setProjectToDelete(null);
    showToast('Página web eliminada de la galería.');
  };

  const handleRequestReset = () => {
    setIsResetModalOpen(true);
  };

  const handleConfirmReset = () => {
    setProjects(DEFAULT_PROJECTS);
    localStorage.removeItem(STORAGE_KEY);
    setActiveCategory('Todos');
    setSearchQuery('');
    setActiveSkillFilter('');
    setIsResetModalOpen(false);
    showToast('Proyectos restablecidos a los valores iniciales.');
  };

  const handleSaveProject = (savedProject: Project) => {
    setProjects((prev) => {
      const existsIndex = prev.findIndex((p) => p.id === savedProject.id);
      if (existsIndex >= 0) {
        const updated = [...prev];
        updated[existsIndex] = savedProject;
        showToast(`«${savedProject.title}» actualizada correctamente.`);
        return updated;
      } else {
        showToast(`«${savedProject.title}» agregada a tu galería.`);
        return [savedProject, ...prev];
      }
    });
  };

  const handleSelectSkillFilter = (skillName: string) => {
    if (activeSkillFilter.toLowerCase() === skillName.toLowerCase()) {
      setActiveSkillFilter('');
    } else {
      setActiveSkillFilter(skillName);
      // Smooth scroll to projects
      const elem = document.getElementById('proyectos');
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const clearAllFilters = () => {
    setActiveCategory('Todos');
    setSearchQuery('');
    setActiveSkillFilter('');
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Navigation */}
      <Navbar
        onOpenAddModal={() => {
          setProjectToEdit(null);
          setIsAddModalOpen(true);
        }}
        projectsCount={projects.length}
      />

      {/* Hero Section */}
      <Hero projectsCount={projects.length} />

      {/* Projects Gallery Section */}
      <section id="proyectos" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1">
        {/* Section Header & Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Simulador Multidispositivo</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              Galería de Proyectos
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Filtra por tecnologías o busca proyectos específicos para interactuar con ellos en vivo.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por título o tag..."
                className="w-full pl-10 pr-8 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Add Web Page button */}
            <button
              onClick={() => {
                setProjectToEdit(null);
                setIsAddModalOpen(true);
              }}
              className="px-3.5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/30 flex items-center justify-center gap-1.5 cursor-pointer shrink-0 whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Agregar Página</span>
            </button>

            {/* Export JSON Backup Button */}
            <button
              onClick={handleExportJSON}
              title="Descargar lista actual de proyectos en formato JSON"
              className="px-3.5 py-2.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:border-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 shadow-sm"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">¡Descargado!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Exportar JSON</span>
                </>
              )}
            </button>

            {/* Reset to defaults button */}
            <button
              onClick={handleRequestReset}
              title="Restablecer páginas web iniciales"
              className="px-3.5 py-2.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restablecer</span>
            </button>
          </div>
        </div>

        {/* Active Skill Filter Banner (if selected) */}
        {activeSkillFilter && (
          <div className="mb-6 px-4 py-2.5 rounded-xl bg-indigo-950/40 border border-indigo-500/40 flex items-center justify-between text-xs text-indigo-300">
            <div className="flex items-center gap-2 font-mono">
              <Filter className="w-3.5 h-3.5 text-indigo-400" />
              <span>
                Filtrando por habilidad:{' '}
                <strong className="text-white font-bold">{activeSkillFilter}</strong>
              </span>
            </div>
            <button
              onClick={() => setActiveSkillFilter('')}
              className="text-xs text-indigo-400 hover:text-white underline cursor-pointer"
            >
              Quitar filtro
            </button>
          </div>
        )}

        {/* Category Controls and View Mode Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-8 border-b border-slate-800/60">
          {/* Category Segmented Controls (Zero-pill discipline: clean segmented buttons) */}
          <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  {cat === 'Favoritos' && <Star className="w-3 h-3 fill-current text-amber-400" />}
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>

          {/* View Mode Switcher (Grid vs List) */}
          <div className="flex items-center self-start sm:self-auto bg-slate-900/90 border border-slate-800 p-1 rounded-xl shrink-0">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'grid'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
              title="Vista de Cuadrícula"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="text-xs">Cuadrícula</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'list'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
              title="Vista de Lista"
            >
              <List className="w-3.5 h-3.5" />
              <span className="text-xs">Lista</span>
            </button>
          </div>
        </div>

        {/* Projects Display with Framer Motion Fade-In & Stagger */}
        {filteredProjects.length > 0 ? (
          <motion.div
            key={activeCategory + activeSkillFilter + viewMode}
            variants={gridContainerVariants}
            initial="hidden"
            animate="visible"
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                : 'flex flex-col gap-4'
            }
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  variants={projectCardMotionVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className={viewMode === 'grid' ? 'flex flex-col h-full' : 'w-full'}
                >
                  <ProjectCard
                    project={project}
                    viewMode={viewMode}
                    onPreview={(p) => setPreviewProject(p)}
                    onToggleFavorite={handleToggleFavorite}
                    onEdit={(p) => {
                      setProjectToEdit(p);
                      setIsAddModalOpen(true);
                    }}
                    onDelete={handleRequestDelete}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Empty State with Motion */
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-center py-20 bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl p-8 max-w-lg mx-auto"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-800/60 flex items-center justify-center text-slate-500">
              <FolderOpen className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-200">No hay páginas web para mostrar</h3>
            <p className="text-sm text-slate-500 mt-1">
              No se encontraron coincidencias o no hay páginas en esta categoría. Puedes agregar una nueva página web o restablecer los filtros.
            </p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  setProjectToEdit(null);
                  setIsAddModalOpen(true);
                }}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/30 flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Agregar Página Web</span>
              </button>
              <button
                onClick={clearAllFilters}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-all cursor-pointer"
              >
                Restablecer Filtros
              </button>
            </div>
          </motion.div>
        )}
      </section>

      {/* Skills & Stack Section */}
      <SkillsSection
        onSelectSkillFilter={handleSelectSkillFilter}
        activeFilter={activeSkillFilter}
      />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Live Interactive Preview Modal */}
      <LivePreviewModal
        project={previewProject}
        onClose={() => setPreviewProject(null)}
        onDelete={handleRequestDelete}
      />

      {/* Add / Edit Project Modal */}
      <AddProjectModal
        isOpen={isAddModalOpen}
        projectToEdit={projectToEdit}
        onClose={() => {
          setIsAddModalOpen(false);
          setProjectToEdit(null);
        }}
        onSave={handleSaveProject}
        onExportJSON={handleExportJSON}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        project={projectToDelete}
        isOpen={!!projectToDelete}
        onClose={() => setProjectToDelete(null)}
        onConfirm={handleConfirmDelete}
      />

      {/* Reset Confirmation Modal */}
      <ResetConfirmModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleConfirmReset}
      />

      {/* Floating In-App Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-indigo-500/40 text-slate-100 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-lg"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-xs font-semibold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
