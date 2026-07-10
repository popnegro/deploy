// script.js

async function initializePortfolio() {
    const grid = document.getElementById('grid');
    if (!grid) {
        console.error("Fatal Error: Grid element not found.");
        return;
    }

    try {
        // Muestra un estado de carga inicial
        grid.innerHTML = '<p>Cargando proyectos...</p>';

        // 1. Cargar los datos de proyectos e imágenes en paralelo
        const [projectsResponse, imagesResponse] = await Promise.all([
            fetch('projects.json'),
            fetch('images.json')
        ]);

        if (!projectsResponse.ok || !imagesResponse.ok) {
            throw new Error('No se pudieron cargar los archivos de datos.');
        }

        const PROJECTS = await projectsResponse.json();
        const IMAGES = await imagesResponse.json();

        // 2. Una vez cargados los datos, renderizar la UI
        renderGrid(PROJECTS, IMAGES, 'all');
        
        // 3. Configurar los filtros
        setupFilters(PROJECTS, IMAGES);

        // 4. Configurar el Lightbox
        setupLightbox(PROJECTS, IMAGES);

    } catch (error) {
        console.error("Error al inicializar el portfolio:", error);
        grid.innerHTML = "<p style='color: var(--signal);'>Error al cargar los proyectos. Por favor, intente de nuevo más tarde.</p>";
    }
}

function imgSrc(key, IMAGES) {
    return IMAGES[key] || '';
}

function getProjectImages(p, IMAGES){
  if (Array.isArray(p.images) && p.images.length) {
    return p.images.map(key => imgSrc(key, IMAGES));
  }
  return [];
}

function getProjectImage(p, IMAGES, prioritize = false){
  const images = getProjectImages(p, IMAGES);
  if (!images.length) return '';
  return prioritize ? images[0] : images[0];
}

function renderGrid(PROJECTS, IMAGES, filter) {
    const grid = document.getElementById('grid');
    grid.innerHTML = "";
    
    const fragment = document.createDocumentFragment();

    PROJECTS.forEach((p, idx) => {
        if (filter !== 'all' && p.catKey !== filter) return;
        
        const card = document.createElement('div');
        card.className = 'card';
        const imagePath = getProjectImage(p, IMAGES, true);
        const images = getProjectImages(p, IMAGES);

        card.innerHTML = `
          <div class="frame is-loading">
            <img alt="${p.title}" loading="${idx < 4 ? 'eager' : 'lazy'}" decoding="async" width="1200" height="750">
            <span class="frame-tag">Fr. ${String(idx+1).padStart(2,'0')}/${PROJECTS.length}</span>
            ${images.length > 1 ? `<span class="frame-count">${images.length} piezas</span>` : ''}
          </div>
          <div class="card-body">
            <div class="card-cat ${p.catKey === 'Rebranding' ? 'rebrand' : ''}">${p.category}</div>
            <div class="card-title">${p.title}</div>
            <div class="card-desc">${p.desc}</div>
          </div>`;
        
        const img = card.querySelector('img');
        const frame = card.querySelector('.frame');

        // Optimización: Solo establecer el 'src' cuando esté a punto de ser visible (para lazy-loading)
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                img.src = imagePath;
                observer.disconnect(); // Dejar de observar una vez que se carga
            }
        }, { rootMargin: '50px' });

        if (img.loading === 'lazy') {
            observer.observe(card);
        } else {
            img.src = imagePath; // Cargar inmediatamente para imágenes 'eager'
        }

        img.onload = () => frame.classList.remove('is-loading');
        img.onerror = () => frame.classList.remove('is-loading'); // También en caso de error

        card.addEventListener('click', () => openLightbox(PROJECTS.indexOf(p), 0, PROJECTS, IMAGES));

        fragment.appendChild(card);
    });

    grid.appendChild(fragment);
}

function setupFilters(PROJECTS, IMAGES) {
    const filters = document.getElementById('filters');
    if (!filters) return;
    filters.addEventListener('click', (e) => {
        if (e.target.classList.contains('chip')) {
            const currentActive = filters.querySelector('.active');
            if (currentActive) currentActive.classList.remove('active');
            e.target.classList.add('active');
            renderGrid(PROJECTS, IMAGES, e.target.dataset.filter);
        }
    });
}

// Estado y funciones del Lightbox
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbTitle = document.getElementById('lbTitle');
const lbDesc = document.getElementById('lbDesc');
const lbCount = document.getElementById('lbCount');
let currentProjectIndex = 0;
let currentImageIndex = 0;
let activeProjects = [];
let activeImages = {};

function setupLightbox(PROJECTS, IMAGES) {
    if (!lightbox) return;
    
    activeProjects = PROJECTS;
    activeImages = IMAGES;

    document.getElementById('lbClose').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => { if(e.target === lightbox) closeLightbox(); });
    document.getElementById('lbPrev').addEventListener('click', () => navigateLightbox(-1));
    document.getElementById('lbNext').addEventListener('click', () => navigateLightbox(1));

    document.addEventListener('keydown', (e) => {
      if(!lightbox.classList.contains('open')) return;
      if(e.key === 'Escape') closeLightbox();
      if(e.key === 'ArrowRight') navigateLightbox(1);
      if(e.key === 'ArrowLeft') navigateLightbox(-1);
    });
}

function openLightbox(projectIndex, imageIndex, PROJECTS, IMAGES) {
    currentProjectIndex = projectIndex;
    currentImageIndex = imageIndex;
    activeProjects = PROJECTS; // Actualizar con los datos cargados
    activeImages = IMAGES;
    updateLightboxContent();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
}

function navigateLightbox(direction) {
    const p = activeProjects[currentProjectIndex];
    const images = getProjectImages(p, activeImages);
    if (images.length > 1) {
        currentImageIndex = (currentImageIndex + direction + images.length) % images.length;
    }
    updateLightboxContent();
}

function updateLightboxContent() {
    const p = activeProjects[currentProjectIndex];
    const images = getProjectImages(p, activeImages);
    const imagePath = images[currentImageIndex];

    lbImg.src = imagePath;
    lbTitle.textContent = p.title;
    lbDesc.textContent = p.desc;
    lbCount.textContent = `${p.category} — pieza ${currentImageIndex + 1} de ${images.length}`;
}


// Iniciar la aplicación
document.addEventListener('DOMContentLoaded', initializePortfolio);
