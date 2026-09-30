import React from 'react';

interface SkillsSectionProps {
  onSelectSkillFilter: (skillName: string) => void;
  activeFilter: string;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ onSelectSkillFilter, activeFilter }) => {
  const skills = [
    { name: 'HTML5', desc: 'Semántico & SEO', iconClass: 'fa-brands fa-html5 text-orange-500' },
    { name: 'CSS3', desc: 'Animations & Flex', iconClass: 'fa-brands fa-css3-alt text-blue-500' },
    { name: 'JavaScript', desc: 'ES6+ / Async', iconClass: 'fa-brands fa-js text-yellow-400' },
    { name: 'Tailwind CSS', desc: 'Utility-First', iconClass: 'fa-solid fa-wind text-cyan-400' },
    { name: 'React.js', desc: 'Hooks & State', iconClass: 'fa-brands fa-react text-sky-400' },
    { name: 'Node.js', desc: 'Backend APIs', iconClass: 'fa-brands fa-node-js text-emerald-500' },
    { name: 'Git / GitHub', desc: 'Control de Versiones', iconClass: 'fa-brands fa-git-alt text-orange-600' },
    { name: 'Vue.js', desc: 'Components', iconClass: 'fa-brands fa-vuejs text-emerald-400' },
    { name: 'UI / UX Design', desc: 'Figma & Prototypes', iconClass: 'fa-solid fa-pen-nib text-purple-400' },
    { name: 'Responsive', desc: 'Mobile First', iconClass: 'fa-solid fa-mobile-screen text-indigo-400' },
    { name: 'REST APIs', desc: 'Integración Web', iconClass: 'fa-solid fa-network-wired text-cyan-400' },
    { name: 'Optimización', desc: 'Lighthouse & Speed', iconClass: 'fa-solid fa-gauge-high text-yellow-500' },
  ];

  return (
    <section id="habilidades" className="py-20 bg-slate-900/40 border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-indigo-400 text-xs font-bold uppercase tracking-widest font-mono">
            Stack Tecnológico
          </span>
          <h2 className="text-3xl font-extrabold text-white mt-1">Habilidades & Herramientas</h2>
          <p className="text-slate-400 text-sm mt-2">
            Tecnologías modernas que utilizo para crear sitios web rápidos, seguros y adaptables. Haz clic en cualquiera para filtrar proyectos.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
          {skills.map((s, idx) => {
            const isSelected = activeFilter.toLowerCase() === s.name.toLowerCase();
            return (
              <button
                key={idx}
                onClick={() => onSelectSkillFilter(s.name)}
                className={`p-4 rounded-xl border text-center transition-all flex flex-col items-center justify-center group cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-950/60 border-indigo-500 shadow-md shadow-indigo-500/20'
                    : 'bg-slate-950 border-slate-800/90 hover:border-slate-700 hover:bg-slate-900/50'
                }`}
              >
                <i className={`${s.iconClass} text-3xl mb-2 group-hover:scale-110 transition-transform`} />
                <h3 className="text-sm font-semibold text-slate-200">{s.name}</h3>
                <span className="text-[11px] text-slate-500 mt-0.5">{s.desc}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
