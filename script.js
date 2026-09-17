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

// ═══════════════════════════════════════════════════════════════
// GAME HERO — expérience interactive de la page d'accueil
// (scindée du reste : n'affecte que #about)
// ═══════════════════════════════════════════════════════════════
(function () {
    const WORLDS = [
        {
            key: 'lecture',
            icon: 'fa-book-open',
            title: 'Lecture',
            sub: "Livres, histoires & imagination",
            accent: '#818cf8',
            tag: 'Chapitre 01'
        },
        {
            key: 'jeux',
            icon: 'fa-gamepad',
            title: 'Création de jeux',
            sub: 'Game dev, créativité, mondes interactifs',
            accent: '#ff9ec9',
            tag: 'Chapitre 02'
        },
        {
            key: 'video',
            icon: 'fa-clapperboard',
            title: 'Montage vidéo',
            sub: 'Narration visuelle, mouvement, cinéma',
            accent: '#ffc1e3',
            tag: 'Chapitre 03'
        },
        {
            key: 'ecriture',
            icon: 'fa-pen-nib',
            title: 'Écriture',
            sub: 'Idées, récits, personnages, créativité',
            accent: '#4f46e5',
            tag: 'Chapitre 04'
        }
    ];

    let currentWorld = 0;
    let autoplayTimer = null;
    let isFlipping = false;

    function $(id) { return document.getElementById(id); }

    function applyWorld(index) {
        const world = WORLDS[index];
        const frame = $('portraitFrame');
        const stage = $('portraitStage');
        if (!frame) return;

        // set on the shared ancestor so ring, glow, caption icon and dots all inherit it
        (stage || frame).style.setProperty('--world-accent', world.accent);
        $('worldIcon').innerHTML = `<i class="fas ${world.icon}"></i>`;
        $('worldTitle').textContent = world.title;
        $('worldSub').textContent = world.sub;
        $('frameTag').textContent = world.tag;

        document.querySelectorAll('.world-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        // re-trigger caption entrance animations
        ['worldIcon', 'worldTitle', 'worldSub'].forEach(id => {
            const el = $(id);
            if (!el) return;
            el.style.animation = 'none';
            void el.offsetWidth; // reflow
            el.style.animation = '';
        });

        spawnBurst(world);
    }

    function goToWorld(index, restartAutoplay = true) {
        if (isFlipping) return;
        const frame = $('portraitFrame');
        if (!frame) return;
        isFlipping = true;

        const next = (index + WORLDS.length) % WORLDS.length;
        frame.classList.add('flip-out');

        setTimeout(() => {
            currentWorld = next;
            applyWorld(currentWorld);
            frame.classList.remove('flip-out');
            frame.classList.add('flip-in');
            setTimeout(() => {
                frame.classList.remove('flip-in');
                isFlipping = false;
            }, 350);
        }, 350);

        if (restartAutoplay) restartAutoplayTimer();
    }

    function restartAutoplayTimer() {
        clearInterval(autoplayTimer);
        autoplayTimer = setInterval(() => goToWorld(currentWorld + 1, false), 6000);
    }

    // ── Particles ("chapter" themed floating icons) ──────────────
    function spawnBurst(world) {
        const hero = $('gameHero');
        if (!hero) return;
        const rect = hero.getBoundingClientRect();
        const stage = $('portraitStage');
        if (!stage) return;
        const stageRect = stage.getBoundingClientRect();
        const originX = stageRect.left - rect.left + stageRect.width / 2;
        const originY = stageRect.top - rect.top + stageRect.height / 2;

        for (let i = 0; i < 6; i++) {
            setTimeout(() => spawnParticle(hero, world, originX, originY), i * 90);
        }
    }

    function spawnParticle(hero, world, originX, originY) {
        const p = document.createElement('i');
        p.className = `hero-particle fas ${world.icon}`;
        const angle = Math.random() * Math.PI * 2;
        const radius = 60 + Math.random() * 90;
        const x = originX + Math.cos(angle) * radius;
        const y = originY + Math.sin(angle) * radius * 0.6;
        p.style.left = `${x}px`;
        p.style.top = `${y}px`;
        p.style.setProperty('--world-accent', world.accent);
        p.style.fontSize = `${0.7 + Math.random() * 0.6}rem`;
        hero.appendChild(p);
        setTimeout(() => p.remove(), 4600);
    }

    // ── Ambient background particles (idle, slower) ──────────────
    function startAmbientParticles() {
        setInterval(() => {
            const hero = $('gameHero');
            if (!hero) return;
            const world = WORLDS[currentWorld];
            const rect = hero.getBoundingClientRect();
            const p = document.createElement('i');
            p.className = `hero-particle fas ${world.icon}`;
            p.style.left = `${Math.random() * rect.width}px`;
            p.style.top = `${rect.height - 20}px`;
            p.style.setProperty('--world-accent', world.accent);
            p.style.fontSize = '0.6rem';
            p.style.opacity = '0.35';
            hero.appendChild(p);
            setTimeout(() => p.remove(), 4600);
        }, 1400);
    }

    // ── Parallax tilt on portrait frame ───────────────────────────
    function initParallax() {
        const stage = $('portraitStage');
        const frame = $('portraitFrame');
        if (!stage || !frame) return;

        stage.addEventListener('mousemove', (e) => {
            if (isFlipping) return;
            const rect = frame.getBoundingClientRect();
            const relX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
            const relY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
            const rotY = Math.max(-1, Math.min(1, relX)) * 12;
            const rotX = Math.max(-1, Math.min(1, relY)) * -12;
            frame.style.transform = `rotateY(${rotY}deg) rotateX(${rotX}deg)`;
        });
        stage.addEventListener('mouseleave', () => {
            if (!isFlipping) frame.style.transform = 'rotateY(0) rotateX(0)';
        });

        stage.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
        stage.addEventListener('mouseleave', () => restartAutoplayTimer());
    }

    // ── Controls ──────────────────────────────────────────────────
    function initControls() {
        const prev = $('worldPrev');
        const next = $('worldNext');
        if (prev) prev.addEventListener('click', () => goToWorld(currentWorld - 1));
        if (next) next.addEventListener('click', () => goToWorld(currentWorld + 1));

        document.querySelectorAll('.world-dot').forEach(dot => {
            dot.addEventListener('click', () => goToWorld(parseInt(dot.dataset.index, 10)));
        });

        document.addEventListener('keydown', (e) => {
            const aboutPage = $('about');
            if (!aboutPage || !aboutPage.classList.contains('active')) return;
            if (e.key === 'ArrowLeft') goToWorld(currentWorld - 1);
            if (e.key === 'ArrowRight') goToWorld(currentWorld + 1);
        });
    }

    // ── Lightweight canvas starfield / sparkle background ─────────
    function initCanvas() {
        const canvas = $('particleCanvas');
        const hero = $('gameHero');
        if (!canvas || !hero) return;
        const ctx = canvas.getContext('2d');
        let dots = [];
        let raf = null;

        function resize() {
            const rect = hero.getBoundingClientRect();
            canvas.width = rect.width * devicePixelRatio;
            canvas.height = rect.height * devicePixelRatio;
            canvas.style.width = rect.width + 'px';
            canvas.style.height = rect.height + 'px';
            ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
            const count = Math.round((rect.width * rect.height) / 9000);
            dots = Array.from({ length: Math.max(18, Math.min(50, count)) }, () => ({
                x: Math.random() * rect.width,
                y: Math.random() * rect.height,
                r: Math.random() * 1.6 + 0.4,
                s: Math.random() * 0.3 + 0.05,
                o: Math.random() * 0.5 + 0.2
            }));
        }

        function tick() {
            const rect = hero.getBoundingClientRect();
            ctx.clearRect(0, 0, rect.width, rect.height);
            const accent = getComputedStyle($('portraitFrame') || document.body)
                .getPropertyValue('--world-accent') || '#818cf8';
            dots.forEach(d => {
                d.y -= d.s;
                if (d.y < -4) d.y = rect.height + 4;
                ctx.beginPath();
                ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
                ctx.fillStyle = accent.trim();
                ctx.globalAlpha = d.o;
                ctx.fill();
            });
            ctx.globalAlpha = 1;
            raf = requestAnimationFrame(tick);
        }

        resize();
        window.addEventListener('resize', resize);
        tick();
    }

    function replayEntrance() {
        const hero = $('gameHero');
        if (!hero) return;
        hero.classList.remove('replay');
        void hero.offsetWidth;
        hero.classList.add('replay');
    }

    // Hook into navigation so the intro replays when returning home
    const originalShowPage = window.showPage;
    if (typeof originalShowPage === 'function') {
        window.showPage = function (pageId, clickedLink) {
            originalShowPage(pageId, clickedLink);
            if (pageId === 'about') setTimeout(replayEntrance, 320);
        };
    }

    function initGameHero() {
        if (!$('gameHero')) return;
        applyWorld(currentWorld);
        initControls();
        initParallax();
        initCanvas();
        restartAutoplayTimer();
        startAmbientParticles();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGameHero);
    } else {
        initGameHero();
    }
})();
