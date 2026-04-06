'use client'

import { useState, useEffect } from 'react'
import { translations, type Language } from '@/lib/translations'
import { Menu, X, Globe } from 'lucide-react'

interface NavbarProps {
  lang: Language
  setLang: (l: Language) => void
  activePage: string
  setActivePage: (p: string) => void
}

const langLabels: Record<Language, string> = { fr: 'FR', en: 'EN', ar: 'AR' }
const langFull: Record<Language, string> = { fr: 'Français', en: 'English', ar: 'العربية' }

export default function Navbar({ lang, setLang, activePage, setActivePage }: NavbarProps) {
  const t = translations[lang]
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = [
    { key: 'home', label: t.nav.home },
    { key: 'about', label: t.nav.about },
    { key: 'cycles', label: t.nav.cycles },
    { key: 'programs', label: t.nav.programs },
    { key: 'admission', label: t.nav.admission },
    { key: 'contact', label: t.nav.contact },
  ]

  const handleNav = (key: string) => {
    setActivePage(key)
    setMenuOpen(false)
    const el = document.getElementById(key)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-neutral-100'
          : 'bg-transparent'
      }`}
      dir={t.dir as 'ltr' | 'rtl'}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-8">
        {/* Logo Text */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-center shrink-0 group"
        >
          <div>
            <p className={`text-[10px] font-semibold uppercase tracking-widest transition-colors ${scrolled ? 'text-neutral-500' : 'text-white/70'}`}>
              Groupe Scolaire
            </p>
            <p className={`text-lg font-bold tracking-tight transition-colors ${scrolled ? 'text-neutral-900' : 'text-white'}`}>
              Targa Junior
            </p>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => handleNav(item.key)}
              className={`px-4 py-2 text-sm font-medium transition-all duration-200 relative ${
                activePage === item.key
                  ? scrolled ? 'text-neutral-900' : 'text-white'
                  : scrolled ? 'text-neutral-500 hover:text-neutral-900' : 'text-white/70 hover:text-white'
              }`}
            >
              {item.label}
              {activePage === item.key && (
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${scrolled ? 'bg-neutral-900' : 'bg-white'}`} />
              )}
            </button>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Language dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-all border ${
                scrolled 
                  ? 'border-neutral-200 text-neutral-600 hover:border-neutral-400 hover:text-neutral-900 bg-white' 
                  : 'border-white/30 text-white/80 hover:border-white/60 hover:text-white bg-white/10 backdrop-blur-sm'
              }`}
            >
              <Globe size={14} />
              <span>{langLabels[lang]}</span>
            </button>
            {langOpen && (
              <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-xl border border-neutral-100 overflow-hidden z-50 min-w-[120px] animate-fadeInDown">
                {(['fr', 'en', 'ar'] as Language[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => { setLang(l); setLangOpen(false) }}
                    className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors hover:bg-neutral-50 ${
                      lang === l ? 'bg-neutral-50 text-neutral-900' : 'text-neutral-600'
                    } ${l === 'ar' ? 'text-right font-["Noto_Sans_Arabic"]' : ''}`}
                  >
                    {langFull[l]}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Admission CTA */}
          <button
            onClick={() => handleNav('admission')}
            className={`hidden md:block px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
              scrolled 
                ? 'bg-neutral-900 text-white hover:bg-neutral-800' 
                : 'bg-white text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            {t.nav.admission}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              scrolled ? 'text-neutral-700 hover:bg-neutral-100' : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-neutral-100 animate-fadeInDown">
          <nav className="flex flex-col p-4 gap-1" dir={t.dir as 'ltr' | 'rtl'}>
            {navItems.map((item, i) => (
              <button
                key={item.key}
                onClick={() => handleNav(item.key)}
                className={`w-full px-4 py-3 rounded-lg text-sm font-medium transition-all animate-slideIn ${
                  activePage === item.key
                    ? 'bg-neutral-100 text-neutral-900'
                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                } ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
