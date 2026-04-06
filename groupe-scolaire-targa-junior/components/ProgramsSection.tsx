'use client'

import { useEffect, useRef } from 'react'
import { translations, type Language } from '@/lib/translations'
import { CheckCircle2 } from 'lucide-react'

interface ProgramsProps { lang: Language; onAdmission: () => void }

const cardColors = [
  {
    bg: 'from-yellow-400 to-amber-500',
    light: 'bg-yellow-50',
    text: 'text-yellow-600',
    border: 'border-yellow-100',
    btn: 'bg-yellow-500 hover:bg-yellow-600',
    check: 'text-yellow-500',
    icon: '🌱',
  },
  {
    bg: 'from-blue-500 to-blue-700',
    light: 'bg-blue-50',
    text: 'text-blue-600',
    border: 'border-blue-100',
    btn: 'bg-blue-600 hover:bg-blue-700',
    check: 'text-blue-500',
    icon: '📖',
    featured: true,
  },
  {
    bg: 'from-[#d4622a] to-[#a8441a]',
    light: 'bg-orange-50',
    text: 'text-[#d4622a]',
    border: 'border-orange-100',
    btn: 'bg-[#d4622a] hover:bg-[#b8511f]',
    check: 'text-[#d4622a]',
    icon: '🎓',
  },
]

export default function ProgramsSection({ lang, onAdmission }: ProgramsProps) {
  const t = translations[lang]
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 150)
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
      className="py-20 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14 reveal">
          <span className="inline-block px-4 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest mb-3">
            {t.programs.subtitle}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 text-balance">
            {t.programs.title}
          </h2>
          <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-blue-500" />
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {t.programs.levels.map((level, i) => {
            const c = cardColors[i]
            return (
              <div
                key={i}
                className={`reveal rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border ${c.border} ${c.featured ? 'ring-2 ring-blue-400 ring-offset-2' : ''}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {/* Card header */}
                <div className={`bg-gradient-to-br ${c.bg} p-6 text-white relative overflow-hidden`}>
                  {c.featured && (
                    <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30">
                      ★ Popular
                    </div>
                  )}
                  <div className="text-5xl mb-3">{c.icon}</div>
                  <h3 className="text-2xl font-extrabold">{level.name}</h3>
                  <div className={`inline-block mt-2 px-3 py-1 rounded-full bg-white/25 text-sm font-semibold`}>
                    {level.age}
                  </div>
                  {/* Decorative circles */}
                  <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10" />
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/10" />
                </div>

                {/* Card body */}
                <div className={`p-6 ${c.light}`}>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">{level.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {level.features.map((feat, j) => (
                      <li key={j} className={`flex items-center gap-2 text-sm font-medium text-gray-700 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                        <CheckCircle2 size={16} className={c.check} />
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={onAdmission}
                    className={`w-full py-3 rounded-xl text-white font-bold text-sm ${c.btn} transition-all duration-200 hover:scale-105 shadow-md`}
                  >
                    {lang === 'fr' ? "S'inscrire" : lang === 'en' ? 'Enroll Now' : 'سجّل الآن'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom banner */}
        <div className="mt-14 reveal">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0f2d3d] via-[#0891b2] to-[#0e7490] p-8 md:p-12 text-white text-center shadow-2xl">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-8 w-32 h-32 rounded-full bg-white" />
              <div className="absolute bottom-4 right-8 w-24 h-24 rounded-full bg-white" />
            </div>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/api-attachments/0wLKEzeoSj1fBaWTCmzxk-Xo3BgxZAuot9E9QOmtrbqLfYstvByk.png"
              alt="Targa Junior Logo"
              className="h-16 mx-auto mb-4 object-contain animate-float"
            />
            <h3 className="text-2xl md:text-3xl font-extrabold mb-2">
              {lang === 'fr' ? 'Ensemble pour un meilleur avenir !'
                : lang === 'en' ? 'Together for a better future!'
                : 'معاً نحو مستقبل أفضل!'}
            </h3>
            <p className="text-white/80 text-sm mb-6">
              {lang === 'fr' ? 'Rejoignez notre communauté scolaire dès aujourd\'hui.'
                : lang === 'en' ? 'Join our school community today.'
                : 'انضم إلى مجتمعنا المدرسي اليوم.'}
            </p>
            <button
              onClick={onAdmission}
              className="px-8 py-3 rounded-full bg-white text-[#0891b2] font-extrabold text-sm hover:bg-gray-100 transition-all hover:scale-105 shadow-xl"
            >
              {lang === 'fr' ? 'Demander une admission' : lang === 'en' ? 'Apply for Admission' : 'طلب القبول'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
