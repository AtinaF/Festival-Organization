var firebaseUrl =
  "https://web-design-9-default-rtdb.europe-west1.firebasedatabase.app";

var korisniciUrl = firebaseUrl + "/korisnici" + ".json";
var organizatoriFestivalaUrl = firebaseUrl + "/organizatoriFestivala" + ".json";
var korisniciUrl = firebaseUrl + "/festivali" + ".json";

// //ovakav zahtev se blokira sa CORS policy
// var firebaseGradivniUrl =
//     "https://console.firebase.google.com/project/web-design-9/database/web-design-9-default-rtdb/data/~2F";
// // + festivali
// // + korisnici
// // + organizatoriFestivala

var korisnici = {};
var korisniciIds = [];

var organizatoriFestivala = {};
var organizatoriFestivalaIds = [];

var korisnici = {};
var korisniciIds = [];

// var loadButton = document.getElementById("loadButton");
// loadButton.addEventListener("click", loadData);

Promise.all([loadOrganizatori()])
  .then(() => {
    console.log("All data loaded successfully");
    showOrganizatori();
  })
  .catch((error) => {
    console.error("Error loading data:", error);
  });

function loadOrganizatori() {
  return new Promise((resolve, reject) => {
    var request = new XMLHttpRequest();
    request.open("GET", organizatoriFestivalaUrl, true);
    request.send();
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        // done
        if (request.status === 200) {
          // success
          organizatoriFestivala = JSON.parse(request.responseText);
          for (var id in organizatoriFestivala) {
            organizatoriFestivalaIds.push(id);
          }
          resolve(); // Resolve the promise
        } else {
          reject(
            "Error loading organizatori festivala data. Status code: " +
              request.status
          );
        }
      }
    };
  });
}

function showOrganizatori() {
  var sviOrganizatori = document.getElementById("svi-organizatori");

  for (var id of organizatoriFestivalaIds) {
    var outerDiv = document.createElement("div");
    outerDiv.classList.add("col-md-3", "col-sm-10");

    var cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "my-3");

    var image = document.createElement("img");
    image.src = organizatoriFestivala[id].logo;

    var cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    var cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.innerText = organizatoriFestivala[id].naziv;

    var cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.innerText = organizatoriFestivala[id].adresa;

    var detailsBtn = document.createElement("a");
    detailsBtn.href = "organizer.html?organizerId=" + id;
    detailsBtn.classList.add(
      "btn",
      "btn-primary",
      "d-flex",
      "justify-content-center"
    );
    detailsBtn.innerText = "Detalji";

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(detailsBtn);
    cardDiv.appendChild(image);
    cardDiv.appendChild(cardBody);
    outerDiv.appendChild(cardDiv);
    sviOrganizatori.appendChild(outerDiv);
  }
}

// function loadData() {
//     Promise.all([loadOrganizatoriFestivala(), loadKorisnici(), loadFestivali()])
//         .then(() => {
//             // All data loaded successfully
//             console.log("All data loaded successfully");
//             console.log("Korisnici ids:");
//             console.log(korisniciIds);
//             console.log("Organizatori festivala ids:");
//             console.log(organizatoriFestivalaIds);
//             console.log("Festivali ids:");
//             console.log(festivaliIds);
//         })
//         .catch((error) => {
//             console.error("Error loading data:", error);
//         });
// }

// function loadKorisnici() {
//     return new Promise((resolve, reject) => {
//         var request = new XMLHttpRequest();
//         request.open("GET", korisniciUrl, true);
//         request.send();
//         request.onreadystatechange = function() {
//             if (request.readyState === 4) {
//                 if (request.status === 200) {
//                     korisnici = JSON.parse(request.responseText);
//                     console.log("Korisnici:");
//                     console.log(korisnici);
//                     for (var id in korisnici) {
//                         korisniciIds.push(id);
//                     }
//                     resolve(); // Resolve the promise
//                 } else {
//                     reject(
//                         "Error loading korisnici data. Status code: " + request.status
//                     );
//                 }
//             }
//         };
//     });
// }

// function loadOrganizatoriFestivala() {
//     return new Promise((resolve, reject) => {
//         var request = new XMLHttpRequest();
//         request.open("GET", organizatoriFestivalaUrl, true);
//         request.send();
//         request.onreadystatechange = function() {
//             if (request.readyState === 4) {
//                 if (request.status === 200) {
//                     organizatoriFestivala = JSON.parse(request.responseText);
//                     console.log("Organizatori festivala:");
//                     console.log(organizatoriFestivala);
//                     for (var id in organizatoriFestivala) {
//                         organizatoriFestivalaIds.push(id);
//                     }
//                     resolve(); // Resolve the promise
//                 } else {
//                     reject(
//                         "Error loading organizatori festivala data. Status code: " +
//                         request.status
//                     );
//                 }
//             }
//         };
//     });
// }

// function loadFestivali() {
//     return new Promise((resolve, reject) => {
//         var request = new XMLHttpRequest();
//         request.open("GET", festivaliUrl, true);
//         request.send();
//         request.onreadystatechange = function() {
//             if (request.readyState === 4) {
//                 if (request.status === 200) {
//                     festivali = JSON.parse(request.responseText);
//                     console.log("Festivali:");
//                     console.log(festivali);
//                     for (var id in festivali) {
//                         festivaliIds.push(id);
//                     }
//                     resolve(); // Resolve the promise
//                 } else {
//                     reject(
//                         "Error loading festivali data. Status code: " + request.status
//                     );
//                 }
//             }
//         };
//     });
// }
