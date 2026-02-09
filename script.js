function showPage(pageId) {
    // Masquer les sections
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active'));

    // Afficher la page cible
    const target = document.getElementById(pageId);
    if (target) {
        target.classList.add('active');
    }

    // Gérer l'état actif du menu
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => link.classList.remove('active'));
    
    // Marquer le lien actuel comme actif
    event.currentTarget.classList.add('active');

    // Scroll vers le haut fluide
    window.scrollTo({top: 0, behavior: 'smooth'});
}

function showName(input, targetId) {
    const target = document.getElementById(targetId);
    if (input.files.length > 0) {
        target.innerHTML = `<i class="fas fa-check"></i> Prêt : ${input.files[0].name}`;
    }
}