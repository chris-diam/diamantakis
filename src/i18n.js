// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const enTranslations = {
  navigation: {
    gallery: "Gallery",
    sculptures: "Sculptures",
    jewelry: "Jewelry",
    paintings: "Paintings",
    contact: "Contact Us",
    about: "About",
    login: "Login",
    register: "Register",
    profile: "Profile",
    cart: "Shopping Bag",
    wishlist: "My Wishlist",
    myAccount: "My Account",
    menu: "Menu",
  },
  cart: {
    empty: "Your Shopping Bag is Empty",
    continueShopping: "Continue Shopping",
    shoppingBag: "Shopping Bag",
    orderSummary: "Order Summary",
    subtotal: "Subtotal",
    shipping: "Shipping",
    free: "Free",
    total: "Total",
    proceedToCheckout: "Proceed to Checkout",
  },

  common: {
    loading: "Loading...",
    error: "Error",
    notFound: "Not Found",
  },

  errors: {
    error: "Error",
    artworkNotFound: "Artwork not found",
  },

  artwork: {
    title: "{{title}}",
    description: "{{description}}",
    price: "€{{price}}",
    addToCart: "Add to Cart",
    addedToCart: "Added to Cart",
    addToWishlist: "Add to Wishlist",
    addedToWishlist: "Added to Wishlist",
    materials: "Materials",
    dimensions: "Dimensions",
    width: "Width: {{width}}cm",
    height: "Height: {{height}}cm",
    depth: "Depth: {{depth}}cm",
    dimensionSeparator: " | ",
  },

  wishlist: {
    empty: "Your Wishlist is Empty",
    emptyMessage: "Add items to your wishlist to save them for later.",
    browseGallery: "Browse Gallery",
    myWishlist: "My Wishlist",
    addToCart: "Add to Cart",
    addedToCart: "Added to Cart",
    alreadyInCart: "Already in Cart",
  },

  footer: {
    aboutTitle: "About Our Gallery",
    aboutText:
      "Discover unique artworks from talented artists around the world. We curate the finest pieces of sculptures, jewelry, and paintings.",
    quickLinks: "Quick Links",
    newsletter: "Newsletter",
    newsletterText:
      "Subscribe to receive updates about new artworks and exhibitions.",
    subscribeButton: "Subscribe",
    enterEmail: "Enter your email",
    connectWithUs: "Connect With Us",
    address: "123 Art Street",
    city: "Art City, AC 12345",
    phone: "Tel: (555) 123-4567",
    rights: "© {{year}} Art Gallery. All rights reserved.",
  },
  contact: {
    title: "Contact Us",
    subtitle: "Get in Touch",
    description:
      "Have a question or want to learn more about our artworks? We would love to hear from you.",
    name: "Name",
    email: "Email",
    message: "Message",
    sendMessage: "Send Message",
    namePlaceholder: "Your full name",
    emailPlaceholder: "Your email address",
    messagePlaceholder: "Write your message here...",
    address: "Visit Us",
    phone: "Call Us",
    emailUs: "Email Us",
    hours: "Opening Hours",
    hoursDetail: "Monday - Saturday: 10:00 AM - 6:00 PM",
  },

  auth: {
    login: {
      title: "Login",
      email: "Email address",
      password: "Password",
      rememberMe: "Remember me",
      forgotPassword: "Forgot your password?",
      signIn: "Sign in",
      signingIn: "Signing in...",
      noAccount: "Don't have an account?",
      registerHere: "Register here",
    },

    register: {
      title: "Register",
      firstName: "First Name",
      lastName: "Last Name",
      username: "Username",
      displayName: "Display Name",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      gdprConsent:
        "I agree to the collection and processing of my personal data in accordance with the GDPR.",
      createAccount: "Create Account",
      creatingAccount: "Creating Account...",
      haveAccount: "Already have an account?",
      loginHere: "Login here",
    },

    validation: {
      required: "Username is required",
      passwordMatch: "Passwords do not match",
      passwordLength: "Password must be at least 8 characters long",
      usernameFormat:
        "Username can only contain letters, numbers, and underscores",
      emailFormat: "Please enter a valid email address",
    },
  },
  footer: {
    aboutTitle: "About Our Gallery",
    aboutText:
      "Discover unique artworks from talented artists around the world. We curate the finest pieces of sculptures, jewelry, and paintings.",
    quickLinks: "Quick Links",
    newsletter: "Newsletter",
    newsletterText:
      "Subscribe to receive updates about new artworks and exhibitions.",
    subscribeButton: "Subscribe",
    enterEmail: "Enter your email",
    connectWithUs: "Connect With Us",
    address: "123 Art Street",
    city: "Art City, AC 12345",
    phone: "Tel: (555) 123-4567",
    rights: "© {{year}} Art Gallery. All rights reserved.",
  },

  gallery: {
    welcome: "Welcome to Our Gallery",
    discover: "Discover Our Unique Collection",
    exploreCollections: "Explore Collections",
    ourCollections: "OUR COLLECTIONS",
    discoverCollection: "DISCOVER THE COLLECTION",
    inspiredByNature: "INSPIRED BY NATURE",
    freedomInDesign: "FREEDOM IN DESIGN",
    artistry: "Discover the Artistry Behind Each Collection",
    craftsmanship:
      "Each piece tells a story of craftsmanship, heritage, and timeless beauty",
    learnStory: "Learn Our Story",
  },
};

const elTranslations = {
  navigation: {
    gallery: "Γκαλερί",
    sculptures: "Γλυπτά",
    jewelry: "Κοσμήματα",
    paintings: "Πίνακες",
    contact: "Επικοινωνία",
    about: "Σχετικά",
    login: "Σύνδεση",
    register: "Εγγραφή",
    profile: "Προφίλ",
    cart: "Καλάθι Αγορών",
    wishlist: "Λίστα Επιθυμιών",
    myAccount: "Ο Λογαριασμός μου",
    menu: "Μενού",
  },
  cart: {
    empty: "Το Καλάθι Αγορών σας είναι Άδειο",
    continueShopping: "Συνεχίστε τις Αγορές",
    shoppingBag: "Καλάθι Αγορών",
    orderSummary: "Σύνοψη Παραγγελίας",
    subtotal: "Μερικό Σύνολο",
    shipping: "Μεταφορικά",
    free: "Δωρεάν",
    total: "Σύνολο",
    proceedToCheckout: "Προχωρήστε στην Πληρωμή",
  },
  contact: {
    title: "Επικοινωνία",
    subtitle: "Επικοινωνήστε μαζί μας",
    description:
      "Έχετε ερωτήσεις ή θέλετε να μάθετε περισσότερα για τα έργα μας; Θα χαρούμε να σας ακούσουμε.",
    name: "Όνομα",
    email: "Email",
    message: "Μήνυμα",
    sendMessage: "Αποστολή Μηνύματος",
    namePlaceholder: "Το πλήρες όνομά σας",
    emailPlaceholder: "Η διεύθυνση email σας",
    messagePlaceholder: "Γράψτε το μήνυμά σας εδώ...",
    address: "Επισκεφθείτε μας",
    phone: "Καλέστε μας",
    emailUs: "Στείλτε μας email",
    hours: "Ώρες Λειτουργίας",
    hoursDetail: "Δευτέρα - Σάββατο: 10:00 - 18:00",
  },
  footer: {
    aboutTitle: "Σχετικά με τη Γκαλερί μας",
    aboutText:
      "Ανακαλύψτε μοναδικά έργα τέχνης από ταλαντούχους καλλιτέχνες. Επιμελούμαστε τα καλύτερα γλυπτά, κοσμήματα και πίνακες.",
    quickLinks: "Γρήγοροι Σύνδεσμοι",
    newsletter: "Ενημερωτικό Δελτίο",
    newsletterText:
      "Εγγραφείτε για να λαμβάνετε ενημερώσεις για νέα έργα τέχνης και εκθέσεις.",
    subscribeButton: "Εγγραφή",
    enterEmail: "Εισάγετε το email σας",
    connectWithUs: "Συνδεθείτε μαζί μας",
    address: "Οδός Τέχνης 123",
    city: "Πόλη Τέχνης, ΠΤ 12345",
    phone: "Τηλ: (555) 123-4567",
    rights: "© {{year}} Art Gallery. Με επιφύλαξη παντός δικαιώματος.",
  },

  common: {
    loading: "Φόρτωση...",
    error: "Σφάλμα",
    notFound: "Δε Βρέθηκε",
  },

  errors: {
    error: "Σφάλμα",
    artworkNotFound: "Το έργο τέχνης δε βρέθηκε",
  },

  artwork: {
    title: "{{title}}",
    description: "{{description}}",
    price: "€{{price}}",
    addToCart: "Προσθήκη στο Καλάθι",
    addedToCart: "Προστέθηκε στο Καλάθι",
    addToWishlist: "Προσθήκη στη Λίστα",
    addedToWishlist: "Προστέθηκε στη Λίστα",
    materials: "Υλικά",
    dimensions: "Διαστάσεις",
    width: "Πλάτος: {{width}}εκ",
    height: "Ύψος: {{height}}εκ",
    depth: "Βάθος: {{depth}}εκ",
    dimensionSeparator: " | ",
  },

  wishlist: {
    empty: "Η Λίστα Επιθυμιών σας είναι Άδεια",
    emptyMessage:
      "Προσθέστε αντικείμενα στη λίστα επιθυμιών για να τα αποθηκεύσετε.",
    browseGallery: "Περιήγηση στη Γκαλερί",
    myWishlist: "Η Λίστα Επιθυμιών μου",
    addToCart: "Προσθήκη στο Καλάθι",
    addedToCart: "Προστέθηκε στο Καλάθι",
    alreadyInCart: "Ήδη στο Καλάθι",
  },

  footer: {
    aboutTitle: "Σχετικά με τη Γκαλερί μας",
    aboutText:
      "Ανακαλύψτε μοναδικά έργα τέχνης από ταλαντούχους καλλιτέχνες. Επιμελούμαστε τα καλύτερα γλυπτά, κοσμήματα και πίνακες.",
    quickLinks: "Γρήγοροι Σύνδεσμοι",
    newsletter: "Ενημερωτικό Δελτίο",
    newsletterText:
      "Εγγραφείτε για να λαμβάνετε ενημερώσεις για νέα έργα τέχνης και εκθέσεις.",
    subscribeButton: "Εγγραφή",
    enterEmail: "Εισάγετε το email σας",
    connectWithUs: "Συνδεθείτε μαζί μας",
    address: "Οδός Τέχνης 123",
    city: "Πόλη Τέχνης, ΠΤ 12345",
    phone: "Τηλ: (555) 123-4567",
    rights: "© {{year}} Art Gallery. Με επιφύλαξη παντός δικαιώματος.",
  },

  auth: {
    login: {
      title: "Σύνδεση",
      email: "Διεύθυνση email",
      password: "Κωδικός πρόσβασης",
      rememberMe: "Να με θυμάσαι",
      forgotPassword: "Ξεχάσατε τον κωδικό σας;",
      signIn: "Σύνδεση",
      signingIn: "Σύνδεση...",
      noAccount: "Δεν έχετε λογαριασμό;",
      registerHere: "Εγγραφείτε εδώ",
    },
    register: {
      title: "Εγγραφή",
      firstName: "Όνομα",
      lastName: "Επώνυμο",
      username: "Όνομα χρήστη",
      displayName: "Εμφανιζόμενο όνομα",
      email: "Email",
      password: "Κωδικός",
      confirmPassword: "Επιβεβαίωση κωδικού",
      gdprConsent:
        "Συμφωνώ με τη συλλογή και επεξεργασία των προσωπικών μου δεδομένων σύμφωνα με τον GDPR.",
      createAccount: "Δημιουργία Λογαριασμού",
      creatingAccount: "Δημιουργία Λογαριασμού...",
      haveAccount: "Έχετε ήδη λογαριασμό;",
      loginHere: "Συνδεθείτε εδώ",
    },
    validation: {
      required: "Το όνομα χρήστη είναι υποχρεωτικό",
      passwordMatch: "Οι κωδικοί δεν ταιριάζουν",
      passwordLength: "Ο κωδικός πρέπει να έχει τουλάχιστον 8 χαρακτήρες",
      usernameFormat:
        "Το όνομα χρήστη μπορεί να περιέχει μόνο γράμματα, αριθμούς και κάτω παύλες",
      emailFormat: "Παρακαλώ εισάγετε έγκυρη διεύθυνση email",
    },
  },

  gallery: {
    welcome: "Καλώς ήρθατε στη Γκαλερί μας",
    discover: "Ανακαλύψτε τη Μοναδική Συλλογή μας",
    exploreCollections: "Εξερευνήστε τις Συλλογές",
    ourCollections: "ΟΙ ΣΥΛΛΟΓΕΣ ΜΑΣ",
    discoverCollection: "ΑΝΑΚΑΛΥΨΤΕ ΤΗ ΣΥΛΛΟΓΗ",
    inspiredByNature: "ΕΜΠΝΕΥΣΜΕΝΟ ΑΠΟ ΤΗ ΦΥΣΗ",
    freedomInDesign: "ΕΛΕΥΘΕΡΙΑ ΣΤΟ ΣΧΕΔΙΑΣΜΟ",
    artistry: "Ανακαλύψτε την Τέχνη πίσω από Κάθε Συλλογή",
    craftsmanship:
      "Κάθε κομμάτι αφηγείται μια ιστορία τέχνης, κληρονομιάς και διαχρονικής ομορφιάς",
    learnStory: "Μάθετε την Ιστορία μας",
  },
};

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslations,
    },
    el: {
      translation: elTranslations,
    },
  },
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
