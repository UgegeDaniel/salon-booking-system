const getDocumentElement = (selector) => document.querySelector(selector);
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector(".login_form form");
  const signupForm = document.querySelector(".signup_form form");

  function saveToLocalStorage(key, data) {
    try {
      const jsonData = JSON.stringify(data);
      localStorage.setItem(key, jsonData);
      console.log(`Data saved to localStorage with key: ${key}`);
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    }
  }
  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    //Make Post request
    const { response, error } = await postRequest(
      "user/log-in",
      {
        // Get input values and assign to request body
        email: getDocumentElement("input[type=email]").value,
        password: getDocumentElement("input[type=password]").value,
      },
      displayLoader
    );

    //Save to localstorage
    if (!error && response.success) {
      saveToLocalStorage("user-credentails", response);
    }

    //Show notification
    const msgStyle = !response?.success || error ? "error" : "success";
    const msg = error || response.message;
    displayNotification(msg, msgStyle);
    if (response.success) {
      debouncedNavigateTo("profile.html");
    }
  });

  signupForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Get input values and assign to request body
    const userCredentials = {
      first_name: getDocumentElement("#firstName").value,
      last_name: getDocumentElement("#lastName").value,
      email: getDocumentElement("#email").value,
      password: getDocumentElement("#password").value,
      phone_number: getDocumentElement("#phoneNumber").value,
      role: getDocumentElement("#accountType").value,
    };

    //Confirm Password Validation
    const userPassword = getDocumentElement("#password").value;
    const userConfirmPassword = getDocumentElement("#confirmPassword").value;
    if (userPassword !== userConfirmPassword) {
      displayNotification("Passwords do not Match", "error");
    }

    //Make Post request
    const { response, error } = await postRequest(
      "user/sign-up",
      userCredentials,
      displayLoader
    );

    //Save to localstorage
    if (!error && response.success) {
      saveToLocalStorage("user-credentails", response);
    }

    //Show notification
    const msgStyle = !response?.success || error ? "error" : "success";
    const msg = error || response.message;
    displayNotification(msg, msgStyle);
  });
});
