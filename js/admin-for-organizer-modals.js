function onDelete(organizerId) {
    // event.preventDefault();
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
    modalTitle.textContent = "Brisanje organizatora";

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
        "<p>Da li ste sigurni da zelite da obrisete organizatora?</p>";

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

    // Append the modal container to the document body
    // document.body.appendChild(modalContainer);

    const myModal = new bootstrap.Modal(modalContainer);
    myModal.show();

    closeButtonFooter.addEventListener("click", function() {
        myModal.hide();
    });

    confirmDeleteButton.addEventListener("click", function() {
        myModal.hide();
        deleteOrganizer(organizerId);
        // window.location.href = "index.html";
    });
}

function deleteOrganizer(organizerId) {
    var firebaseUrl =
        "https://web-design-9-default-rtdb.europe-west1.firebasedatabase.app";
    var organizerUrl =
        firebaseUrl + "/organizatoriFestivala/" + organizerId + ".json";

    var request = new XMLHttpRequest();
    request.open("DELETE", organizerUrl, true);
    request.send();
    request.onreadystatechange = function() {
        if (request.readyState != 4) {
            return;
        }
        if (request.status == 200) {
            console.log("Organizator je uspesno obrisan");
            window.location.href = "admin-for-organizer.html";
        } else {
            console.log("Greska prilikom brisanja organizatora");
        }
    };
}