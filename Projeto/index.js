const noticias = document.querySelectorAll(".noticia");
const principal = document.querySelector(".noticia-principal");
const prevButton = document.querySelector(".btn-prev");
const nextButton = document.querySelector(".btn-next");
let currentIndex = 0;

function updateNoticiaPrincipal() {
    const noticiaAtual = noticias[currentIndex];
    const imgSrc = noticiaAtual.querySelector("img").src;
    const text = noticiaAtual.querySelector("p").textContent;

    principal.querySelector("img").src = imgSrc;
    principal.querySelector("p").textContent = text;
}

nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % noticias.length;
    updateNoticiaPrincipal();
});

prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + noticias.length) % noticias.length;
    updateNoticiaPrincipal();
});