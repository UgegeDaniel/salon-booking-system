document.addEventListener("DOMContentLoaded", function () {
  const manageResourcesDropdown = document.getElementById(
    "manageResourcesDropdown"
  );
  const formOpenButtons = document.getElementsByClassName("form-open");
  const logoutButton = document.getElementById("logout");
  // Check if user is signed in
  const userCredentials = JSON.parse(localStorage.getItem("user-credentails"));
  if (userCredentials && userCredentials.user) {
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
  if (userCredentials && !userCredentials.user) {
    // User is not signed in
    for (let i = 0; i < formOpenButtons.length; i++) {
      formOpenButtons[i].style.display = "block";
    }
    logoutButton.style.display = "block";
    manageResourcesDropdown.style.display = "none";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".topnav a");
  let activeLink;
  links.forEach((link) => {
    if (link.href === window.location.href) {
      activeLink = link;
      activeLink.classList.add("active");
    }
  });
  if (activeLink && Number(window.screen.availWidth) <= 800) {
    activeLink.parentNode.removeChild(activeLink);
    const topnav = document.querySelector(".topnav");
    topnav.insertBefore(activeLink, topnav.firstChild);
  }
});

const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", function () {
  // Clear the localStorage
  localStorage.clear();
  window.location.href = "index.html";
});

function myFunction() {
  var topnav = document.getElementById("myTopnav");
  if (topnav.className === "topnav") {
    topnav.className += " responsive";
  } else {
    topnav.className = "topnav";
  }
}
