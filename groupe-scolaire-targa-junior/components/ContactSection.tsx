'use client'

import { useEffect, useRef } from 'react'
import { translations, type Language } from '@/lib/translations'
import { MapPin, Phone, Mail, MessageCircle, Clock, ExternalLink } from 'lucide-react'

interface ContactProps { lang: Language }

export default function ContactSection({ lang }: ContactProps) {
  const t = translations[lang]
  const ct = t.contact
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

  const contactItems = [
    {
      icon: MapPin,
      label: lang === 'fr' ? 'Adresse' : lang === 'en' ? 'Address' : 'العنوان',
      value: ct.address,
      color: 'text-[#d4622a]',
      bg: 'bg-orange-50',
      href: 'https://maps.google.com/?q=Targa+Marrakech',
    },
    {
      icon: Phone,
      label: lang === 'fr' ? 'Téléphone' : lang === 'en' ? 'Phone' : 'الهاتف',
      value: ct.phone,
      color: 'text-blue-500',
      bg: 'bg-blue-50',
      href: `tel:${ct.phone.replace(/\s/g, '')}`,
    },
    {
      icon: Mail,
      label: 'Email',
      value: ct.email,
      color: 'text-orange-500',
      bg: 'bg-orange-50',
      href: `mailto:${ct.email}`,
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: ct.whatsapp,
      color: 'text-green-500',
      bg: 'bg-green-50',
      href: `https://wa.me/212772326918`,
    },
    {
      icon: Clock,
      label: lang === 'fr' ? 'Horaires' : lang === 'en' ? 'Hours' : 'أوقات العمل',
      value: ct.hours,
      color: 'text-purple-500',
      bg: 'bg-purple-50',
      href: null,
    },
  ]

  return (
    <section
      id="contact"
      ref={sectionRef}
      dir={t.dir as 'ltr' | 'rtl'}
      className="py-20 bg-gray-900 text-white overflow-hidden relative"
    >
      {/* BG decoration */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#0f2d3d] via-[#0891b2] via-[#f5c400] to-[#d4622a]" />
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-white/3 animate-spin-slow hidden lg:block" />
      <div className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-white/3 animate-float hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-14 reveal">
          <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-white/80 text-xs font-bold uppercase tracking-widest mb-3">
            {ct.subtitle}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white text-balance">
            {ct.title}
          </h2>
          <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-[#0891b2]" />
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Contact cards */}
          <div className="space-y-4">
            {contactItems.map((item, i) => {
              const Icon = item.icon
              return (
                <div
                  key={i}
                  className="reveal"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className={`flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-4 transition-all duration-200 group ${lang === 'ar' ? 'flex-row-reverse' : ''}`}
                    >
                      <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center shrink-0`}>
                        <Icon size={20} className={item.color} />
                      </div>
                      <div className={`flex-1 min-w-0 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                        <p className="text-white/50 text-xs font-medium">{item.label}</p>
                        <p className="text-white font-semibold text-sm truncate">{item.value}</p>
                      </div>
                      <ExternalLink size={14} className="text-white/30 group-hover:text-white/60 shrink-0 transition-colors" />
                    </a>
                  ) : (
                    <div className={`flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center shrink-0`}>
                        <Icon size={20} className={item.color} />
                      </div>
                      <div className={`flex-1 min-w-0 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                        <p className="text-white/50 text-xs font-medium">{item.label}</p>
                        <p className="text-white font-semibold text-sm">{item.value}</p>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Map + WhatsApp CTA */}
          <div className="space-y-6 reveal delay-300">
            {/* Map embed placeholder */}
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <div className="relative">
                <img
                  src="https://placehold.co/700x360?text=Map+showing+Targa+Junior+location+in+Targa+neighborhood+Marrakech+Morocco"
                  alt="Map showing Targa Junior location in Targa neighborhood, Marrakech, Morocco"
                  className="w-full h-56 object-cover opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <a
                    href="https://maps.google.com/?q=Targa+Marrakech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white text-gray-900 font-bold text-sm px-5 py-3 rounded-full shadow-xl hover:scale-105 transition-transform"
                  >
                    <MapPin size={16} className="text-[#0891b2]" />
                    {lang === 'fr' ? 'Voir sur Google Maps' : lang === 'en' ? 'View on Google Maps' : 'عرض على خرائط جوجل'}
                  </a>
                </div>
              </div>
              <div className="bg-white/5 p-4">
                <p className="text-white/70 text-sm">
                  <span className="font-bold text-white">
                    {lang === 'ar' ? 'مجموعة مدارس تاركة جينيور' : 'Groupe Scolaire Targa Junior'}
                  </span>
                  <br />
                  {lang === 'ar' ? 'وريدة 3 تارقا، مراكش، المغرب' : 'Ourida 3 Targa, Marrakech, Maroc'}
                </p>
              </div>
            </div>

            {/* WhatsApp big CTA */}
            <a
              href="https://wa.me/212772326918"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 py-5 px-6 rounded-2xl bg-[#25d366] text-white font-extrabold text-lg shadow-2xl hover:bg-[#1db954] transition-all duration-200 hover:scale-105 animate-wa-pulse"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              +212 772 326 918
            </a>

            {/* Social media links */}
            <div className={`flex items-center gap-4 ${lang === 'ar' ? 'justify-end' : 'justify-start'}`}>
              <span className="text-white/40 text-xs font-semibold uppercase tracking-widest">
                {lang === 'fr' ? 'Réseaux sociaux' : lang === 'en' ? 'Social media' : 'التواصل الاجتماعي'}
              </span>
              {/* Facebook */}
              <a
                href="https://www.facebook.com/targaj17"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-11 h-11 rounded-2xl bg-white/10 hover:bg-[#1877f2] border border-white/10 hover:border-[#1877f2] flex items-center justify-center transition-all duration-200 hover:scale-110 group"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white/70 group-hover:text-white transition-colors">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://www.instagram.com/gs_targa_junior"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-11 h-11 rounded-2xl bg-white/10 hover:bg-gradient-to-tr hover:from-[#f09433] hover:to-[#bc1888] border border-white/10 hover:border-[#e6683c] flex items-center justify-center transition-all duration-200 hover:scale-110 group"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white/70 group-hover:text-white transition-colors">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@targajunior"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-11 h-11 rounded-2xl bg-white/10 hover:bg-[#010101] border border-white/10 hover:border-white/30 flex items-center justify-center transition-all duration-200 hover:scale-110 group"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white/70 group-hover:text-white transition-colors">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
