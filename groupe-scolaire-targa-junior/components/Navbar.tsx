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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-2'
          : 'bg-white/80 backdrop-blur-sm py-3'
      }`}
      dir={t.dir as 'ltr' | 'rtl'}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-center gap-3 shrink-0"
        >
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/api-attachments/0wLKEzeoSj1fBaWTCmzxk-Xo3BgxZAuot9E9QOmtrbqLfYstvByk.png"
            alt="Targa Junior Logo"
            className="h-12 w-auto object-contain"
          />
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-gray-500 leading-tight">Groupe Scolaire</p>
            <p className="text-base font-extrabold text-[#0891b2] leading-tight tracking-tight">
              TARGA JUNIOR
            </p>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => handleNav(item.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activePage === item.key
                  ? 'bg-[#0891b2] text-white shadow-md'
                  : 'text-gray-700 hover:bg-cyan-50 hover:text-[#0891b2]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Language switcher + mobile menu */}
        <div className="flex items-center gap-2">
          {/* Language dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-gray-200 bg-white text-sm font-semibold text-gray-700 hover:border-[#0891b2] hover:text-[#0891b2] transition-colors"
            >
              <Globe size={15} />
              <span>{langLabels[lang]}</span>
            </button>
            {langOpen && (
              <div className="absolute top-full mt-2 right-0 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 min-w-[130px] animate-fadeInDown">
                {(['fr', 'en', 'ar'] as Language[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => { setLang(l); setLangOpen(false) }}
                    className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors hover:bg-cyan-50 hover:text-[#0891b2] ${
                      lang === l ? 'bg-cyan-50 text-[#0891b2]' : 'text-gray-700'
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
            className="hidden md:block px-5 py-2 rounded-full bg-[#d4622a] text-white text-sm font-bold shadow-md hover:bg-[#b8511f] transition-all duration-200 hover:scale-105"
          >
            {t.nav.admission}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl animate-fadeInDown">
          <nav className="flex flex-col p-4 gap-1" dir={t.dir as 'ltr' | 'rtl'}>
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNav(item.key)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  activePage === item.key
                    ? 'bg-[#0891b2] text-white'
                    : 'text-gray-700 hover:bg-cyan-50 hover:text-[#0891b2]'
                } ${lang === 'ar' ? 'text-right' : 'text-left'}`}
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
