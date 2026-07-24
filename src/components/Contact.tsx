import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, User, Loader2, CheckCircle2, Github, Linkedin, AlertCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useReveal } from '@/hooks/useReveal';
import { GITHUB_URL, LINKEDIN_URL, EMAIL, PHONE_DISPLAY, PHONE } from '@/data/portfolio';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const GMAIL_LINK = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=Portfolio%20Contact&body=Hi%20Abd%20Elftah%2C`;

export default function Contact() {
  const { t } = useApp();
  const ref = useReveal<HTMLElement>();
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('message', form.message);
    formData.append('_subject', `New message from ${form.name} — Portfolio Website`);
    formData.append('_template', 'table');
    formData.append('_captcha', 'false');
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${EMAIL}`, { method: 'POST', headers: { Accept: 'application/json' }, body: formData });
      if (response.ok) { setStatus('sent'); setForm({ name: '', email: '', message: '' }); setTimeout(() => setStatus('idle'), 4000); }
      else { setStatus('error'); setTimeout(() => setStatus('idle'), 4000); }
    } catch { setStatus('error'); setTimeout(() => setStatus('idle'), 4000); }
  };

  const contactInfo = [
    { icon: Mail, label: t.contactInfo.email, value: EMAIL, href: GMAIL_LINK, external: true },
    { icon: Phone, label: t.contactInfo.phone, value: PHONE_DISPLAY, href: `tel:${PHONE}`, external: false },
    { icon: MapPin, label: t.contactInfo.location, value: t.hero.location, href: '#contact', external: false },
  ];

  return (
    <section id="contact" ref={ref} className="relative py-20 sm:py-24 md:py-32 overflow-hidden">
      <div className="absolute top-1/3 left-0 w-72 h-72 sm:w-96 sm:h-96 bg-primary-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-secondary-500/10 rounded-full blur-[120px]" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="reveal text-center mb-12 sm:mb-16">
          <span className="text-primary-600 dark:text-primary-400 font-bold text-xs sm:text-sm tracking-widest uppercase mb-3 block">{t.contact.label}</span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-ink-900 dark:text-white mb-4">{t.contact.title}</h2>
          <p className="text-ink-500 dark:text-ink-400 max-w-xl mx-auto text-sm sm:text-base">{t.contact.desc}</p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto mt-4" />
        </div>
        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8">
          <div className="reveal lg:col-span-2 space-y-3 sm:space-y-4">
            {contactInfo.map((info) => (
              <a key={info.label} href={info.href} target={info.external ? '_blank' : undefined} rel={info.external ? 'noopener noreferrer' : undefined} className="relative flex items-center gap-3 sm:gap-4 glass rounded-2xl p-4 sm:p-5 card-hover glow-border group">
                <div className="relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500/20 group-hover:scale-110 transition-all shrink-0"><info.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500 dark:text-primary-400" /></div>
                <div className="relative z-10 min-w-0"><div className="text-ink-400 dark:text-ink-500 text-xs mb-0.5">{info.label}</div><div className="text-ink-800 dark:text-white font-medium text-xs sm:text-sm truncate" dir="ltr">{info.value}</div></div>
              </a>
            ))}
            <div className="glass rounded-2xl p-4 sm:p-5">
              <p className="text-ink-400 dark:text-ink-500 text-xs mb-3">{t.contact.findMe}</p>
              <div className="flex gap-3">
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-ink-100 dark:bg-ink-800/60 flex items-center justify-center text-ink-500 dark:text-ink-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-primary-500/10 transition-all duration-300 hover:-translate-y-1 hover:scale-110"><Github className="w-5 h-5" /></a>
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-ink-100 dark:bg-ink-800/60 flex items-center justify-center text-ink-500 dark:text-ink-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-primary-500/10 transition-all duration-300 hover:-translate-y-1 hover:scale-110"><Linkedin className="w-5 h-5" /></a>
              </div>
            </div>
            <div className="glass rounded-2xl p-4 sm:p-5 flex items-center gap-3">
              <span className="relative flex w-3 h-3 shrink-0"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" /><span className="relative inline-flex rounded-full h-3 w-3 bg-primary-500" /></span>
              <div><div className="text-ink-800 dark:text-white font-medium text-xs sm:text-sm">{t.contact.availableNow}</div><div className="text-ink-400 dark:text-ink-500 text-xs">{t.contact.openTo}</div></div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="reveal lg:col-span-3 glass rounded-2xl p-5 sm:p-6 md:p-8 space-y-4 sm:space-y-5" style={{ transitionDelay: '0.15s' }}>
            <div>
              <label className="block text-ink-700 dark:text-ink-200 text-xs sm:text-sm font-medium mb-2">{t.contact.nameLabel}</label>
              <div className="relative">
                <User className="absolute start-3 sm:start-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-ink-400 dark:text-ink-500" />
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={t.contact.namePlaceholder} className="w-full bg-ink-100/60 dark:bg-ink-800/60 border border-ink-200 dark:border-white/5 rounded-xl py-3 sm:py-3.5 ps-10 sm:ps-12 pe-4 text-ink-900 dark:text-white text-sm placeholder:text-ink-400 dark:placeholder:text-ink-500 focus:outline-none focus:border-primary-500/50 focus:bg-white dark:focus:bg-ink-800 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300" />
              </div>
            </div>
            <div>
              <label className="block text-ink-700 dark:text-ink-200 text-xs sm:text-sm font-medium mb-2">{t.contact.emailLabel}</label>
              <div className="relative">
                <Mail className="absolute start-3 sm:start-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-ink-400 dark:text-ink-500" />
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder={t.contact.emailPlaceholder} className="w-full bg-ink-100/60 dark:bg-ink-800/60 border border-ink-200 dark:border-white/5 rounded-xl py-3 sm:py-3.5 ps-10 sm:ps-12 pe-4 text-ink-900 dark:text-white text-sm placeholder:text-ink-400 dark:placeholder:text-ink-500 focus:outline-none focus:border-primary-500/50 focus:bg-white dark:focus:bg-ink-800 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300" />
              </div>
            </div>
            <div>
              <label className="block text-ink-700 dark:text-ink-200 text-xs sm:text-sm font-medium mb-2">{t.contact.messageLabel}</label>
              <div className="relative">
                <MessageSquare className="absolute start-3 sm:start-4 top-4 w-4 h-4 sm:w-5 sm:h-5 text-ink-400 dark:text-ink-500" />
                <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder={t.contact.messagePlaceholder} className="w-full bg-ink-100/60 dark:bg-ink-800/60 border border-ink-200 dark:border-white/5 rounded-xl py-3 sm:py-3.5 ps-10 sm:ps-12 pe-4 text-ink-900 dark:text-white text-sm placeholder:text-ink-400 dark:placeholder:text-ink-500 focus:outline-none focus:border-primary-500/50 focus:bg-white dark:focus:bg-ink-800 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 resize-none" />
              </div>
            </div>
            {status === 'sent' && <div className="flex items-center gap-2 text-success-600 dark:text-success-400 text-sm bg-success-500/10 rounded-xl p-3 animate-scale-in"><CheckCircle2 className="w-5 h-5 shrink-0" />{t.contact.sent}</div>}
            {status === 'error' && <div className="flex items-center gap-2 text-error-600 dark:text-error-400 text-sm bg-error-500/10 rounded-xl p-3 animate-scale-in"><AlertCircle className="w-5 h-5 shrink-0" />{t.contact.error}</div>}
            <button type="submit" disabled={status === 'sending'} className="w-full py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base">
              {status === 'idle' && (<><Send className="w-5 h-5" />{t.contact.send}</>)}
              {status === 'sending' && (<><Loader2 className="w-5 h-5 animate-spin" />{t.contact.sending}</>)}
              {status === 'sent' && (<><CheckCircle2 className="w-5 h-5" />{t.contact.sent}</>)}
              {status === 'error' && (<><AlertCircle className="w-5 h-5" />{t.contact.error}</>)}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
