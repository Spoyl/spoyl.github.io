let translations = {}; // Holds all language data
const storedLang = localStorage.getItem('selectedLang');
const defaultLang = storedLang || getBrowserLanguage();


// Load the language file
fetch('lang.json')
  .then(response => response.json())
  .then(data => {
    translations = data; 
  })
  .catch(error => {
    console.error("Error loading language file:", error);
  });


// Listen for clicks on language buttons in the dropdown
document.querySelectorAll('.dropdown button').forEach(button => {
    button.addEventListener('click', () => {
      const lang = button.id; // The button's id corresponds to the language code
      applyTranslations(lang);

      // Store the selected language in localStorage
      localStorage.setItem('selectedLang', lang);
    });
  });


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
  return 'en';  // Default to English if unsupported or not available
}
