let currentIndex = 0;
const images = document.querySelectorAll('.screenshot-gallery img');

function showImages() {
    const gallery = document.querySelector('.screenshot-gallery');
    const width = images[0].clientWidth; // Largeur d'une image
    gallery.style.transform = `translateX(${-currentIndex * width}px)`;
}

function nextImage() {
    if (currentIndex < images.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0; // Recommencer au début
    }
    showImages();
}

function prevImage() {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = images.length - 1; // Aller à la dernière image
    }
    showImages();
}

window.addEventListener('resize', showImages); // Ajuste la vue lors du redimensionnement de la fenêtre

