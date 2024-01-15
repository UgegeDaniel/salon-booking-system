const userData = JSON.parse(localStorage.getItem("user-credentails"));
const accessToken = userData.token;
const headers = {
  "Content-Type": "application/json",
  authorization: `Bearer ${accessToken}`,
};
const baseUrl = "https://salon-booking-system-r7jn.onrender.com/";

// Function to make a GET request
async function fetchData(endpoint) {
  const requestUrl = `${baseUrl}${endpoint}`;
  try {
    const response = await fetch(requestUrl, {
      method: "GET",
      headers,
    });
    console.log({ response });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
}

// Function to make a POST request
async function postData(endpoint, data) {
  const requestUrl = `${baseUrl}${endpoint}`;
  try {
    const response = await fetch(requestUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log({ result });
    return result;
  } catch (error) {
    console.log({ error });
    console.error("Error posting data:", error.message);
    throw error;
  }
}

// Function to make a PUT request
async function putData(endpoint, data) {
  const requestUrl = `${baseUrl}${endpoint}`;
  try {
    const response = await fetch(requestUrl, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating data:", error.message);
    throw error;
  }
}

// Function to make a DELETE request
async function deleteData(endpoint) {
  const requestUrl = `${baseUrl}${endpoint}`;
  try {
    const response = await fetch(requestUrl, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error deleting data:", error.message);
    throw error;
  }
}
