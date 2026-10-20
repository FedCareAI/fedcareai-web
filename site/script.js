const slides = [...document.querySelectorAll('.slide')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const counter = document.getElementById('current-slide');
const title = document.getElementById('current-title');
const time = document.getElementById('slide-time');
const progress = document.getElementById('progress-fill');
const previous = document.getElementById('prev-slide');
const next = document.getElementById('next-slide');
const notes = document.getElementById('speaker-notes');
const notesToggle = document.getElementById('notes-toggle');
const fullscreenToggle = document.getElementById('fullscreen-toggle');
const dialog = document.getElementById('image-dialog');
let current = 0;
let ticking = false;
let toastTimer;

document.getElementById('total-slides').textContent = String(slides.length).padStart(2, '0');

function updateSlide(index) {
  current = index;
  const slide = slides[index];
  counter.textContent = String(index + 1).padStart(2, '0');
  title.textContent = slide.dataset.title;
  time.textContent = slide.dataset.time;
  progress.style.width = `${((index + 1) / slides.length) * 100}%`;
  previous.disabled = index === 0;
  next.disabled = index === slides.length - 1;
  document.getElementById('note-heading').textContent = `${slide.dataset.time} / ${slide.dataset.title}`;
  document.getElementById('note-content').textContent = slide.dataset.notes;
  for (const link of document.querySelectorAll('[data-chapter-link]')) {
    const active = link.dataset.chapterLink === slide.dataset.chapter;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
}

// A reference line near the top also handles sections taller than the viewport.
function detectSlide() {
  const line = Math.max(100, window.innerHeight * 0.32);
  let index = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].getBoundingClientRect().top <= line) index = i;
  }
  updateSlide(index);
}

function goToSlide(index) {
  const bounded = Math.max(0, Math.min(slides.length - 1, index));
  updateSlide(bounded);
  slides[bounded].scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'start' });
  history.replaceState(null, '', `#${slides[bounded].id}`);
}

window.addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => { detectSlide(); ticking = false; });
}, { passive: true });
window.addEventListener('resize', detectSlide);
window.addEventListener('hashchange', detectSlide);
window.addEventListener('load', detectSlide);
previous.addEventListener('click', () => goToSlide(current - 1));
next.addEventListener('click', () => goToSlide(current + 1));

function toggleNotes(open = notes.hidden) {
  notes.hidden = !open;
  notesToggle.setAttribute('aria-expanded', String(open));
}
notesToggle.addEventListener('click', () => toggleNotes());
document.getElementById('close-notes').addEventListener('click', () => {
  toggleNotes(false);
  notesToggle.focus();
});

function announce(message) {
  const status = document.getElementById('status');
  status.textContent = message;
  status.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => status.classList.remove('visible'), 3500);
}

async function toggleFullscreen() {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else if (document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
    else announce('Use your browser’s fullscreen command, usually F11.');
  } catch {
    announce('Use your browser’s fullscreen command, usually F11.');
  }
}
fullscreenToggle.addEventListener('click', toggleFullscreen);
document.addEventListener('fullscreenchange', () => {
  fullscreenToggle.setAttribute('aria-label', document.fullscreenElement ? 'Exit fullscreen' : 'Enter fullscreen');
});

for (const button of document.querySelectorAll('[data-copy]')) {
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(document.getElementById(button.dataset.copy).textContent.trim());
      announce('Commands copied.');
    } catch {
      announce('Select the code in the panel to copy it.');
    }
  });
}

for (const button of document.querySelectorAll('[data-image]')) {
  button.addEventListener('click', () => {
    const image = document.getElementById('expanded-image');
    image.src = button.dataset.image;
    image.alt = button.querySelector('img').alt;
    document.getElementById('image-caption').textContent = button.dataset.caption;
    dialog.showModal();
  });
}
document.getElementById('close-image').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });

document.addEventListener('keydown', (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey || dialog.open) return;
  if (event.target.closest('input, textarea, select, [contenteditable="true"]')) return;
  if (event.key === 'Escape' && !notes.hidden) { toggleNotes(false); return; }
  const interactive = event.target.closest('button, a, [role="button"]');
  if (event.key.toLowerCase() === 'n') { event.preventDefault(); toggleNotes(); return; }
  if (event.key.toLowerCase() === 'f') { event.preventDefault(); toggleFullscreen(); return; }
  if (interactive) return;
  if (['ArrowDown', 'ArrowRight', 'PageDown', ' '].includes(event.key)) {
    event.preventDefault();
    goToSlide(current + (event.shiftKey && event.key === ' ' ? -1 : 1));
  } else if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(event.key)) {
    event.preventDefault();
    goToSlide(current - 1);
  } else if (event.key === 'Home' || event.key === 'End') {
    event.preventDefault();
    goToSlide(event.key === 'Home' ? 0 : slides.length - 1);
  }
});

updateSlide(0);
detectSlide();
