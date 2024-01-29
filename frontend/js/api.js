const userData = JSON.parse(localStorage.getItem("user-credentails"));
const accessToken = userData ? userData.token : null;

// Function to make a GET request
var RequestManager = {
  fetchData: async function (url) {
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
  postData: async function (url, data) {
    console.error({ url, data });
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
  putData: async function (url, data) {
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
  deleteData: async function (url) {
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
