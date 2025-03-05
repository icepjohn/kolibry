// chargement des images
document.addEventListener("DOMContentLoaded", function () {
    function generateImageList(start, end, prefix = "", suffix = ".jpg") {
        return Array.from({ length: end - start + 1 }, (_, i) => `${prefix}${start + i}${suffix}`);
    }

    const galleries = [
        { id: "gallery", images: generateImageList(150, 241) },
        { id: "gallery2", images: generateImageList(100242, 100297) },
        { id: "gallery3", images: generateImageList(100000, 100041) }
    ];
    const imageFolder = "assets/images/soirées/gallery/"; // 📂 Dossier contenant les images
    let allImages = []; // Liste complète des images pour la navigation
    let currentGalleryIndex = 0; // Galerie en cours
    let currentIndex = 0; // Image actuelle

    // 🎨 Générer les images pour chaque galerie
    galleries.forEach((galleryObj, galleryIndex) => {
        let galleryElement = document.getElementById(galleryObj.id);
        galleryObj.images.forEach((imageSrc, imageIndex) => {
            let img = document.createElement("img");
            img.src = imageFolder + imageSrc;
            img.alt = "Galerie Photo";
            img.dataset.gallery = galleryIndex; // Associe l'image à sa galerie
            img.dataset.index = imageIndex; // Associe l'image à son index
            img.onclick = function () {
                openLightbox(galleryIndex, imageIndex);
            };
            galleryElement.appendChild(img);
        });

        allImages.push(...galleryObj.images);
    });

// 📌 Ouvre la lightbox et met à jour l'image
function openLightbox(galleryIndex, imageIndex) {
    currentGalleryIndex = galleryIndex;
    currentIndex = imageIndex;

    let lightbox = document.getElementById("lightbox");
    let lightboxImg = document.getElementById("lightbox-img");

    lightbox.style.display = "flex";
    lightboxImg.src = imageFolder + galleries[currentGalleryIndex].images[currentIndex];
}

// ⏭️ Navigue entre les images
    function changeImage(direction, event) {
        event.stopPropagation();
        currentIndex += direction;

        let images = galleries[currentGalleryIndex].images;

        if (currentIndex < 0) {
            currentIndex = images.length - 1;
        } else if (currentIndex >= images.length) {
            currentIndex = 0;
        }

        document.getElementById("lightbox-img").src = imageFolder + images[currentIndex];
    }

    // Attache les fonctions au `window` pour qu'elles soient accessibles dans le HTML
    window.openLightbox = openLightbox;
    window.closeLightbox = closeLightbox;
    window.changeImage = changeImage;
});
// ❌ Ferme la lightbox
function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}
function closeEvent() {
    document.getElementById("eventModal").style.display = "none";
}
function closeEventDj() {
    document.getElementById("eventModalDj").style.display = "none";
}
// Changer d’image avec les flèches
function changeImage(direction, event) {
    if (event) event.stopPropagation(); // Empêche la fermeture de la lightbox

    // Met à jour l'index en vérifiant les limites
    currentIndex = (currentIndex + direction + images.length) % images.length;

    // Mettre à jour l’image affichée
    document.getElementById("lightbox-img").src = images[currentIndex].src;
}
function openEventDJ(eventCard) {
    // Récupère les données de la carte
    let title = eventCard.getAttribute("data-title");
    let imgSrc = eventCard.getAttribute("data-img");
    let description = eventCard.getAttribute("data-description");

    // Met à jour la modale avec les infos
    document.getElementById("eventTitle").textContent = title;
    document.getElementById("eventImg").src = imgSrc;
    document.getElementById("eventDescription").textContent = description;

    // Affiche la modale
    document.getElementById("eventModalDj").style.display = "flex";
}
function openEventModalDj(title) {
    document.getElementById("eventTitle").textContent = title;


    document.getElementById("eventModalDj").style.display = "flex"; 
}
function openEvent(eventCard) {
    // Récupère les données de la carte
    let title = eventCard.getAttribute("data-title");
    let imgSrc = eventCard.getAttribute("data-img");
    let description = eventCard.getAttribute("data-description");
    let link = eventCard.getAttribute("data-link");

    // Met à jour la modale avec les infos
    document.getElementById("eventTitle").textContent = title;
    document.getElementById("eventImg").src = imgSrc;
    document.getElementById("eventDescription").textContent = description;
    document.getElementById("eventLink").href = link;

    // Affiche la modale
    document.getElementById("eventModal").style.display = "flex";
}
function openEventModal(title, linkUrl) {
    document.getElementById("eventTitle").textContent = title;

    if (linkUrl && linkUrl.trim() !== "" && linkUrl !== "#") {
        eventLink.href = linkUrl;  
        eventLink.classList.remove("disabled"); // Active le bouton
    } else {
        eventLink.removeAttribute("href"); // Supprime complètement le lien
        eventLink.classList.add("disabled"); // Désactive visuellement
    }

    document.getElementById("eventModal").style.display = "flex"; 
}

function toggleMenu() {
    document.querySelector(".nav-links").classList.toggle("show");
}
function toggleImages(card) {
    let container = card.querySelector('.image-container');
    if (container.style.display === "none" || container.style.display === "") {
        container.style.display = "block";
        setTimeout(() => { container.style.opacity = "1"; }, 10);
    } else {
        container.style.opacity = "0";
        setTimeout(() => { container.style.display = "none"; }, 500);
    }
}
document.addEventListener("DOMContentLoaded", function() {
    let form = document.getElementById("newsletter-form");

    if (form) { // Vérifie que le formulaire existe
        form.addEventListener("submit", function(event) {
            event.preventDefault(); // 🔥 Empêche la redirection

            let formData = new FormData(form);

            fetch("newsletter.php", { 
                method: "POST",
                body: formData
            })
            .then(response => response.json()) // 🔄 Convertit la réponse en JSON
            .then(data => {
                let messageBox = document.getElementById("message");

                messageBox.innerText = data.message;
                messageBox.style.display = "block";
                messageBox.style.opacity = "1";
                messageBox.style.bottom = "20px"; // 📌 Affiche en bas avec animation

                if (data.success) {
                    messageBox.style.color = "green";
                    form.reset(); // ✅ Vide le formulaire
                } else {
                    messageBox.style.color = "red";
                }

                // ⏳ Cache le message après 3 secondes
                setTimeout(() => {
                    messageBox.style.opacity = "0";
                    messageBox.style.bottom = "-50px"; // Cache avec animation
                }, 3000);
            })
            .catch(error => {
                console.error("Erreur AJAX :", error);
            });
        });
    } else {
        console.error("❌ Formulaire introuvable !");
    }
});


