const de = document.querySelector("#de");
const fr = document.querySelector("#fr");
const en = document.querySelector("#en");
const langURL = "lang.json"

async function updateLang(lang){
    const response = await fetch(langURL);
    const langList = await response.json();
    const obj = langList[0][lang];
    console.log(obj);
}

var lang = navigator.language;
lang = lang.slice(0,2);
sessionStorage.setItem("language", lang);
    if (lang.slice(0,2)=="fr"){
        console.log("language set to french");
    }
    else if (lang.slice(0,2)=="de"){
        console.log("language set to german");
    }
    else if (lang.slice(0,2)=="en"){
        console.log("language set to english");
    }
    else{
        console.log("language unknown, set to default");
    }

fr.addEventListener("click", () => {
    sessionStorage.setItem("language", "fr");
    console.log("language set to french");
    updateLang("fr");
});

de.addEventListener("click", () => {
    sessionStorage.setItem("language", "de");
    console.log("language set to german");
    updateLang("de");
});

en.addEventListener("click", () => {
    sessionStorage.setItem("language", "en");
    console.log("language set to english");
});

