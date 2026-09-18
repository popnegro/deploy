import Nav from './components/Nav'
import ContactBlock from './components/ContactBlock'

const featured = [
  {
    n: '01',
    name: 'SmartWeb',
    eyebrow: 'PRODUCTO / SAAS',
    title: 'Infraestructura digital para negocios que necesitan crecer.',
    desc: 'Plataforma para convertir sitios aislados en una infraestructura reutilizable: contenido, SEO, WhatsApp, módulos y evolución multi-tenant.',
    role: 'Product design · UX · Desarrollo',
    problem: 'Negocios locales con presencia digital fragmentada y procesos repartidos en herramientas separadas.',
    outcome: 'Sistema reutilizable que conecta presencia web, contenido, adquisición y operación.',
    decision: 'Priorizamos arquitectura multi-tenant y módulos reutilizables antes que features sueltas por cliente.',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Vercel'],
    repo: 'https://github.com/popnegro/smartweb',
    visual: 'saas' as const,
  },
  {
    n: '02',
    name: 'MuniBrain',
    eyebrow: 'AI / CIVIC TECH',
    title: 'De un problema público a un PMV accionable.',
    desc: 'Motor de descubrimiento y análisis que transforma consultas en propuestas con alcance, presupuesto, timeline, KPIs y riesgos.',
    role: 'Concepto de producto · AI UX · Frontend',
    problem: 'Ideas y necesidades difíciles de convertir rápido en iniciativas concretas y evaluables.',
    outcome: 'Experiencia que estructura el problema y lo traduce en una propuesta de intervención.',
    decision: 'El output no es un chat libre: es un plan estructurado (alcance, riesgos, KPIs) para decidir.',
    tags: ['Next.js 15', 'React 19', 'AI UX', 'Recharts'],
    repo: 'https://github.com/popnegro/munibrain',
    visual: 'ai' as const,
  },
  {
    n: '03',
    name: 'Grupo Comunicarte',
    eyebrow: 'PLATAFORMA / COMERCIAL',
    title: 'Una plataforma comercial para hacer visible el inventario.',
    desc: 'Ecosistema que conecta landing pública, mapa de soportes, inventario, dashboard, MediaKit y gestión comercial.',
    role: 'UX · Product design · Desarrollo web',
    problem: 'Inventario y oportunidades comerciales sin una capa digital clara para descubrirlos y gestionarlos.',
    outcome: 'Sistema que une ubicación, inventario y herramientas comerciales en una sola experiencia.',
    decision: 'El mapa no es decorativo: es el punto de entrada al inventario y a la conversación comercial.',
    tags: ['React', 'TypeScript', 'Maps', 'Dashboard'],
    repo: 'https://github.com/popnegro/grupo-comunicarte-refactoring',
    visual: 'map' as const,
  },
]

const moreProjects = [
  {
    n: '04',
    name: 'Emilia Sandobar',
    eyebrow: 'UX / LEGAL',
    title: 'Una experiencia digital que convierte confianza en consulta.',
    outcome: 'Sitio editorial con rutas claras, SEO y CTAs orientados a la consulta.',
    decision: 'Autoridad y claridad antes que volumen de contenido.',
    tags: ['React 19', 'TypeScript', 'Vite', 'Tailwind'],
    repo: 'https://github.com/popnegro/abogadasandobar',
  },
  {
    n: '05',
    name: 'SmartBarrio',
    eyebrow: 'COMERCIO LOCAL',
    title: 'Presencia y descubrimiento para la economía de proximidad.',
    outcome: 'Propuesta de infraestructura digital centrada en descubrimiento local.',
    decision: 'Marketplace solo donde aporta conexión real demanda–oferta de barrio.',
    tags: ['SaaS', 'Local Commerce'],
    repo: 'https://github.com/popnegro/smartbarrio-saas',
  },
  {
    n: '06',
    name: 'Confirmá',
    eyebrow: 'WHATSAPP / SALUD',
    title: 'Confirmación diseñada alrededor del paciente.',
    outcome: 'Flujo conversacional de confirmación, reprogramación y beneficios por franja.',
    decision: 'WhatsApp como canal principal: menos fricción que una app nueva.',
    tags: ['WhatsApp', 'Product Design', 'PMV'],
    repo: 'https://github.com/popnegro/confirma',
  },
]

const brands = [
  { name: 'La Proa Com&Mkt', role: 'Director de arte / Brand', years: '2020–2021' },
  { name: 'Gambler UI', role: 'Founder · Diseño UI/web', years: '2017–hoy' },
  { name: 'Voyenbus.com', role: 'Brand & Digital Designer', years: '2012–2020' },
  { name: 'Ideologik', role: 'Senior Graphic Designer', years: '2008–2012' },
]

function Visual({ type }: { type: string }) {
  if (type === 'ai')
    return (
      <div className="visual ai" aria-hidden="true">
        <div className="ai-top">REASONING ENGINE <span>● LIVE</span></div>
        <div className="steps"><b>01</b><i>Discovery</i><b>02</b><i>Analysis</i><b>03</b><i>PMV</i></div>
        <div className="result"><small>PROPOSED PMV</small><strong>Intervention plan</strong><div className="bars"><em /><em /><em /><em /></div></div>
      </div>
    )
  if (type === 'map')
    return (
      <div className="visual map" aria-hidden="true">
        <div className="map-grid" /><div className="route" />
        <span className="pin p1" /><span className="pin p2" /><span className="pin p3" /><span className="pin p4" />
        <div className="map-label">MENDOZA / BUENOS AIRES</div>
      </div>
    )
  return (
    <div className="visual saas" aria-hidden="true">
      <div className="browser">
        <header><span /><span /><span /></header>
        <div className="browser-body"><aside /><main><div className="metric-row"><b /><b /><b /></div><div className="panel" /><div className="panel short" /></main></div>
      </div>
      <div className="stack">WEBSITE → CONTENT → MODULES</div>
    </div>
  )
}

export default function Home() {
  return (
    <main>
      <Nav />

      <section className="hero" id="top">
        <div className="eyebrow">PRODUCT DESIGN · UX/UI · WEB · BUSINESS <span>·</span> MENDOZA, ARGENTINA</div>
        <h1>15+ años<br /><em>convirtiendo problemas en productos.</em></h1>
        <p className="hero-copy">Soy Luis Grasso. Diseñador y constructor digital. Más de 15 años entre comunicación, diseño, web, UX/UI, marketing y tecnología me enseñaron que una buena solución no empieza por la interfaz: empieza por entender qué problema vale la pena resolver y para quién.</p>
        <div className="hero-actions">
          <a className="hero-link" href="#trabajo">Ver trabajo <span>↓</span></a>
          <a className="hero-secondary" href="#servicios">Qué puedo resolver</a>
        </div>
        <div className="hero-meta">
          <span>TRABAJO SELECCIONADO / PRESENTE</span>
          <span>DISEÑO → USUARIO → NEGOCIO → PRODUCTO</span>
        </div>
      </section>

      <section className="statement">
        <p>“El cargo cambia.<br /><strong>El oficio permanece.</strong>”</p>
        <div>01 / OFICIO</div>
      </section>

      <section className="work" id="trabajo">
        <div className="section-head">
          <span>TRABAJO SELECCIONADO</span>
          <h2>Problemas que estoy<br /><em>aprendiendo a resolver.</em></h2>
        </div>

        {featured.map((p, i) => (
          <article className={i % 2 === 1 ? 'project project-alt' : 'project'} key={p.name}>
            <div className="project-top">
              <span>{p.n} / {p.eyebrow}</span>
              <a href={`${p.repo}#readme`} target="_blank" rel="noopener noreferrer">Caso / repo ↗</a>
            </div>
            <div className="project-grid">
              <div className="project-copy">
                <h3>{p.name}</h3>
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
                <div className="project-evidence">
                  <div><small>ROL</small><span>{p.role}</span></div>
                  <div><small>PROBLEMA</small><span>{p.problem}</span></div>
                  <div><small>RESULTADO</small><span>{p.outcome}</span></div>
                  <div><small>DECISIÓN</small><span>{p.decision}</span></div>
                </div>
                <div className="tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
                <div className="project-ctas">
                  <a className="project-cta-primary" href={`${p.repo}#readme`} target="_blank" rel="noopener noreferrer">Ver documentación ↗</a>
                </div>
              </div>
              <Visual type={p.visual} />
            </div>
          </article>
        ))}

        <details className="more-work">
          <summary><span>Más proyectos</span><span className="more-count">{moreProjects.length}</span></summary>
          <div className="more-grid">
            {moreProjects.map((p) => (
              <article className="more-card" key={p.name}>
                <span className="more-meta">{p.n} / {p.eyebrow}</span>
                <h3>{p.name}</h3>
                <h4>{p.title}</h4>
                <p>{p.outcome}</p>
                <p className="more-decision"><strong>Decisión:</strong> {p.decision}</p>
                <div className="tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
                <a href={`${p.repo}#readme`} target="_blank" rel="noopener noreferrer">Repo ↗</a>
              </article>
            ))}
          </div>
        </details>
      </section>

      <section className="services" id="servicios">
        <div className="section-head">
          <span>EN QUÉ PUEDO AYUDAR</span>
          <h2>Diseño con criterio<br /><em>de negocio.</em></h2>
        </div>
        <div className="service-grid">
          <div><b>01</b><h3>Definir un producto</h3><p>Ordenar una idea, entender el problema, priorizar y convertir una oportunidad en un alcance posible.</p></div>
          <div><b>02</b><h3>Diseñar una experiencia</h3><p>Arquitectura, UX/UI, contenido e interfaces que aclaren el camino entre una necesidad y una acción.</p></div>
          <div><b>03</b><h3>Construir una primera versión</h3><p>MVPs, sitios, aplicaciones y sistemas donde diseño y ejecución trabajan juntos desde el inicio.</p></div>
          <div><b>04</b><h3>Mejorar lo que ya existe</h3><p>Auditar, simplificar y evolucionar productos cuando el problema ya no es empezar, sino decidir qué cambiar.</p></div>
        </div>
        <p className="services-tags" aria-label="Capacidades">Brand & Visual · UX/UI · Web apps · Product strategy · SaaS · AI products · Analytics</p>
      </section>

      <section className="approach" id="enfoque">
        <div className="section-head">
          <span>ENFOQUE</span>
          <h2>Antes de diseñar,<br /><em>hay que decidir.</em></h2>
        </div>
        <div className="process">
          {[
            ['01', 'Entender', 'El problema, el contexto y lo que realmente necesita resolverse.'],
            ['02', 'Usuario', 'Diseñar alrededor de una persona, una necesidad y una situación concreta.'],
            ['03', 'Negocio', 'Objetivos, recursos, operación, adquisición y viabilidad.'],
            ['04', 'Diseño', 'Convertir complejidad en una experiencia clara y usable.'],
            ['05', 'Construir', 'Lo suficiente para aprender, sin complejidad innecesaria.'],
            ['06', 'Evolucionar', 'Medir, observar y mejorar antes de dar por definitiva la primera solución.'],
          ].map((x) => (
            <div key={x[0]}><b>{x[0]}</b><h3>{x[1]}</h3><p>{x[2]}</p></div>
          ))}
        </div>
      </section>

      <section className="story" id="historia">
        <div className="section-head">
          <span>TRAYECTORIA</span>
          <h2>No cambié de profesión.<br /><em>La fui llevando más lejos.</em></h2>
        </div>
        <div className="story-grid">
          <div className="story-lead">
            <p>Durante más de 15 años trabajé entre agencias, startups, empresas y proyectos independientes: diseño gráfico, branding, campañas, web, UI/UX, marketing y tecnología.</p>
            <p>Las etiquetas importan menos que el problema de delante. Hoy uso ese recorrido para pensar, diseñar y construir productos digitales con mirada de negocio.</p>
          </div>
          <div className="timeline">
            <div><b>01</b><strong>Comunicar</strong><span>Observar, escuchar y hacer comprensible una idea.</span></div>
            <div><b>02</b><strong>Entender al usuario</strong><span>De la pieza a la necesidad y la fricción.</span></div>
            <div><b>03</b><strong>Entender el negocio</strong><span>Objetivos, recursos, operación y restricciones.</span></div>
            <div><b>04</b><strong>Construir producto</strong><span>Criterio y tecnología en algo usable que evoluciona.</span></div>
          </div>
        </div>
      </section>

      <section className="archive" id="archivo">
        <div className="section-head">
          <span>CONTEXTO / EXPERIENCIA</span>
          <h2>La experiencia detrás<br /><em>del presente.</em></h2>
        </div>
        <p className="archive-intro">No es otro portfolio: es el criterio con el que trabajo hoy.</p>
        <div className="archive-grid">
          <article><span>01 / BRANDING</span><h3>Sistemas de marca</h3><p>Identidad, key visual y sistemas gráficos entre agencias, startups y trabajo independiente.</p></article>
          <article><span>02 / CAMPAÑAS</span><h3>Comunicación digital</h3><p>RRSS, Meta Ads, Google Ads, email, banners y adaptaciones multiformato.</p></article>
          <article><span>03 / COMUNICACIÓN</span><h3>Visual institucional</h3><p>Publicidad e institucional multi-canal con consistencia de marca.</p></article>
          <article><span>04 / DIGITAL</span><h3>Web e interfaces</h3><p>Diseño web y UI/UX como puente entre comunicación, contenido y producto.</p></article>
        </div>
        <div className="brands">
          <div className="brands-head"><span>EXPERIENCIA SELECCIONADA</span></div>
          <div className="brands-track">
            {brands.map((b) => (
              <div className="brand-card" key={b.name}>
                <span>{b.years}</span>
                <strong>{b.name}</strong>
                <small>{b.role}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="manifest" id="manifiesto">
        <div className="section-head">
          <span>CÓMO TRABAJO</span>
          <h2>Tres principios.<br /><em>Un oficio.</em></h2>
        </div>
        <div className="manifest-grid manifest-grid-3">
          <article><b>01 / APRENDER</b><h3>Cada proyecto enseña algo.</h3><p>Observar, preguntar y aprender lo suficiente para tomar una buena decisión.</p></article>
          <article><b>02 / USUARIO + NEGOCIO</b><h3>La interfaz es consecuencia.</h3><p>Persona, necesidad y contexto — y también objetivos, costos y operación.</p></article>
          <article><b>03 / PRODUCTO</b><h3>Construir no es el objetivo.</h3><p>El objetivo es resolver algo que importa. Diseño y tecnología son medios.</p></article>
        </div>
      </section>

      <section className="closing" id="contacto">
        <span>EQUIPOS, STARTUPS, AGENCIAS Y NEGOCIOS</span>
        <h2>¿Tenés un problema<br /><em>que valga la pena resolver?</em></h2>
        <p className="closing-copy">Podemos empezar por entenderlo: qué necesita el proyecto, qué tiene sentido construir ahora y qué puede esperar.</p>
        <ContactBlock />
      </section>

      <footer>
        <span>LUIS GRASSO / DIGITAL PRODUCT DESIGN</span>
        <span>MENDOZA · ARGENTINA</span>
        <a href="https://github.com/popnegro" target="_blank" rel="noopener noreferrer">github.com/popnegro ↗</a>
      </footer>
    </main>
  )
}
