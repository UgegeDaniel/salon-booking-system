document.addEventListener("DOMContentLoaded", function () {
  const userData = JSON.parse(localStorage.getItem("user-credentails"));
  const profileDetails = document.getElementById("profileDetails");

  if (userData) {
    const profileHTML = `
        <p><strong>Name:</strong> ${userData.user.first_name} ${userData.user.last_name}</p>
        <p><strong>Email:</strong> ${userData.user.email}</p>
        <p><strong>Phone Number:</strong> ${userData.user.phone_number}</p>
        <!-- Add more details as needed -->
      `;

    profileDetails.innerHTML = profileHTML;
  } else {
    profileDetails.innerHTML = "<p>No user data found.</p>";
  }
});
