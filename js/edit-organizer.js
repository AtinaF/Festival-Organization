var firebaseUrl =
  "https://web-design-9-default-rtdb.europe-west1.firebasedatabase.app";

var organizatorId = window.location.href
  .split("?")[1]
  .split("=")[1]
  .split("#")[0];
var organizatorUrl =
  firebaseUrl + "/organizatoriFestivala/" + organizatorId + ".json";
var organizator = {};

var festivaliUrl;
var festivaliIds = [];
var festivali = {};

Promise.all([loadOrganizatorData()])
  .then(() => {
    console.log("All organizator data loaded successfully");
  })
  .catch((error) => {
    console.error("Error loading data:", error);
  });

function loadOrganizatorData() {
  return new Promise((resolve, reject) => {
    var request = new XMLHttpRequest();
    request.open("GET", organizatorUrl, true);
    request.send();
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        // done
        if (request.status === 200) {
          // success
          organizator = JSON.parse(request.responseText);
          console.log("organizator data loaded successfully");

          festivaliUrl =
            firebaseUrl + "/festivali/" + organizator.festivali + ".json";

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
            onEditOrganizer(organizatorId)
          );
          otkaziButton.addEventListener("click", () => onCancel());
          dodajFestivalBtn.addEventListener("click", () =>
            onAddFestival(organizatorId, organizator.festivali)
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
  var logoInput = document.getElementById("organizer-logo");
  var logoImg = document.getElementById("organizer-logo-img");
  var adresa = document.getElementById("adresa-organizatora");
  var godinaOsnivanja = document.getElementById("godina-osnivanja");
  var email = document.getElementById("organizer-email");
  var kontaktTelefon = document.getElementById("kontakt-telefon");

  // console.log(organizator);

  nazivOrganizatora.value = organizator.naziv;
  //   logo.value = organizator.logo;
  logoImg.src = organizator.logo;
  adresa.value = organizator.adresa;
  godinaOsnivanja.value = organizator.godinaOsnivanja;
  email.value = organizator.email;
  kontaktTelefon.value = organizator.kontaktTelefon;
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
    const obrisiFestivalButton = createButton(id, organizator.festivali);

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
