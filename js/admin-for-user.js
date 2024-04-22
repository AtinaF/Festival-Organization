var firebaseUrl =
    "https://web-design-9-default-rtdb.europe-west1.firebasedatabase.app";

var organizatoriUrl = firebaseUrl + "/korisnici.json";

var organizatori = {};
var organizatoriIds = [];

Promise.all([loadOrganizatori()])
    .then(() => {
        console.log("All korisnici data loaded successfully");
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
        request.onreadystatechange = function() {
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

function showOrganizatori() {
    const tbody = document.getElementById("tbody-korisnici");

    // Clear existing rows
    tbody.innerHTML = "";

    // Loop through each user and create a table row
    for (var id of organizatoriIds) {
        let row = document.createElement("tr");

        const korisnickoImeCell = document.createElement("td");
        korisnickoImeCell.textContent = organizatori[id].korisnickoIme;

        const imeCell = document.createElement("td");
        imeCell.textContent = organizatori[id].ime;

        const prezimeCell = document.createElement("td");
        prezimeCell.textContent = organizatori[id].prezime;

        const emailCell = document.createElement("td");
        emailCell.textContent = organizatori[id].email;

        const datumRodjenjaCell = document.createElement("td");
        datumRodjenjaCell.textContent = organizatori[id].datumRodjenja;

        const adresaCell = document.createElement("td");
        adresaCell.textContent = organizatori[id].adresa;

        const telefonCell = document.createElement("td");
        telefonCell.textContent = organizatori[id].telefon;

        const zanimanjeCell = document.createElement("td");
        zanimanjeCell.textContent = organizatori[id].zanimanje;

        const upravljanjeCell = document.createElement("td");

        const editButton = document.createElement("a");
        editButton.href = "edit-user.html?korisnikId=" + id;
        // editButton.onclick = editKorisnik(id);
        editButton.className =
            "btn-primary d-flex justify-content-center mt-2 rounded";
        editButton.style.backgroundColor = "rgb(217, 217, 217)";
        editButton.style.color = "black";
        editButton.textContent = "izmeni";
        upravljanjeCell.appendChild(editButton);

        const deleteButton = createDeleteButton(id);

        // document.createElement("a");
        // deleteButton.href = "#";

        // // deleteButton.href = "delete-user.html?userId=" + id;
        // deleteButton.className =
        //     "btn-primary d-flex justify-content-center mt-2 rounded";
        // deleteButton.style.backgroundColor = "rgb(217, 217, 217)";
        // deleteButton.style.color = "black";
        // deleteButton.textContent = "obrisi";
        // deleteButton.addEventListener("click", () => {
        //     onDelete(id);
        //     console.log(id);
        // });
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