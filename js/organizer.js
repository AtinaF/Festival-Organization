var firebaseUrl =
  "https://web-design-9-default-rtdb.europe-west1.firebasedatabase.app";

var festivalId = window.location.href.split("?")[1].split("=")[1];
var organizatorUrl =
  firebaseUrl + "/organizatoriFestivala/" + festivalId + ".json";
var korisniciUrl = firebaseUrl + "/festivali/";

var organizator = {};
var korisnici = {};
var korisniciIds = [];

Promise.all([loadOrganizator()])
  .then(() => {
    console.log("All data loaded successfully");
    Promise.all([loadFestivali(organizator.festivali)])
      .then(() => {
        console.log("All festivali data loaded successfully");
        showFestival();
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      });
  })
  .catch((error) => {
    console.error("Error loading data:", error);
  });

function loadOrganizator() {
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
          resolve(); // Resolve the promise
        } else {
          reject(
            "Error loading organizator data. Status code: " + request.status
          );
        }
      }
    };
  });
}

function loadFestivali(festivaliId) {
  return new Promise((resolve, reject) => {
    var request = new XMLHttpRequest();
    request.open("GET", korisniciUrl + festivaliId + ".json", true);
    request.send();
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        // done
        if (request.status === 200) {
          // success
          korisnici = JSON.parse(request.responseText);

          for (var id in korisnici) {
            korisniciIds.push(id);
          }
          resolve(); // Resolve the promise
        } else {
          reject(
            "Error loading organizator data. Status code: " + request.status
          );
        }
      }
    };
  });
}

function showFestival() {
  var organizatorContainer = document.getElementById("organizator-container");

  var organizatorNameRow = document.createElement("div");
  organizatorNameRow.classList.add("row");

  var organizatorName = document.createElement("h2");
  organizatorName.classList.add(
    "col-md-12",
    "col-sm-12",
    "text-center",
    "bg-light"
  );
  organizatorName.innerText = organizator.naziv;

  organizatorNameRow.appendChild(organizatorName);
  organizatorContainer.appendChild(organizatorNameRow);

  var logoRow = document.createElement("div");
  logoRow.classList.add("row");

  var logoDiv = document.createElement("div");
  logoDiv.classList.add("col-md-12", "col-sm-12", "text-center");

  var logoImg = document.createElement("img");
  logoImg.src = organizator.logo;
  logoImg.classList.add("rounded");
  logoImg.alt = "Logo organizatora";

  logoDiv.appendChild(logoImg);
  logoRow.appendChild(logoDiv);

  var addressRow = document.createElement("div");
  addressRow.classList.add("row", "mt-3");

  var addressText = document.createElement("p");
  addressText.classList.add("col-md-6", "col-sm-12", "mx-auto", "text-center");
  addressText.style.color = "white";
  addressText.innerHTML =
    "<b><label for='organizerAddress'>Adresa:</label></b>";

  var addressSpan = document.createElement("span");
  addressSpan.id = "organizerAddress";
  addressSpan.innerText = organizator.adresa;

  addressText.appendChild(addressSpan);
  addressRow.appendChild(addressText);
  organizatorContainer.appendChild(addressRow);

  // Create row for founding year
  var foundingYearRow = document.createElement("div");
  foundingYearRow.classList.add("row");

  var foundingYearText = document.createElement("p");
  foundingYearText.classList.add(
    "col-md-6",
    "col-sm-12",
    "mx-auto",
    "text-center"
  );
  foundingYearText.style.color = "white";
  foundingYearText.innerHTML =
    "<b><label for='foundingYear'>Godina osnivanja:</label></b>";

  var foundingYearSpan = document.createElement("span");
  foundingYearSpan.id = "foundingYear";
  foundingYearSpan.innerText = organizator.godinaOsnivanja;

  foundingYearText.appendChild(foundingYearSpan);
  foundingYearRow.appendChild(foundingYearText);
  organizatorContainer.appendChild(foundingYearRow);

  // Create row for email
  var emailRow = document.createElement("div");
  emailRow.classList.add("row");

  var emailText = document.createElement("p");
  emailText.classList.add("col-md-6", "col-sm-12", "mx-auto", "text-center");
  emailText.style.color = "white";
  emailText.innerHTML = "<b><label for='organizerEmail'>Email:</label></b>";

  var emailSpan = document.createElement("span");
  emailSpan.id = "organizerEmail";
  emailSpan.innerText = organizator.email;

  emailText.appendChild(emailSpan);
  emailRow.appendChild(emailText);
  organizatorContainer.appendChild(emailRow);

  // Create row for contact phone
  var contactRow = document.createElement("div");
  contactRow.classList.add("row");

  var contactText = document.createElement("p");
  contactText.classList.add("col-md-6", "col-sm-12", "mx-auto", "text-center");
  contactText.style.color = "white";
  contactText.innerHTML =
    "<b><label for='organizerContact'>Kontakt telefon:</label></b>";

  var contactSpan = document.createElement("span");
  contactSpan.id = "organizerContact";
  contactSpan.innerText = organizator.kontaktTelefon;

  contactText.appendChild(contactSpan);
  contactRow.appendChild(contactText);
  organizatorContainer.appendChild(contactRow);

  // Create row for Festivali title
  var festivaliTitleRow = document.createElement("div");
  festivaliTitleRow.classList.add("row");

  var festivaliTitle = document.createElement("h4");
  festivaliTitle.classList.add("mx-auto");
  festivaliTitle.style.color = "white";
  festivaliTitle.innerText = "Festivali";

  festivaliTitleRow.appendChild(festivaliTitle);
  organizatorContainer.appendChild(festivaliTitleRow);

  //festivali container

  var festivaliContainer = document.createElement("div");
  festivaliContainer.classList.add("container", "custom-container", "col-12");

  var festivaliRow = document.createElement("div");
  festivaliRow.classList.add("row");

  for (var id of korisniciIds) {
    var colDiv = document.createElement("div");
    colDiv.classList.add("col-md-3", "col-sm-12");

    var cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "my-3");

    var img = document.createElement("img");
    img.src = korisnici[id].slike[0];
    // img.classList.add("card-img-top");
    img.alt = "Festival Image";
    // img.height = "30%";

    var cardBodyDiv = document.createElement("div");
    cardBodyDiv.classList.add("card-body");

    var title = document.createElement("h5");
    title.classList.add("card-title");
    title.innerText = korisnici[id].naziv;

    var type = document.createElement("p");
    type.classList.add("card-text");
    type.innerText = "Tip festivala: " + korisnici[id].tip;

    var detailsLink = document.createElement("a");
    detailsLink.href =
      "festival.html?festivalId=" +
      id +
      "&festivaliId=" +
      organizator.festivali;
    detailsLink.classList.add(
      "btn",
      "btn-primary",
      "d-flex",
      "justify-content-center"
    );
    detailsLink.innerText = "Details";

    // Append elements
    cardBodyDiv.appendChild(title);
    cardBodyDiv.appendChild(type);
    cardBodyDiv.appendChild(detailsLink);

    cardDiv.appendChild(img);
    cardDiv.appendChild(cardBodyDiv);

    colDiv.appendChild(cardDiv);

    festivaliRow.appendChild(colDiv);

    festivaliContainer.appendChild(festivaliRow);

    organizatorContainer.appendChild(festivaliContainer);
  }
}
