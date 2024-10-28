let currentImageIndex = 0;
const images = document.querySelectorAll('.screenshot-gallery img');
const totalImages = images.length;
const gallery = document.querySelector('.screenshot-gallery');

function updateCarousel() {
    const offset = -(currentImageIndex * (100 / 3)); // Calcule l'offset pour faire défiler 3 images
    gallery.style.transform = `translateX(${offset}%)`; // Applique l'animation avec `translateX`
}

function prevImage() {
    currentImageIndex -= 1;
    if (currentImageIndex < 0) {
        currentImageIndex = totalImages - 3; // Revient aux 3 dernières images si on est au début
    }
    updateCarousel();
}

function nextImage() {
    currentImageIndex += 1;
    if (currentImageIndex > totalImages - 3) {
        currentImageIndex = 0; // Revient aux 3 premières images si on est à la fin
    }
    updateCarousel();
}

// Affiche les premières images au chargement
updateCarousel();

 // Fonction pour agrandir l'image lorsqu'on clique dessus
 function agrandirImage(img) {
    var imagePopup = document.getElementById("imagePopup");
    var imageElement = imagePopup.querySelector("img");
    imageElement.src = img.src; // Définit l'image à afficher en plein écran
    imagePopup.style.display = "flex";
}

// Fonction pour fermer l'image en plein écran
function fermerImage() {
    document.getElementById("imagePopup").style.display = "none";
}



