let loginPopup = document.getElementById("login-popup");

function openLoginPopup() {
  loginPopup.classList.add("open-popup");
}

function closeLoginPopup() {
  loginPopup.classList.remove("open-popup");
}

function login() {
  //validate login
  let username = document.getElementById("korisnicko-ime").value;
  let password = document.getElementById("lozinka").value;
  let usernameError = document.getElementById("korisnicko-ime-greska");
  let passwordError = document.getElementById("lozinka-greska");

  let isFromValid = true;

  if (username.trim() === "") {
    usernameError.textContent = "Korisničko ime je obavezno!";
    isFromValid = false;
  } else {
    usernameError.textContent = "";
  }
  if (password.trim() === "") {
    passwordError.textContent = "Lozinka je obavezna!";
    isFromValid = false;
  } else {
    passwordError.textContent = "";
  }

  if (isFromValid) {
    loginPopup.classList.remove("open-popup");
  }
}

let registrationPopup = document.getElementById("registration-popup");

function openRegistrationPopup() {
  registrationPopup.classList.add("open-popup");
}

function closeRegistrationPopup() {
  registrationPopup.classList.remove("open-popup");
}

function register() {
  // Get references to form elements
  const korisnickoImeInput = document.getElementById("reg-korisnicko-ime");
  const imeInput = document.getElementById("reg-ime");
  const prezimeInput = document.getElementById("prezime");
  const lozinkaInput = document.getElementById("reg-lozinka");
  const lozinkaPotvrdaInput = document.getElementById("reg-lozinka-potvrda");
  const emailInput = document.getElementById("email");
  const datumRodjenjaInput = document.getElementById("datum-rodjenja");
  const adresaInput = document.getElementById("adresa");
  const telefonInput = document.getElementById("telefon");
  const zanimanjeInput = document.getElementById("zanimanje");

  // Get references to small error fields
  const korisnickoImeError = document.getElementById(
    "reg-korisnicko-ime-greska"
  );
  const imeError = document.getElementById("reg-ime-greska");
  const prezimeError = document.getElementById("prezime-greska");
  const lozinkaError = document.getElementById("reg-lozinka-greska");
  const lozinkaPotvrdaError = document.getElementById(
    "reg-lozinka-potvrda-greska"
  );
  const emailError = document.getElementById("email-greska");
  const datumRodjenjaError = document.getElementById("datum-rodjenja-greska");
  const adresaError = document.getElementById("adresa-greska");
  const telefonError = document.getElementById("telefon-greska");
  const zanimanjeError = document.getElementById("zanimanje-greska");

  let isFromValid = true;

  if (korisnickoImeInput.value.trim() === "") {
    korisnickoImeError.textContent = "Korisničko ime je obavezno!";
    isFromValid = false;
  } else {
    korisnickoImeError.textContent = "";
  }
  if (imeInput.value.trim() === "") {
    imeError.textContent = "Ime je obavezno!";
    isFromValid = false;
  } else {
    imeError.textContent = "";
  }
  if (prezimeInput.value.trim() === "") {
    prezimeError.textContent = "Prezime je obavezno!";
    isFromValid = false;
  } else {
    prezimeError.textContent = "";
  }
  if (lozinkaInput.value.trim() === "") {
    lozinkaError.textContent = "Lozinka je obavezna!";
    isFromValid = false;
  } else {
    lozinkaError.textContent = "";
  }
  if (lozinkaPotvrdaInput.value.trim() === "") {
    lozinkaPotvrdaError.textContent = "Potvrda lozinke je obavezna!";
    isFromValid = false;
  } else {
    lozinkaPotvrdaError.textContent = "";
  }
  if (emailInput.value.trim() === "") {
    emailError.textContent = "Email je obavezan!";
    isFromValid = false;
  } else {
    emailError.textContent = "";
  }
  if (datumRodjenjaInput.value.trim() === "") {
    datumRodjenjaError.textContent = "Datum rođenja je obavezan!";
    isFromValid = false;
  } else {
    datumRodjenjaError.textContent = "";
  }
  if (adresaInput.value.trim() === "") {
    adresaError.textContent = "Adresa je obavezna!";
    isFromValid = false;
  } else {
    const delovi = adresaInput.value.trim().split(",");
    const prviDeo = delovi[0].split(" ");
    if (delovi.length !== 3 || prviDeo.length < 2) {
      adresaError.textContent =
        "Adresa mora biti u formatu: ulica broj, mesto/grad, postanski broj";
      isFormValid = false;
    } else {
      adresaError.textContent = "";
    }
  }
  if (telefonInput.value.trim() === "") {
    telefonError.textContent = "Telefon je obavezan!";
    isFromValid = false;
  } else {
    telefonError.textContent = "";
  }
  if (zanimanjeInput.value.trim() === "") {
    zanimanjeError.textContent = "Zanimanje je obavezno!";
    isFromValid = false;
  } else {
    zanimanjeError.textContent = "";
  }
  if (lozinkaInput.value !== lozinkaPotvrdaInput.value) {
    lozinkaPotvrdaError.textContent = "Lozinke se ne poklapaju!";
    isFromValid = false;
  } else {
    lozinkaPotvrdaError.textContent = "";
  }

  if (isFromValid) {
    registrationPopup.classList.remove("open-popup");
  }
}
