'use client'

import { useEffect, useRef } from 'react'
import { translations, type Language } from '@/lib/translations'
import { CheckCircle2, ArrowRight } from 'lucide-react'

interface ProgramsProps { lang: Language; onAdmission: () => void }

export default function ProgramsSection({ lang, onAdmission }: ProgramsProps) {
  const t = translations[lang]
  const sectionRef = useRef<HTMLElement>(null)
  const isRtl = t.dir === 'rtl'

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 120)
            })
          }
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="programs"
      ref={sectionRef}
      dir={t.dir as 'ltr' | 'rtl'}
      className="py-24 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className={`mb-16 reveal ${isRtl ? 'text-right' : ''}`}>
          <span className="inline-flex items-center gap-2 text-neutral-500 text-xs font-medium uppercase tracking-[0.2em] mb-4">
            <span className="w-8 h-px bg-neutral-300" />
            {t.programs.subtitle}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 text-balance max-w-2xl">
            {t.programs.title}
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {t.programs.levels.map((level, i) => (
            <div
              key={i}
              className="reveal group bg-white rounded-2xl border border-neutral-200 hover:border-neutral-900 transition-all duration-500 overflow-hidden"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Card header */}
              <div className="p-8 border-b border-neutral-100 group-hover:bg-neutral-900 group-hover:border-neutral-900 transition-colors duration-500">
                <div className="flex items-start justify-between mb-6">
                  <span className="text-6xl font-bold text-neutral-200 group-hover:text-white/20 transition-colors">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 group-hover:text-white transition-colors mb-2">
                  {level.name}
                </h3>
                <span className="inline-block px-3 py-1 rounded-full bg-neutral-100 group-hover:bg-white/20 text-neutral-600 group-hover:text-white/80 text-xs font-medium transition-colors">
                  {level.age}
                </span>
              </div>

              {/* Card body */}
              <div className="p-8">
                <p className="text-neutral-600 text-sm leading-relaxed mb-6">{level.desc}</p>
                <ul className="space-y-3 mb-8">
                  {level.features.map((feat, j) => (
                    <li key={j} className={`flex items-center gap-3 text-sm text-neutral-700 ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <CheckCircle2 size={14} className="text-neutral-400 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={onAdmission}
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border border-neutral-200 text-neutral-700 font-medium text-sm hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-300 group/btn`}
                >
                  {lang === 'fr' ? "S'inscrire" : lang === 'en' ? 'Enroll Now' : 'سجّل الآن'}
                  <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom banner */}
        <div className="mt-20 reveal">
          <div className="relative rounded-2xl overflow-hidden bg-neutral-900 p-10 md:p-16">
            <div className={`relative z-10 flex flex-col md:flex-row items-center gap-8 ${isRtl ? 'md:flex-row-reverse' : ''}`}>
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/api-attachments/0wLKEzeoSj1fBaWTCmzxk-Xo3BgxZAuot9E9QOmtrbqLfYstvByk.png"
                alt="Targa Junior Logo"
                className="h-20 w-auto object-contain"
              />
              <div className={`flex-1 text-center md:text-left ${isRtl ? 'md:text-right' : ''}`}>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {lang === 'fr' ? 'Ensemble pour un meilleur avenir'
                    : lang === 'en' ? 'Together for a better future'
                    : 'معاً نحو مستقبل أفضل'}
                </h3>
                <p className="text-white/60 text-sm">
                  {lang === 'fr' ? 'Rejoignez notre communauté scolaire'
                    : lang === 'en' ? 'Join our school community'
                    : 'انضم إلى مجتمعنا المدرسي'}
                </p>
              </div>
              <button
                onClick={onAdmission}
                className="flex items-center gap-2 px-8 py-4 rounded-full bg-white text-neutral-900 font-semibold text-sm hover:bg-neutral-100 transition-all group shrink-0"
              >
                {lang === 'fr' ? 'Demander une admission' : lang === 'en' ? 'Apply for Admission' : 'طلب القبول'}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 -translate-x-1/3 translate-y-1/3" />
          </div>
        </div>
      </div>
    </section>
  )
}
