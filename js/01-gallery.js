import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryEl = document.querySelector(".gallery");
let instance = null;
galleryEl.insertAdjacentHTML('beforeend', createGalleryMarkup(galleryItems));

function createGalleryMarkup(gallery) {
    return gallery.map(({preview, original, description})=>(`
    <div class="gallery__item">
        <a class="gallery__link" href=${original}>
            <img
            class="gallery__image"
            src=${preview}
            data-source=${original}
            alt=${description}
            />
        </a>
    </div>`)).join('');
}

galleryEl.addEventListener('click', onGalleryImgClick);

function onGalleryImgClick(e) {
    e.preventDefault();

    if (!e.target.classList.contains("gallery__image")) {
    return;
    };
    
    openModal(e);
};

function openModal(e) {
    instance = basicLightbox.create(`
    <img src="${e.target.dataset.source}">
`)
    instance.show()

    window.addEventListener('keydown', onEscCloseModal);
}

function onEscCloseModal(e) {
  if (e.key === "Escape") {
    closeModal();
  }
}

function closeModal() {
    window.removeEventListener('keydown', onEscCloseModal);
    instance.close();
};
