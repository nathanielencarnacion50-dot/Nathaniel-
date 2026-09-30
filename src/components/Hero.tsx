import React from 'react';
import { Rocket, Mail, Smartphone, Zap, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  projectsCount: number;
}

export const Hero: React.FC<HeroProps> = ({ projectsCount }) => {
  return (
    <section id="inicio" className="relative py-16 md:py-28 overflow-hidden border-b border-slate-800/60">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-indigo-600/15 rounded-full blur-[140px] -z-10 pointer-events-none animate-glow" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Desarrollador Web Full Stack & Diseñador UI/UX</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight max-w-4xl mx-auto" style={{ textWrap: 'balance' }}>
          Construyendo Aplicaciones Web{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-sky-300 to-cyan-400">
            Interactivas y de Alto Rendimiento
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-400 mb-8 leading-relaxed">
          Explora mis creaciones web más recientes. Puedes previsualizarlas e interactuar con ellas en tiempo real directamente desde este portafolio con simulación multidispositivo.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-wrap justify-center items-center gap-3.5 mb-14">
          <a
            href="#proyectos"
            className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 transition-all shadow-lg shadow-indigo-500/25 flex items-center gap-2 hover:-translate-y-0.5"
          >
            <Rocket className="w-4 h-4" />
            <span>Explorar Proyectos</span>
          </a>
          <a
            href="#contacto"
            className="px-6 py-3 rounded-xl font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 transition-all flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            <span>Contactar</span>
          </a>
        </div>

        {/* Feature Counters Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto p-5 rounded-2xl glass-card border border-slate-800/80">
          <div className="text-center p-2">
            <div className="text-3xl font-extrabold text-white mb-0.5 font-mono tabular-nums">
              {projectsCount}
            </div>
            <div className="text-xs text-slate-400 font-medium">Proyectos Activos</div>
          </div>

          <div className="text-center p-2">
            <div className="text-3xl font-extrabold text-cyan-400 mb-0.5 font-mono flex items-center justify-center gap-1">
              <span>100%</span>
            </div>
            <div className="text-xs text-slate-400 font-medium">Interactive Preview</div>
          </div>

          <div className="text-center p-2">
            <div className="text-3xl font-extrabold text-indigo-400 mb-0.5 font-mono flex items-center justify-center gap-1">
              <Smartphone className="w-6 h-6 inline-block" />
              <span>Multi</span>
            </div>
            <div className="text-xs text-slate-400 font-medium">Diseño Adaptable</div>
          </div>

          <div className="text-center p-2">
            <div className="text-3xl font-extrabold text-emerald-400 mb-0.5 font-mono flex items-center justify-center gap-1">
              <Zap className="w-6 h-6 inline-block" />
              <span>&lt;0.5s</span>
            </div>
            <div className="text-xs text-slate-400 font-medium">Carga Optimizada</div>
          </div>
        </div>
      </div>
    </section>
  );
};
