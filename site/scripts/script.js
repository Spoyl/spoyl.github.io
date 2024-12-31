const previewWidth = 680;
const clickNext = document.querySelectorAll(".next");
const scrollWindows = document.querySelectorAll(".blog-window");
const clickPrev = document.querySelectorAll(".prev");
const canvas = document.getElementById("charcanvas");
const ctx = canvas.getContext("2d");

function scrollToNext(index){
    scrollWindows[index].scrollLeft += previewWidth;
}

function scrollToPrev(index){
    scrollWindows[index].scrollLeft -= previewWidth;
}

for (let i = 0; i < scrollWindows.length; i++){
    clickNext[i].addEventListener("click", () => scrollToNext(i));
    clickPrev[i].addEventListener("click", () => scrollToPrev(i));
}