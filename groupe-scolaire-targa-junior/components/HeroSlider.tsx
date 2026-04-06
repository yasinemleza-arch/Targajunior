'use client'

import { useState, useEffect, useCallback } from 'react'
import { translations, type Language } from '@/lib/translations'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface HeroSliderProps {
  lang: Language
  onNav: (page: string) => void
}

const slideImages = [
  '/images/hero-1.jpg',
  '/images/hero-2.jpg',
  '/images/hero-3.jpg',
]

const slideAccents = [
  { dot: '#f5c400', badge: 'bg-[#d4622a]', glow: 'shadow-[#d4622a]/30' },
  { dot: '#0891b2', badge: 'bg-[#0891b2]', glow: 'shadow-[#0891b2]/30' },
  { dot: '#f5c400', badge: 'bg-[#f5c400]', glow: 'shadow-yellow-400/30' },
]

const slideGradients = [
  'from-[#0f2d3d]/75 via-[#0f2d3d]/40 to-[#0891b2]/10',
  'from-[#0f2d3d]/70 via-[#0891b2]/35 to-[#0f2d3d]/20',
  'from-[#0f2d3d]/70 via-[#d4622a]/30 to-[#0f2d3d]/20',
]

export default function HeroSlider({ lang, onNav }: HeroSliderProps) {
  const t = translations[lang]
  const slides = t.hero.slides
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [direction, setDirection] = useState<'left' | 'right'>('right')

  const goTo = useCallback((index: number, dir: 'left' | 'right' = 'right') => {
    if (animating) return
    setAnimating(true)
    setDirection(dir)
    setTimeout(() => {
      setCurrent(index)
      setAnimating(false)
    }, 500)
  }, [animating])

  const next = useCallback(() => {
    goTo((current + 1) % slides.length, 'right')
  }, [current, slides.length, goTo])

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, 'left')
  }, [current, slides.length, goTo])

  useEffect(() => {
    const timer = setInterval(next, 5500)
    return () => clearInterval(timer)
  }, [next])

  const slide = slides[current]
  const accent = slideAccents[current]

  return (
    <section id="home" className="relative h-screen min-h-[600px] overflow-hidden" dir={t.dir as 'ltr' | 'rtl'}>
      {/* Background images */}
      {slideImages.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <img
            src={img}
            alt={`Slide ${i + 1} showing school environment`}
            className="w-full h-full object-cover scale-105"
            style={{
              transform: i === current ? 'scale(1.03)' : 'scale(1.08)',
              transition: 'transform 6s ease-in-out',
            }}
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${slideGradients[i]}`} />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      ))}

      {/* Decorative shapes */}
      <div className="absolute top-20 right-10 w-40 h-40 rounded-full opacity-10 bg-white animate-spin-slow hidden lg:block" />
      <div className="absolute bottom-32 left-16 w-24 h-24 rounded-full opacity-10 bg-yellow-300 animate-float hidden lg:block" />
      <div className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full opacity-10 bg-white animate-pulse-soft hidden lg:block" />

      {/* Floating badges */}
      <div className="absolute top-28 left-8 hidden xl:flex flex-col gap-3 animate-fadeInLeft delay-700">
        {['Maternelle', 'Primaire', 'Collège'].map((level, i) => (
          <div
            key={level}
            className={`${slideAccents[i].badge} text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg opacity-90`}
          >
            {level}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div
            key={current}
            className={`max-w-3xl ${lang === 'ar' ? 'mr-auto text-right' : 'ml-0 text-left'} animate-hero-in`}
          >
            {/* Tag */}
            <div className={`inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30`}>
              <span className={`w-2 h-2 rounded-full`} style={{ background: accent.dot }} />
              <span className="text-white text-xs font-semibold tracking-widest uppercase">
                {lang === 'ar' ? 'مجموعة مدارس تاركة جينيور · مراكش' : 'Groupe Scolaire · Marrakech'}
              </span>
            </div>

            {/* Title */}
            <h1 className={`text-white font-extrabold leading-tight mb-2 text-balance ${lang === 'ar' ? 'text-4xl md:text-6xl' : 'text-4xl md:text-6xl lg:text-7xl'}`}>
              <span className="block opacity-90 text-2xl md:text-3xl font-medium mb-1">
                {slide.title}
              </span>
              <span
                className="block"
                style={{
                  textShadow: '0 2px 20px rgba(0,0,0,0.4)',
                  background: 'linear-gradient(135deg, #ffffff 0%, #ffe082 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {slide.subtitle}
              </span>
            </h1>

            {/* Description */}
            <p className={`text-white/90 mt-4 mb-8 leading-relaxed text-balance ${lang === 'ar' ? 'text-lg md:text-xl' : 'text-base md:text-lg lg:text-xl'}`}>
              {slide.description}
            </p>

            {/* CTA buttons */}
            <div className={`flex flex-wrap gap-3 ${lang === 'ar' ? 'justify-end' : 'justify-start'}`}>
              <button
                onClick={() => onNav('admission')}
                className="px-7 py-3.5 rounded-full bg-[#d4622a] text-white font-bold text-sm md:text-base shadow-xl hover:bg-[#b8511f] transition-all duration-200 hover:scale-105 hover:shadow-[#d4622a]/40 hover:shadow-2xl"
              >
                {slide.cta}
              </button>
              <button
                onClick={() => onNav('contact')}
                className="px-7 py-3.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/50 text-white font-semibold text-sm md:text-base hover:bg-white hover:text-gray-900 transition-all duration-200 hover:scale-105"
              >
                {t.contact.title}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Nav arrows */}
      <button
        onClick={prev}
        className={`absolute top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/40 transition-all ${lang === 'ar' ? 'right-4' : 'left-4'}`}
        aria-label="Previous slide"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={next}
        className={`absolute top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/40 transition-all ${lang === 'ar' ? 'left-4' : 'right-4'}`}
        aria-label="Next slide"
      >
        <ChevronRight size={22} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current ? 'w-8 h-3 bg-white' : 'w-3 h-3 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Slogan bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-[#0891b2]/95 backdrop-blur-sm py-2 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="text-white font-bold text-sm mx-8 tracking-wide">
              ✦ Ensemble pour un meilleur avenir ! &nbsp;·&nbsp; Together for a better future! &nbsp;·&nbsp; معاً نحو مستقبل أفضل
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
