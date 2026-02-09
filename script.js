function showPage(pageId) {
    // Cache les pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    // Affiche la page sélectionnée
    document.getElementById(pageId).classList.add('active');
    
    // Gère l'état actif du menu
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if(link.textContent.toLowerCase().includes(pageId.substring(0,3))) {
            link.classList.add('active');
        }
    });
    window.scrollTo(0, 0);
}

function updateStatus(input) {
    const parent = input.parentElement;
    if(input.files.length > 0) {
        parent.querySelector('label').textContent = "Fichier : " + input.files[0].name;
    }
}