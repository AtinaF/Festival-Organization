function onEditOrganizer(organizerId) {
  const nazivOrganizatora = document.getElementById("naziv-organizatora").value;
  const logoOrganizatora = document.getElementById("organizer-logo").value;
  const adresaOrganizatora = document.getElementById(
    "adresa-organizatora"
  ).value;
  const godinaOsnivanja = document.getElementById("godina-osnivanja").value;
  const email = document.getElementById("organizer-email").value;
  const kontaktTelefon = document.getElementById("kontakt-telefon").value;

  const nazivOrganizatoraGreska = document.getElementById(
    "naziv-organizatora-greska"
  );
  const logoOrganizatoraGreska = document.getElementById("logo-greska");
  const adresaGreska = document.getElementById("adresa-greska");
  const godinaOsnivanjaGreska = document.getElementById(
    "godina-osnivanja-greska"
  );
  const emailGreska = document.getElementById("email-greska");
  const kontaktTelefonGreska = document.getElementById("kontakt-greska");

  let isValid = true;

  if (nazivOrganizatora === "") {
    nazivOrganizatoraGreska.textContent = "Morate uneti naziv organizatora!";
    isValid = false;
  } else {
    nazivOrganizatoraGreska.textContent = "";
  }

  if (logoOrganizatora === "") {
    logoOrganizatoraGreska.textContent = "Morate uneti logo organizatora!";
    isValid = false;
  } else {
    logoOrganizatoraGreska.textContent = "";
  }

  if (adresaOrganizatora === "") {
    adresaGreska.textContent = "Morate uneti adresu organizatora!";
    isValid = false;
  } else {
    adresaGreska.textContent = "";
  }

  if (godinaOsnivanja === "") {
    godinaOsnivanjaGreska.textContent = "Morate uneti godinu osnivanja!";
    isValid = false;
  } else {
    godinaOsnivanjaGreska.textContent = "";
  }

  if (email === "") {
    emailGreska.textContent = "Morate uneti email!";
    isValid = false;
  } else {
    emailGreska.textContent = "";
  }

  if (kontaktTelefon === "") {
    kontaktTelefonGreska.textContent = "Morate uneti kontakt telefon!";
    isValid = false;
  } else {
    kontaktTelefonGreska.textContent = "";
  }

  if (isValid) {
    editOrganizer(
      organizerId,
      nazivOrganizatora,
      email,
      logoOrganizatora,
      adresaOrganizatora,
      godinaOsnivanja,
      kontaktTelefon
    );
  }
}

function fillInTheForm(organizerId) {
  //TODO form
  //   fetch organizer by Id
  //   read all info
}

function editOrganizer(
  organizerId,
  nazivOrganizatora,
  email,
  logoOrganizatora,
  adresaOrganizatora,
  godinaOsnivanja,
  kontaktTelefon
) {
  console.log("edit organizer");
}

function onCancel() {
  const editOrganizerForm = document.getElementById("edit-organizer-form");
  editOrganizerForm.reset();
  document.getElementById("naziv-organizatora-greska").textContent = "";
  document.getElementById("logo-greska").textContent = "";
  document.getElementById("adresa-greska").textContent = "";
  document.getElementById("godina-osnivanja-greska").textContent = "";
  document.getElementById("email-greska").textContent = "";
  document.getElementById("kontakt-greska").textContent = "";
  console.log("cancel");
  window.location.href = "admin-for-organizer.html";
}

function onAddFestival(organizerId) {
  console.log("add festival");
  window.location.href = "add-festival.html?organizerId=" + organizerId;
}

function onDeleteFestival(festivalId) {
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
  modalTitle.textContent = "Brisanje festivala";

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
    "<p>Da li ste sigurni da zelite da obrisete festival?</p>";

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

  closeButtonFooter.addEventListener("click", function () {
    myModal.hide();
  });

  confirmDeleteButton.addEventListener("click", function () {
    myModal.hide();
    deleteFestival(festivalId);
    //window.location.href = "admin-for-organizer.html";
    // window.location.href = "edit-organizer.html";
    window.location.reload();
  });
}

function deleteFestival(festivalId) {
  console.log("delete festival");
}
