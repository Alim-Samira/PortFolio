// ═══════════════════════════════════════════════════════════════
// Portfolio — script.js
//  FIX triple-click : showPage() reçoit l'élément directement (this)
//    au lieu d'utiliser event.currentTarget qui échoue si l'event
//    n'est pas disponible lors de l'exécution différée.
//  README chargé et rendu inline dans #readme-inline
// ═══════════════════════════════════════════════════════════════

// ── Navigation ─────────────────────────────────────────────────
// IMPORTANT : les liens appellent showPage('id', this)
// "this" = l'élément <a> cliqué, transmis directement → fiable
function showPage(pageId, clickedLink) {
    // Fade out la page active
    document.querySelectorAll('.page').forEach(p => {
        if (p.classList.contains('active')) {
            p.style.opacity = '0';
            p.style.transform = 'translateY(20px) scale(0.98)';
            setTimeout(() => { p.classList.remove('active'); }, 300);
        }
    });

    // Fade in la page cible
    setTimeout(() => {
        const target = document.getElementById(pageId);
        if (target) {
            target.classList.add('active');
            setTimeout(() => {
                target.style.opacity = '1';
                target.style.transform = 'translateY(0) scale(1)';
            }, 50);
        }
        // Charger le README quand on arrive sur la section CRM
        if (pageId === 'crm') loadReadme();
    }, 300);

    // Mettre à jour le lien actif — utilise clickedLink (this) directement
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    if (clickedLink) clickedLink.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── README inline ───────────────────────────────────────────────
// Lit assets/README.md et l'affiche directement dans #readme-inline
let readmeLoaded = false;
async function loadReadme() {
    if (readmeLoaded) return;
    const box = document.getElementById('readme-inline');
    if (!box) return;
    try {
        const res = await fetch('assets/README.md');
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const md = await res.text();
        box.innerHTML = '<div class="readme-body">' + renderMarkdown(md) + '</div>';
        readmeLoaded = true;
    } catch(e) {
        box.innerHTML = `
          <div class="readme-error">
            <i class="fas fa-exclamation-triangle"></i>
            <p>Impossible de charger le README.<br>
               Vérifie que <code>assets/README.md</code> existe dans le repo.</p>
            <a href="assets/README.md" download="AAAS_CRM_README.md" class="btn-sm" style="margin-top:10px;display:inline-block">
              <i class="fas fa-download"></i> Télécharger le README
            </a>
          </div>`;
    }
}

// Rendu Markdown → HTML (sans dépendance)
function renderMarkdown(md) {
    return md
        // Échapper HTML
        .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
        // Blocs de code (avant tout)
        .replace(/```[\w]*\n?([\s\S]*?)```/g,
            '<pre class="md-pre"><code>$1</code></pre>')
        // Titres
        .replace(/^### (.+)$/gm, '<h3 class="md-h3">$1</h3>')
        .replace(/^## (.+)$/gm,  '<h2 class="md-h2">$1</h2>')
        .replace(/^# (.+)$/gm,   '<h1 class="md-h1">$1</h1>')
        // Gras + italique
        .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
        .replace(/\*(.+?)\*/g,    '<em>$1</em>')
        // Code inline
        .replace(/`([^`\n]+)`/g,
            '<code class="md-code">$1</code>')
        // Liens
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g,
            '<a href="$2" target="_blank" rel="noopener" class="md-link">$1</a>')
        // HR
        .replace(/^---$/gm, '<hr class="md-hr">')
        // Listes
        .replace(/^[\*\-] (.+)$/gm, '<li>$1</li>')
        .replace(/(<li>[\s\S]*?<\/li>)/g, '<ul class="md-ul">$1</ul>')
        // Lignes vides → séparateur de paragraphe
        .replace(/\n{2,}/g, '\n')
        // Lignes simples non-balises
        .replace(/^(?!<[a-z])(.*\S.*)$/gm, '<p class="md-p">$1</p>');
}

// ── Hover effects sur glass cards ──────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const glassCards = document.querySelectorAll('.glass-card');
    glassCards.forEach(card => {
        card.addEventListener('mouseenter', function() { this.style.transform = 'translateY(-8px)'; });
        card.addEventListener('mouseleave', function() { this.style.transform = 'translateY(0)'; });
    });

    // Parallax orbs
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        document.body.style.setProperty('--mouse-x', `${moveX}px`);
        document.body.style.setProperty('--mouse-y', `${moveY}px`);
    });

    // Scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.glass-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Ripple effect
    const buttons = document.querySelectorAll('.btn-main, .btn-sub, .btn-sm, .btn-icon, .btn-crm');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.cssText = `
                width:${size}px;height:${size}px;
                left:${e.clientX-rect.left-size/2}px;
                top:${e.clientY-rect.top-size/2}px`;
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Navbar scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.pageYOffset > 100) {
            navbar.style.padding = '0.6rem 1.5rem';
            navbar.style.boxShadow = '0 8px 32px rgba(79,70,229,0.16), 0 0 30px rgba(255,193,227,0.4)';
        } else {
            navbar.style.padding = '0.8rem 1.5rem';
            navbar.style.boxShadow = '0 8px 32px rgba(79,70,229,0.16)';
        }
    });

    // Fade in au chargement
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });

    // PDF mobile : masquer <object> sur mobile, montrer le fallback
    if (/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)) {
        document.querySelectorAll('.pdf-embed').forEach(el => { el.style.display = 'none'; });
        document.querySelectorAll('.pdf-fallback').forEach(el => { el.style.display = 'flex'; });
    } else {
        document.querySelectorAll('.pdf-fallback').forEach(el => { el.style.display = 'none'; });
    }

    // Hover preview containers
    document.querySelectorAll('.preview-container').forEach(preview => {
        preview.addEventListener('mouseenter', function() { this.style.transform = 'scale(1.02)'; });
        preview.addEventListener('mouseleave', function() { this.style.transform = 'scale(1)'; });
    });

    document.querySelectorAll('.cert-item').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
});

// Console
console.log('%c Portfolio - Alim Samira ', 'background:linear-gradient(135deg,#4f46e5,#ffc1e3);color:white;padding:12px 20px;border-radius:8px;font-size:16px;font-weight:bold;');
console.log('%c Glassmorphism Design with Pink Gradient ✨', 'color:#ffc1e3;font-size:12px;font-weight:600;');
