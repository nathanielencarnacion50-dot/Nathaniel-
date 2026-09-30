import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, Github, Linkedin, Twitter } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setSubmitted(false), 6000);
    }, 600);
  };

  return (
    <section id="contacto" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column */}
        <div>
          <span className="text-indigo-400 text-xs font-bold uppercase tracking-widest font-mono">
            Contacto Directo
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 mb-4">
            ¿Tienes un proyecto en mente?
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            Estoy disponible para trabajos independientes, colaboraciones en proyectos web o vacantes full-stack. ¡Construyamos algo extraordinario!
          </p>

          <div className="space-y-4 mb-8">
            <a
              href="mailto:desarrollador@ejemplo.com"
              className="flex items-center gap-4 p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all text-slate-300 hover:text-white group"
            >
              <div className="w-10 h-10 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-mono">Enviar correo</div>
                <div className="text-sm font-semibold">desarrollador@ejemplo.com</div>
              </div>
            </a>

            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-center text-slate-300 hover:text-white transition-all text-xs font-medium flex items-center justify-center gap-2"
              >
                <Github className="w-4 h-4" /> GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-center text-slate-300 hover:text-white transition-all text-xs font-medium flex items-center justify-center gap-2"
              >
                <Linkedin className="w-4 h-4 text-sky-400" /> LinkedIn
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-center text-slate-300 hover:text-white transition-all text-xs font-medium flex items-center justify-center gap-2"
              >
                <Twitter className="w-4 h-4 text-slate-300" /> Twitter / X
              </a>
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="bg-slate-900/80 border border-slate-800 p-6 sm:p-8 rounded-2xl glass-card">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Tu Nombre</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Carlos Pérez"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Correo Electrónico</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="carlos@ejemplo.com"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Mensaje o Detalle del Proyecto</label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Cuéntame sobre las características de la página o aplicación que necesitas..."
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600 custom-scrollbar resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? 'Enviando...' : 'Enviar Consulta'}</span>
            </button>
          </form>

          {submitted && (
            <div className="mt-4 p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/80 text-emerald-400 text-xs font-medium flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>¡Mensaje enviado con éxito! Te responderé a la brevedad.</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
