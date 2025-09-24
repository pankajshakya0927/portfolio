function scrollToView(elementWithClass) {
    document.querySelector(elementWithClass).scrollIntoView({ behavior: 'smooth' });
}

const inViewport = (entries, observer) => {
    entries.forEach(entry => {
        entry.target.classList.toggle("is-inViewport", entry.isIntersecting);
    });
};

const obsOptions = { threshold: 0.5 };
const Obs = new IntersectionObserver(inViewport, obsOptions);

// Attach observer to every [data-inviewport] element:
const ELs_inViewport = document.querySelectorAll('[data-inviewport]');
ELs_inViewport.forEach(EL => {
    Obs.observe(EL);
});

// Update terminal window size label (approximate cols×rows using font metrics)
function updateWindowSizeLabel() {
    const el = document.getElementById('window-size');
    const container = document.querySelector('.container');
    if (!el || !container) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    const cs = getComputedStyle(container);
    const fontSize = parseFloat(cs.fontSize) || 16;          // px
    const lineHeight = parseFloat(cs.lineHeight) || fontSize * 1.2; // px
    const charW = fontSize * 0.6; // typical monospace width ratio
    const cols = Math.max(1, Math.floor(w / charW));
    const rows = Math.max(1, Math.floor(h / lineHeight));
    el.textContent = `${cols}×${rows}`;
}

document.addEventListener('DOMContentLoaded', () => {
    updateWindowSizeLabel();
    const container = document.querySelector('.container');
    // React to container size changes without manual listeners
    if (container && 'ResizeObserver' in window) {
        const ro = new ResizeObserver(() => updateWindowSizeLabel());
        ro.observe(container);
    } else {
        // Fallback: next-frame update if layout is still settling
        requestAnimationFrame(updateWindowSizeLabel);
    }
});
window.addEventListener('load', updateWindowSizeLabel);
window.addEventListener('resize', updateWindowSizeLabel);
window.addEventListener('orientationchange', updateWindowSizeLabel);
// Also update when fonts/icons finish loading might change layout
if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
        updateWindowSizeLabel();
        updateHeaderHeightVar();
        updateNavHeightVar();
    });
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

// Keep a single global command-line updated based on the active section
function updateNavHeightVar() {
    const bar = document.querySelector('.terminal-nav');
    if (!bar) return;
    const h = bar.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--nav-h', `${Math.round(h)}px`);
}

function setupSectionCommandSync() {
    const container = document.querySelector('.container');
    const cmdEl = document.querySelector('#section-command .command');
    if (!container || !cmdEl) return;

    const sections = Array.from(container.querySelectorAll('section[data-command]'));
    if (!sections.length) return;

    // Map section -> ls item for active highlighting
    const lsItems = Array.from(document.querySelectorAll('.terminal-nav .ls-output .ls-item'));
    const sectionToLs = (section) => {
        if (section.classList.contains('projectDetails')) return lsItems.find(i => i.textContent.trim().startsWith('work'));
        if (section.classList.contains('jobDescriptionContainer')) return lsItems.find(i => i.textContent.trim().startsWith('experience'));
        if (section.classList.contains('profileContainer')) return lsItems.find(i => i.textContent.trim().startsWith('about'));
        if (section.classList.contains('contactContainer')) return lsItems.find(i => i.textContent.trim().startsWith('contact'));
        if (section.classList.contains('salutationContainer')) return null; // no active for greeting
        return null;
    };

    const opts = { root: container, threshold: 0.6 };
    const io = new IntersectionObserver((entries) => {
        // pick the most visible entry
        const visible = entries
            .filter(e => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
            const cmd = visible.target.getAttribute('data-command') || '';
            if (cmd) cmdEl.textContent = cmd;

            // update active ls item
            const targetItem = sectionToLs(visible.target);
            if (targetItem) {
                lsItems.forEach(i => i.classList.remove('active'));
                targetItem.classList.add('active');
            }
        }
    }, opts);

    sections.forEach(s => io.observe(s));

    // initialize immediately with first section's command
    const first = sections[0];
    if (first) {
        const initial = first.getAttribute('data-command') || '';
        if (initial) cmdEl.textContent = initial;
        const firstItem = sectionToLs(first);
        if (firstItem) {
            lsItems.forEach(i => i.classList.remove('active'));
            firstItem.classList.add('active');
        }
    }

    // Reveal command-line once nav height measured
    const sectionCmd = document.getElementById('section-command');
    if (sectionCmd) {
        // defer to next frame to ensure CSS var set
        requestAnimationFrame(() => sectionCmd.classList.add('is-ready'));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateNavHeightVar();
    setupSectionCommandSync();
});
window.addEventListener('load', () => {
    updateNavHeightVar();
});
window.addEventListener('resize', updateNavHeightVar);

