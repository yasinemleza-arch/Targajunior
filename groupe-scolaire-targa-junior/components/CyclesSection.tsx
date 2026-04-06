'use client'

import { useEffect, useRef, useState } from 'react'
import { translations, type Language } from '@/lib/translations'
import { CheckCircle2, BookOpen, Sun, GraduationCap, Plus, ArrowRight } from 'lucide-react'

interface CyclesProps {
  lang: Language
  onAdmission: () => void
}

const iconComponents = {
  sun: Sun,
  book: BookOpen,
  graduation: GraduationCap,
}

export default function CyclesSection({ lang, onAdmission }: CyclesProps) {
  const t = translations[lang]
  const cycles = (t as any).cycles
  const [activeTab, setActiveTab] = useState(0)
  const [expandedObjectives, setExpandedObjectives] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => { setExpandedObjectives(false) }, [activeTab])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100)
            })
          }
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const cycle = cycles.items[activeTab]
  const Icon = iconComponents[cycle.icon as keyof typeof iconComponents]
  const isRtl = t.dir === 'rtl'

  return (
    <section
      id="cycles"
      ref={sectionRef}
      dir={t.dir as 'ltr' | 'rtl'}
      className="py-24 bg-neutral-50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className={`mb-16 reveal ${isRtl ? 'text-right' : ''}`}>
          <span className="inline-flex items-center gap-2 text-neutral-500 text-xs font-medium uppercase tracking-[0.2em] mb-4">
            <span className="w-8 h-px bg-neutral-300" />
            {cycles.subtitle}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 text-balance max-w-2xl mb-4">
            {cycles.title}
          </h2>
          <p className="text-neutral-500 max-w-xl text-base leading-relaxed">
            {cycles.intro}
          </p>
        </div>

        {/* Tabs */}
        <div className={`flex gap-2 mb-12 reveal overflow-x-auto pb-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
          {cycles.items.map((c: any, i: number) => {
            const TabIcon = iconComponents[c.icon as keyof typeof iconComponents]
            return (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 border ${
                  activeTab === i
                    ? 'bg-neutral-900 text-white border-neutral-900'
                    : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
                }`}
              >
                <TabIcon size={16} />
                <span>{c.name}</span>
              </button>
            )
          })}
        </div>

        {/* Active cycle content */}
        <div key={activeTab} className="animate-fadeInUp">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header card */}
              <div className="bg-white rounded-2xl p-8 border border-neutral-200">
                <div className={`flex items-start gap-6 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className="w-16 h-16 rounded-xl bg-neutral-900 flex items-center justify-center shrink-0">
                    <Icon size={28} className="text-white" />
                  </div>
                  <div className={`flex-1 ${isRtl ? 'text-right' : ''}`}>
                    <div className={`flex flex-wrap items-center gap-2 mb-2 ${isRtl ? 'justify-end' : ''}`}>
                      <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 text-xs font-medium">
                        {cycle.ageRange}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 text-xs font-medium">
                        {cycle.grades}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-900 mb-1">{cycle.name}</h3>
                    <p className="text-neutral-500 italic">&ldquo;{cycle.tagline}&rdquo;</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-2xl p-8 border border-neutral-200">
                <h4 className={`font-semibold text-neutral-900 mb-4 flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <span className="w-1 h-5 rounded-full bg-neutral-900" />
                  {lang === 'fr' ? 'Présentation' : lang === 'en' ? 'Overview' : 'نبذة'}
                </h4>
                <p className={`text-neutral-600 leading-relaxed ${isRtl ? 'text-right' : ''}`}>
                  {cycle.description}
                </p>
              </div>

              {/* Objectives */}
              <div className="bg-white rounded-2xl p-8 border border-neutral-200">
                <h4 className={`font-semibold text-neutral-900 mb-6 flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <span className="w-1 h-5 rounded-full bg-neutral-900" />
                  {lang === 'fr' ? 'Objectifs pédagogiques' : lang === 'en' ? 'Learning Objectives' : 'الأهداف التربوية'}
                </h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {cycle.objectives
                    .slice(0, expandedObjectives ? cycle.objectives.length : 4)
                    .map((obj: string, i: number) => (
                      <div
                        key={i}
                        className={`flex items-start gap-3 text-sm text-neutral-600 p-3 rounded-lg bg-neutral-50 ${isRtl ? 'flex-row-reverse text-right' : ''}`}
                      >
                        <CheckCircle2 size={16} className="text-neutral-400 mt-0.5 shrink-0" />
                        <span>{obj}</span>
                      </div>
                    ))}
                </div>
                {cycle.objectives.length > 4 && (
                  <button
                    onClick={() => setExpandedObjectives(!expandedObjectives)}
                    className={`mt-4 flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors ${isRtl ? 'flex-row-reverse mr-auto' : 'ml-auto'}`}
                  >
                    <Plus size={14} className={expandedObjectives ? 'rotate-45' : ''} />
                    {expandedObjectives
                      ? (lang === 'fr' ? 'Voir moins' : lang === 'en' ? 'See less' : 'عرض أقل')
                      : (lang === 'fr' ? 'Voir tout' : lang === 'en' ? 'See all' : 'عرض الكل')}
                  </button>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Subjects */}
              <div className="bg-white rounded-2xl p-6 border border-neutral-200">
                <h4 className={`font-semibold text-neutral-900 mb-4 text-sm ${isRtl ? 'text-right' : ''}`}>
                  {lang === 'fr' ? 'Matières enseignées' : lang === 'en' ? 'Subjects' : 'المواد الدراسية'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {cycle.subjects.map((subj: string, i: number) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-full bg-neutral-100 text-neutral-700 text-xs font-medium"
                    >
                      {subj}
                    </span>
                  ))}
                </div>
              </div>

              {/* Extras */}
              <div className="bg-white rounded-2xl p-6 border border-neutral-200">
                <h4 className={`font-semibold text-neutral-900 mb-4 text-sm ${isRtl ? 'text-right' : ''}`}>
                  {lang === 'fr' ? 'Activités & Services' : lang === 'en' ? 'Activities & Services' : 'الأنشطة والخدمات'}
                </h4>
                <div className="space-y-2">
                  {cycle.extras.map((extra: string, i: number) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 text-sm text-neutral-600 ${isRtl ? 'flex-row-reverse' : ''}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0" />
                      {extra}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-neutral-900 rounded-2xl p-6 text-white text-center">
                <p className="font-semibold mb-2">
                  {lang === 'fr' ? 'Intéressé(e) ?' : lang === 'en' ? 'Interested?' : 'مهتم؟'}
                </p>
                <p className="text-white/60 text-sm mb-4">
                  {lang === 'fr' ? 'Inscrivez votre enfant' : lang === 'en' ? 'Enroll your child' : 'سجّل طفلك'}
                </p>
                <button
                  onClick={onAdmission}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-neutral-900 font-semibold text-sm hover:bg-neutral-100 transition-all group"
                >
                  {lang === 'fr' ? 'Demander une admission' : lang === 'en' ? 'Apply Now' : 'طلب التسجيل'}
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Cycle dots */}
          <div className="flex justify-center gap-2 mt-10">
            {cycles.items.map((_: any, i: number) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`transition-all duration-300 rounded-full ${
                  activeTab === i
                    ? 'w-8 h-2 bg-neutral-900'
                    : 'w-2 h-2 bg-neutral-300 hover:bg-neutral-400'
                }`}
                aria-label={cycles.items[i].name}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
