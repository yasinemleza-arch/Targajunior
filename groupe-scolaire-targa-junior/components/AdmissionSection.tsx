'use client'

import { useState, useEffect, useRef } from 'react'
import { translations, type Language } from '@/lib/translations'
import { Send, CheckCircle, MessageCircle, Phone, Mail } from 'lucide-react'

interface AdmissionProps { lang: Language }

interface FormData {
  parentName: string
  childName: string
  childAge: string
  level: string
  phone: string
  email: string
  message: string
}

export default function AdmissionSection({ lang }: AdmissionProps) {
  const t = translations[lang]
  const af = t.admission.form
  const sectionRef = useRef<HTMLElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState<FormData>({
    parentName: '',
    childName: '',
    childAge: '',
    level: '',
    phone: '',
    email: '',
    message: '',
  })

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const buildWhatsAppMessage = () => {
    const lines: string[] = []
    if (lang === 'ar') {
      lines.push('*طلب تسجيل جديد - تاركة جينيور*')
      lines.push(`👤 الوالد: ${form.parentName}`)
      lines.push(`🧒 الطفل: ${form.childName} (${form.childAge} سنة)`)
      lines.push(`📚 المستوى المطلوب: ${form.level}`)
      lines.push(`📞 الهاتف: ${form.phone}`)
      if (form.email) lines.push(`📧 البريد: ${form.email}`)
      if (form.message) lines.push(`💬 ملاحظة: ${form.message}`)
    } else if (lang === 'en') {
      lines.push('*New Admission Request - Targa Junior*')
      lines.push(`👤 Parent: ${form.parentName}`)
      lines.push(`🧒 Child: ${form.childName} (${form.childAge} yrs)`)
      lines.push(`📚 Level: ${form.level}`)
      lines.push(`📞 Phone: ${form.phone}`)
      if (form.email) lines.push(`📧 Email: ${form.email}`)
      if (form.message) lines.push(`💬 Note: ${form.message}`)
    } else {
      lines.push('*Nouvelle Demande d\'Admission - Targa Junior*')
      lines.push(`👤 Parent: ${form.parentName}`)
      lines.push(`🧒 Enfant: ${form.childName} (${form.childAge} ans)`)
      lines.push(`📚 Niveau souhaité: ${form.level}`)
      lines.push(`📞 Téléphone: ${form.phone}`)
      if (form.email) lines.push(`📧 Email: ${form.email}`)
      if (form.message) lines.push(`💬 Message: ${form.message}`)
    }
    return encodeURIComponent(lines.join('\n'))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      const waMsg = buildWhatsAppMessage()
      const waUrl = `https://wa.me/212772326918?text=${waMsg}`
      window.open(waUrl, '_blank')
    }, 1200)
  }

  const handleDirectWA = () => {
    const msg = encodeURIComponent(af.whatsappMsg)
    window.open(`https://wa.me/212772326918?text=${msg}`, '_blank')
  }

  const inputClass = `w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0891b2] focus:border-transparent transition-all bg-gray-50 placeholder:text-gray-400 ${lang === 'ar' ? 'text-right' : 'text-left'}`
  const labelClass = `block text-sm font-semibold text-gray-700 mb-1.5 ${lang === 'ar' ? 'text-right' : 'text-left'}`

  return (
    <section
      id="admission"
      ref={sectionRef}
      dir={t.dir as 'ltr' | 'rtl'}
      className="py-20 bg-gradient-to-b from-slate-50 to-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14 reveal">
          <span className="inline-block px-4 py-1 rounded-full bg-green-50 text-green-600 text-xs font-bold uppercase tracking-widest mb-3">
            {t.admission.subtitle}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 text-balance">
            {t.admission.title}
          </h2>
          <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-green-500" />
          <p className="mt-4 text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
            {t.admission.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Sidebar info */}
          <div className={`lg:col-span-2 space-y-6 ${lang === 'ar' ? 'order-2' : 'order-1'} reveal`}>
            {/* School card */}
            <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/api-attachments/0wLKEzeoSj1fBaWTCmzxk-Xo3BgxZAuot9E9QOmtrbqLfYstvByk.png"
                alt="Targa Junior Logo"
                className="h-20 mx-auto mb-4 object-contain animate-float"
              />
              {lang === 'ar' ? (
                <>
                  <h3 className="font-extrabold text-gray-900 text-center text-lg">مجموعة مدارس</h3>
                  <h3 className="font-extrabold text-[#0891b2] text-center text-xl mb-2">تاركة جينيور</h3>
                </>
              ) : (
                <>
                  <h3 className="font-extrabold text-gray-900 text-center text-lg">Groupe Scolaire</h3>
                  <h3 className="font-extrabold text-[#0891b2] text-center text-xl mb-2">TARGA JUNIOR</h3>
                </>
              )}
              <p className="text-center text-xs text-gray-500 mb-4">Maternelle · Primaire · Collège</p>
              <div className="h-px bg-gray-100 mb-4" />
              <div className="space-y-2 text-sm text-gray-600">
                <div className={`flex items-center gap-2 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <Phone size={14} className="text-[#d4622a] shrink-0" />
                  <span>05 24 02 18 08</span>
                </div>
                <div className={`flex items-center gap-2 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <MessageCircle size={14} className="text-green-500 shrink-0" />
                  <span>+212 772 326 918</span>
                </div>
                <div className={`flex items-center gap-2 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <Mail size={14} className="text-blue-500 shrink-0" />
                  <span className="break-all">targa.junior17@gmail.com</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp */}
            <button
              onClick={handleDirectWA}
              className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-[#25d366] text-white font-bold text-base shadow-lg hover:bg-[#1db954] transition-all duration-200 hover:scale-105 animate-wa-pulse"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              {af.whatsappBtn}
            </button>

            {/* Image */}
            <div className="rounded-2xl overflow-hidden shadow-md hidden lg:block">
              <img
                src="https://placehold.co/500x300?text=Happy+students+studying+together+in+bright+modern+classroom+with+colorful+learning+materials"
                alt="Happy students studying together in bright modern classroom with colorful learning materials"
                className="w-full h-48 object-cover"
              />
            </div>
          </div>

          {/* Form */}
          <div className={`lg:col-span-3 ${lang === 'ar' ? 'order-1' : 'order-2'} reveal delay-200`}>
            {submitted ? (
              <div className="bg-white rounded-3xl shadow-xl p-10 text-center border border-green-100 animate-zoomIn">
                <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-extrabold text-gray-900 mb-3">
                  {lang === 'fr' ? 'Demande envoyée !' : lang === 'en' ? 'Application Sent!' : 'تم الإرسال!'}
                </h3>
                <p className="text-gray-500 mb-6 text-sm leading-relaxed">{af.success}</p>
                <button
                  onClick={handleDirectWA}
                  className="flex items-center justify-center gap-2 mx-auto px-6 py-3 rounded-full bg-[#25d366] text-white font-bold hover:bg-[#1db954] transition-all"
                >
                  <MessageCircle size={18} />
                  {af.whatsappBtn}
                </button>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 text-sm text-gray-400 hover:text-gray-600 underline"
                >
                  {lang === 'fr' ? 'Nouvelle demande' : lang === 'en' ? 'New application' : 'طلب جديد'}
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-gray-100"
              >
                <h3 className={`text-xl font-extrabold text-gray-900 mb-6 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                  {lang === 'fr' ? 'Formulaire d\'inscription'
                    : lang === 'en' ? 'Application Form'
                    : 'نموذج التسجيل'}
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Parent Name */}
                  <div>
                    <label className={labelClass}>{af.parentName} *</label>
                    <input
                      name="parentName"
                      value={form.parentName}
                      onChange={handleChange}
                      required
                      placeholder={af.parentName}
                      className={inputClass}
                    />
                  </div>
                  {/* Child Name */}
                  <div>
                    <label className={labelClass}>{af.childName} *</label>
                    <input
                      name="childName"
                      value={form.childName}
                      onChange={handleChange}
                      required
                      placeholder={af.childName}
                      className={inputClass}
                    />
                  </div>
                  {/* Child Age */}
                  <div>
                    <label className={labelClass}>{af.childAge} *</label>
                    <input
                      name="childAge"
                      type="number"
                      min="2"
                      max="18"
                      value={form.childAge}
                      onChange={handleChange}
                      required
                      placeholder="3 - 15"
                      className={inputClass}
                    />
                  </div>
                  {/* Level */}
                  <div>
                    <label className={labelClass}>{af.level} *</label>
                    <select
                      name="level"
                      value={form.level}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    >
                      <option value="">-- {af.level} --</option>
                      {af.levels.map((l, i) => (
                        <option key={i} value={l}>{l}</option>
                      ))}
                    </select>
                  </div>
                  {/* Phone */}
                  <div>
                    <label className={labelClass}>{af.phone} *</label>
                    <input
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      placeholder="+212 6xx xxx xxx"
                      className={inputClass}
                    />
                  </div>
                  {/* Email */}
                  <div>
                    <label className={labelClass}>{af.email}</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="mt-4">
                  <label className={labelClass}>{af.message}</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder={af.message}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* Notice */}
                <div className={`mt-4 flex items-start gap-2 bg-green-50 rounded-xl p-3 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <MessageCircle size={16} className="text-green-600 mt-0.5 shrink-0" />
                  <p className="text-xs text-green-700 leading-relaxed">
                    {lang === 'fr'
                      ? 'Après soumission, vous serez redirigé vers WhatsApp pour envoyer votre demande. Notre équipe vous contactera dans les plus brefs délais.'
                      : lang === 'en'
                      ? 'After submission, you will be redirected to WhatsApp to send your request. Our team will contact you as soon as possible.'
                      : 'بعد الإرسال، سيتم توجيهك إلى واتساب لإرسال طلبك. سيتواصل معك فريقنا في أقرب وقت ممكن.'}
                  </p>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-6 w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#d4622a] text-white font-bold text-base shadow-lg hover:bg-[#b8511f] transition-all duration-200 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                >
                  {loading ? (
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                  ) : (
                    <Send size={18} />
                  )}
                  {loading
                    ? (lang === 'fr' ? 'Envoi...' : lang === 'en' ? 'Sending...' : 'جاري الإرسال...')
                    : af.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
