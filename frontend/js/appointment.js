document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetchData(
      "appointment/appointments"
    );
    populateTable(response.appointments);
  } catch (error) {
    console.error("Failed to fetch appointments:", error.message);
  }
});

async function populateTable(appointments) {
  const tableBody = document.querySelector("table tbody");
  tableBody.innerHTML = "";
  appointments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  appointments.forEach((appointment) => {
    console.log({ appointment });
    const row = tableBody.insertRow();
    row.innerHTML = `
        <td class="editable">
          <div>${appointment.first_name} ${appointment.last_name}</div>
        </td>
        <td class="editable">
          <div>${appointment.phone_number}</div>
        </td>
        <td class="editable">
          <div>${appointment.service_name}</div>
        </td>
        <td class="editable">
          <div>${appointment.service_price}</div>
        </td>
        <td class="editable">
          <input disabled type="datetime-local" class="editField" value="${formatDateTimeForInput(
            appointment.appointment_date
          )}" data-appointment-id="${appointment.appointment_id}"/>
        </td>
        <td>
          <span
            class="edit-icon"
            onclick="editAppointment(${appointment.appointment_id})"
            data-appointment-id="${appointment.appointment_id}"
            >✏️</span
          >
          <span
            class="delete-icon"
            onclick="deleteAppointment(${appointment.appointment_id})"
            >🗑️</span
          >
          <span
            class="save-icon"
            style="display: none"
            onclick="saveUpdatedAppointment(${appointment.appointment_id})"
            >📄</span
          >
        </td>
    `;
    row.querySelector(".editable input.editField").dataset.originalValue =
      appointment.appointment_date;
  });
}

function editAppointment(appointmentId) {
  console.log({ appointmentId });
  const tableBody = document.querySelector("table tbody");
  const rows = tableBody.getElementsByTagName("tr");

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const cellId = row.querySelector(".editable input.editField");

    if (cellId && Number(cellId.dataset.appointmentId) === appointmentId) {
      // Enable the input field for the appointment date
      cellId.removeAttribute("disabled");

      const editIcon = row.querySelector(".edit-icon");
      const deleteIcon = row.querySelector(".delete-icon");
      const saveIcon = row.querySelector(".save-icon");

      if (editIcon && deleteIcon && saveIcon) {
        editIcon.style.display = "none";
        deleteIcon.style.display = "none";
        saveIcon.style.display = "inline-block";
      }
    } else if (cellId) {
      // Disable other input fields to avoid conflicts
      cellId.setAttribute("disabled", "disabled");
    }
  }
}

function formatDateTimeForInput(dateTimeString) {
  const date = new Date(dateTimeString);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}
function formatDateTimeForDisplay(dateTimeString) {
  const date = new Date(dateTimeString);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

async function saveUpdatedAppointment(appointmentId) {
  const tableBody = document.querySelector("table tbody");
  const rows = tableBody.getElementsByTagName("tr");

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const cellId = row.querySelector(".editable input.editField");

    if (cellId) {
      const currentAppointmentId = cellId.dataset.appointmentId;

      if (Number(currentAppointmentId) === appointmentId) {
        // Replace the input with a div and update the content
        const originalValue = cellId.dataset.originalValue;
        cellId.outerHTML = `<div class="appointment-date">${formatDateTimeForDisplay(
          originalValue
        )}</div>`;

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

async function deleteAppointment(appointmentId) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this Appointment?"
  );
  if (confirmDelete) {
    // Make API request to delete the Appointment
    const response = await deleteData(
      `appointment/delete-appointment/${appointmentId}`
    );
    showNotification(
      response.success
        ? "Success: " + response.message
        : "Error: " + response.message,
      response.success
    );

    // Refresh the table after deletion
    const appointmentsResponse = await fetchData(
      "appointment/appointment"
    );
    populateTable(appointmentsResponse.appointments);
  }
}
