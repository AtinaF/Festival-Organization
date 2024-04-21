var firebaseUrl =
  "https://web-design-9-default-rtdb.europe-west1.firebasedatabase.app";

var korisniciUrl = firebaseUrl + "/korisnici" + ".json";
var organizatoriFestivalaUrl = firebaseUrl + "/organizatoriFestivala" + ".json";
var festivaliUrl = firebaseUrl + "/festivali" + ".json";

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

var festivali = {};
var festivaliIds = [];

var loadButton = document.getElementById("loadButton");
loadButton.addEventListener("click", loadData);

function loadData() {
  Promise.all([loadOrganizatoriFestivala(), loadKorisnici(), loadFestivali()])
    .then(() => {
      // All data loaded successfully
      console.log("All data loaded successfully");
      console.log("Korisnici ids:");
      console.log(korisniciIds);
      console.log("Organizatori festivala ids:");
      console.log(organizatoriFestivalaIds);
      console.log("Festivali ids:");
      console.log(festivaliIds);
    })
    .catch((error) => {
      console.error("Error loading data:", error);
    });
}

function loadKorisnici() {
  return new Promise((resolve, reject) => {
    var request = new XMLHttpRequest();
    request.open("GET", korisniciUrl, true);
    request.send();
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        if (request.status === 200) {
          korisnici = JSON.parse(request.responseText);
          console.log("Korisnici:");
          console.log(korisnici);
          for (var id in korisnici) {
            korisniciIds.push(id);
          }
          resolve(); // Resolve the promise
        } else {
          reject(
            "Error loading korisnici data. Status code: " + request.status
          );
        }
      }
    };
  });
}

function loadOrganizatoriFestivala() {
  return new Promise((resolve, reject) => {
    var request = new XMLHttpRequest();
    request.open("GET", organizatoriFestivalaUrl, true);
    request.send();
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        if (request.status === 200) {
          organizatoriFestivala = JSON.parse(request.responseText);
          console.log("Organizatori festivala:");
          console.log(organizatoriFestivala);
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

function loadFestivali() {
  return new Promise((resolve, reject) => {
    var request = new XMLHttpRequest();
    request.open("GET", festivaliUrl, true);
    request.send();
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        if (request.status === 200) {
          festivali = JSON.parse(request.responseText);
          console.log("Festivali:");
          console.log(festivali);
          for (var id in festivali) {
            festivaliIds.push(id);
          }
          resolve(); // Resolve the promise
        } else {
          reject(
            "Error loading festivali data. Status code: " + request.status
          );
        }
      }
    };
  });
}
