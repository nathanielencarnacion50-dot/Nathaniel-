import React, { useState, useEffect, useRef } from 'react';
import { Project, DeviceMode, DeviceOrientation } from '../types/project';
import {
  Monitor,
  Tablet,
  Smartphone,
  RotateCw,
  RefreshCw,
  ExternalLink,
  X,
  Lock,
  Copy,
  Check,
  Code,
  Layers,
  Sparkles,
  Info,
  Maximize2,
  Trash2
} from 'lucide-react';

interface LivePreviewModalProps {
  project: Project | null;
  onClose: () => void;
  onDelete?: (id: string) => void;
}

export const LivePreviewModal: React.FC<LivePreviewModalProps> = ({ project, onClose, onDelete }) => {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
  const [orientation, setOrientation] = useState<DeviceOrientation>('portrait');
  const [activeTab, setActiveTab] = useState<'preview' | 'specs' | 'code'>('preview');
  const [iframeKey, setIframeKey] = useState(0);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isIframeLoading, setIsIframeLoading] = useState(true);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Reset state when project changes
  useEffect(() => {
    if (project) {
      setIframeKey((prev) => prev + 1);
      setIsIframeLoading(true);
      setActiveTab('preview');
    }
  }, [project]);

  if (!project) return null;

  const simulatedUrl = project.liveUrl || `https://devvision.app/preview/${project.id}`;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(simulatedUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleReload = () => {
    setIsIframeLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  // Dimensions based on device and orientation
  const getDeviceDimensions = () => {
    if (deviceMode === 'desktop') {
      return { width: '100%', height: '100%', maxWidth: '100%' };
    }
    if (deviceMode === 'tablet') {
      return orientation === 'portrait'
        ? { width: '768px', height: '100%', maxHeight: '920px' }
        : { width: '920px', height: '100%', maxHeight: '680px' };
    }
    // Mobile
    return orientation === 'portrait'
      ? { width: '380px', height: '100%', maxHeight: '760px' }
      : { width: '740px', height: '100%', maxHeight: '380px' };
  };

  const dimensions = getDeviceDimensions();

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col transition-all duration-300 animate-in fade-in">
      {/* Top Toolbar / Browser Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0">
        {/* Window dots & Title */}
        <div className="flex items-center space-x-3 min-w-[200px]">
          <div className="flex items-center space-x-1.5">
            <button
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-rose-500/90 hover:opacity-80 transition-opacity cursor-pointer"
              title="Cerrar modal (Esc)"
            />
            <span className="w-3 h-3 rounded-full bg-amber-500/90 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/90 inline-block" />
          </div>
          <span className="text-xs sm:text-sm font-semibold text-white truncate ml-2 font-mono flex items-center gap-1.5">
            <span>{project.title}</span>
            <span className="text-[10px] text-indigo-400 font-normal">[{project.category}]</span>
          </span>
        </div>

        {/* Simulated Address Bar */}
        <div className="hidden lg:flex items-center flex-1 max-w-xl mx-4 bg-slate-950 border border-slate-800/80 rounded-xl px-3 py-1.5 text-xs font-mono text-slate-300">
          <Lock className="w-3 h-3 text-emerald-400 mr-2 shrink-0" />
          <span className="truncate flex-1 select-all">{simulatedUrl}</span>
          <button
            onClick={handleCopyUrl}
            className="ml-2 text-slate-500 hover:text-slate-200 transition-colors p-0.5"
            title="Copiar URL"
          >
            {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={handleReload}
            className="ml-1 text-slate-500 hover:text-slate-200 transition-colors p-0.5"
            title="Recargar frame"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isIframeLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Device Switcher & Controls */}
        <div className="flex items-center space-x-2">
          {/* Mode Switcher Buttons */}
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1 text-xs">
            <button
              onClick={() => setDeviceMode('desktop')}
              className={`p-1.5 rounded-lg transition-all ${
                deviceMode === 'desktop'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Vista de escritorio (Full Width)"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeviceMode('tablet')}
              className={`p-1.5 rounded-lg transition-all ${
                deviceMode === 'tablet'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Vista tablet (768px)"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`p-1.5 rounded-lg transition-all ${
                deviceMode === 'mobile'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Vista móvil (380px)"
            >
              <Smartphone className="w-4 h-4" />
            </button>

            {deviceMode !== 'desktop' && (
              <button
                onClick={() => setOrientation(orientation === 'portrait' ? 'landscape' : 'portrait')}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-all ml-0.5 border-l border-slate-800"
                title={`Rotar a ${orientation === 'portrait' ? 'Horizontal (Landscape)' : 'Vertical (Portrait)'}`}
              >
                <RotateCw className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Tab Switcher (Preview vs Specs vs Code) */}
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1 text-xs">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                activeTab === 'preview'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Simulador
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                activeTab === 'specs'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Detalles
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                activeTab === 'code'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Código
            </button>
          </div>

          {/* External Link */}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-cyan-400 transition-colors"
              title="Abrir en ventana externa"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}

          {/* Delete Page button */}
          {onDelete && (
            <button
              onClick={() => onDelete(project.id)}
              className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:bg-rose-950/40 hover:border-rose-800/80 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
              title="Eliminar esta página web"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:bg-rose-950/40 hover:border-rose-800 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
            title="Cerrar modal (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-slate-950/70 p-4 sm:p-6 overflow-hidden flex items-center justify-center relative">
        {activeTab === 'preview' && (
          <div
            className="preview-iframe-wrapper flex items-center justify-center w-full h-full relative"
            style={{ maxWidth: '100%' }}
          >
            {/* Device Hardware Mockup Frame when on mobile or tablet */}
            {deviceMode !== 'desktop' ? (
              <div
                className="relative bg-slate-900 border-[10px] border-slate-800 rounded-[40px] shadow-2xl overflow-hidden flex flex-col"
                style={{
                  width: dimensions.width,
                  height: dimensions.height,
                  maxHeight: dimensions.maxHeight,
                }}
              >
                {/* Speaker & Camera notch / Dynamic island */}
                <div className="h-5 bg-slate-900 flex items-center justify-center shrink-0">
                  <div className="w-16 h-3 bg-slate-950 rounded-full flex items-center justify-center space-x-1.5">
                    <span className="w-1 h-1 rounded-full bg-slate-800"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
                  </div>
                </div>

                {/* Iframe Viewport */}
                <div className="flex-1 relative bg-slate-950 overflow-hidden">
                  {project.interactiveHtml ? (
                    <iframe
                      key={iframeKey}
                      srcDoc={project.interactiveHtml}
                      title={project.title}
                      sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
                      onLoad={() => setIsIframeLoading(false)}
                      className="w-full h-full border-0 bg-slate-950"
                    />
                  ) : (
                    <iframe
                      key={iframeKey}
                      src={project.liveUrl}
                      title={project.title}
                      onLoad={() => setIsIframeLoading(false)}
                      className="w-full h-full border-0 bg-slate-950"
                    />
                  )}
                </div>

                {/* Bottom Home Bar */}
                <div className="h-4 bg-slate-900 flex items-center justify-center shrink-0">
                  <div className="w-24 h-1 bg-slate-700 rounded-full"></div>
                </div>
              </div>
            ) : (
              /* Desktop Frame */
              <div className="w-full h-full max-w-7xl bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
                <div className="flex-1 relative bg-slate-950">
                  {project.interactiveHtml ? (
                    <iframe
                      key={iframeKey}
                      srcDoc={project.interactiveHtml}
                      title={project.title}
                      sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
                      onLoad={() => setIsIframeLoading(false)}
                      className="w-full h-full border-0 bg-slate-950"
                    />
                  ) : (
                    <iframe
                      key={iframeKey}
                      src={project.liveUrl}
                      title={project.title}
                      onLoad={() => setIsIframeLoading(false)}
                      className="w-full h-full border-0 bg-slate-950"
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Technical Specifications & Features */}
        {activeTab === 'specs' && (
          <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 overflow-y-auto max-h-[85vh] custom-scrollbar shadow-2xl">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                <p className="text-xs text-indigo-300 font-mono mt-0.5">{project.subtitle || project.category}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Descripción General</h4>
                <p className="text-sm text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                  {project.description}
                </p>
              </div>

              {/* Key Features */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                  Características Implementadas
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl text-xs text-slate-300 flex items-start gap-2.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">Stack & Librerías</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-indigo-950/40 border border-indigo-800/50 text-indigo-300 font-mono text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Performance Metrics */}
              {project.metrics && project.metrics.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">Métricas Clave</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {project.metrics.map((m, idx) => (
                      <div key={idx} className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl text-center">
                        <div className="text-base sm:text-lg font-bold font-mono text-emerald-400">{m.value}</div>
                        <div className="text-[11px] text-slate-400 mt-1">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Raw Code Inspector */}
        {activeTab === 'code' && (
          <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 overflow-hidden flex flex-col max-h-[85vh] shadow-2xl">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <Code className="w-4 h-4 text-indigo-400" />
                <span>index.html (Demo Sandbox Code)</span>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(project.interactiveHtml || '');
                  setCopiedCode(true);
                  setTimeout(() => setCopiedCode(false), 2000);
                }}
                className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? '¡Copiado!' : 'Copiar Código'}</span>
              </button>
            </div>

            <pre className="flex-1 bg-slate-950 border border-slate-800/80 rounded-xl p-4 overflow-auto font-mono text-xs text-indigo-200/90 custom-scrollbar leading-relaxed">
              <code>{project.interactiveHtml || '/* No interactive HTML code supplied */'}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
