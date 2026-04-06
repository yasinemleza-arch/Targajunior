'use client'

import { useEffect, useRef, useState } from 'react'
import { translations, type Language } from '@/lib/translations'
import { CheckCircle2, BookOpen, Sun, GraduationCap, ChevronDown, ChevronUp } from 'lucide-react'

interface CyclesProps {
  lang: Language
  onAdmission: () => void
}

const iconComponents = {
  sun: Sun,
  book: BookOpen,
  graduation: GraduationCap,
}

const cycleThemes = [
  {
    gradient: 'from-amber-400 via-yellow-400 to-orange-400',
    softGradient: 'from-amber-50 to-yellow-50',
    accentBg: 'bg-amber-500',
    accentText: 'text-amber-600',
    accentBorder: 'border-amber-300',
    tagBg: 'bg-amber-100',
    tagText: 'text-amber-700',
    checkColor: 'text-amber-500',
    pillBg: 'bg-amber-500',
    ringColor: 'ring-amber-300',
    hoverBorder: 'hover:border-amber-400',
    tabActive: 'bg-amber-500 text-white shadow-md shadow-amber-200',
    tabInactive: 'text-amber-600 hover:bg-amber-50',
  },
  {
    gradient: 'from-blue-500 via-blue-600 to-indigo-600',
    softGradient: 'from-blue-50 to-indigo-50',
    accentBg: 'bg-blue-600',
    accentText: 'text-blue-600',
    accentBorder: 'border-blue-300',
    tagBg: 'bg-blue-100',
    tagText: 'text-blue-700',
    checkColor: 'text-blue-500',
    pillBg: 'bg-blue-600',
    ringColor: 'ring-blue-300',
    hoverBorder: 'hover:border-blue-400',
    tabActive: 'bg-blue-600 text-white shadow-md shadow-blue-200',
    tabInactive: 'text-blue-600 hover:bg-blue-50',
  },
  {
    gradient: 'from-[#d4622a] via-[#c05520] to-[#a8441a]',
    softGradient: 'from-orange-50 to-amber-50',
    accentBg: 'bg-[#d4622a]',
    accentText: 'text-[#d4622a]',
    accentBorder: 'border-orange-300',
    tagBg: 'bg-orange-100',
    tagText: 'text-orange-700',
    checkColor: 'text-[#d4622a]',
    pillBg: 'bg-[#d4622a]',
    ringColor: 'ring-orange-300',
    hoverBorder: 'hover:border-orange-400',
    tabActive: 'bg-[#d4622a] text-white shadow-md shadow-orange-200',
    tabInactive: 'text-[#d4622a] hover:bg-orange-50',
  },
]

export default function CyclesSection({ lang, onAdmission }: CyclesProps) {
  const t = translations[lang]
  const cycles = (t as any).cycles
  const [activeTab, setActiveTab] = useState(0)
  const [expandedObjectives, setExpandedObjectives] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Reset expansion when tab changes
  useEffect(() => { setExpandedObjectives(false) }, [activeTab])

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

  const cycle = cycles.items[activeTab]
  const theme = cycleThemes[activeTab]
  const Icon = iconComponents[cycle.icon as keyof typeof iconComponents]

  const isRtl = t.dir === 'rtl'

  return (
    <section
      id="cycles"
      ref={sectionRef}
      dir={t.dir as 'ltr' | 'rtl'}
      className="py-20 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Section header */}
        <div className="text-center mb-12 reveal">
          <span className="inline-block px-4 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-widest mb-3">
            {cycles.subtitle}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 text-balance mb-4">
            {cycles.title}
          </h2>
          <div className="mx-auto w-16 h-1.5 rounded-full bg-gradient-to-r from-amber-400 via-blue-500 to-red-500 mb-5" />
          <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            {cycles.intro}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-3 mb-10 reveal flex-wrap">
          {cycles.items.map((c: any, i: number) => {
            const th = cycleThemes[i]
            const TabIcon = iconComponents[c.icon as keyof typeof iconComponents]
            return (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all duration-300 border-2 ${
                  activeTab === i
                    ? `${th.tabActive} border-transparent scale-105`
                    : `bg-white ${th.tabInactive} border-gray-100 hover:border-current`
                }`}
              >
                <TabIcon size={16} />
                <span>{c.name}</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  activeTab === i ? 'bg-white/25' : `${th.tagBg} ${th.tagText}`
                }`}>
                  {c.ageRange}
                </span>
              </button>
            )
          })}
        </div>

        {/* Active cycle content */}
        <div key={activeTab} className="animate-hero-in">
          {/* Top banner */}
          <div className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${theme.gradient} p-8 md:p-12 text-white mb-8 shadow-xl`}>
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/10 -translate-x-1/3 translate-y-1/3 pointer-events-none" />

            <div className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 ${isRtl ? 'md:flex-row-reverse' : ''}`}>
              {/* Icon badge */}
              <div className="shrink-0 w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center ring-2 ring-white/30 shadow-lg">
                <Icon size={40} className="text-white" />
              </div>

              <div className={`flex-1 ${isRtl ? 'text-right' : 'text-left'}`}>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30">
                    {cycle.ageRange}
                  </span>
                  <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/30">
                    {cycle.grades}
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-extrabold mb-1">{cycle.name}</h3>
                <p className="text-white/80 text-base md:text-lg italic">"{cycle.tagline}"</p>
              </div>

              <button
                onClick={onAdmission}
                className="shrink-0 px-6 py-3 rounded-2xl bg-white text-gray-900 font-extrabold text-sm hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
              >
                {lang === 'fr' ? "S'inscrire" : lang === 'en' ? 'Enroll Now' : 'سجّل الآن'}
              </button>
            </div>
          </div>

          {/* Details grid */}
          <div className="grid lg:grid-cols-3 gap-6">

            {/* Description + Objectives */}
            <div className="lg:col-span-2 space-y-6">

              {/* Description */}
              <div className={`bg-gradient-to-br ${theme.softGradient} rounded-2xl p-6 border ${theme.accentBorder}`}>
                <h4 className={`font-extrabold text-gray-900 text-lg mb-3 flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <span className={`w-1.5 h-6 rounded-full ${theme.accentBg}`} />
                  {lang === 'fr' ? 'Présentation' : lang === 'en' ? 'Overview' : 'نبذة'}
                </h4>
                <p className={`text-gray-700 text-sm md:text-base leading-relaxed ${isRtl ? 'text-right' : 'text-left'}`}>
                  {cycle.description}
                </p>
              </div>

              {/* Objectives */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h4 className={`font-extrabold text-gray-900 text-lg mb-4 flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <span className={`w-1.5 h-6 rounded-full ${theme.accentBg}`} />
                  {lang === 'fr' ? 'Objectifs pédagogiques' : lang === 'en' ? 'Learning Objectives' : 'الأهداف التربوية'}
                </h4>
                <div className="space-y-2">
                  {cycle.objectives
                    .slice(0, expandedObjectives ? cycle.objectives.length : 4)
                    .map((obj: string, i: number) => (
                      <div
                        key={i}
                        className={`flex items-start gap-3 text-sm text-gray-700 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}
                      >
                        <CheckCircle2 size={16} className={`${theme.checkColor} mt-0.5 shrink-0`} />
                        <span>{obj}</span>
                      </div>
                    ))}
                </div>
                {cycle.objectives.length > 4 && (
                  <button
                    onClick={() => setExpandedObjectives(!expandedObjectives)}
                    className={`mt-3 flex items-center gap-1 text-xs font-bold ${theme.accentText} hover:underline ${isRtl ? 'flex-row-reverse' : ''}`}
                  >
                    {expandedObjectives
                      ? (lang === 'fr' ? 'Voir moins' : lang === 'en' ? 'See less' : 'عرض أقل')
                      : (lang === 'fr' ? 'Voir tout' : lang === 'en' ? 'See all' : 'عرض الكل')}
                    {expandedObjectives ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                )}
              </div>
            </div>

            {/* Subjects + Extras */}
            <div className="space-y-6">

              {/* Subjects */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h4 className={`font-extrabold text-gray-900 text-base mb-4 flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <span className={`w-1.5 h-5 rounded-full ${theme.accentBg}`} />
                  {lang === 'fr' ? 'Matières enseignées' : lang === 'en' ? 'Subjects' : 'المواد الدراسية'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {cycle.subjects.map((subj: string, i: number) => (
                    <span
                      key={i}
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${theme.tagBg} ${theme.tagText}`}
                    >
                      {subj}
                    </span>
                  ))}
                </div>
              </div>

              {/* Extras / Activities */}
              <div className={`rounded-2xl p-6 bg-gradient-to-br ${theme.softGradient} border ${theme.accentBorder}`}>
                <h4 className={`font-extrabold text-gray-900 text-base mb-4 flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <span className={`w-1.5 h-5 rounded-full ${theme.accentBg}`} />
                  {lang === 'fr' ? 'Activités & Services' : lang === 'en' ? 'Activities & Services' : 'الأنشطة والخدمات'}
                </h4>
                <div className="space-y-2">
                  {cycle.extras.map((extra: string, i: number) => (
                    <div
                      key={i}
                      className={`flex items-center gap-2 text-sm font-medium text-gray-700 ${isRtl ? 'flex-row-reverse' : ''}`}
                    >
                      <div className={`w-2 h-2 rounded-full ${theme.accentBg} shrink-0`} />
                      {extra}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA card */}
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <div className={`bg-gradient-to-br ${theme.gradient} p-6 text-white text-center`}>
                  <p className="font-bold text-sm mb-1">
                    {lang === 'fr' ? 'Intéressé(e) par ce cycle ?' : lang === 'en' ? 'Interested in this cycle?' : 'مهتم بهذه المرحلة؟'}
                  </p>
                  <p className="text-white/70 text-xs mb-4">
                    {lang === 'fr' ? 'Inscrivez votre enfant dès maintenant' : lang === 'en' ? 'Enroll your child today' : 'سجّل طفلك الآن'}
                  </p>
                  <button
                    onClick={onAdmission}
                    className="w-full py-2.5 rounded-xl bg-white font-extrabold text-sm hover:bg-gray-50 transition-all hover:scale-105 shadow-md"
                    style={{ color: cycle.accentColor }}
                  >
                    {lang === 'fr' ? "Demande d'admission" : lang === 'en' ? 'Apply Now' : 'طلب التسجيل'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Cycle navigation dots */}
          <div className="flex justify-center gap-2 mt-8">
            {cycles.items.map((_: any, i: number) => {
              const th = cycleThemes[i]
              return (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`rounded-full transition-all duration-300 ${
                    activeTab === i
                      ? `${th.accentBg} w-8 h-3`
                      : 'bg-gray-200 w-3 h-3 hover:bg-gray-300'
                  }`}
                  aria-label={cycles.items[i].name}
                />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
