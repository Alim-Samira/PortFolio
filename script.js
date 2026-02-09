function openTab(evt, tabName) {
    // 1. Cacher tous les contenus
    const tabContents = document.querySelectorAll(".tab-content");
    tabContents.forEach(content => content.classList.remove("active"));

    // 2. Retirer la classe active de tous les liens
    const tabLinks = document.querySelectorAll(".tab-link");
    tabLinks.forEach(link => link.classList.remove("active"));

    // 3. Afficher le contenu actuel et ajouter la classe active au bouton
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// Optionnel : Gestion de l'upload (Simulation front-end)
const fileInput = document.getElementById('file-upload');
fileInput.addEventListener('change', (e) => {
    const fileName = e.target.files[0].name;
    alert(`Fichier "${fileName}" prêt à être lié (Note: Pour un vrai stockage, utilisez un backend ou GitHub API).`);
});