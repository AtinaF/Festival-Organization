let loginPopup = document.getElementById("login-popup");

function openLoginPopup() {
  document.getElementById("login-form").reset();
  document.getElementById("korisnicko-ime-greska").textContent = "";
  document.getElementById("lozinka-greska").textContent = "";
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
  } else if (password.trim().length < 8) {
    passwordError.textContent = "Lozinka mora imati najmanje 8 karaktera!";
    isFromValid = false;
  } else {
    passwordError.textContent = "";
  }

  if (isFromValid) {
    doLogin(username.trim(), password.trim());
  }
}

let registrationPopup = document.getElementById("registration-popup");

function openRegistrationPopup() {
  const registrationForm = document.getElementById("registration-form");
  registrationForm.reset();

  document.getElementById("reg-korisnicko-ime-greska").textContent = "";
  document.getElementById("reg-ime-greska").textContent = "";
  document.getElementById("prezime-greska").textContent = "";
  document.getElementById("reg-lozinka-greska").textContent = "";
  document.getElementById("reg-lozinka-potvrda-greska").textContent = "";
  document.getElementById("email-greska").textContent = "";
  document.getElementById("datum-rodjenja-greska").textContent = "";
  document.getElementById("adresa-greska").textContent = "";
  document.getElementById("telefon-greska").textContent = "";
  document.getElementById("zanimanje-greska").textContent = "";

  registrationPopup.classList.add("open-popup");
}

function closeRegistrationPopup() {
  registrationPopup.classList.remove("open-popup");
}

function register() {
  // event.preventDefault();
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
    doRegister(
      korisnickoImeInput.value,
      imeInput.value,
      prezimeInput.value,
      lozinkaInput.value,
      emailInput.value,
      datumRodjenjaInput.value,
      adresaInput.value,
      telefonInput.value,
      zanimanjeInput.value
    );
  } else {
    // window.location.href = window.location.href.split("#")[0];
  }
}

function doLogin(username, password) {
  const firebaseUrl =
    "https://web-design-9-default-rtdb.europe-west1.firebasedatabase.app";
  const korisniciUrl = firebaseUrl + "/korisnici.json";
  let request = new XMLHttpRequest();
  request.open("GET", korisniciUrl, true);
  request.send();

  let korisnici = {};
  let korisniciIds = [];
  let loginSuccessIndicator = document.getElementById(
    "login-success-indicator"
  );

  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      if (request.status === 200) {
        korisnici = JSON.parse(request.responseText);
        for (var id in korisnici) {
          korisniciIds.push(id);
        }
        let isUserFound = false;
        for (let id of korisniciIds) {
          let korisnik = korisnici[id];
          if (
            korisnik.korisnickoIme === username &&
            korisnik.lozinka === password
          ) {
            isUserFound = true;
            loginSuccessIndicator.textContent = "Uspešno ste se prijavili!";
            setTimeout(function () {
              loginSuccessIndicator.textContent = "";
              closeLoginPopup();
            }, 2500);
            break;
          }
        }
        if (!isUserFound) {
          console.log("Pogrešno korisničko ime ili lozinka!");

          loginSuccessIndicator.textContent =
            "Pogrešno korisničko ime ili lozinka!";
        }
      } else {
        console.log("Greška prilikom prijave!");

        loginSuccessIndicator.textContent = "Greška prilikom prijave!";
        setTimeout(function () {
          loginSuccessIndicator.textContent = "";
        }, 2500);
      }
    }
  };
}

function doRegister(
  korisnickoIme,
  ime,
  prezime,
  lozinka,
  email,
  datumRodjenja,
  adresa,
  telefon,
  zanimanje
) {
  let korisnikZaRegistraciju = {
    korisnickoIme: korisnickoIme,
    ime: ime,
    prezime: prezime,
    lozinka: lozinka,
    email: email,
    datumRodjenja: datumRodjenja,
    adresa: adresa,
    telefon: telefon,
    zanimanje: zanimanje,
  };

  let request = new XMLHttpRequest();
  let firebaseUrl =
    "https://web-design-9-default-rtdb.europe-west1.firebasedatabase.app";
  let korisniciUrlreg = firebaseUrl + "/korisnici.json";
  request.open("POST", korisniciUrlreg, true);
  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify(korisnikZaRegistraciju));

  request.onreadystatechange = function () {
    if (request.readyState === 4)
      if (request.status === 200) {
        console.log("Uspešno ste se registrovali!");
        let registrationSuccessIndicator = document.getElementById(
          "registration-success-indicator"
        );
        registrationSuccessIndicator.textContent =
          "Uspešno ste se registrovali!";
        setTimeout(function () {
          registrationSuccessIndicator.textContent = "";
          closeRegistrationPopup();
        }, 2500);
      } else {
        let registrationSuccessIndicator = document.getElementById(
          "registration-success-indicator"
        );
        registrationSuccessIndicator.textContent =
          "Greska prilikom registracije!";
        console.log("Greška prilikom registracije!");
      }
  };
}
