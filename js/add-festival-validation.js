//const bootstrap = require("bootstrap");

function addFestival() {
  const nazivFestivalaInput = document.getElementById("naziv-festivala");
  const opisInput = document.getElementById("opis");
  const tipFestivalaInput = document.getElementById("tip-festivala");
  const prevozInput = document.getElementById("prevoz");
  const cenaInput = document.getElementById("cena");
  const maksimalnoOsobaInput = document.getElementById("maksimalno-osoba");
  const slikaInput = document.getElementById("slika");

  const nazivFestivalaError = document.getElementById("naziv-festivala-greska");
  const opisError = document.getElementById("opis-greska");
  const tipFestivalaError = document.getElementById("tip-festivala-greska");
  const prevozError = document.getElementById("prevoz-greska");
  const cenaError = document.getElementById("cena-greska");
  const maksimalnoOsobaError = document.getElementById(
    "maksimalno-osoba-greska"
  );
  const slikaError = document.getElementById("slika-greska");

  let isFromValid = true;

  if (nazivFestivalaInput.value.trim() === "") {
    nazivFestivalaError.textContent = "Naziv festivala je obavezan!";
    isFromValid = false;
  } else {
    nazivFestivalaError.textContent = "";
  }
  if (opisInput.value.trim() === "") {
    opisError.textContent = "Opis je obavezan!";
    isFromValid = false;
  } else {
    opisError.textContent = "";
  }
  if (tipFestivalaInput.value.trim() === "") {
    tipFestivalaError.textContent = "Tip festivala je obavezan!";
    isFromValid = false;
  } else {
    tipFestivalaError.textContent = "";
  }
  if (prevozInput.value.trim() === "") {
    prevozError.textContent = "Prevoz je obavezan!";
    isFromValid = false;
  } else {
    prevozError.textContent = "";
  }
  if (cenaInput.value.trim() === "") {
    cenaError.textContent = "Cena je obavezna!";
    isFromValid = false;
  } else {
    cenaError.textContent = "";
  }
  if (maksimalnoOsobaInput.value.trim() === "") {
    maksimalnoOsobaError.textContent = "Maksimalno osoba je obavezno!";
    isFromValid = false;
  } else {
    maksimalnoOsobaError.textContent = "";
  }
  if (slikaInput.value.trim() === "") {
    slikaError.textContent = "Slika je obavezna!";
    isFromValid = false;
  } else {
    slikaError.textContent = "";
  }

  if (isFromValid) {
    addValidatedFestival();
  }
}

function addValidatedFestival() {
  //go to index.html
  window.location.href = "index.html";
}
