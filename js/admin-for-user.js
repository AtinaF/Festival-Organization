var firebaseUrl =
  "https://web-design-9-default-rtdb.europe-west1.firebasedatabase.app";

var korisniciUrl = firebaseUrl + "/korisnici.json";

var korisnici = {};
var korisniciIds = [];

Promise.all([loadKorisnici()])
  .then(() => {
    console.log("All korisnici data loaded successfully");
    showKorisnici();
  })
  .catch((error) => {
    console.error("Error loading data:", error);
  });

function loadKorisnici() {
  return new Promise((resolve, reject) => {
    var request = new XMLHttpRequest();
    request.open("GET", korisniciUrl, true);
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

function showKorisnici() {
  const tbody = document.getElementById("tbody-korisnici");

  // Clear existing rows
  tbody.innerHTML = "";

  // Loop through each user and create a table row
  for (var id of korisniciIds) {
    let row = document.createElement("tr");

    const korisnickoImeCell = document.createElement("td");
    korisnickoImeCell.textContent = korisnici[id].korisnickoIme;

    const imeCell = document.createElement("td");
    imeCell.textContent = korisnici[id].ime;

    const prezimeCell = document.createElement("td");
    prezimeCell.textContent = korisnici[id].prezime;

    const emailCell = document.createElement("td");
    emailCell.textContent = korisnici[id].email;

    const datumRodjenjaCell = document.createElement("td");
    datumRodjenjaCell.textContent = korisnici[id].datumRodjenja;

    const adresaCell = document.createElement("td");
    adresaCell.textContent = korisnici[id].adresa;

    const telefonCell = document.createElement("td");
    telefonCell.textContent = korisnici[id].telefon;

    const zanimanjeCell = document.createElement("td");
    zanimanjeCell.textContent = korisnici[id].zanimanje;

    const upravljanjeCell = document.createElement("td");

    const editButton = createEditButton(id);
    upravljanjeCell.appendChild(editButton);

    const deleteButton = createDeleteButton(id);
    upravljanjeCell.appendChild(deleteButton);

    row.appendChild(korisnickoImeCell);
    row.appendChild(imeCell);
    row.appendChild(prezimeCell);
    row.appendChild(emailCell);
    row.appendChild(datumRodjenjaCell);
    row.appendChild(adresaCell);
    row.appendChild(telefonCell);
    row.appendChild(zanimanjeCell);

    row.appendChild(upravljanjeCell);

    tbody.appendChild(row);
  }
}

function createEditButton(id) {
  const editButton = document.createElement("button");

  editButton.addEventListener("click", () => editKorisnik(id));

  editButton.className =
    "btn-primary d-flex justify-content-center mt-2 rounded";
  editButton.style.backgroundColor = "rgb(217, 217, 217)";
  editButton.style.color = "black";
  editButton.textContent = "izmeni";
  editButton.style.width = "100%";
  return editButton;
}

function createDeleteButton(id) {
  console.log("Creating delete button for user with id", id);

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

function editKorisnik(id) {
  console.log("going to edit user with id", id);
  if (localStorage.getItem("korisnikId") !== null) {
    localStorage.removeItem("korisnikId");
  }
  localStorage.setItem("korisnikId", id);
  window.location.href = "edit-user.html";
}
