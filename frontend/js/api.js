

const API_BASE = "http://localhost:3000/api";   


function getToken() {
  return localStorage.getItem("token");
}


async function apiRequest(method, endpoint, data = null) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    }
  };

  if (data) options.body = JSON.stringify(data);

  const res = await fetch(`${API_BASE}${endpoint}`, options);
  return res.json();
}
