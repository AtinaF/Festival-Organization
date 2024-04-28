var firebaseUrl =
  "https://web-design-9-default-rtdb.europe-west1.firebasedatabase.app";

var korisnikId = window.location.href.split("?")[1].split("=")[1].split("#")[0];
var korisnikUrl =
  firebaseUrl + "/organizatoriFestivala/" + korisnikId + ".json";
var korisnik = {};

var festivaliUrl;
var festivaliIds = [];
var festivali = {};

Promise.all([loadKorisnikData()])
  .then(() => {
    console.log("All organizator data loaded successfully");
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
          console.log("organizator data loaded successfully");
          console.log(korisnik);
          festivaliUrl =
            firebaseUrl + "/festivali/" + korisnik.festivali + ".json";

          Promise.all([loadFestivali()])
            .then(() => {
              console.log("All festivali data loaded successfully");
              showFestivali();
            })
            .catch((error) => {
              console.error("Error loading data:", error);
            });

          var izmeniButton = document.getElementById("izmeni-btn");
          var otkaziButton = document.getElementById("otkazi-btn");
          var dodajFestivalBtn = document.getElementById("dodaj-festival-btn");
          izmeniButton.addEventListener("click", () =>
            onEditOrganizer(korisnikId)
          );
          otkaziButton.addEventListener("click", () => onCancel());
          dodajFestivalBtn.addEventListener("click", () =>
            onAddFestival(korisnikId, korisnik.festivali)
          );
          showOrganizatorData();
          resolve();
        } else {
          reject(
            "Error loading organizator data. Status code: " + request.status
          );
        }
      }
    };
  });
}

function showOrganizatorData() {
  var nazivOrganizatora = document.getElementById("naziv-organizatora");
  // var logoInput = document.getElementById("organizer-logo");
  var logoImg = document.getElementById("organizer-logo-img");
  var adresa = document.getElementById("adresa-organizatora");
  var godinaOsnivanja = document.getElementById("godina-osnivanja");
  var email = document.getElementById("organizer-email");
  var kontaktTelefon = document.getElementById("kontakt-telefon");

  // console.log(organizator);

  nazivOrganizatora.value = korisnik.naziv;
  //   logo.value = organizator.logo;
  logoImg.src = korisnik.logo;
  adresa.value = korisnik.adresa;
  godinaOsnivanja.value = korisnik.godinaOsnivanja;
  email.value = korisnik.email;
  kontaktTelefon.value = korisnik.kontaktTelefon;
}

function showFestivali() {
  var festivaliTbody = document.getElementById("festivali-tbody");

  for (var id of festivaliIds) {
    // console.log(organizator.festivali, id);
    const festival = festivali[id];
    const tr = document.createElement("tr");

    const tdNazivFestivala = document.createElement("td");
    tdNazivFestivala.textContent = festival.naziv;
    tr.appendChild(tdNazivFestivala);

    const tdUpravljanje = document.createElement("td");
    const obrisiFestivalButton = createButton(id, korisnik.festivali);

    tdUpravljanje.appendChild(obrisiFestivalButton);
    tr.appendChild(tdUpravljanje);

    festivaliTbody.appendChild(tr);
  }
}

function createButton(festivalId, festivaliId) {
  // console.log(festivaliId, festivalId);

  var obrisiFestivalButton = document.createElement("a");
  obrisiFestivalButton.textContent = "obrisi";
  obrisiFestivalButton.href = "#";
  obrisiFestivalButton.classList.add(
    "btn-primary",
    "d-flex",
    "justify-content-center",
    "mt-2",
    "rounded"
  );
  obrisiFestivalButton.style.backgroundColor = "rgb(217, 217, 217)";
  obrisiFestivalButton.style.color = "black";
  obrisiFestivalButton.addEventListener("click", () =>
    onDeleteFestival(festivalId, festivaliId, event)
  );
  return obrisiFestivalButton;
}

function loadFestivali() {
  return new Promise((resolve, reject) => {
    var request = new XMLHttpRequest();
    request.open("GET", festivaliUrl, true);
    request.send();
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        // done
        if (request.status === 200) {
          // success
          festivali = JSON.parse(request.responseText);
          for (var id in festivali) {
            festivaliIds.push(id);
          }
          console.log("festivali data loaded successfully");
          resolve();
        } else {
          reject(
            "Error loading festivali data. Status code: " + request.status
          );
        }
      }
    };
  });
}

function onEditOrganizer(organizerId) {
  console.log("on edit organizer");
  const nazivOrganizatora = document.getElementById("naziv-organizatora").value;
  const logoOrganizatora = document.getElementById("organizer-logo");
  let logoPath = "";
  const adresaOrganizatora = document.getElementById(
    "adresa-organizatora"
  ).value;
  const godinaOsnivanja = document.getElementById("godina-osnivanja").value;
  const email = document.getElementById("organizer-email").value;
  const kontaktTelefon = document.getElementById("kontakt-telefon").value;

  const nazivOrganizatoraGreska = document.getElementById(
    "naziv-organizatora-greska"
  );
  // const logoOrganizatoraGreska = document.getElementById("logo-greska");
  const adresaGreska = document.getElementById("adresa-greska-edit");
  const godinaOsnivanjaGreska = document.getElementById(
    "godina-osnivanja-greska"
  );
  const emailGreska = document.getElementById("email-greska-edit");
  const kontaktTelefonGreska = document.getElementById("kontakt-greska");

  let isValid = true;
  if (nazivOrganizatora.trim() === "") {
    nazivOrganizatoraGreska.textContent = "Morate uneti naziv organizatora!";
    isValid = false;
  } else {
    nazivOrganizatoraGreska.textContent = "";
  }

  if (logoOrganizatora.files.length > 0) {
    logoPath = logoOrganizatora.files[0].name;
  } else {
    logoPath = korisnik.logo;
  }

  if (adresaOrganizatora.trim() === "") {
    adresaGreska.textContent = "Morate uneti adresu organizatora!";
    isValid = false;
  } else if (adresaOrganizatora.trim().split(",").length !== 3) {
    adresaGreska.textContent =
      "Adresa organizatora mora biti u formatu: ulica, broj, grad!";
    isValid = false;
  } else {
    adresaGreska.textContent = "";
  }

  if (godinaOsnivanja.trim() === "") {
    godinaOsnivanjaGreska.textContent = "Morate uneti godinu osnivanja!";
    isValid = false;
  } else if (parseInt(godinaOsnivanja.trim()) < 0) {
    godinaOsnivanjaGreska.textContent =
      "Godina osnivanja ne moze biti negativna!";
    isValid = false;
  } else {
    godinaOsnivanjaGreska.textContent = "";
  }

  if (email.trim() === "") {
    emailGreska.textContent = "Morate uneti email!";
    isValid = false;
  } else {
    emailGreska.textContent = "";
  }

  if (kontaktTelefon.trim() === "") {
    kontaktTelefonGreska.textContent = "Morate uneti kontakt telefon!";
    isValid = false;
  } else {
    kontaktTelefonGreska.textContent = "";
  }

  var festivaliId = korisnik.festivali;

  if (isValid) {
    editOrganizer(
      organizerId,
      festivaliId,
      nazivOrganizatora,
      email,
      logoPath,
      adresaOrganizatora,
      godinaOsnivanja,
      kontaktTelefon
    );
  }
}

function editOrganizer(
  organizerId,
  festivaliId,
  nazivOrganizatora,
  email,
  logoOrganizatora,
  adresaOrganizatora,
  godinaOsnivanja,
  kontaktTelefon
) {
  console.log("editing organizer");
  //update data with put method
  var firebaseUrl =
    "https://web-design-9-default-rtdb.europe-west1.firebasedatabase.app";

  var organizatorUrl =
    firebaseUrl + "/organizatoriFestivala/" + organizerId + ".json";
  var organizator = {
    festivali: festivaliId,
    naziv: nazivOrganizatora,
    email: email,
    logo: logoOrganizatora,
    adresa: adresaOrganizatora,
    godinaOsnivanja: godinaOsnivanja,
    kontaktTelefon: kontaktTelefon,
  };
  var request = new XMLHttpRequest();
  request.open("PUT", organizatorUrl, true);
  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify(organizator));
  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      // done
      if (request.status === 200) {
        // success
        console.log("organizator data updated successfully");
        // window.location.href = "../html/admin-for-organizer.html";
      } else {
        console.error(
          "Error updating organizator data. Status code: " + request.status
        );
      }
    }
  };

  // window.location.href = "../html/admin-for-organizer.html";
}

function onCancel() {
  const editOrganizerForm = document.getElementById("edit-organizer-form");
  editOrganizerForm.reset();
  document.getElementById("naziv-organizatora-greska").textContent = "";
  document.getElementById("logo-greska").textContent = "";
  document.getElementById("adresa-greska").textContent = "";
  document.getElementById("godina-osnivanja-greska").textContent = "";
  document.getElementById("email-greska").textContent = "";
  document.getElementById("kontakt-greska").textContent = "";
  console.log("cancel");
  window.location.href = "../html/admin-for-organizer.html";
}

function onAddFestival(organizerId, festivaliId) {
  console.log("add festival");
  window.location.href =
    "../html/add-festival.html?organizerId=" +
    organizerId +
    "&festivaliId=" +
    festivaliId;
}

function onDeleteFestival(festivalId, festivaliId, event) {
  event.preventDefault();
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
  modalTitle.textContent = "Brisanje festivala";

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
    "<p>Da li ste sigurni da zelite da obrisete festival?</p>";

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

    Promise.all([deleteFestival(festivalId, festivaliId)])
      .then(() => {
        console.log("festival deleted successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting festival:", error);
      });
  });
}

function deleteFestival(festivalId, festivaliId) {
  console.log("delete festival");
  console.log(festivalId);

  var firebaseUrl =
    "https://web-design-9-default-rtdb.europe-west1.firebasedatabase.app";

  var festivalUrl =
    firebaseUrl + "/festivali/" + festivaliId + "/" + festivalId + ".json";

  return new Promise((resolve, reject) => {
    var request = new XMLHttpRequest();
    request.open("DELETE", festivalUrl, true);
    request.send();
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        // done
        if (request.status === 200) {
          // success
          console.log("festival deleted successfully");
          resolve();
        } else {
          reject(
            "Error deleting festival data. Status code: " + request.status
          );
        }
      }
    };
  });
}
