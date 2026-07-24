import { useState } from 'react';
import { ExternalLink, ArrowUpLeft, Eye } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useReveal } from '@/hooks/useReveal';
import { projects, GITHUB_URL, type Project } from '@/data/portfolio';
import ProjectModal from '@/components/ProjectModal';

export default function Projects() {
  const { t } = useApp();
  const ref = useReveal<HTMLElement>();
  const [active, setActive] = useState('All');
  const [selected, setSelected] = useState<Project | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];
  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active);
  const openProject = (project: Project) => {
    const idx = projects.findIndex((p) => p.title === project.title);
    setSelected(project);
    setSelectedIndex(idx >= 0 ? idx : 0);
  };

  return (
    <section id="projects" ref={ref} className="relative py-20 sm:py-24 md:py-32 overflow-hidden">
      <div className="absolute top-1/4 left-0 w-72 h-72 sm:w-96 sm:h-96 bg-primary-500/5 rounded-full blur-[120px]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="reveal text-center mb-10 sm:mb-12">
          <span className="text-primary-600 dark:text-primary-400 font-bold text-xs sm:text-sm tracking-widest uppercase mb-3 block">{t.projects.label}</span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-ink-900 dark:text-white mb-4">{t.projects.title}</h2>
          <p className="text-ink-500 dark:text-ink-400 max-w-xl mx-auto text-sm sm:text-base">{t.projects.desc}</p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto mt-4" />
        </div>
        <div className="reveal flex flex-wrap justify-center gap-2 mb-10 sm:mb-12">
          {categories.map((cat) => (<button key={cat} onClick={() => setActive(cat)} className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${active === cat ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg shadow-primary-500/20' : 'glass text-ink-500 dark:text-ink-300 hover:text-ink-900 dark:hover:text-white hover:border-primary-500/30'}`}>{cat === 'All' ? t.projects.all : (t.projectCategories[cat] ?? cat)}</button>))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filtered.map((project, i) => (
            <article key={project.title} className="reveal group relative glass rounded-2xl overflow-hidden card-hover glow-border flex flex-col cursor-pointer" style={{ transitionDelay: `${(i % 3) * 0.1}s` }} onClick={() => openProject(project)}>
              <div className="relative h-44 sm:h-52 overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2.5 py-1 rounded-full glass text-xs text-ink-800 dark:text-white font-medium">{t.projectCategories[project.category] ?? project.category}</div>
                {project.featured && <div className="absolute top-3 left-3 sm:top-4 sm:left-4 px-2.5 py-1 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-xs text-white font-bold">{t.projects.featured}</div>}
                <div className="absolute inset-0 bg-ink-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"><span className="px-3 sm:px-4 py-2 rounded-xl glass text-white text-xs sm:text-sm font-bold flex items-center gap-2"><Eye className="w-4 h-4" />{t.projects.viewProject}</span></div>
              </div>
              <div className="p-4 sm:p-6 flex flex-col flex-1">
                <h3 className="font-display font-bold text-base sm:text-lg text-ink-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{project.title}</h3>
                <p className="text-ink-500 dark:text-ink-400 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">{project.tags.map((tag) => <span key={tag} className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-ink-100 dark:bg-ink-800/60 text-ink-500 dark:text-ink-300 text-xs font-mono">{tag}</span>)}</div>
                <button onClick={(e) => { e.stopPropagation(); openProject(project); }} className="inline-flex items-center gap-1.5 text-primary-600 dark:text-primary-400 text-xs sm:text-sm font-bold hover:gap-3 transition-all duration-300">{t.projects.viewProject}<ArrowUpLeft className="w-4 h-4" /></button>
              </div>
            </article>
          ))}
        </div>
        <div className="reveal text-center mt-12 sm:mt-14">
          <p className="text-ink-500 dark:text-ink-400 text-xs sm:text-sm mb-4">{t.projects.githubDesc}</p>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl glass text-ink-800 dark:text-white font-bold hover:bg-white/90 dark:hover:bg-white/10 transition-all duration-300 hover:scale-105 text-sm sm:text-base">{t.projects.githubCta}<ExternalLink className="w-4 h-4" /></a>
        </div>
      </div>
      <ProjectModal project={selected} projectIndex={selectedIndex} onClose={() => setSelected(null)} />
    </section>
  );
}
