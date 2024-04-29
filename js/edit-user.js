var firebaseUrl =
  "https://web-design-9-default-rtdb.europe-west1.firebasedatabase.app";

var korisnikId = localStorage.getItem("korisnikId");

var korisnikUrl = firebaseUrl + "/korisnici/" + korisnikId + ".json";

var korisnik = {};

Promise.all([loadKorisnikData()])
  .then(() => {
    console.log("All korisnik data loaded successfully");
  })
  .catch((error) => {
    console.error("Error loading data:", error);
  });

function loadKorisnikData() {
  return new Promise((resolve, reject) => {
    var request = new XMLHttpRequest();
    request.open("GET", korisnikUrl, true);
    request.send();
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        // done
        if (request.status === 200) {
          // success
          korisnik = JSON.parse(request.responseText);

          console.log("Korisnik data loaded successfully");

          showOrganizatorData();
          resolve(); // Resolve the promise
        } else {
          reject("Error loading korisnik data. Status code: " + request.status);
        }
      }
    };
  });
}

function showOrganizatorData() {
  var korisnickoIme = document.getElementById("korisnicko-ime-edit");
  var ime = document.getElementById("ime-edit");
  var prezime = document.getElementById("prezime-edit");
  var email = document.getElementById("email-edit");
  var datumRodjenja = document.getElementById("datum-rodjenja-edit");
  var adresa = document.getElementById("adresa-edit");
  var telefon = document.getElementById("telefon-edit");
  var zanimanje = document.getElementById("zanimanje-edit");
  var lozinka = document.getElementById("lozinka-edit");
  var potvrdaLozinke = document.getElementById("lozinka-potvrda-edit");

  console.log(korisnik);

  korisnickoIme.value = korisnik.korisnickoIme;
  ime.value = korisnik.ime;
  prezime.value = korisnik.prezime;
  email.value = korisnik.email;
  datumRodjenja.value = korisnik.datumRodjenja;
  adresa.value = korisnik.adresa;
  telefon.value = korisnik.telefon;
  zanimanje.value = korisnik.zanimanje;
  lozinka.value = korisnik.lozinka;
  potvrdaLozinke.value = korisnik.lozinka;
}

function onEdit() {
  const korisnickoIme = document.getElementById("korisnicko-ime-edit").value;
  const ime = document.getElementById("ime-edit").value;
  const prezime = document.getElementById("prezime-edit").value;
  const email = document.getElementById("email-edit").value;
  const datumRodjenja = document.getElementById("datum-rodjenja-edit").value;
  const adresa = document.getElementById("adresa-edit").value;
  const telefon = document.getElementById("telefon-edit").value;
  const zanimanje = document.getElementById("zanimanje-edit").value;
  const lozinka = document.getElementById("lozinka-edit").value;
  const potvrdaLozinke = document.getElementById("lozinka-potvrda-edit").value;

  const korisnickoImeGreska = document.getElementById(
    "korisnicko-ime-greska-edit"
  );
  const imeGreska = document.getElementById("ime-greska-edit");
  const prezimeGreska = document.getElementById("prezime-greska-edit");
  const emailGreska = document.getElementById("email-greska-edit");
  const datumRodjenjaGreska = document.getElementById(
    "datum-rodjenja-greska-edit"
  );
  const adresaGreska = document.getElementById("adresa-greska-edit");
  const telefonGreska = document.getElementById("telefon-greska-edit");
  const zanimanjeGreska = document.getElementById("zanimanje-greska-edit");
  // const lozinkaGreska = document.getElementById("lozinka-greska-edit");
  const potvrdaLozinkeGreska = document.getElementById(
    "lozinka-potvrda-greska-edit"
  );

  let valid = true;
  if (korisnickoIme.trim() === "") {
    korisnickoImeGreska.textContent = "Polje ne sme biti prazno";
    valid = false;
  } else {
    korisnickoImeGreska.textContent = "";
  }

  if (ime.trim() === "") {
    imeGreska.textContent = "Polje ne sme biti prazno";
    valid = false;
  } else {
    imeGreska.textContent = "";
  }

  if (prezime.trim() === "") {
    prezimeGreska.textContent = "Polje ne sme biti prazno";
    valid = false;
  } else {
    prezimeGreska.textContent = "";
  }

  if (email.trim() === "") {
    emailGreska.textContent = "Polje ne sme biti prazno";
    valid = false;
  } else if (!email.includes("@")) {
    emailGreska.textContent = "Email mora sadržati @";
    valid = false;
  } else {
    emailGreska.textContent = "";
  }

  const today = new Date().toISOString().split("T")[0];
  if (datumRodjenja.trim() === "") {
    datumRodjenjaGreska.textContent = "Polje ne sme biti prazno";
    valid = false;
  } else if (datumRodjenja > today) {
    datumRodjenjaGreska.textContent = "Datum ne sme biti u budućnosti";
    valid = false;
  } else {
    datumRodjenjaGreska.textContent = "";
  }

  if (adresa.trim() === "") {
    adresaGreska.textContent = "Adresa je obavezna!";
    valid = false;
  } else {
    const delovi = adresa.trim().split(",");
    const prviDeo = delovi[0].split(" ");
    if (delovi.length !== 3 || prviDeo.length < 2) {
      adresaGreska.textContent =
        "Adresa mora biti u formatu: ulica broj, mesto/grad, postanski broj";
      valid = false;
    } else {
      adresaGreska.textContent = "";
    }
  }

  if (telefon.trim() === "") {
    telefonGreska.textContent = "Polje ne sme biti prazno";
    valid = false;
  } else if (!/^\d+$/.test(telefon.trim())) {
    telefonGreska.textContent = "Polje može sadržati samo brojeve";
    valid = false;
  } else {
    telefonGreska.textContent = "";
  }

  if (zanimanje.trim() === "") {
    zanimanjeGreska.textContent = "Polje ne sme biti prazno";
    valid = false;
  } else {
    zanimanjeGreska.textContent = "";
  }

  if (
    lozinka.trim() !== "" &&
    potvrdaLozinke.trim() !== "" &&
    lozinka.trim() !== potvrdaLozinke.trim()
  ) {
    potvrdaLozinkeGreska.textContent = "Lozinke se ne poklapaju";
    valid = false;
  } else if (lozinka.trim().length < 8) {
    potvrdaLozinkeGreska.textContent =
      "Lozinka mora imati najmanje 8 karaktera";
    valid = false;
  } else {
    potvrdaLozinkeGreska.textContent = "";
  }

  if (valid) {
    editUser(
      korisnickoIme,
      ime,
      prezime,
      email,
      datumRodjenja,
      adresa,
      telefon,
      zanimanje,
      lozinka
    );
    // window.location.href = "admin-for-user.html";
  }
}

function editUser(
  korisnickoIme,
  ime,
  prezime,
  email,
  datumRodjenja,
  adresa,
  telefon,
  zanimanje,
  lozinka
) {
  var updatedKorisnik = {
    korisnickoIme: korisnickoIme,
    ime: ime,
    prezime: prezime,
    email: email,
    datumRodjenja: datumRodjenja,
    adresa: adresa,
    telefon: telefon,
    zanimanje: zanimanje,
    lozinka: lozinka,
  };
  console.log(korisnik);
  var request = new XMLHttpRequest();
  request.open("PUT", korisnikUrl, true);
  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify(updatedKorisnik));
  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      // done
      if (request.status === 200) {
        // success
        console.log("Korisnik uspesno izmenjen");
        // window.location.href = "admin-for-user.html";
      } else {
        console.error(
          "Error updating korisnik. Status code: " + request.status
        );
      }
    }
  };
}
addListeners();

function addListeners() {
  var izmeniButton = document.getElementById("izmeni-btn");
  var otkaziButton = document.getElementById("otkazi-btn");
  var obrisiButton = document.getElementById("obrisi-btn");

  izmeniButton.addEventListener("click", () => {
    onEdit();
  });

  otkaziButton.addEventListener("click", () => {
    onCancel();
  });

  obrisiButton.addEventListener("click", () => {
    onDelete();
  });
}

function onCancel() {
  window.location.href = "admin-for-user.html";
}

function onDelete() {
  //   event.preventDefault();
  // Create the modal container
  const modalContainer = document.createElement("div");
  modalContainer.classList.add("modal");
  modalContainer.setAttribute("tabindex", "-1");

  // Create the modal dialog
  const modalDialog = document.createElement("div");
  modalDialog.classList.add("modal-dialog");

  // Create the modal content
  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  // Create the modal header
  const modalHeader = document.createElement("div");
  modalHeader.classList.add("modal-header");

  // Create the modal title
  const modalTitle = document.createElement("h5");
  modalTitle.classList.add("modal-title");
  modalTitle.textContent = "Brisanje korisnika";

  // Create the close button
  const closeButton = document.createElement("button");
  closeButton.setAttribute("type", "button");
  closeButton.classList.add("btn-close");
  closeButton.setAttribute("data-bs-dismiss", "modal");
  closeButton.setAttribute("aria-label", "Close");

  // Append the modal title and close button to the modal header
  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(closeButton);

  // Create the modal body
  const modalBody = document.createElement("div");
  modalBody.classList.add("modal-body");
  modalBody.innerHTML =
    "<p>Da li ste sigurni da zelite da obrisete korisnika?</p>";

  // Create the modal footer
  const modalFooter = document.createElement("div");
  modalFooter.classList.add("modal-footer", "dflex", "justify-content-center");

  // Create the close button for the footer
  const closeButtonFooter = document.createElement("button");
  closeButtonFooter.setAttribute("type", "button");
  closeButtonFooter.classList.add("btn", "btn-secondary");
  closeButtonFooter.setAttribute("data-bs-dismiss", "modal");
  closeButtonFooter.textContent = "Odustani";

  // Create the save changes button for the footer
  const confirmDeleteButton = document.createElement("button");
  confirmDeleteButton.setAttribute("type", "button");
  confirmDeleteButton.classList.add("btn", "btn-primary");
  confirmDeleteButton.textContent = "Obrisi";

  // Append the buttons to the modal footer
  modalFooter.appendChild(closeButtonFooter);
  modalFooter.appendChild(confirmDeleteButton);

  // Append the header, body, and footer to the modal content
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modalContent.appendChild(modalFooter);

  // Append the modal content to the modal dialog
  modalDialog.appendChild(modalContent);

  // Append the modal dialog to the modal container
  modalContainer.appendChild(modalDialog);

  const myModal = new bootstrap.Modal(modalContainer);
  myModal.show();

  closeButtonFooter.addEventListener("click", function () {
    myModal.hide();
  });

  confirmDeleteButton.addEventListener("click", function () {
    myModal.hide();
    deleteUser();
    // window.location.href = "admin-for-user.html";
  });
}

function deleteUser() {
  console.log("deleting user");
  var request = new XMLHttpRequest();
  request.open("DELETE", korisnikUrl, true);
  request.send();
  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      // done
      if (request.status === 200) {
        // success
        console.log("Korisnik uspesno obrisan");
        window.location.href = "admin-for-user.html";
      } else {
        console.error(
          "Error deleting korisnik. Status code: " + request.status
        );
      }
    }
  };
}
