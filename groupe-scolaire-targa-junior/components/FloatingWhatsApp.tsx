'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { type Language } from '@/lib/translations'

interface FloatingWAProps { lang: Language }

export default function FloatingWhatsApp({ lang }: FloatingWAProps) {
  const [open, setOpen] = useState(false)

  const msg = lang === 'ar'
    ? 'مرحباً، أود الحصول على معلومات حول مجموعة مدارس تاركة جينيور.'
    : lang === 'en'
    ? 'Hello, I would like information about Groupe Scolaire Targa Junior.'
    : 'Bonjour, je souhaite des informations sur le Groupe Scolaire Targa Junior.'

  const waUrl = `https://wa.me/212772326918?text=${encodeURIComponent(msg)}`

  return (
    <div className={`fixed bottom-6 z-50 ${lang === 'ar' ? 'left-6' : 'right-6'} flex flex-col items-end gap-3`}>
      {/* Tooltip popup */}
      {open && (
        <div
          className="bg-white rounded-2xl shadow-2xl p-4 w-64 border border-gray-100 animate-fadeInUp"
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
        >
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/api-attachments/0wLKEzeoSj1fBaWTCmzxk-Xo3BgxZAuot9E9QOmtrbqLfYstvByk.png"
                alt="Targa Junior"
                className="w-9 h-9 object-contain"
              />
              <div>
                <p className="font-bold text-xs text-gray-900">Targa Junior</p>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-gray-400">
                    {lang === 'ar' ? 'متاح الآن' : lang === 'en' ? 'Available now' : 'Disponible'}
                  </span>
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X size={14} />
            </button>
          </div>
          <p className="text-xs text-gray-600 mb-3 leading-relaxed">
            {lang === 'ar'
              ? 'هل لديك أسئلة؟ تحدث معنا مباشرة على واتساب!'
              : lang === 'en'
              ? 'Have questions? Chat with us directly on WhatsApp!'
              : 'Des questions ? Discutez avec nous sur WhatsApp !'}
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#25d366] text-white text-xs font-bold hover:bg-[#1db954] transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            WhatsApp
          </a>
        </div>
      )}

      {/* Main FAB button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-[#25d366] text-white flex items-center justify-center shadow-2xl hover:bg-[#1db954] transition-all duration-200 hover:scale-110 animate-wa-pulse"
        aria-label="WhatsApp"
      >
        {open ? (
          <X size={22} />
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        )}
      </button>
    </div>
  )
}
