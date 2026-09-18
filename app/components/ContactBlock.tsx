'use client'

import { useState, FormEvent } from 'react'

export default function ContactBlock() {
  const [copied, setCopied] = useState(false)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const email = 'grasso.luis@gmail.com'

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const subject = encodeURIComponent(
      name ? `Consulta de ${name}` : 'Proyecto / consulta'
    )
    const body = encodeURIComponent(
      [name && `Nombre: ${name}`, message && `Mensaje:\n${message}`]
        .filter(Boolean)
        .join('\n\n')
    )
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
  }

  return (
    <div className="contact-block">
      <div className="contact-direct">
        <p className="contact-note">
          Proyectos freelance, equipos y startups · Mendoza / remoto.
          <br />
          Respondo en 24–48 h.
        </p>
        <div className="contact-email-row">
          <a className="contact-email" href={`mailto:${email}`}>
            {email}
          </a>
          <button type="button" className="copy-btn" onClick={copyEmail}>
            {copied ? 'Copiado' : 'Copiar'}
          </button>
        </div>
        <div className="closing-actions">
          <a
            href="https://www.linkedin.com/in/luis-grasso"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn ↗
          </a>
          <a
            href="https://github.com/popnegro"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>
        </div>
      </div>

      <form className="contact-form" onSubmit={onSubmit}>
        <label>
          <span>Nombre</span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
          />
        </label>
        <label>
          <span>Qué necesitás resolver</span>
          <textarea
            name="message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Contame el problema en 2–3 líneas…"
            required
          />
        </label>
        <button type="submit" className="form-submit">
          Abrir en el correo ↗
        </button>
        <p className="form-hint">
          Se abre tu cliente de correo con el mensaje listo. También podés
          copiar el email arriba.
        </p>
      </form>
    </div>
  )
}
