document.addEventListener("DOMContentLoaded", function () {
  const manageResourcesDropdown = document.getElementById(
    "manageResourcesDropdown"
  );
  const formOpenButtons = document.getElementsByClassName("form-open");
  const logoutButton = document.getElementById("logout");
  console.log({ formOpenButtons });
  // Check if user is signed in
  const userCredentials = JSON.parse(localStorage.getItem("user-credentails"));
  if (userCredentials.user) {
    for (let i = 0; i < formOpenButtons.length; i++) {
      formOpenButtons[i].style.display = "none";
    }
    logoutButton.style.display = "block";

    if (userCredentials.user.role === "admin") {
      manageResourcesDropdown.style.display = "block";
    } else {
      manageResourcesDropdown.style.display = "none";
    }
  }
  if (!userCredentials.user) {
    // User is not signed in
    for (let i = 0; i < formOpenButtons.length; i++) {
      formOpenButtons[i].style.display = "block";
    }
    logoutButton.style.display = "block";
    manageResourcesDropdown.style.display = "none";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll("nav a");
  links.forEach((link) => {
    if (link.href === window.location.href) {
      link.style.backgroundColor = "#ddd";
      link.style.color = "black";
    }
  });
});

const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", function () {
  // Clear the localStorage
  localStorage.clear();
  window.location.href = "index.html";
});

const notificationBar = document.getElementById("notification");
function showNotification(message, isSuccess) {
  console.log({
    status: isSuccess,
    message,
  });
  notificationBar.textContent = message;
  notificationBar.className =
    "notification " + (isSuccess ? "success" : "error");
  notificationBar.style.display = "block";
  setTimeout(() => {
    notificationBar.style.display = "none";
  }, 5000);
}
