const userData = JSON.parse(localStorage.getItem("user-credentails"));
const accessToken = userData ? userData.token : null;

const baseurl = "https://salon-booking-system-r7jn.onrender.com/"
// Function to make a GET request
var RequestManager = {
  fetchData: async function (endpoint) {
    const url = baseurl + endpoint
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error.message);
      throw error;
    }
  },

  // Function to make a POST request
  postData: async function (endpoint, data) {
    const url = baseurl + endpoint
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error posting data:", error.message);
      throw error;
    }
  },

  // Function to make a PUT request
  putData: async function (endpoint, data) {
    const url = baseurl + endpoint
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
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
  },

  // Function to make a DELETE request
  deleteData: async function (endpoint) {
    const url = baseurl + endpoint

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
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
  },
};
