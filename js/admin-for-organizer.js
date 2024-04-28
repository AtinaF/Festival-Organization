var firebaseUrl =
  "https://web-design-9-default-rtdb.europe-west1.firebasedatabase.app";

var organizatoriUrl = firebaseUrl + "/organizatoriFestivala.json";

var organizatori = {};
var organizatoriIds = [];

var festivali = {};
var festivaliIds = [];

Promise.all([loadOrganizatori()])
  .then(() => {
    console.log("All organizatori loaded successfully");
    showOrganizatori();
  })
  .catch((error) => {
    console.error("Error loading data:", error);
  });

function loadOrganizatori() {
  return new Promise((resolve, reject) => {
    var request = new XMLHttpRequest();
    request.open("GET", organizatoriUrl, true);
    request.send();
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        // done
        if (request.status === 200) {
          // success
          organizatori = JSON.parse(request.responseText);

          for (var id in organizatori) {
            organizatoriIds.push(id);
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

function loadFestivali(festivaliId) {
  return new Promise((resolve, reject) => {
    var request = new XMLHttpRequest();
    request.open(
      "GET",
      firebaseUrl + "/festivali/" + festivaliId + ".json",
      true
    );
    request.send();
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        // done
        if (request.status === 200) {
          // success
          festivali = JSON.parse(request.responseText);
          festivaliIds = [];
          for (var id in festivali) {
            festivaliIds.push(id);
          }
          resolve(); // Resolve the promise
        } else {
          reject("Error loading festival data. Status code: " + request.status);
        }
      }
    };
  });
}

function showOrganizatori() {
  const tbody = document.getElementById("tbody-organizatori");

  // Clear existing rows
  tbody.innerHTML = "";

  // Loop through each user and create a table row
  for (var id of organizatoriIds) {
    let row = document.createElement("tr");
    const logoCell = document.createElement("td");
    logoCell.classList.add("text-center", "align-middle");
    const logo = document.createElement("img");
    logo.src = organizatori[id].logo;
    logo.alt = "Logo";
    logo.classList.add("img-fluid", "rounded-sm", "logo-img");
    logo.style.maxWidth = "100px";
    logo.style.minHeight = "100px";
    logo.style.margin = "auto"; // Add this line to center the image vertically
    logoCell.appendChild(logo);

    const NazivCell = document.createElement("td");
    NazivCell.textContent = organizatori[id].naziv;

    const adresaCell = document.createElement("td");
    adresaCell.textContent = organizatori[id].adresa;

    const godinaCell = document.createElement("td");
    godinaCell.textContent = organizatori[id].godinaOsnivanja;

    const telefonCell = document.createElement("td");
    telefonCell.textContent = organizatori[id].telefon;

    const emailCell = document.createElement("td");
    emailCell.textContent = organizatori[id].email;

    const festivaliCell = document.createElement("td");

    Promise.all([loadFestivali(organizatori[id].festivali)])
      .then(() => {
        console.log("Successfully loaded festivali");
        for (var idFestivala of festivaliIds) {
          const festivalNaziv = document.createElement("span");
          festivalNaziv.textContent = festivali[idFestivala].naziv + "; ";
          festivalNaziv.style.color = "white";
          festivaliCell.appendChild(festivalNaziv);
        }
      })
      .catch((error) => {
        console.error("Error loading festivali:", error);
      });

    const upravljanjeCell = document.createElement("td");

    const editButton = createEditButton(id);
    upravljanjeCell.appendChild(editButton);

    const deleteButton = createDeleteButton(id);
    upravljanjeCell.appendChild(deleteButton);

    row.appendChild(logoCell);
    row.appendChild(NazivCell);
    row.appendChild(adresaCell);
    row.appendChild(godinaCell);
    row.appendChild(telefonCell);
    row.appendChild(emailCell);
    row.appendChild(festivaliCell);

    row.appendChild(upravljanjeCell);

    tbody.appendChild(row);
  }
}

function createDeleteButton(id) {
  console.log("Creating delete button for organizer with id", id);

  const deleteButton = document.createElement("a");
  deleteButton.href = "#";
  deleteButton.className =
    "btn-primary d-flex justify-content-center mt-2 rounded";
  deleteButton.style.backgroundColor = "rgb(217, 217, 217)";
  deleteButton.style.color = "black";
  deleteButton.textContent = "obrisi";
  deleteButton.addEventListener("click", () => {
    onDelete(id);
  });
  return deleteButton;
}

function createEditButton(id) {
  const editButton = document.createElement("button");
  editButton.className =
    "btn-primary d-flex justify-content-center mt-2 rounded";
  editButton.style.backgroundColor = "rgb(217, 217, 217)";
  editButton.style.color = "black";
  editButton.textContent = "obrisi";
  editButton.textContent = "izmeni";
  editButton.style.width = "100%";
  editButton.addEventListener("click", () => {
    editOrganizer(id);
  });

  return editButton;
}

function editOrganizer(id) {
  localStorage.setItem("organizerId", id);
  window.location.href = "edit-organizer.html";
}
