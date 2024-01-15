document.addEventListener("DOMContentLoaded", async function () {
  try {
    const services = await fetchData("product/products");
    displayServices(services.products);
  } catch (error) {
    console.error("Failed to fetch services:", error.message);
  }
});

function displayServices(services) {
  const servicesContainer = document.getElementById("servicesContainer");

  services.forEach((service) => {
    const serviceCard = document.createElement("div");
    serviceCard.classList.add("toast");
    serviceCard.addEventListener("click", () => openAppointmentModal(service));

    const serviceName = document.createElement("h2");
    serviceName.textContent = service.name;

    const serviceDescription = document.createElement("p");
    serviceDescription.classList.add("service-description");
    serviceDescription.textContent = service.description;

    const servicePriceGender = document.createElement("p");
    servicePriceGender.classList.add("price-gender");
    servicePriceGender.textContent = `$${service.price} - ${service.intended_gender}`;

    const bookAppointmentText = document.createElement("p");
    bookAppointmentText.classList.add("book-appointment-text");
    bookAppointmentText.textContent = "Click to book an appointment";

    serviceCard.appendChild(serviceName);
    serviceCard.appendChild(serviceDescription);
    serviceCard.appendChild(servicePriceGender);
    serviceCard.appendChild(bookAppointmentText);

    servicesContainer.appendChild(serviceCard);
  });
}

// Add these functions to your existing script
function openAppointmentModal(service) {
  const modal = document.getElementById("appointmentModal");
  modal.style.display = "block";

  // Dynamically create form fields inside the modal
  const form = document.getElementById("appointmentForm");
  form.innerHTML = `
      <label for="clientName">Client Name:</label>
      <input type="text" id="clientName" value="${getClientNameFromLocalStorage()}" disabled />

      <label for="serviceName">Service Name:</label>
      <input type="text" id="serviceName" value="${service.name}" disabled />

      <label for="appointmentDate">Appointment Date:</label>
      <input type="datetime-local" id="appointmentDate" required />

      <label for="comment">Comment:</label>
      <textarea id="comment"></textarea>

      <input type="hidden" id="serviceId" value="${service.id}" />
      <button type="submit">Book Appointment</button>

    `;
}

function closeAppointmentModal() {
  const modal = document.getElementById("appointmentModal");
  modal.style.display = "none";
}

document
  .getElementById("appointmentForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    submitAppointmentForm();
  });

async function submitAppointmentForm() {
  const serviceName = document.getElementById("serviceName").value;
  const appointmentDate = new Date(
    document.getElementById("appointmentDate").value
  ).toISOString();
  const comment = document.getElementById("comment").value;
  const serviceId = document.getElementById("serviceId").value;

  // Make a POST request to create an appointment
  const appointmentData = {
    productId: serviceId,
    appointment_date: appointmentDate,
    comment,
  };

  const result = await postData(
    "appointment/create-appointment",
    appointmentData
  );
  closeAppointmentModal();
  showNotification(
    result.success ? "Success: " + result.message : "Error: " + result.message,
    result.success
  );
}

function getClientNameFromLocalStorage() {
  const userCredentials = JSON.parse(localStorage.getItem("user-credentails"));
  console.log({ userCredentials });
  return `${userCredentials.user.first_name} ${userCredentials.user.last_name}`;
}
