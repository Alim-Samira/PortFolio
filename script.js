function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(pageId);
    if (target) target.classList.add('active');

    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    if(event) event.currentTarget.classList.add('active');
    
    window.scrollTo({top: 0, behavior: 'smooth'});
}

function showName(input, targetId) {
    const target = document.getElementById(targetId);
    if (input.files.length > 0) {
        target.innerHTML = `<i class="fas fa-check"></i> Prêt : ${input.files[0].name}`;
    }
}