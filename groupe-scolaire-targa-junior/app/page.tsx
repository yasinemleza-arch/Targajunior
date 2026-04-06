'use client'

import { useState, useCallback } from 'react'
import { type Language } from '@/lib/translations'
import Navbar from '@/components/Navbar'
import HeroSlider from '@/components/HeroSlider'
import AboutSection from '@/components/AboutSection'
import CyclesSection from '@/components/CyclesSection'
import ProgramsSection from '@/components/ProgramsSection'
import AdmissionSection from '@/components/AdmissionSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'

export default function HomePage() {
  const [lang, setLang] = useState<Language>('fr')
  const [activePage, setActivePage] = useState('home')

  const handleNav = useCallback((page: string) => {
    setActivePage(page)
    const el = document.getElementById(page)
    if (el) {
      const offset = 80
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }, [])

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar
        lang={lang}
        setLang={setLang}
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <HeroSlider lang={lang} onNav={handleNav} />
      <AboutSection lang={lang} />
      <CyclesSection lang={lang} onAdmission={() => handleNav('admission')} />
      <ProgramsSection lang={lang} onAdmission={() => handleNav('admission')} />
      <AdmissionSection lang={lang} />
      <ContactSection lang={lang} />
      <Footer lang={lang} onNav={handleNav} />

      <FloatingWhatsApp lang={lang} />
    </main>
  )
}
