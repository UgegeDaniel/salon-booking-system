const loaderOverlay = document.querySelector("#loadingOverlay");
const notificationElement = document.querySelector("#notification");

function displayLoader(loading) {
  loading
    ? (loaderOverlay.style.display = "flex")
    : (loaderOverlay.style.display = "none");
}

function displayNotification(message, type) {
  notificationElement.innerText = message;
  if (type === "error") {
    notificationElement.style.backgroundColor = "#f44336";
  } else {
    notificationElement.style.backgroundColor = "#4caf50";
  }
  notificationElement.style.display = "block";
  setTimeout(() => {
    notificationElement.style.display = "none";
  }, 3000);
  return;
}

function navigateTo(route) {
  window.location.href = route;
}

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
const debouncedNavigateTo = debounce(navigateTo, 4000);
