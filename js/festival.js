var firebaseUrl =
  "https://web-design-9-default-rtdb.europe-west1.firebasedatabase.app";

var festivaliUrl = firebaseUrl + "/festivali/";
var festivalId = localStorage.getItem("festivalId");
var festivaliId = localStorage.getItem("festivaliId");

var festival = {};

Promise.all([loadFestivali()])
  .then(() => {
    console.log("All festival data loaded successfully");
    showFestival();
  })
  .catch((error) => {
    console.error("Error loading data:", error);
  });

function loadFestivali() {
  return new Promise((resolve, reject) => {
    var request = new XMLHttpRequest();
    request.open(
      "GET",
      festivaliUrl + festivaliId + "/" + festivalId + ".json",
      true
    );
    request.send();
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        // done
        if (request.status === 200) {
          // success
          festival = JSON.parse(request.responseText);
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
  // Create main container
  var container = document.getElementById("festival-container");

  // Festival name
  var nameRow = document.createElement("div");
  nameRow.classList.add("row", "mt-3");
  var nameHeader = document.createElement("h2");
  nameHeader.classList.add("mx-auto", "bg-light", "text-center");
  nameHeader.style.color = "black";
  nameHeader.style.width = "100%";
  nameHeader.innerText = festival.naziv;
  nameRow.appendChild(nameHeader);

  //TODO round all imgs
  // Image
  var imgRow = document.createElement("div");
  imgRow.classList.add("row", "mt-3");
  var mainImg = document.createElement("img");
  mainImg.classList.add("col-md-8", "col-lg-6", "text-center", "mx-auto");
  mainImg.src = festival.slike[0];
  mainImg.alt = "slika festivala";
  mainImg.style.borderRadius = "10%";
  imgRow.appendChild(mainImg);

  // Image grid
  var imgGridRow = document.createElement("div");
  // imgGridRow.style.backgroundColor = " rgb(39, 66, 89)";
  imgGridRow.style.borderRadius = "7%";
  var imgGrid = document.createElement("div");
  imgGrid.classList.add("row", "mt-3", "col-md-8", "mx-auto");

  for (var i = 1; i < festival.slike.length; i++) {
    var img = document.createElement("img");
    img.src = festival.slike[i];
    img.classList.add("col-md-4", "mt-2", "mb-2", "col-sm-12");

    img.style.minHeight = "220px";
    img.style.maxHeight = "220px";
    img.style.width = "100%";
    img.style.borderRadius = "20%";
    imgGrid.appendChild(img);
  }

  var hrline = document.createElement("hr");
  hrline.style.border = "0.5px solid white";
  hrline.style.width = "100%";

  imgGridRow.appendChild(imgGrid);
  imgGridRow.appendChild(hrline);

  // Description
  var descriptionRow = document.createElement("div");
  descriptionRow.classList.add("row", "mt-3");
  var description = document.createElement("p");
  description.classList.add("text-justify", "col-md-8", "mx-auto");
  description.innerHTML = `
    Istražite bogatstvo grčke muzičke tradicije kroz niz koncerata i radionica, gde će vas voditi kroz istoriju grčke muzike, od antike do modernih dana, uz prelepi ambijent Sitonije.
  `;
  descriptionRow.appendChild(description);

  // Festival details
  var detailsRow = document.createElement("div");
  detailsRow.classList.add("row", "mt-3");
  detailsRow.innerHTML = `
    <div class="col-md-8 col-sm-12 mx-auto">
      <b>Tip festivala:</b>
      <span>Muzicki</span>
    </div>
    <div class="col-md-8 col-sm-12 mx-auto">
      <b>Maksimalno osoba:</b>
      <span>300</span>
    </div>
    <div class="col-md-8 col-sm-12 mx-auto">
      <b>Prevoz:</b>
      <span>Autobus</span>
    </div>
    <div class="col-md-8 col-sm-12 mx-auto">
      <b>Cena:</b>
      <span>1500</span>
    </div>
  `;

  // Append all elements to the main container
  container.appendChild(nameRow);
  container.appendChild(imgRow);
  container.appendChild(imgGridRow);
  container.appendChild(descriptionRow);
  container.appendChild(detailsRow);

  // Append the main container to the document body
  document.body.appendChild(container);
}
