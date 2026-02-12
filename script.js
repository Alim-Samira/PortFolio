// Navigation with Smooth Transitions
function showPage(pageId) {
    // Remove active class from all pages with fade out effect
    document.querySelectorAll('.page').forEach(p => {
        if (p.classList.contains('active')) {
            p.style.opacity = '0';
            p.style.transform = 'translateY(20px) scale(0.98)';
            
            setTimeout(() => {
                p.classList.remove('active');
            }, 300);
        }
    });

    // Activate target page with fade in effect
    setTimeout(() => {
        const target = document.getElementById(pageId);
        if (target) {
            target.classList.add('active');
            setTimeout(() => {
                target.style.opacity = '1';
                target.style.transform = 'translateY(0) scale(1)';
            }, 50);
        }
    }, 300);

    // Update navigation active states
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }

    // Smooth scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add hover effects to glass cards
document.addEventListener('DOMContentLoaded', () => {
    const glassCards = document.querySelectorAll('.glass-card');
    
    glassCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add parallax effect to background orbs
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        
        document.body.style.setProperty('--mouse-x', `${moveX}px`);
        document.body.style.setProperty('--mouse-y', `${moveY}px`);
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all glass cards for scroll animations
    document.querySelectorAll('.glass-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn-main, .btn-sub, .btn-sm, .btn-icon');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Enhance navbar on scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const navbar = document.querySelector('.navbar');
        
        if (currentScroll > 100) {
            navbar.style.padding = '0.6rem 1.5rem';
            navbar.style.boxShadow = '0 8px 32px rgba(79, 70, 229, 0.16), 0 0 30px rgba(255, 193, 227, 0.4)';
        } else {
            navbar.style.padding = '0.8rem 1.5rem';
            navbar.style.boxShadow = '0 8px 32px rgba(79, 70, 229, 0.16)';
        }
        
        lastScroll = currentScroll;
    });

    // Add loading animation for  loading
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });

    // Enhance preview containers
    const previews = document.querySelectorAll('.preview-container');
    previews.forEach(preview => {
        preview.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        preview.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Add smooth transitions to certification items
    const certItems = document.querySelectorAll('.cert-item');
    certItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
});

// Console styling
console.log(
    '%c Portfolio - Alim Samira ',
    'background: linear-gradient(135deg, #4f46e5, #ffc1e3); color: white; padding: 12px 20px; border-radius: 8px; font-size: 16px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.2);'
);

console.log(
    '%c Glassmorphism Design with Pink Gradient ✨',
    'color: #ffc1e3; font-size: 12px; font-weight: 600;'
);
