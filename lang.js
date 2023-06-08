window.langStrings = {
  en: {
    home: "Home",
    location: "Location",
    accommodation: "Accommodation",
    thingsToDo: "Things to do in Slovenia",
    programme: "Programme",
    joinUs: "We are delighted to have you celebrate the wedding of",
    yourName: "Your Name:",
    yourEmail: "Your Email:",
    foodRestrictions: "Food Restrictions:",
    accomodationPreferences: "Accomodation Preferences:",
    selectInTheList: "Select in the list",
    organizeByMyself: "I will organize by myself",
    contactWithOptions: "Contact me with options",
    addGuest: "Add Guest",
    guestName: "Guest Name:",
    removeGuest: "Remove Guest",
    additionalMessage: "Additional Message:",
    submit: "Submit",
    successMessage: "Thanks for your RSVP! See you at the wedding!"
  },
  fr: {
    home: "Accueil",
    location: "Emplacement",
    accommodation: "H&eacute;bergement",
    thingsToDo: "Activit&eacute;s en Slov&eacute;nie",
    programme: "Programme",
    joinUs: "Nous sommes ravis de votre pr&eacute;sence &agrave; la c&eacute;l&eacute;bration du mariage de",
    yourName: "Votre nom:",
    yourEmail: "Votre e-mail:",
    foodRestrictions: "Restrictions alimentaires:",
    accomodationPreferences: "Pr&eacute;f&eacute;rences d'h&eacute;bergement:",
    selectInTheList: "S&eacute;lectionner dans la liste",
    organizeByMyself: "Je vais m'organiser moi-m&ecirc;me",
    contactWithOptions: "Contactez-moi avec des options",
    addGuest: "Ajouter un invit&eacute;",
    guestName: "Nom de l'invit&eacute;:",
    removeGuest: "Supprimer l'invit&eacute;",
    additionalMessage: "Message suppl&eacute;mentaire:",
    submit: "Envoyer",
    successMessage: "Merci pour votre RSVP! &Agrave; bient&ocirc;t au mariage!"
  },
  si: {
    home: "Domov",
    location: "Lokacija",
    accommodation: "Preno&ccaron;itev",
    thingsToDo: "Aktivnosti v Sloveniji",
    programme: "Program",
    joinUs: "Vesela sva, da se nama boste pridru&zcaron;ili na ta veseli dan",
    yourName: "Va&scaron;e ime:",
    yourEmail: "Va&scaron; e-poštni naslov:",
    foodRestrictions: "Prehranske omejitve:",
    accomodationPreferences: "Nastanitvene &zcaron;elje:",
    selectInTheList: "Izberite",
    organizeByMyself: "Organiziral/a si bom sam/a",
    contactWithOptions: "Se priporo&ccaron;am za predloge",
    addGuest: "Dodaj svata",
    guestName: "Ime svata:",
    removeGuest: "Odstrani svata",
    additionalMessage: "Dodatno sporo&ccaron;ilo:",
    submit: "Po&scaron;lji",
    successMessage: "Hvala za va&scaron;o prijavo! Se vidimo na poroki!"
  }
}


function loadConfig() {
  console.log('loadConfig')
  const url = window.location.href;

  // Check if there is a query param "?code=XXX"
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');

  if (code) {
    // Write the code to localstorage
    localStorage.setItem('code', code);

    // Remove the query param from the URL and redirect
    window.location.href = url.replace(`?code=${ code }`, '');
    return;
  }

  // Check if there is a localStorage entry for "code"
  const storedCode = localStorage.getItem('code');

  if (!storedCode) {
    setLang('en');
    return;
  }
  // Fetch the config using the stored code
  const configUrl = `https://api.k-m.wedding/${storedCode}`;

  fetch(configUrl)
    .then(response => response.json())
    .then(config => {
      // Do something with the fetched config
      setGuest(config.name);
      setLang(config.lang);
    })
    .catch(error => {
      // Handle error during fetch
      setLang('en');
    });
}

function setLang(l) {
  window.localStorage.setItem('lang', l.toLowerCase());
  const lang = window.langStrings[l.toLowerCase()] ?? window.langStrings.en;
  const langElements = document.querySelectorAll('[data-lang-string]');
  for (const langElement of langElements) {
    langElement.innerHTML = lang[langElement.dataset.langString];
  }
}

function setGuest(g) {
  window.localStorage.setItem('guest', g);
}
