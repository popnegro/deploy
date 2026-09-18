'use client'

import { useEffect, useState } from 'react'

const links = [
  { href: '#trabajo', label: 'Trabajo' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#enfoque', label: 'Enfoque' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1))
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      let current = ''
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top
        if (top <= 120) current = id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <nav className={scrolled ? 'nav nav-scrolled' : 'nav'} aria-label="Principal">
        <a className="brand" href="#top" onClick={() => setOpen(false)}>
          LUIS<span>GRASSO</span>
        </a>
        <div className="navlinks">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={active === l.href.slice(1) ? 'nav-active' : undefined}
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="nav-end">
          <a className="nav-cta" href="#contacto">
            Conversemos
          </a>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={open ? 'mobile-menu open' : 'mobile-menu'}
        hidden={!open}
      >
        <div className="mobile-menu-inner">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={active === l.href.slice(1) ? 'nav-active' : undefined}
            >
              {l.label}
            </a>
          ))}
          <a
            className="mobile-cta"
            href="mailto:grasso.luis@gmail.com?subject=Proyecto%20/%20consulta"
            onClick={() => setOpen(false)}
          >
            grasso.luis@gmail.com
          </a>
        </div>
      </div>

      <a href="#contacto" className="sticky-contact" aria-label="Ir a contacto">
        Contacto
      </a>
    </>
  )
}
