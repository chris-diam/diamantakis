// src/services/translationService.js

// Manual translations for artwork content
export const artworkTranslations = {
  titles: {
    "Blue Vase": "Μπλε Βάζο",
    "Olive Tree Sculpture": "Γλυπτό Ελιάς",
    // Add more mappings as needed
  },
  descriptions: {
    "A beautiful handcrafted ceramic vase":
      "Ένα όμορφο χειροποίητο κεραμικό βάζο",
    "Inspired by ancient Greek art":
      "Εμπνευσμένο από την αρχαία ελληνική τέχνη",
    // Add more mappings as needed
  },
  materials: {
    Ceramic: "Κεραμικό",
    Bronze: "Μπρούντζος",
    Gold: "Χρυσός",
    Silver: "Ασήμι",
    Clay: "Πηλός",
    Wood: "Ξύλο",
    // Add more mappings as needed
  },
};

/**
 * Get translated content for a specific string
 * @param {string} content - The content to translate
 * @param {string} type - The type of content ('title', 'description', 'material')
 * @param {string} language - The target language code
 * @returns {string} - The translated content or original content if no translation exists
 */
export const getTranslatedContent = (content, type, language) => {
  if (!content || language === "en") return content;

  const translations = artworkTranslations[`${type}s`] || {};
  return translations[content] || content;
};
