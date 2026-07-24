import { useEffect } from 'react';
import { X, ArrowUpLeft, CheckCircle2, Sparkles, Eye } from 'lucide-react';
import type { Project } from '@/data/portfolio';
import { useApp } from '@/context/AppContext';

interface Props { project: Project | null; projectIndex: number; onClose: () => void; }

export default function ProjectModal({ project, projectIndex, onClose }: Props) {
  const { t } = useApp();
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
      window.addEventListener('keydown', onKey);
      return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
    }
  }, [project, onClose]);

  if (!project) return null;
  const content = t.projectContent[projectIndex];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">
      <div className="absolute inset-0 bg-ink-950/70 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="relative glass rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto animate-scale-in shadow-2xl">
        <button onClick={onClose} aria-label={t.projects.modal.close} className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-xl glass flex items-center justify-center text-ink-300 hover:text-primary-500 transition-colors"><X className="w-4 h-4 sm:w-5 sm:h-5" /></button>
        <div className="relative h-48 sm:h-64 md:h-72 overflow-hidden rounded-t-2xl sm:rounded-t-3xl">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/20 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block px-2.5 py-1 rounded-full bg-primary-500 text-white text-xs font-bold">{t.projectCategories[project.category] ?? project.category}</span>
              {project.featured && <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-500 text-white text-xs font-bold"><Sparkles className="w-3 h-3" />{t.projects.featured}</span>}
            </div>
            <h2 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-white">{project.title}</h2>
          </div>
        </div>
        <div className="p-5 sm:p-6 md:p-8 space-y-6 sm:space-y-7">
          <div><h3 className="font-display font-bold text-base sm:text-lg text-ink-800 dark:text-ink-100 mb-2 sm:mb-3 flex items-center gap-2"><span className="w-1 h-5 rounded-full bg-primary-500" />{t.projects.modal.overview}</h3><div className="space-y-2 sm:space-y-3">{content.overview.map((para, i) => <p key={i} className="text-ink-600 dark:text-ink-300 leading-relaxed text-xs sm:text-sm">{para}</p>)}</div></div>
          <div><h3 className="font-display font-bold text-base sm:text-lg text-ink-800 dark:text-ink-100 mb-2 sm:mb-3 flex items-center gap-2"><span className="w-1 h-5 rounded-full bg-secondary-500" />{t.projects.modal.features}</h3><div className="grid sm:grid-cols-2 gap-2 sm:gap-2.5">{content.features.map((feature, i) => <div key={i} className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary-500 dark:text-primary-400 shrink-0 mt-0.5" /><span className="text-ink-600 dark:text-ink-300 text-xs sm:text-sm">{feature}</span></div>)}</div></div>
          <div><h3 className="font-display font-bold text-base sm:text-lg text-ink-800 dark:text-ink-100 mb-2 sm:mb-3 flex items-center gap-2"><span className="w-1 h-5 rounded-full bg-primary-500" />{t.projects.modal.keyHighlights}</h3><div className="flex flex-wrap gap-2">{content.highlights.map((h, i) => <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 rounded-lg bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-medium"><Sparkles className="w-3 h-3" />{h}</span>)}</div></div>
          <div><h3 className="font-display font-bold text-base sm:text-lg text-ink-800 dark:text-ink-100 mb-2 sm:mb-3 flex items-center gap-2"><span className="w-1 h-5 rounded-full bg-secondary-500" />{t.projects.modal.technologies}</h3><div className="flex flex-wrap gap-2">{project.tags.map((tag) => <span key={tag} className="px-2.5 py-1.5 sm:px-3 rounded-lg bg-ink-100 dark:bg-ink-800/60 text-ink-600 dark:text-ink-300 text-xs font-mono">{tag}</span>)}</div></div>
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="w-full inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300 hover:scale-[1.02] text-sm sm:text-base"><Eye className="w-5 h-5" />{t.projects.modal.liveDemo}<ArrowUpLeft className="w-4 h-4" /></a>
        </div>
      </div>
    </div>
  );
}
