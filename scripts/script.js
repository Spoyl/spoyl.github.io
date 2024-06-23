const previewWidth = 680;
const clickNext = document.querySelectorAll(".next");
const scrollWindows = document.querySelectorAll(".blog-window");
const clickPrev = document.querySelectorAll(".prev");
const blogView = document.querySelector(".blog_button");
const projView = document.querySelector(".proj_button");

document.getElementById("project-search").hidden = true;

function showOnlyBlog(){
    document.getElementById("blog-search").hidden = false;
    document.getElementById("project-search").hidden = true;
}

function showOnlyProj(){
    document.getElementById("project-search").hidden = false;
    document.getElementById("blog-search").hidden = true;
}


blogView.addEventListener("click", () => showOnlyBlog());
projView.addEventListener("click", () => showOnlyProj());



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