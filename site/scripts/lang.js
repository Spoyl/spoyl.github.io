let translations = {}; // Holds all language data
let translationsLoaded = false; // Flag to check if translations are loaded

// Load the language file
fetch('lang.json')
  .then(response => response.json())
  .then(data => {
    translations = data;
    translationsLoaded = true; // Mark translations as loaded
    console.log("Translations loaded successfully");
    // Apply stored or default language after data is loaded
    applyStoredLanguage();
  })
  .catch(error => {
    console.error("Error loading language file:", error);
  });

// Listen for clicks on language buttons in the dropdown
document.querySelectorAll('.dropdown button').forEach(button => {
  button.addEventListener('click', () => {
    const lang = button.id; // The button's id corresponds to the language code
    applyTranslations(lang);

    // Store the selected language in sessionStorage
    sessionStorage.setItem('selectedLang', lang);
  });
});

// Wait for DOM to load, and then apply the translations
document.addEventListener("DOMContentLoaded", () => {
  applyStoredLanguage();
});

function applyStoredLanguage() {
  if (!translationsLoaded) {
    console.log("Translations not loaded yet, waiting...");
    return;
  }

  const storedLang = sessionStorage.getItem('selectedLang');
  let browserLang = getBrowserLanguage();

  if (!storedLang) {
    sessionStorage.setItem('selectedLang', browserLang);
    console.log("Session language not set, setting to browser lang");
    applyTranslations(browserLang);
  } else {
    console.log("Session lang already set: ", storedLang);
    applyTranslations(storedLang);
  }
}

function applyTranslations(lang) {
  const langData = translations[lang];
  if (!langData) return;

  // Apply translations for elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const path = el.getAttribute('data-i18n');
    const text = getValueFromPath(langData, path);
    if (text !== undefined) {
      el.textContent = text;
    }
  });
}

// Helper: safely access nested values from dot notation
function getValueFromPath(obj, path) {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

// Helper: Get browser language and map to supported languages
function getBrowserLanguage() {
  const browserLang = navigator.language || navigator.userLanguage;
  // Map browser language to supported languages (if supported)
  if (browserLang.startsWith('de')) return 'de';  // German
  if (browserLang.startsWith('fr')) return 'fr';  // French
  if (browserLang.startsWith('ru')) return 'ru';  // Russian
  if (browserLang.startsWith('zh')) return 'zh';  // Chinese
  return 'en';  // Default to English if unsupported or not available
}
