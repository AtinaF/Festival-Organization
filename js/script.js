var firebaseUrl =
  "https://web-design-9-default-rtdb.europe-west1.firebasedatabase.app";

var festivaliUrl = firebaseUrl + "/korisnici" + ".json";
var organizatoriFestivalaUrl = firebaseUrl + "/organizatoriFestivala" + ".json";
var festivaliUrl = firebaseUrl + "/festivali" + ".json";

// //ovakav zahtev se blokira sa CORS policy
// var firebaseGradivniUrl =
//     "https://console.firebase.google.com/project/web-design-9/database/web-design-9-default-rtdb/data/~2F";
// // + festivali
// // + korisnici
// // + organizatoriFestivala

var festivali = {};
var festivaliIds = [];

var organizatoriFestivala = {};
var organizatoriFestivalaIds = [];

var festivali = {};
var festivaliIds = [];

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

    var detailsBtn = createDetailsButton(id);

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(detailsBtn);
    cardDiv.appendChild(image);
    cardDiv.appendChild(cardBody);
    outerDiv.appendChild(cardDiv);
    sviOrganizatori.appendChild(outerDiv);
  }
}

function createDetailsButton(id) {
  let detailsBtn = document.createElement("button");
  detailsBtn.addEventListener("click", () => DetailsClicked(id));
  detailsBtn.classList.add(
    "btn",
    "btn-primary",
    "d-flex",
    "justify-content-center"
  );
  detailsBtn.textContent = "Detalji";
  return detailsBtn;
}

function DetailsClicked(id) {
  localStorage.setItem("organizatorId", id);
  window.location.href = "organizer.html";
}
