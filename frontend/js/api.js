// api.js

const API_BASE = "http://localhost:3000/api";   // 若部署 EC2 → 換成你的 EC2 URL

// 取得 token
function getToken() {
  return localStorage.getItem("token");
}

// 包裝 fetch（自動附上 token）
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
