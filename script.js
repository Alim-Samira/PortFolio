function showPage(pageId) {
    // 1. Cacher toutes les pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // 2. Afficher la page demandée
    const targetPage = document.getElementById(pageId);
    targetPage.classList.add('active');

    // 3. Mettre à jour le menu (couleur bleue sur l'onglet actif)
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('data-target') === pageId) {
            link.classList.add('active');
        }
    });

    // Scroll automatique vers le haut de la page
    window.scrollTo(0, 0);
}

// Simulation d'ajout de fichier
document.querySelectorAll('input[type="file"]').forEach(input => {
    input.addEventListener('change', function() {
        if(this.files[0]) {
            alert("Fichier sélectionné : " + this.files[0].name + ". Pour le sauvegarder réellement, il faudra le 'pusher' sur ton GitHub Assets.");
        }
    });
});