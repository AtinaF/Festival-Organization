var firebaseUrl =
    "https://web-design-9-default-rtdb.europe-west1.firebasedatabase.app";

var organizatorId = localStorage.getItem("organizatorId");
var organizatorUrl =
    firebaseUrl + "/organizatoriFestivala/" + organizatorId + ".json";
var festivaliUrl = firebaseUrl + "/festivali/";

var organizator = {};
var festivali = {};
var festivaliIds = [];

var searchResultFestivali = {};
var searchResultFestivaliIds = [];

// if (localStorage.getItem("searchFestivaliResult") != null) {
//     searchResultFestivali = JSON.parse(
//         localStorage.getItem("searchFestivaliResult")
//     );
//     searchResultFestivaliIds = JSON.parse(
//         localStorage.getItem("searchFestivalIds")
//     );
// }

Promise.all([loadOrganizator()])
    .then(() => {
        console.log("All data loaded successfully");
        Promise.all([loadFestivali(organizator.festivali)])
            .then(() => {
                console.log("All festivali data loaded successfully");
                showFestival("", "");
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
        request.onreadystatechange = function() {
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
        request.open("GET", festivaliUrl + festivaliId + ".json", true);
        request.send();
        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                // done
                if (request.status === 200) {
                    // success
                    festivali = JSON.parse(request.responseText);

                    for (var id in festivali) {
                        festivaliIds.push(id);
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

function showFestival(nameSearchValue, typeSearchValue) {
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

    if (localStorage.getItem("searchFestivaliResult") == null) {
        for (var id of festivaliIds) {
            var colDiv = document.createElement("div");
            colDiv.classList.add("col-md-3", "col-sm-12");

            var cardDiv = document.createElement("div");
            cardDiv.classList.add("card", "my-3");

            var img = document.createElement("img");
            img.src = festivali[id].slike[0];
            // img.classList.add("card-img-top");
            img.alt = "Festival Image";
            // img.height = "30%";

            var cardBodyDiv = document.createElement("div");
            cardBodyDiv.classList.add("card-body");

            var title = document.createElement("h5");
            title.classList.add("card-title");
            title.innerText = festivali[id].naziv;

            var type = document.createElement("p");
            type.classList.add("card-text");
            type.innerText = "Tip festivala: " + festivali[id].tip;

            var detailsLink = createDetailsButton(id);

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
    } else {
        for (var id of searchResultFestivaliIds) {
            var colDiv = document.createElement("div");
            colDiv.classList.add("col-md-3", "col-sm-12");

            var cardDiv = document.createElement("div");
            cardDiv.classList.add("card", "my-3");

            var img = document.createElement("img");
            img.src = searchResultFestivali[id].slike[0];
            // img.classList.add("card-img-top");
            img.alt = "Festival Image";
            // img.height = "30%";

            var cardBodyDiv = document.createElement("div");
            cardBodyDiv.classList.add("card-body");

            var title = document.createElement("h5");
            title.classList.add("card-title");
            title.innerText = searchResultFestivali[id].naziv;
            title.innerHTML = highlightKeyword(title.innerText, nameSearchValue);

            var type = document.createElement("p");
            type.classList.add("card-text");
            type.innerText = "Tip festivala: " + searchResultFestivali[id].tip;
            type.innerHTML = highlightKeyword(type.innerText, typeSearchValue);

            var detailsLink = createDetailsButton(id);

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

    //search section
    var searchRow = document.createElement("div");
    searchRow.classList.add(
        "row",
        "mt-3",
        "mb-3",
        "d-flex",
        "align-items-center",
        "justify-content-center"
    );
    // Create input for searching by Naziv
    var searchInputCol = document.createElement("div");
    searchInputCol.classList.add("col-md-5", "col-sm-12", "text-center");
    var searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.id = "searchNameInput";
    searchInput.placeholder = "Naziv festivala";
    searchInputCol.appendChild(searchInput);
    searchRow.appendChild(searchInputCol);

    // Create combobox for searching by Tip
    var searchComboCol = document.createElement("div");
    searchComboCol.classList.add("col-md-5", "col-sm-12", "text-center");
    var searchCombo = document.createElement("select");
    searchCombo.id = "searchTypeCombo";
    var tipOptions = [
        "Izaberi tip",
        "Muzički",
        "Umetnički",
        "Filmski",
        "Gastronomski",
        "Edukativni",
    ];
    for (var i = 0; i < tipOptions.length; i++) {
        var option = document.createElement("option");
        option.value = tipOptions[i];
        option.text = tipOptions[i];
        searchCombo.appendChild(option);
    }
    searchComboCol.appendChild(searchCombo);
    searchRow.appendChild(searchComboCol);

    // Create search button
    var searchButtonCol = document.createElement("div");
    searchButtonCol.classList.add(
        "col-md-2",
        "col-sm-12",
        "text-center",
        "d-flex",
        "align-items-center",
        "justify-content-center"
    );

    var searchBtnDiv = document.createElement("div");
    searchBtnDiv.classList.add("input-group-append");
    var searchButton = document.createElement("button");
    searchButton.classList.add("btn", "btn-primary");
    var searchIcon = document.createElement("i");
    searchIcon.classList.add("fas", "fa-search");

    // searchButton.textContent = "Search";
    searchButton.addEventListener("click", searchFestival);
    searchButton.appendChild(searchIcon);
    searchBtnDiv.appendChild(searchButton);
    searchButtonCol.appendChild(searchBtnDiv);
    searchRow.appendChild(searchButtonCol);

    festivaliContainer.appendChild(searchRow);
    organizatorContainer.appendChild(festivaliContainer);

    localStorage.removeItem("searchFestivaliResult");
    localStorage.removeItem("searchFestivalIds");
}

function searchFestival() {
    var searchInput = document.getElementById("searchNameInput").value;
    var searchType = document.getElementById("searchTypeCombo").value;
    var organizatorContainer = document.getElementById("organizator-container");
    organizatorContainer.innerHTML = "";
    var noviFestivali = {};
    var noviFestivaliIds = [];

    for (var id of festivaliIds) {
        var festival = festivali[id];
        var searchNameValue = searchInput.trim().toLowerCase();
        var searchTypeValue = searchType.toLowerCase();
        var festivalName = festival.naziv.toLowerCase();
        var festivalType = festival.tip.toLowerCase();

        if (searchNameValue !== "" && searchTypeValue === "izaberi tip") {
            //search by name
            if (festivalName.includes(searchNameValue)) {
                noviFestivali[id] = festival;
                noviFestivaliIds.push(id);
            }
        } else if (searchNameValue === "" && searchTypeValue !== "izaberi tip") {
            //search by type
            if (festivalType === searchTypeValue) {
                noviFestivali[id] = festival;
                noviFestivaliIds.push(id);
            }
        } else if (searchNameValue !== "" && searchTypeValue !== "izaberi tip") {
            //search by both
            if (
                festivalName.includes(searchNameValue) &&
                festivalType === searchTypeValue
            ) {
                noviFestivali[id] = festival;
                noviFestivaliIds.push(id);
            }
        } else {
            console.log("not a match");
        }
    }
    console.log("Broj pronadjenih festivala: ", noviFestivaliIds.length);
    localStorage.setItem("searchFestivaliResult", JSON.stringify(noviFestivali));
    localStorage.setItem("searchFestivalIds", JSON.stringify(noviFestivaliIds));
    searchResultFestivali = JSON.parse(
        localStorage.getItem("searchFestivaliResult")
    );
    searchResultFestivaliIds = JSON.parse(
        localStorage.getItem("searchFestivalIds")
    );

    // festivali = noviFestivali;
    // festivaliIds = noviFestivaliIds;
    showFestival(searchNameValue, searchTypeValue);
}

function createDetailsButton(id) {
    var detailsBtn = document.createElement("button");
    detailsBtn.classList.add(
        "btn",
        "btn-primary",
        "d-flex",
        "justify-content-center"
    );
    detailsBtn.textContent = "Details";
    detailsBtn.addEventListener("click", () => DetailsClicked(id));
    return detailsBtn;
}

function DetailsClicked(festivalId) {
    localStorage.setItem("festivalId", festivalId);
    localStorage.setItem("festivaliId", organizator.festivali);
    window.location.href = "festival.html";
}

function highlightKeyword(text, searchTerm) {
    // Create a regular expression with the search term
    var regex = new RegExp("(" + searchTerm + ")", "gi");

    // Replace the search term with the same term wrapped in a span with a red background
    return text.replace(
        regex,
        '<span style="background-color: orange;">$1</span>'
    );
}