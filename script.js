function showPage(pageId) {
    // Cache toutes les pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    // Affiche la page sélectionnée
    const target = document.getElementById(pageId);
    if (target) target.classList.add('active');

    // Met à jour le menu actif
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    event.currentTarget.classList.add('active');
    
    // Remonte en haut de page
    window.scrollTo({top: 0, behavior: 'smooth'});
}

function showName(input, targetId) {
    const target = document.getElementById(targetId);
    if (input.files.length > 0) {
        target.innerHTML = `<i class="fas fa-check"></i> Prêt pour l'envoi : ${input.files[0].name}`;
    }
}