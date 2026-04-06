'use client'

import { useEffect, useRef } from 'react'
import { translations, type Language } from '@/lib/translations'
import { BookOpen, Users, Award, Star, ArrowUpRight } from 'lucide-react'

interface AboutProps { lang: Language }

const iconMap = [BookOpen, Star, Users, Award]

const stats = [
  { value: '500+', label: { fr: 'Élèves', en: 'Students', ar: 'طالب' } },
  { value: '30+', label: { fr: 'Enseignants', en: 'Teachers', ar: 'معلم' } },
  { value: '15+', label: { fr: "Années d'expérience", en: 'Years of experience', ar: 'سنوات خبرة' } },
  { value: '3', label: { fr: 'Cycles scolaires', en: 'School cycles', ar: 'مراحل دراسية' } },
]

export default function AboutSection({ lang }: AboutProps) {
  const t = translations[lang]
  const sectionRef = useRef<HTMLElement>(null)

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

  return (
    <section
      id="about"
      ref={sectionRef}
      dir={t.dir as 'ltr' | 'rtl'}
      className="py-24 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className={`mb-16 reveal ${lang === 'ar' ? 'text-right' : ''}`}>
          <span className="inline-flex items-center gap-2 text-neutral-500 text-xs font-medium uppercase tracking-[0.2em] mb-4">
            <span className="w-8 h-px bg-neutral-300" />
            {t.about.subtitle}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 text-balance max-w-2xl">
            {t.about.title}
          </h2>
        </div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          {/* Image */}
          <div className={`reveal ${lang === 'ar' ? 'order-2' : 'order-1'}`}>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100">
                <img
                  src="/images/school-building.jpg"
                  alt="Targa Junior school building"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-2xl p-5 border border-neutral-100 max-w-[200px]">
                <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Groupe Scolaire</p>
                <p className="font-bold text-neutral-900 mb-2">Targa Junior</p>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  {lang === 'ar' ? 'مراكش، المغرب' : 'Marrakech, Maroc'}
                </p>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className={`${lang === 'ar' ? 'order-1' : 'order-2'}`}>
            <p className="text-neutral-600 text-lg leading-relaxed mb-10 reveal">
              {t.about.text}
            </p>

            {/* Values */}
            <div className="space-y-4">
              {t.about.values.map((val, i) => {
                const Icon = iconMap[i]
                return (
                  <div
                    key={i}
                    className={`reveal group flex items-start gap-4 p-4 rounded-xl border border-neutral-100 hover:border-neutral-200 hover:bg-neutral-50 transition-all duration-300 cursor-default ${lang === 'ar' ? 'flex-row-reverse text-right' : ''}`}
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0 group-hover:bg-neutral-900 group-hover:text-white transition-colors">
                      <Icon size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-neutral-900 text-sm mb-1">{val.title}</h4>
                      <p className="text-neutral-500 text-sm leading-relaxed">{val.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="reveal text-center p-8 rounded-2xl bg-neutral-50 border border-neutral-100 hover:border-neutral-200 transition-all duration-300"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <p className="text-4xl md:text-5xl font-bold text-neutral-900 mb-2">{stat.value}</p>
              <p className="text-sm font-medium text-neutral-500">{stat.label[lang]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
