import React, { useState } from 'react';
import { Project } from '../types/project';
import { Play, Github, ExternalLink, Star, MoreVertical, Trash2, Edit3, Sparkles } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  viewMode?: 'grid' | 'list';
  onPreview: (project: Project) => void;
  onToggleFavorite: (id: string) => void;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  viewMode = 'grid',
  onPreview,
  onToggleFavorite,
  onEdit,
  onDelete,
}) => {
  const [imageError, setImageError] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isList = viewMode === 'list';

  return (
    <article
      className={`group relative bg-slate-900/60 border border-slate-800/90 rounded-2xl overflow-hidden hover:border-slate-700 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 ${
        isList
          ? 'flex flex-col md:flex-row items-stretch'
          : 'flex flex-col justify-between h-full'
      }`}
    >
      {/* Thumbnail Preview Area */}
      <div
        className={`relative bg-slate-950 overflow-hidden shrink-0 ${
          isList
            ? 'w-full md:w-72 lg:w-80 h-52 md:h-auto border-b md:border-b-0 md:border-r border-slate-800/80'
            : 'aspect-[16/10] border-b border-slate-800/80'
        }`}
      >
        {!imageError ? (
          <img
            src={project.image}
            alt={project.title}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-indigo-950/40 p-4 text-center">
            <Sparkles className="w-8 h-8 text-indigo-400 mb-2 opacity-60" />
            <span className="text-sm font-semibold text-slate-300">{project.title}</span>
            <span className="text-xs text-slate-500 font-mono mt-1">{project.category}</span>
          </div>
        )}

        {/* Quick Overlay Action on Hover */}
        <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button
            onClick={() => onPreview(project)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/40 transition-transform active:scale-95 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Abrir Simulador Live</span>
          </button>
        </div>

        {/* Top-Right Favorite & Options on mobile/grid */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10 md:hidden">
          <button
            onClick={() => onToggleFavorite(project.id)}
            className={`p-1.5 rounded-lg backdrop-blur-md transition-colors ${
              project.isFavorite
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
            title={project.isFavorite ? 'Quitar de favoritos' : 'Marcar como favorito'}
          >
            <Star className={`w-3.5 h-3.5 ${project.isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(project.id);
            }}
            className="p-1.5 rounded-lg bg-slate-900/80 text-slate-400 hover:text-rose-400 hover:bg-rose-950/50 border border-slate-800 backdrop-blur-md transition-colors cursor-pointer"
            title="Eliminar página web"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {!isList && (
          <div className="hidden md:flex absolute top-3 right-3 items-center gap-1.5 z-10">
            <button
              onClick={() => onToggleFavorite(project.id)}
              className={`p-1.5 rounded-lg backdrop-blur-md transition-colors ${
                project.isFavorite
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
              title={project.isFavorite ? 'Quitar de favoritos' : 'Marcar como favorito'}
            >
              <Star className={`w-3.5 h-3.5 ${project.isFavorite ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(project.id);
              }}
              className="p-1.5 rounded-lg bg-slate-900/80 text-slate-400 hover:text-rose-400 hover:bg-rose-950/50 border border-slate-800 backdrop-blur-md transition-colors cursor-pointer"
              title="Eliminar página web"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>

            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-1.5 rounded-lg bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 backdrop-blur-md transition-colors"
                title="Más opciones"
              >
                <MoreVertical className="w-3.5 h-3.5" />
              </button>

              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-20" onClick={() => setMenuOpen(false)} />
                  <div className="absolute right-0 mt-1 w-36 bg-slate-900 border border-slate-800 rounded-xl shadow-xl py-1 z-30 text-xs">
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        onEdit(project);
                      }}
                      className="w-full px-3 py-1.5 text-left text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-2"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Editar</span>
                    </button>
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        onDelete(project.id);
                      }}
                      className="w-full px-3 py-1.5 text-left text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 flex items-center gap-2"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Eliminar</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Content & Actions Container */}
      <div className={`flex-1 flex flex-col justify-between ${isList ? 'p-5 sm:p-6' : 'p-5'}`}>
        <div>
          {/* Header row in list mode */}
          <div className="flex items-start justify-between gap-4 mb-2">
            {/* Zero-Pill Metadata line with subtle typographic separator */}
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span className="text-indigo-400 font-semibold">{project.category}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>{project.tags.slice(0, 4).join(' / ')}</span>
            </div>

            {/* List Mode Favorite & Menu on Desktop */}
            {isList && (
              <div className="hidden md:flex items-center gap-1.5">
                <button
                  onClick={() => onToggleFavorite(project.id)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    project.isFavorite
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                  title={project.isFavorite ? 'Quitar de favoritos' : 'Marcar como favorito'}
                >
                  <Star className={`w-3.5 h-3.5 ${project.isFavorite ? 'fill-current' : ''}`} />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(project.id);
                  }}
                  className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-rose-400 hover:bg-rose-950/50 border border-slate-800 transition-colors cursor-pointer"
                  title="Eliminar página web"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                <div className="relative">
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                    title="Más opciones"
                  >
                    <MoreVertical className="w-3.5 h-3.5" />
                  </button>

                  {menuOpen && (
                    <>
                      <div className="fixed inset-0 z-20" onClick={() => setMenuOpen(false)} />
                      <div className="absolute right-0 mt-1 w-36 bg-slate-900 border border-slate-800 rounded-xl shadow-xl py-1 z-30 text-xs">
                        <button
                          onClick={() => {
                            setMenuOpen(false);
                            onEdit(project);
                          }}
                          className="w-full px-3 py-1.5 text-left text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-2"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-indigo-400" />
                          <span>Editar</span>
                        </button>
                        <button
                          onClick={() => {
                            setMenuOpen(false);
                            onDelete(project.id);
                          }}
                          className="w-full px-3 py-1.5 text-left text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 flex items-center gap-2"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Eliminar</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-indigo-300 transition-colors">
            {project.title}
          </h3>

          <p className="text-sm text-slate-400 mt-2 leading-relaxed">
            {project.description}
          </p>

          {/* Features highlight in list mode */}
          {isList && project.features && project.features.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
              {project.features.slice(0, 2).map((feat, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          )}

          {/* Quick Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="mt-3.5 pt-3 border-t border-slate-800/60 flex items-center gap-6 text-xs font-mono">
              {project.metrics.slice(0, isList ? 3 : 1).map((m, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-slate-500">{m.label}:</span>
                  <span className="text-emerald-400 font-bold tabular-nums">{m.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Card Footer Actions */}
        <div className={`pt-4 flex items-center justify-between gap-3 ${!isList ? 'border-t border-slate-800/40 mt-3' : 'mt-4'}`}>
          <button
            onClick={() => onPreview(project)}
            className="flex-1 md:flex-initial py-2 px-4 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 hover:border-transparent rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>Vista Previa Live</span>
          </button>

          <div className="flex items-center gap-1.5">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-all text-xs"
              title="Ver código fuente en GitHub"
            >
              <Github className="w-3.5 h-3.5" />
            </a>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-cyan-400 transition-all text-xs"
                title="Abrir URL externa"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

