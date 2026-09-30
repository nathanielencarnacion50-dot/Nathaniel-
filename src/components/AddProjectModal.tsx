import React, { useState, useEffect } from 'react';
import { Project } from '../types/project';
import { X, Plus, Sparkles, Globe, Download, Code2, Layout, AlertCircle } from 'lucide-react';

interface AddProjectModalProps {
  isOpen: boolean;
  projectToEdit?: Project | null;
  onClose: () => void;
  onSave: (project: Project) => void;
  onExportJSON?: () => void;
}

export const AddProjectModal: React.FC<AddProjectModalProps> = ({
  isOpen,
  projectToEdit,
  onClose,
  onSave,
  onExportJSON,
}) => {
  const [sourceType, setSourceType] = useState<'url' | 'template'>('url');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Project['category']>('Full Stack');
  const [tags, setTags] = useState('Web, HTML5, Responsive');
  const [githubUrl, setGithubUrl] = useState('https://github.com');
  const [liveUrl, setLiveUrl] = useState('https://');
  const [interactiveHtml, setInteractiveHtml] = useState('');
  const [features, setFeatures] = useState('Diseño responsivo multidispositivo\nNavegación fluida y adaptable\nRendimiento optimizado');
  const [errorMessage, setErrorMessage] = useState('');

  const defaultDemoHtml = `<!DOCTYPE html>
<html lang="es" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <style>body { font-family: system-ui, -apple-system, sans-serif; }</style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen p-6 flex flex-col items-center justify-center text-center">
  <div class="w-14 h-14 rounded-2xl bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center text-indigo-400 text-2xl mb-4">
    <i class="fa-solid fa-globe"></i>
  </div>
  <h1 class="text-2xl font-bold text-white mb-2">¡Página Web Lista!</h1>
  <p class="text-slate-400 text-sm max-w-md mb-4">Esta página interactiva corre dentro del simulador multidispositivo de DevVision.</p>
  <div id="demo-msg" class="text-xs font-mono text-emerald-400 mb-4 h-5"></div>
  <button onclick="document.getElementById('demo-msg').textContent = '¡Interacción probada con éxito a las ' + new Date().toLocaleTimeString() + '!'" class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-600/30 cursor-pointer">
    Probar Interacción
  </button>
</body>
</html>`;

  useEffect(() => {
    if (projectToEdit) {
      setTitle(projectToEdit.title);
      setSubtitle(projectToEdit.subtitle || '');
      setDescription(projectToEdit.description);
      setCategory(projectToEdit.category);
      setTags(projectToEdit.tags.join(', '));
      setGithubUrl(projectToEdit.githubUrl);
      setLiveUrl(projectToEdit.liveUrl || '');
      setInteractiveHtml(projectToEdit.interactiveHtml || '');
      setFeatures(projectToEdit.features.join('\n'));
      setSourceType(projectToEdit.interactiveHtml && !projectToEdit.liveUrl ? 'template' : 'url');
    } else {
      // Default clean values for adding a new web page
      setTitle('');
      setSubtitle('');
      setDescription('');
      setCategory('Full Stack');
      setTags('Web, HTML5, Responsive');
      setGithubUrl('https://github.com');
      setLiveUrl('https://');
      setFeatures('Diseño responsivo multidispositivo\nNavegación fluida y adaptable\nRendimiento optimizado');
      setInteractiveHtml(defaultDemoHtml);
      setSourceType('url');
    }
    setErrorMessage('');
  }, [projectToEdit, isOpen]);

  if (!isOpen) return null;

  // Auto-fill title from URL if user hasn't typed one
  const handleUrlChange = (val: string) => {
    setLiveUrl(val);
    if (!title.trim() && val.startsWith('http')) {
      try {
        const hostname = new URL(val).hostname.replace('www.', '');
        if (hostname) {
          const capitalized = hostname.charAt(0).toUpperCase() + hostname.slice(1);
          setTitle(capitalized);
          setDescription(`Página web interactiva cargada desde ${hostname}`);
        }
      } catch (e) {
        // invalid URL while typing, ignore
      }
    }
  };

  const loadPresetTemplate = (preset: 'landing' | 'ecommerce' | 'dashboard') => {
    setSourceType('template');
    if (preset === 'landing') {
      setTitle('Nexus Creative Landing');
      setCategory('Creative');
      setTags('Landing Page, Tailwind CSS, Modern UI');
      setDescription('Página de destino contemporánea con propuesta de valor, visual showcase y testimonios.');
      setInteractiveHtml(`<!DOCTYPE html>
<html lang="es" class="dark">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen p-6 flex flex-col justify-between">
  <header class="flex justify-between items-center border-b border-slate-800 pb-3">
    <div class="font-extrabold text-white text-base">Nexus<span class="text-indigo-400">.</span></div>
    <button class="px-3 py-1 bg-indigo-600 text-white rounded-lg text-xs font-bold">Comenzar</button>
  </header>
  <main class="my-auto py-10 text-center max-w-md mx-auto">
    <span class="px-2.5 py-1 bg-indigo-950/60 border border-indigo-800/60 rounded-full text-indigo-300 text-[10px] font-semibold">NUEVO LANZAMIENTO</span>
    <h1 class="text-2xl font-bold text-white mt-3">Diseño Web de Nueva Generación</h1>
    <p class="text-xs text-slate-400 mt-2">Plataforma aceleradora para creadores digitales con previsualización responsive en tiempo real.</p>
    <div class="mt-5 flex gap-2 justify-center">
      <button onclick="document.getElementById('cta-res').textContent = '¡Gracias por tu interés!'" class="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold">Explorar Demo</button>
    </div>
    <div id="cta-res" class="text-xs font-mono text-emerald-400 mt-3 h-4"></div>
  </main>
  <footer class="text-center text-[10px] text-slate-500 border-t border-slate-800 pt-3">© 2026 Nexus Studio</footer>
</body>
</html>`);
    } else if (preset === 'ecommerce') {
      setTitle('Aura Mini Store');
      setCategory('E-Commerce');
      setTags('Shop, Cart, Products');
      setDescription('Catálogo de comercio digital con selector de variantes y carrito interactivo.');
      setInteractiveHtml(`<!DOCTYPE html>
<html lang="es" class="dark">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen p-4 flex flex-col">
  <div class="flex justify-between items-center pb-3 border-b border-slate-800 mb-4">
    <span class="font-bold text-sm text-white">Aura Shop</span>
    <span class="text-xs bg-indigo-600 px-2 py-0.5 rounded text-white font-mono" id="c-count">0 items</span>
  </div>
  <div class="grid grid-cols-2 gap-3 flex-1">
    <div class="bg-slate-900 p-3 rounded-xl border border-slate-800 flex flex-col justify-between">
      <span class="text-xs font-bold text-white">Headphones X1</span>
      <span class="text-sm font-bold text-indigo-400 mt-2">$149.00</span>
      <button onclick="add(149)" class="mt-3 py-1.5 bg-slate-800 hover:bg-indigo-600 text-white rounded text-xs">Comprar</button>
    </div>
    <div class="bg-slate-900 p-3 rounded-xl border border-slate-800 flex flex-col justify-between">
      <span class="text-xs font-bold text-white">Smart Watch V2</span>
      <span class="text-sm font-bold text-indigo-400 mt-2">$199.00</span>
      <button onclick="add(199)" class="mt-3 py-1.5 bg-slate-800 hover:bg-indigo-600 text-white rounded text-xs">Comprar</button>
    </div>
  </div>
  <script>
    let c = 0;
    function add(p) { c++; document.getElementById('c-count').textContent = c + ' items'; }
  </script>
</body>
</html>`);
    } else if (preset === 'dashboard') {
      setTitle('MetricPulse Dashboard');
      setCategory('SaaS');
      setTags('Analytics, Metrics, Cloud');
      setDescription('Panel de administración para monitorización de rendimiento e incidentes.');
      setInteractiveHtml(`<!DOCTYPE html>
<html lang="es" class="dark">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen p-4 flex flex-col justify-between">
  <div class="flex justify-between items-center pb-2 border-b border-slate-800 mb-3">
    <span class="font-bold text-xs text-white">MetricPulse</span>
    <span class="text-[10px] text-emerald-400 font-mono">STATUS: OPERATIONAL</span>
  </div>
  <div class="grid grid-cols-3 gap-2 mb-3">
    <div class="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-center"><div class="text-[10px] text-slate-400">Req/sec</div><div class="font-bold text-white font-mono text-sm mt-1">1,240</div></div>
    <div class="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-center"><div class="text-[10px] text-slate-400">Latencia</div><div class="font-bold text-cyan-400 font-mono text-sm mt-1">21ms</div></div>
    <div class="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-center"><div class="text-[10px] text-slate-400">Uptime</div><div class="font-bold text-emerald-400 font-mono text-sm mt-1">99.9%</div></div>
  </div>
  <div class="flex-1 bg-slate-900 p-3 rounded-lg border border-slate-800 flex items-center justify-center text-xs text-slate-400">
    Monitor de servidores activo
  </div>
</body>
</html>`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setErrorMessage('Por favor completa el nombre y la descripción de la página web.');
      return;
    }

    const finalLiveUrl = sourceType === 'url' && liveUrl && liveUrl !== 'https://' ? liveUrl.trim() : undefined;
    const finalHtml = sourceType === 'template' || !finalLiveUrl ? interactiveHtml.trim() : undefined;

    const newProject: Project = {
      id: projectToEdit ? projectToEdit.id : `web-${Date.now()}`,
      title: title.trim(),
      subtitle: subtitle.trim() || undefined,
      description: description.trim(),
      category,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      image: projectToEdit?.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      githubUrl: githubUrl.trim() || 'https://github.com',
      liveUrl: finalLiveUrl,
      interactiveHtml: finalHtml,
      features: features.split('\n').map((f) => f.trim()).filter(Boolean),
      metrics: projectToEdit?.metrics || [
        { label: 'Tiempo de Carga', value: '0.45s' },
        { label: 'Puntuación', value: '98/100' },
      ],
      isFavorite: projectToEdit?.isFavorite || false,
    };

    onSave(newProject);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {projectToEdit ? 'Editar Página Web' : 'Agregar Nueva Página Web'}
              </h3>
              <p className="text-xs text-slate-400">
                Añade cualquier sitio o aplicación para previsualizarlo en el simulador.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Source Mode Toggle */}
        <div className="px-6 pt-4 pb-1">
          <div className="flex items-center p-1 bg-slate-950 border border-slate-800 rounded-xl">
            <button
              type="button"
              onClick={() => setSourceType('url')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                sourceType === 'url'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Por URL en Vivo</span>
            </button>
            <button
              type="button"
              onClick={() => setSourceType('template')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                sourceType === 'template'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Plantilla Interactiva o Código HTML</span>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/80 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* If URL mode */}
          {sourceType === 'url' ? (
            <div className="p-4 bg-slate-950 border border-indigo-500/30 rounded-xl space-y-2">
              <label className="block text-xs font-bold text-indigo-300">
                URL de la Página Web *
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="url"
                  required={sourceType === 'url'}
                  value={liveUrl}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  placeholder="https://ejemplo.com o tu web"
                  className="flex-1 px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <p className="text-[11px] text-slate-500">
                Esta URL se abrirá directamente en los marcos de escritorio, tablet y smartphone del simulador.
              </p>
            </div>
          ) : (
            /* Template presets */
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2.5">
              <span className="block text-xs font-semibold text-slate-300">
                Plantillas Rápidas Preconfiguradas
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => loadPresetTemplate('landing')}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs border border-slate-800 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Layout className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Landing Page</span>
                </button>
                <button
                  type="button"
                  onClick={() => loadPresetTemplate('ecommerce')}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs border border-slate-800 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Tienda Mini</span>
                </button>
                <button
                  type="button"
                  onClick={() => loadPresetTemplate('dashboard')}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs border border-slate-800 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Dashboard</span>
                </button>
              </div>
            </div>
          )}

          {/* Project metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Nombre / Título de la Página *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej. NovaShop o Mi Sitio Web"
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Subtítulo / Especialidad</label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Ej. Plataforma Web Moderna"
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Categoría</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Project['category'])}
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="Full Stack">Full Stack</option>
                <option value="E-Commerce">E-Commerce</option>
                <option value="SaaS">SaaS / Dashboard</option>
                <option value="Herramientas">Herramientas & Productividad</option>
                <option value="Creative">Creative / UI</option>
                <option value="Mobile">Mobile Web App</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Tecnologías (Separadas por comas)</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="React, Tailwind, Node, TypeScript"
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Descripción de la Página *</label>
            <textarea
              rows={2}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe las funciones principales o características de esta página web..."
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Repositorio GitHub (Opcional)</label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/..."
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Características (1 por línea)</label>
              <textarea
                rows={2}
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                placeholder="Característica 1&#10;Característica 2"
                className="w-full px-3.5 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>
          </div>

          {/* Interactive HTML (if template mode) */}
          {sourceType === 'template' && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Código HTML / JS de la Página Web
                </label>
                <span className="text-[10px] text-indigo-400 font-mono">Sandbox Seguro</span>
              </div>
              <textarea
                rows={5}
                value={interactiveHtml}
                onChange={(e) => setInteractiveHtml(e.target.value)}
                placeholder="<!DOCTYPE html><html><body>...</body></html>"
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-indigo-200/90 focus:outline-none focus:border-indigo-500 resize-none custom-scrollbar"
              />
            </div>
          )}

          {/* Footer Buttons */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
            {onExportJSON && (
              <button
                type="button"
                onClick={onExportJSON}
                className="px-3 py-2 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                title="Descargar todos los proyectos en archivo JSON"
              >
                <Download className="w-3.5 h-3.5 text-indigo-400" />
                <span className="hidden sm:inline">Respaldar en JSON</span>
                <span className="sm:hidden">JSON</span>
              </button>
            )}
            <div className="flex items-center gap-3 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-all cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 text-white rounded-xl text-xs font-semibold transition-all shadow-md shadow-indigo-600/30 flex items-center gap-2 cursor-pointer font-bold"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{projectToEdit ? 'Guardar Cambios' : 'Agregar Página'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
