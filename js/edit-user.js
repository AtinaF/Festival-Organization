var firebaseUrl =
    "https://web-design-9-default-rtdb.europe-west1.firebasedatabase.app";
var organizatorId = window.location.href.split("?")[1].split("=")[1];
var organizatorUrl = firebaseUrl + "/korisnici/" + organizatorId + ".json";

var organizator = {};

Promise.all([loadOrganizatorData()])
    .then(() => {
        console.log("All korisnik data loaded successfully");
    })
    .catch((error) => {
        console.error("Error loading data:", error);
    });

function loadOrganizatorData() {
    return new Promise((resolve, reject) => {
        var request = new XMLHttpRequest();
        request.open("GET", organizatorUrl, true);
        request.send();
        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                // done
                if (request.status === 200) {
                    // success
                    organizator = JSON.parse(request.responseText);

                    console.log("Korisnik data loaded successfully");
                    var izmeniButton = document.getElementById("izmeni-btn");
                    var otkaziButton = document.getElementById("otkazi-btn");
                    var obrisiButton = document.getElementById("obrisi-btn");

                    izmeniButton.addEventListener("onclick", () => onEdit(organizatorId));
                    otkaziButton.addEventListener("onclick", () => onCancel);
                    obrisiButton.addEventListener("onclick", () =>
                        onDelete(organizatorId)
                    );

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
    var korisnickoIme = document.getElementById("korisnicko-ime");
    var ime = document.getElementById("ime");
    var prezime = document.getElementById("prezime");
    var email = document.getElementById("email");
    var datumRodjenja = document.getElementById("datum-rodjenja");
    var adresa = document.getElementById("adresa");
    var telefon = document.getElementById("telefon");
    var zanimanje = document.getElementById("zanimanje");
    // var lozinka = document.getElementById("lozinka");
    // var potvrdaLozinke = document.getElementById("potvrda-lozinke");

    console.log(organizator);

    korisnickoIme.value = organizator.korisnickoIme;
    ime.value = organizator.ime;
    prezime.value = organizator.prezime;
    email.value = organizator.email;
    datumRodjenja.value = organizator.datumRodjenja;
    adresa.value = organizator.adresa;
    telefon.value = organizator.telefon;
    zanimanje.value = organizator.zanimanje;
    // lozinka.value = korisnik.lozinka;
    // potvrdaLozinke.value = korisnik.lozinka;
}