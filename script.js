function showPage(pageId) {
    // Masquer toutes les sections
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // Afficher la section cible
    const target = document.getElementById(pageId);
    if (target) {
        target.classList.add('active');
    }

    // Mettre à jour l'onglet actif dans le menu
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-target') === pageId) {
            link.classList.add('active');
        }
    });

    // Retour en haut de page
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Gestion de l'affichage du nom du fichier après "upload"
function updateFileName(input) {
    const status = input.parentElement.querySelector('.file-status');
    if (input.files.length > 0) {
        status.innerText = "Fichier prêt : " + input.files[0].name;
        status.style.color = "#6366f1";
    }
}