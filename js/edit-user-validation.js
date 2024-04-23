function onEdit(userId) {
    const korisnickoIme = document.getElementById("korisnicko-ime").value;
    const ime = document.getElementById("ime").value;
    const prezime = document.getElementById("prezime").value;
    const email = document.getElementById("email").value;
    const datumRodjenja = document.getElementById("datum-rodjenja").value;
    const adresa = document.getElementById("adresa").value;
    const telefon = document.getElementById("telefon").value;
    const zanimanje = document.getElementById("zanimanje").value;
    const lozinka = document.getElementById("lozinka").value;
    const potvrdaLozinke = document.getElementById("lozinka-potvrda").value;

    const korisnickoImeGreska = document.getElementById("korisnicko-ime-greska");
    const imeGreska = document.getElementById("ime-greska");
    const prezimeGreska = document.getElementById("prezime-greska");
    const emailGreska = document.getElementById("email-greska");
    const datumRodjenjaGreska = document.getElementById("datum-rodjenja-greska");
    const adresaGreska = document.getElementById("adresa-greska");
    const telefonGreska = document.getElementById("telefon-greska");
    const zanimanjeGreska = document.getElementById("zanimanje-greska");
    const lozinkaGreska = document.getElementById("lozinka-greska");
    const potvrdaLozinkeGreska = document.getElementById(
        "lozinka-potvrda-greska"
    );

    let valid = true;
    if (korisnickoIme.trim() === "") {
        korisnickoImeGreska.textContent = "Polje ne sme biti prazno";
        valid = false;
    } else {
        korisnickoImeGreska.textContent = "";
    }

    if (ime.trim() === "") {
        imeGreska.textContent = "Polje ne sme biti prazno";
        valid = false;
    } else {
        imeGreska.textContent = "";
    }

    if (prezime.trim() === "") {
        prezimeGreska.textContent = "Polje ne sme biti prazno";
        valid = false;
    } else {
        prezimeGreska.textContent = "";
    }

    if (email.trim() === "") {
        emailGreska.textContent = "Polje ne sme biti prazno";
        valid = false;
    } else {
        emailGreska.textContent = "";
    }

    if (datumRodjenja.trim() === "") {
        datumRodjenjaGreska.textContent = "Polje ne sme biti prazno";
        valid = false;
    } else {
        datumRodjenjaGreska.textContent = "";
    }

    if (adresa.trim() === "") {
        adresaGreska.textContent = "Adresa je obavezna!";
        valid = false;
    } else {
        const delovi = adresa.trim().split(",");
        const prviDeo = delovi[0].split(" ");
        if (delovi.length !== 3 || prviDeo.length < 2) {
            adresaGreska.textContent =
                "Adresa mora biti u formatu: ulica broj, mesto/grad, postanski broj";
            valid = false;
        } else {
            adresaGreska.textContent = "";
        }
    }

    if (telefon.trim() === "") {
        telefonGreska.textContent = "Polje ne sme biti prazno";
        valid = false;
    } else if (!/^\d+$/.test(telefon.trim())) {
        telefonGreska.textContent = "Polje može sadržati samo brojeve";
        valid = false;
    } else {
        telefonGreska.textContent = "";
    }

    if (zanimanje.trim() === "") {
        zanimanjeGreska.textContent = "Polje ne sme biti prazno";
        valid = false;
    } else {
        zanimanjeGreska.textContent = "";
    }

    if (
        lozinka.trim() !== "" &&
        potvrdaLozinke.trim() !== "" &&
        lozinka.trim() !== potvrdaLozinke.trim()
    ) {
        potvrdaLozinkeGreska.textContent = "Lozinke se ne poklapaju";
        valid = false;
    } else {
        potvrdaLozinkeGreska.textContent = "";
    }

    if (valid) {
        editUser(
            userId,
            korisnickoIme,
            ime,
            prezime,
            email,
            datumRodjenja,
            adresa,
            telefon,
            zanimanje,
            lozinka,
            potvrdaLozinke
        );
        window.location.href = "admin-for-user.html";
    }
}

function editUser(
    userId,
    korisnickoIme,
    ime,
    prezime,
    email,
    datumRodjenja,
    adresa,
    telefon,
    zanimanje,
    lozinka,
    potvrdaLozinke
) {
    console.log("edit user");
}

function addListeners() {
    var izmeniButton = document.getElementById("izmeni-btn");
    var otkaziButton = document.getElementById("otkazi-btn");
    var obrisiButton = document.getElementById("obrisi-btn");

    izmeniButton.addEventListener("click", () => {
        onCancel();
    });

    otkaziButton.addEventListener("click", () => {
        onCancel();
    });

    obrisiButton.addEventListener("click", () => {
        onDelete(userId);
    });
}

function onCancel() {
    window.location.href = "admin-for-user.html";
}

function onDelete(userId) {
    //   event.preventDefault();
    // Create the modal container
    const modalContainer = document.createElement("div");
    modalContainer.classList.add("modal");
    modalContainer.setAttribute("tabindex", "-1");

    // Create the modal dialog
    const modalDialog = document.createElement("div");
    modalDialog.classList.add("modal-dialog");

    // Create the modal content
    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    // Create the modal header
    const modalHeader = document.createElement("div");
    modalHeader.classList.add("modal-header");

    // Create the modal title
    const modalTitle = document.createElement("h5");
    modalTitle.classList.add("modal-title");
    modalTitle.textContent = "Brisanje korisnika";

    // Create the close button
    const closeButton = document.createElement("button");
    closeButton.setAttribute("type", "button");
    closeButton.classList.add("btn-close");
    closeButton.setAttribute("data-bs-dismiss", "modal");
    closeButton.setAttribute("aria-label", "Close");

    // Append the modal title and close button to the modal header
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);

    // Create the modal body
    const modalBody = document.createElement("div");
    modalBody.classList.add("modal-body");
    modalBody.innerHTML =
        "<p>Da li ste sigurni da zelite da obrisete korisnika?</p>";

    // Create the modal footer
    const modalFooter = document.createElement("div");
    modalFooter.classList.add("modal-footer", "dflex", "justify-content-center");

    // Create the close button for the footer
    const closeButtonFooter = document.createElement("button");
    closeButtonFooter.setAttribute("type", "button");
    closeButtonFooter.classList.add("btn", "btn-secondary");
    closeButtonFooter.setAttribute("data-bs-dismiss", "modal");
    closeButtonFooter.textContent = "Odustani";

    // Create the save changes button for the footer
    const confirmDeleteButton = document.createElement("button");
    confirmDeleteButton.setAttribute("type", "button");
    confirmDeleteButton.classList.add("btn", "btn-primary");
    confirmDeleteButton.textContent = "Obrisi";

    // Append the buttons to the modal footer
    modalFooter.appendChild(closeButtonFooter);
    modalFooter.appendChild(confirmDeleteButton);

    // Append the header, body, and footer to the modal content
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);

    // Append the modal content to the modal dialog
    modalDialog.appendChild(modalContent);

    // Append the modal dialog to the modal container
    modalContainer.appendChild(modalDialog);

    const myModal = new bootstrap.Modal(modalContainer);
    myModal.show();

    closeButtonFooter.addEventListener("click", function() {
        myModal.hide();
    });

    confirmDeleteButton.addEventListener("click", function() {
        myModal.hide();
        deleteUser(userId);
        window.location.href = "admin-for-user.html";
    });
}

function deleteUser(userId) {
    console.log("delete user");
}