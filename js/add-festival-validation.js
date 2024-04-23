var organizatorId = window.location.href
  .split("?")[1]
  .split("&")[0]
  .split("=")[1];

var festivaliId = window.location.href
  .split("?")[1]
  .split("&")[1]
  .split("=")[1];

addListeners();

function addFestival() {
  console.log("addFestival");
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
  } else if (cenaInput.value < 0) {
    cenaError.textContent = "Cena ne može biti negativna!";
    isFromValid = false;
  } else {
    cenaError.textContent = "";
  }
  if (maksimalnoOsobaInput.value.trim() === "") {
    maksimalnoOsobaError.textContent =
      "Maksimalan broj osoba je obavezno uneti!";
    isFromValid = false;
  } else if (maksimalnoOsobaInput.value.trim() < 0) {
    maksimalnoOsobaError.textContent =
      "Maksimalno osoba ne može biti negativno!";
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
    addValidatedFestival(
      nazivFestivalaInput.value,
      opisInput.value,
      tipFestivalaInput.value,
      prevozInput.value,
      cenaInput.value,
      maksimalnoOsobaInput.value,
      slikaInput.value
    );
  }
}

function addValidatedFestival(
  nazivFestivala,
  opis,
  tipFestivala,
  prevoz,
  cena,
  maksimalnoOsoba,
  slika
) {
  var festival = {
    naziv: nazivFestivala,
    opis: opis,
    tip: tipFestivala,
    prevoz: prevoz,
    cena: cena,
    maxOsoba: maksimalnoOsoba,
    slike: [slika],
  };

  console.log("parameters: ");
  console.log(nazivFestivala);
  console.log(opis);
  console.log(tipFestivala);
  console.log(prevoz);
  console.log(cena);
  console.log(maksimalnoOsoba);
  console.log(slika);
  console.log("festival: ");
  console.log(festival);

  console.log("festivaliId: " + festivaliId);
  console.log("organizatorId: " + organizatorId);

  var firebaseUrl =
    "https://web-design-9-default-rtdb.europe-west1.firebasedatabase.app";
  var festivaliUrl = firebaseUrl + "/festivali/" + festivaliId + ".json";

  var request = new XMLHttpRequest();
  request.open("POST", festivaliUrl, true);
  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify(festival));

  var requestPromise = new Promise(function (resolve, reject) {
    request.onreadystatechange = function () {
      if (request.readyState == 4) {
        if (request.status == 200) {
          console.log("Festival added");
          resolve(); // Resolve the promise if the festival is added successfully
        } else {
          console.log("Error adding festival");
          reject("Error adding festival");
        }
      }
    };
  });

  // After the promise is resolved, redirect
  requestPromise
    .then(function () {
      window.location.href = "edit-organizer.html?organizerId=" + organizatorId;
    })
    .catch(function (error) {
      console.error(error);
      // Handle error if needed
    });

  // request.onreadystatechange = function() {
  //     if (request.readyState == 4 && request.status == 200) {
  //         console.log("Festival added");
  //         window.location.href = "edit-organizer.html?organizerId=" + organizatorId;
  //     } else {
  //         console.log("Error adding festival");
  //     }
  // };
}

function cancelAddFestival(organizatorId) {
  window.location.href = "edit-organizer.html?organizerId=" + organizatorId;
}

function addListeners() {
  const addFestivalButton = document.getElementById("dodaj-btn");
  addFestivalButton.addEventListener("click", () => addFestival());
  console.log("addListeners");

  const cancelAddFestivalButton = document.getElementById("otkazi-btn");
  cancelAddFestivalButton.addEventListener("click", () =>
    cancelAddFestival(organizatorId)
  );
}
