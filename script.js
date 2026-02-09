function showPage(pageId) {
    // 1. Cacher les pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    // 2. Afficher la cible
    document.getElementById(pageId).classList.add('active');
    
    // 3. Update menu
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    
    window.scrollTo({top: 0, behavior: 'smooth'});
}

// Gérer l'affichage du nom du fichier quand on "ajoute" un document
function handleFile(input, statusId) {
    const status = document.getElementById(statusId);
    if(input.files.length > 0) {
        status.innerHTML = `<i class="fas fa-check-circle"></i> Fichier chargé : ${input.files[0].name}`;
    }
}