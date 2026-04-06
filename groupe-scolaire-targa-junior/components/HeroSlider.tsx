'use client'

import { useState, useEffect, useCallback } from 'react'
import { translations, type Language } from '@/lib/translations'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'

interface HeroSliderProps {
  lang: Language
  onNav: (page: string) => void
}

const slideImages = [
  '/images/hero-1.jpg',
  '/images/hero-2.jpg',
  '/images/hero-3.jpg',
]

export default function HeroSlider({ lang, onNav }: HeroSliderProps) {
  const t = translations[lang]
  const slides = t.hero.slides
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)

  const goTo = useCallback((index: number) => {
    if (animating) return
    setAnimating(true)
    setTimeout(() => {
      setCurrent(index)
      setAnimating(false)
    }, 500)
  }, [animating])

  const next = useCallback(() => {
    goTo((current + 1) % slides.length)
  }, [current, slides.length, goTo])

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length)
  }, [current, slides.length, goTo])

  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])

  const slide = slides[current]

  return (
    <section id="home" className="relative h-screen min-h-[700px] overflow-hidden bg-neutral-900" dir={t.dir as 'ltr' | 'rtl'}>
      {/* Background images */}
      {slideImages.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-all duration-1000 ${i === current ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
        >
          <img
            src={img}
            alt={`Slide ${i + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
      ))}

      {/* Main content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div
            key={current}
            className={`max-w-3xl ${lang === 'ar' ? 'mr-auto text-right' : 'ml-0 text-left'} animate-hero-in`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-8 h-px bg-white/50" />
              <span className="text-white/70 text-xs font-medium uppercase tracking-[0.2em]">
                {lang === 'ar' ? 'مجموعة مدارس تاركة جينيور' : 'Groupe Scolaire Targa Junior'}
              </span>
            </div>

            {/* Title */}
            <h1 className={`text-white font-bold leading-[1.1] mb-6 ${lang === 'ar' ? 'text-4xl md:text-5xl lg:text-6xl' : 'text-4xl md:text-5xl lg:text-7xl'}`}>
              <span className="block text-white/60 text-xl md:text-2xl font-normal mb-2">
                {slide.title}
              </span>
              <span className="block text-balance">
                {slide.subtitle}
              </span>
            </h1>

            {/* Description */}
            <p className={`text-white/70 mb-10 leading-relaxed max-w-xl text-balance ${lang === 'ar' ? 'text-base md:text-lg' : 'text-base md:text-lg'}`}>
              {slide.description}
            </p>

            {/* CTA buttons */}
            <div className={`flex flex-wrap gap-4 ${lang === 'ar' ? 'justify-end' : 'justify-start'}`}>
              <button
                onClick={() => onNav('admission')}
                className="group flex items-center gap-2 px-7 py-4 rounded-full bg-white text-neutral-900 font-semibold text-sm transition-all duration-300 hover:bg-neutral-100 hover:gap-4"
              >
                {slide.cta}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => onNav('about')}
                className="px-7 py-4 rounded-full border border-white/30 text-white font-medium text-sm hover:bg-white/10 transition-all duration-300"
              >
                {lang === 'fr' ? 'En savoir plus' : lang === 'en' ? 'Learn more' : 'اعرف المزيد'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className={`flex items-center justify-between ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
            {/* Slide indicators */}
            <div className="flex items-center gap-3">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`transition-all duration-300 ${
                    i === current 
                      ? 'w-12 h-1 bg-white rounded-full' 
                      : 'w-6 h-1 bg-white/30 rounded-full hover:bg-white/50'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrow buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-neutral-900 transition-all duration-300"
                aria-label="Previous slide"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-neutral-900 transition-all duration-300"
                aria-label="Next slide"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom marquee */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-neutral-900/90 backdrop-blur-sm py-3 overflow-hidden border-t border-white/10">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="text-white/50 font-medium text-sm mx-12 tracking-wide flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
              Ensemble pour un meilleur avenir
              <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
              Together for a better future
              <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
              معاً نحو مستقبل أفضل
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
