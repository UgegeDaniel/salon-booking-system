document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector(".login_form form");
  const signupForm = document.querySelector(".signup_form form");
  const loginEmail = loginForm.querySelector("input[type=email]");
  const signupEmail = signupForm.querySelector("input[type=email]");
  const signupPassword = signupForm.querySelector("input[type=password]");
  const loginPassword = loginForm.querySelector("input[type=password]");
  const firstNameField = document.querySelector("#firstName");
  const lastNameField = document.querySelector("#lastName");
  const phoneNumberField = document.querySelector("#phoneNumber");
  const confirmPasswordField = document.querySelector("#confirmPassword");
  const roleField = document.querySelector("#accountType");

  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    console.log({
      email: loginEmail.value,
      password: loginPassword.value,
    });
    const result = await postData("http://localhost:5000/user/log-in", {
      email: loginEmail.value,
      password: loginPassword.value,
    });
    showNotification(
      result.success
        ? "Success: " + result.message
        : "Error: " + result.message,
      result.success
    );
    if (result.success) {
      localStorage.setItem("user-credentails", JSON.stringify(result));
      window.location.href = "profile.html";
    }
  });

  signupForm.addEventListener("submit", async function (event) {
    const userCredentials = {
      first_name: firstNameField.value,
      last_name: lastNameField.value,
      email: signupEmail.value,
      password: signupPassword.value,
      phone_number: phoneNumberField.value,
      role: roleField.value,
    };
    event.preventDefault();
    try {
      const response = await postData(
        "http://localhost:5000/user/sign-up",
        userCredentials
      );
      showNotification(
        response.success
          ? "Success: " + response.message
          : "Error: " + response.message,
        response.success
      );
      if (response.success) {
        localStorage.setItem("user-credentails", JSON.stringify(response));
        window.location.href = "profile.html";
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
});
