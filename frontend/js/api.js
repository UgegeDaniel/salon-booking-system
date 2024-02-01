const userData = JSON.parse(localStorage.getItem("user-credentails"));
const accessToken = userData ? userData.token : null;
// const baseUrl = "http://localhost:5001/";
const baseUrl = "https://salon-booking-system-r7jn.onrender.com/"

async function handleRequest(url, options, loaderCb) {
  const apiUrl = baseUrl + url;
  const headers = {
    Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
    ...options.headers,
  };
  try {
    loaderCb(true);
    const response = await fetch(apiUrl, { ...options, headers });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch data");
    }
    loaderCb(false);
    return { response: data, loading: false, error: null };
  } catch (error) {
    loaderCb(false);
    return { response: null, loading: false, error: error.message };
  }
}

// Fetch all Resources
async function fetchResources(endpoint) {
  const options = {
    method: "GET",
  };
  return await handleRequest(endpoint, options);
}

// Create a new Resources
async function postRequest(endpoint, newResource, loaderCb) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newResource),
  };
  return await handleRequest(endpoint, options, loaderCb);
}

// Update an existing Resources
async function updateRequest(endpoint, resource, loaderCb) {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(resource),
  };
  return await handleRequest(endpoint, options, loaderCb);
}

// Delete a Resources by ID
async function deleteRequest(endpoint, loaderCb) {
  const options = {
    method: "DELETE",
  };
  return await handleRequest(endpoint, options, loaderCb);
}
