const userData = JSON.parse(localStorage.getItem("user-credentails"));
const accessToken = userData.token;
const headers = {
  "Content-Type": "application/json",
  authorization: `Bearer ${accessToken}`,
};

// Function to make a GET request
async function fetchData(url) {
  try {
    const response = await fetch(url, {
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
async function postData(url, data) {
  console.log({ url, data });
  try {
    const response = await fetch(url, {
      method: "POST",
      body: data,
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
}

// Function to make a PUT request
async function putData(url, data) {
  try {
    const response = await fetch(url, {
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
async function deleteData(url) {
  try {
    const response = await fetch(url, {
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

// Example usage:
// const apiUrl = 'https://api.example.com/data';

// // Fetch data
// fetchData(apiUrl)
//     .then(data => console.log('Fetched data:', data))
//     .catch(error => console.error('Error:', error));

// // Post data
// const newData = { name: 'John Doe', age: 30 };
// postData(apiUrl, newData)
//     .then(result => console.log('Posted data:', result))
//     .catch(error => console.error('Error:', error));

// // Update data
// const updatedData = { name: 'Updated Name', age: 31 };
// const itemIdToUpdate = 123; // Replace with the actual item ID
// putData(`${apiUrl}/${itemIdToUpdate}`, updatedData)
//     .then(result => console.log('Updated data:', result))
//     .catch(error => console.error('Error:', error));

// // Delete data
// const itemIdToDelete = 456; // Replace with the actual item ID
// deleteData(`${apiUrl}/${itemIdToDelete}`)
//     .then(result => console.log('Deleted data:', result))
//     .catch(error => console.error('Error:', error));
