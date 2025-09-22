function scrollToView(elementWithClass) {
    document.querySelector(elementWithClass).scrollIntoView({ behavior: 'smooth' });
}

const inViewport = (entries, observer) => {
    entries.forEach(entry => {
        entry.target.classList.toggle("is-inViewport", entry.isIntersecting);
    });
};

const Obs = new IntersectionObserver(inViewport);
const obsOptions = { threshold: 0.5 };

// Attach observer to every [data-inviewport] element:
const ELs_inViewport = document.querySelectorAll('[data-inviewport]');
ELs_inViewport.forEach(EL => {
    Obs.observe(EL, obsOptions);
});

// Update terminal window size in header based on container viewport
function updateWindowSizeLabel() {
    const el = document.getElementById('window-size');
    const container = document.querySelector('.container');
    if (!el || !container) return;
    const w = Math.round(container.clientWidth);
    const h = Math.round(container.clientHeight);
    // Estimate terminal columns/rows by measuring a typical monospace char size
    const measure = document.createElement('span');
    measure.style.visibility = 'hidden';
    measure.style.position = 'absolute';
    measure.style.whiteSpace = 'pre';
    measure.style.lineHeight = 'normal';
    // Using Red Hat Mono, match site font
    measure.style.fontFamily = "'Red Hat Mono', monospace";
    measure.textContent = 'M';
    document.body.appendChild(measure);
    let rect = measure.getBoundingClientRect();
    let charW = rect.width;
    let charH = rect.height;
    document.body.removeChild(measure);

    // Fallbacks if fonts not ready yet
    if (!charW || charW < 5 || charW > 40) charW = 8;
    if (!charH || charH < 8 || charH > 40) charH = 16;

    const cols = Math.max(1, Math.floor(w / charW));
    const rows = Math.max(1, Math.floor(h / charH));
    el.textContent = `${cols}×${rows}`;
}

document.addEventListener('DOMContentLoaded', () => {
    // Compute ASAP
    updateWindowSizeLabel();
    // In case layout settles next frame
    requestAnimationFrame(updateWindowSizeLabel);
});
window.addEventListener('load', updateWindowSizeLabel);
window.addEventListener('resize', updateWindowSizeLabel);
window.addEventListener('orientationchange', updateWindowSizeLabel);
// Also update when fonts/icons finish loading might change layout
if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(updateWindowSizeLabel);
}

// Measure header height and expose it as --header-h for CSS layout
function updateHeaderHeightVar() {
    const header = document.querySelector('.header');
    if (!header) return;
    const h = header.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--header-h', `${h}px`);
}

document.addEventListener('DOMContentLoaded', updateHeaderHeightVar);
window.addEventListener('load', updateHeaderHeightVar);
window.addEventListener('resize', updateHeaderHeightVar);

