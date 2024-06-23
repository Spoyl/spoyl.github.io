const previewWidth = 680;
const clickNext = document.querySelectorAll(".next");
const scrollWindows = document.querySelectorAll(".blog-window");
const clickPrev = document.querySelectorAll(".prev");

function scrollToNext(){
    scrollWindows[0].scrollLeft =+ previewWidth;
}

function scrollToPrev(){
    scrollWindows[0].scrollLeft =- previewWidth;
}

for (let i = 0; i < scrollWindows.length; i++){
    clickNext[i].addEventListener("click", scrollToNext);
    clickPrev[i].addEventListener("click", scrollToPrev);
}
