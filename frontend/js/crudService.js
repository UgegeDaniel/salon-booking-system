document.addEventListener("DOMContentLoaded", async function () {
  try {
    const services = await fetchData("product/products");
    populateTable(services.products);
    localStorage.setItem("services", JSON.stringify(services.products));
  } catch (error) {
    console.error("Failed to fetch services:", error.message);
  }
});
async function addService(event) {
  event.preventDefault();
  const serviceName = document.getElementById("serviceName").value;
  const serviceDescription =
    document.getElementById("serviceDescription").value;
  const servicePrice = document.getElementById("servicePrice").value;
  const intendedGender = document.getElementById("intendedGender").value;

  const serviceData = {
    name: serviceName,
    description: serviceDescription,
    price: servicePrice,
    intendedGender: intendedGender,
  };

  const response = await postData(
    "product/create-product",
    serviceData
  );

  // Show notification based on the API response
  showNotification(
    response.success
      ? "Success: " + response.message
      : "Error: " + response.message,
    response.success
  );

  // Refresh the table after adding a new service
  const services = await fetchData("product/products");
  populateTable(services.products);
}

async function populateTable(services) {
  const tableBody = document.querySelector("table tbody");
  tableBody.innerHTML = "";
  services.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  services.forEach((service) => {
    const row = tableBody.insertRow();
    row.innerHTML = `
        <td class="editable">
            <input type="text" disabled value="${service.name}" data-service-id="${service.id}" />
        </td>
        <td class="editable">
            <input type="text" disabled value="${service.description}" data-service-id="${service.id}" />
        </td>
        <td class="editable">
            <input type="text" disabled value="${service.price}" data-service-id="${service.id}" />
        </td>
        <td class="editable" data-service-id="${service.id}">
            <div class="input_box">
                <select id="intendedGender" required disabled>
                    <option value="${service.intended_gender}" disabled selected>${service.intended_gender}</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="unisex">Unisex</option>
                </select>
            </div>
        </td>
        <td>
            <span class="edit-icon" onclick="editService(${service.id})" data-service-id="${service.id}">✏️</span>
            <span class="delete-icon" onclick="deleteService(${service.id})">🗑️</span>
            <span class="save-icon" style="display:none" onclick="saveUpdatedService(${service.id})">📄</span>
        </td>
    `;
  });
}

function editService(serviceId) {
  const tableBody = document.querySelector("table tbody");
  const rows = tableBody.getElementsByTagName("tr");

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const cellId = row.querySelector(".editable input, .editable select");

    if (cellId) {
      const currentServiceId = cellId.dataset.serviceId;

      if (Number(currentServiceId) === serviceId) {
        row
          .querySelectorAll(".editable input, .editable select")
          .forEach((input) => {
            input.removeAttribute("disabled");
          });

        const editIcon = row.querySelector(".edit-icon");
        const deleteIcon = row.querySelector(".delete-icon");
        const saveIcon = row.querySelector(".save-icon");

        if (editIcon && deleteIcon && saveIcon) {
          editIcon.style.display = "none";
          deleteIcon.style.display = "none";
          saveIcon.style.display = "inline-block";
        }
      } else {
        row
          .querySelectorAll(".editable input, .editable select")
          .forEach((input) => {
            input.setAttribute("disabled", true);
          });

        const editIcon = row.querySelector(".edit-icon");
        const deleteIcon = row.querySelector(".delete-icon");
        const saveIcon = row.querySelector(".save-icon");

        if (editIcon && deleteIcon && saveIcon) {
          editIcon.style.display = "inline-block";
          deleteIcon.style.display = "inline-block";
          saveIcon.style.display = "none";
        }
      }
    }
  }
}

async function saveUpdatedService(serviceId) {
  const tableBody = document.querySelector("table tbody");
  const rows = tableBody.getElementsByTagName("tr");

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const cellId = row.querySelector(".editable input, .editable select")
      .dataset.serviceId;

    if (Number(cellId) === serviceId) {
      row
        .querySelectorAll(".editable input, .editable select")
        .forEach((input) => {
          input.setAttribute("disabled", true);
        });

      row.querySelector(".edit-icon").style.display = "inline-block";
      row.querySelector(".delete-icon").style.display = "inline-block";
      row.querySelector(".save-icon").style.display = "none";
    }
  }
}

async function deleteService(serviceId) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this service?"
  );
  if (confirmDelete) {
    // Make API request to delete the service
    const response = await deleteData(
      `product/delete-product/${serviceId}`
    );
    showNotification(
      response.success
        ? "Success: " + response.message
        : "Error: " + response.message,
      response.success
    );

    // Refresh the table after deletion
    const services = await fetchData("product/products");
    populateTable(services.products);
  }
}
