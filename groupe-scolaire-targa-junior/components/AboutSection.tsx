'use client'

import { useEffect, useRef } from 'react'
import { translations, type Language } from '@/lib/translations'
import { BookOpen, Users, Award, Star } from 'lucide-react'

interface AboutProps { lang: Language }

const iconMap = [BookOpen, Star, Users, Award]
const colorMap = [
  'bg-blue-50 text-blue-600 border-blue-100',
  'bg-yellow-50 text-yellow-600 border-yellow-100',
  'bg-green-50 text-green-600 border-green-100',
  'bg-red-50 text-red-600 border-red-100',
]
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
              setTimeout(() => el.classList.add('visible'), i * 120)
            })
          }
        })
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      dir={t.dir as 'ltr' | 'rtl'}
      className="py-20 bg-gradient-to-b from-white to-slate-50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className={`text-center mb-14 reveal`}>
          <span className="inline-block px-4 py-1 rounded-full bg-cyan-50 text-[#0891b2] text-xs font-bold uppercase tracking-widest mb-3">
            {t.about.subtitle}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 text-balance">
            {t.about.title}
          </h2>
          <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-[#0891b2]" />
        </div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image */}
          <div className={`relative reveal ${lang === 'ar' ? 'order-2' : 'order-1'}`}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/images/school-building.jpg"
                alt="Targa Junior school building with colorful facade and children playing in courtyard"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-xl p-4 border border-gray-100 flex items-center gap-3">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/api-attachments/0wLKEzeoSj1fBaWTCmzxk-Xo3BgxZAuot9E9QOmtrbqLfYstvByk.png"
                alt="Targa Junior logo"
                className="h-12 w-auto"
              />
              <div>
                {lang === 'ar' ? (
                  <>
                    <p className="text-xs font-bold text-gray-800">مجموعة مدارس</p>
                    <p className="text-sm font-extrabold text-[#0891b2]">تاركة جينيور</p>
                    <p className="text-xs text-gray-500">مراكش، المغرب</p>
                  </>
                ) : (
                  <>
                    <p className="text-xs font-bold text-gray-800">Groupe Scolaire</p>
                    <p className="text-sm font-extrabold text-[#0891b2]">TARGA JUNIOR</p>
                    <p className="text-xs text-gray-500">Marrakech, Maroc</p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Text */}
          <div className={`${lang === 'ar' ? 'order-1' : 'order-2'}`}>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8 reveal">
              {t.about.text}
            </p>

            {/* Values grid */}
            <div className="grid grid-cols-2 gap-4">
              {t.about.values.map((val, i) => {
                const Icon = iconMap[i]
                return (
                  <div
                    key={i}
                    className={`reveal p-4 rounded-2xl border ${colorMap[i]} flex flex-col gap-2 hover:scale-105 transition-transform duration-200`}
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    <div className="flex items-center gap-2">
                      <Icon size={20} />
                      <span className="font-bold text-sm">{val.title}</span>
                    </div>
                    <p className="text-xs opacity-80 leading-snug">{val.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`reveal bg-white rounded-2xl shadow-md p-6 text-center border border-gray-50 hover:shadow-xl transition-shadow duration-300`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <p className="text-4xl font-extrabold text-[#d4622a] mb-1">{stat.value}</p>
              <p className="text-sm font-medium text-gray-500">{stat.label[lang]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
