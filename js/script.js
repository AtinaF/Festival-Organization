var firebaseUrl =
  "https://web-design-9-default-rtdb.europe-west1.firebasedatabase.app";

var korisniciUrl = firebaseUrl + "/korisnici" + ".json";

var organizatoriFestivalaUrl = firebaseUrl + "/organizatoriFestivala" + ".json";

var listeFestivalaUrl = ""; //njih necu pojedinacno ucitavati, nego iz id-ja 'festivali' iz organizatora - dobavljam odg listu na osnovu tog id-a u 'festival'

// //ovakav zahtev se blokira sa CORS policy
// var firebaseGradivniUrl =
//     "https://console.firebase.google.com/project/web-design-9/database/web-design-9-default-rtdb/data/~2F";
// // + -MNVEu6iMr2EFlQO6TW60
// // + -MNVEu6iMr2EFlQO6TW61
// // + korisnici
// // + organizatoriFestivala

var korisnici = {};
var korisniciIds = [];

var organizatoriFestivala = {};
var organizatoriFestivalaIds = [];

var festivali = {}; //ovo ce biti liste festivala, svaki element odavde je ono na sta pokazuje 'festivali' iz organizatora
var festivaliIds = []; //id-jevi iz jedne liste festivala / svih festivala, to be determined

var loadButton = document.getElementById("loadButton");
loadButton.addEventListener("click", loadData);

// var printOrganizatoriButton = document.getElementById(
//   "printOrganizatoriButton"
// );
// printOrganizatoriButton.addEventListener("click", printOrganizatori);

function printOrganizatori() {
  console.log("Organizatori festivala:");
  for (var id in organizatoriFestivalaIds) {
    console.log(organizatoriFestivala[id]);
  }
}

function loadData() {
  korisniciIds = [];
  organizatoriFestivalaIds = [];

  loadOrganizatoriFestivala();
  loadKorisnici();

  console.log(organizatoriFestivala);

  console.log("Korisnici ids:");
  console.log(korisniciIds);
  console.log("Korisnici:");
  for (var id in korisniciIds) {
    console.log(korisnici[id]);
  }
  console.log("Organizatori festivala ids:");
  console.log(organizatoriFestivalaIds);
  console.log("Organizatori festivala:");
  for (var id in organizatoriFestivalaIds) {
    console.log(organizatoriFestivala[id]);
  }
}

function loadKorisnici() {
  var request = new XMLHttpRequest();
  request.open("GET", korisniciUrl, true);
  request.send();
  request.onload = function () {
    if (request.status === 200) {
      korisnici = JSON.parse(request.responseText);
      for (var id in korisnici) {
        korisniciIds.push(id);
        // if(korisnici[a].tip == "organizator"){
        //     organizatoriFestivala[a] = korisnici[a];
        //     organizatoriFestivalaIds.push(a);
        // }
      }
    } else {
      console.error("Error loading data. Status code: " + request.status);
    }
    console.log(korisniciIds);
  };
}

function loadOrganizatoriFestivala() {
  var request = new XMLHttpRequest();
  request.open("GET", organizatoriFestivalaUrl, true);
  request.send();
  console.log("HERE after send");
  request.onLoad = function () {
    if (request.status === 200) {
      console.log("HERE in load");
      organizatoriFestivala = JSON.parse(request.responseText);

      for (var id in organizatoriFestivala) {
        console.log(id);
        organizatoriFestivalaIds.push(id);
        console.log(organizatoriFestivala[id]);
      }
    } else {
      console.error(
        "Error loading organizers data. Status code: " + request.status
      );
    }
  };
}

function loadFestivali(festivaliId, organizatorId) {
  var request = new XMLHttpRequest();
  request.open("GET", firebaseUrl + festivaliId + ".json", true);
  request.send();
  request.onload = function () {
    if (request.status === 200) {
      console.log("HERE in korisnici - load");

      festivali = JSON.parse(request.responseText);
      for (var id in festivali) {
        festivaliIds.push(id);
      }
    } else {
      console.error("Error loading data. Status code: " + request.status);
    }
    console.log(festivaliIds);
  };
}
{
}
