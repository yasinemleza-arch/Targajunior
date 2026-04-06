'use client'

import { useState, useEffect, useRef } from 'react'
import { translations, type Language } from '@/lib/translations'
import { Send, CheckCircle, MessageCircle, Phone, Mail, ArrowRight } from 'lucide-react'

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
  const isRtl = t.dir === 'rtl'

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
              setTimeout(() => el.classList.add('visible'), i * 80)
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
      lines.push(`الوالد: ${form.parentName}`)
      lines.push(`الطفل: ${form.childName} (${form.childAge} سنة)`)
      lines.push(`المستوى: ${form.level}`)
      lines.push(`الهاتف: ${form.phone}`)
      if (form.email) lines.push(`البريد: ${form.email}`)
      if (form.message) lines.push(`ملاحظة: ${form.message}`)
    } else if (lang === 'en') {
      lines.push('*New Admission Request - Targa Junior*')
      lines.push(`Parent: ${form.parentName}`)
      lines.push(`Child: ${form.childName} (${form.childAge} yrs)`)
      lines.push(`Level: ${form.level}`)
      lines.push(`Phone: ${form.phone}`)
      if (form.email) lines.push(`Email: ${form.email}`)
      if (form.message) lines.push(`Note: ${form.message}`)
    } else {
      lines.push('*Nouvelle Demande - Targa Junior*')
      lines.push(`Parent: ${form.parentName}`)
      lines.push(`Enfant: ${form.childName} (${form.childAge} ans)`)
      lines.push(`Niveau: ${form.level}`)
      lines.push(`Téléphone: ${form.phone}`)
      if (form.email) lines.push(`Email: ${form.email}`)
      if (form.message) lines.push(`Message: ${form.message}`)
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

  const inputClass = `w-full px-4 py-3.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all bg-white placeholder:text-neutral-400 ${isRtl ? 'text-right' : ''}`
  const labelClass = `block text-sm font-medium text-neutral-700 mb-1.5 ${isRtl ? 'text-right' : ''}`

  return (
    <section
      id="admission"
      ref={sectionRef}
      dir={t.dir as 'ltr' | 'rtl'}
      className="py-24 bg-neutral-50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className={`mb-16 reveal ${isRtl ? 'text-right' : ''}`}>
          <span className="inline-flex items-center gap-2 text-neutral-500 text-xs font-medium uppercase tracking-[0.2em] mb-4">
            <span className="w-8 h-px bg-neutral-300" />
            {t.admission.subtitle}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 text-balance max-w-2xl mb-4">
            {t.admission.title}
          </h2>
          <p className="text-neutral-500 max-w-xl text-base leading-relaxed">
            {t.admission.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Sidebar */}
          <div className={`lg:col-span-2 space-y-6 ${isRtl ? 'order-2' : 'order-1'}`}>
            {/* Contact card */}
            <div className="reveal bg-white rounded-2xl p-6 border border-neutral-200">
              <div className="mb-6">
                <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Groupe Scolaire</p>
                <p className="text-lg font-bold text-neutral-900">Targa Junior</p>
              </div>
              <div className="h-px bg-neutral-100 mb-6" />
              <div className="space-y-4">
                <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center">
                    <Phone size={16} className="text-neutral-600" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">
                      {lang === 'fr' ? 'Téléphone' : lang === 'en' ? 'Phone' : 'الهاتف'}
                    </p>
                    <p className="text-sm font-medium text-neutral-900">05 24 02 18 08</p>
                  </div>
                </div>
                <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center">
                    <MessageCircle size={16} className="text-neutral-600" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">WhatsApp</p>
                    <p className="text-sm font-medium text-neutral-900">+212 772 326 918</p>
                  </div>
                </div>
                <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center">
                    <Mail size={16} className="text-neutral-600" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">Email</p>
                    <p className="text-sm font-medium text-neutral-900">targa.junior17@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <button
              onClick={handleDirectWA}
              className="reveal w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl bg-[#25d366] text-white font-semibold text-sm hover:bg-[#1db954] transition-all duration-300 group"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              {af.whatsappBtn}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Image */}
            <div className="reveal rounded-xl overflow-hidden hidden lg:block">
              <img
                src="/images/classroom.jpg"
                alt="Classroom"
                className="w-full h-48 object-cover"
              />
            </div>
          </div>

          {/* Form */}
          <div className={`lg:col-span-3 ${isRtl ? 'order-1' : 'order-2'}`}>
            {submitted ? (
              <div className="reveal bg-white rounded-2xl p-10 text-center border border-neutral-200 animate-zoomIn">
                <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-neutral-900" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                  {lang === 'fr' ? 'Demande envoyée' : lang === 'en' ? 'Application Sent' : 'تم الإرسال'}
                </h3>
                <p className="text-neutral-500 mb-6 text-sm leading-relaxed max-w-md mx-auto">{af.success}</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-sm text-neutral-400 hover:text-neutral-600 underline"
                >
                  {lang === 'fr' ? 'Nouvelle demande' : lang === 'en' ? 'New application' : 'طلب جديد'}
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="reveal bg-white rounded-2xl p-8 border border-neutral-200"
              >
                <h3 className={`text-xl font-bold text-neutral-900 mb-8 ${isRtl ? 'text-right' : ''}`}>
                  {lang === 'fr' ? 'Formulaire d\'inscription'
                    : lang === 'en' ? 'Application Form'
                    : 'نموذج التسجيل'}
                </h3>

                <div className="grid md:grid-cols-2 gap-5">
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

                <div className="mt-5">
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

                <div className={`mt-5 flex items-start gap-3 bg-neutral-50 rounded-xl p-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <MessageCircle size={16} className="text-neutral-400 mt-0.5 shrink-0" />
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    {lang === 'fr'
                      ? 'Après soumission, vous serez redirigé vers WhatsApp pour envoyer votre demande.'
                      : lang === 'en'
                      ? 'After submission, you will be redirected to WhatsApp to send your request.'
                      : 'بعد الإرسال، سيتم توجيهك إلى واتساب لإرسال طلبك.'}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-6 w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-neutral-900 text-white font-semibold text-sm hover:bg-neutral-800 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed group"
                >
                  {loading ? (
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                  ) : (
                    <>
                      <Send size={16} />
                      {af.submit}
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
