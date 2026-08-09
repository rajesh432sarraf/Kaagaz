// src/services/api.js
// API service layer for Kaagaz frontend

const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  // Detect if client is running locally or in production
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  return isLocalhost ? 'http://localhost:5000/api' : 'https://kaagaz-backend.onrender.com/api';
};

const API_BASE_URL = getApiBaseUrl();
export const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, '');

// Get stored token
function getToken() {
  return localStorage.getItem('kaagaz_token');
}

// Build auth headers
function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handleResponse(response) {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }
  return data;
}

// ─── Auth ────────────────────────────────────────────────────────────────────

export async function registerUser(payload) {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function loginUser(payload) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function getMe() {
  const res = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: { ...authHeaders() },
  });
  return handleResponse(res);
}

// ─── Documents ───────────────────────────────────────────────────────────────

export async function getDocuments() {
  const res = await fetch(`${API_BASE_URL}/documents`, {
    headers: { ...authHeaders() },
  });
  return handleResponse(res);
}

export async function getDocument(id) {
  const res = await fetch(`${API_BASE_URL}/documents/${id}`, {
    headers: { ...authHeaders() },
  });
  return handleResponse(res);
}

// createDocument supports FormData (with file) or JSON
export async function createDocument(formData) {
  const res = await fetch(`${API_BASE_URL}/documents`, {
    method: 'POST',
    headers: { ...authHeaders() }, // No Content-Type — let browser set multipart boundary
    body: formData,
  });
  return handleResponse(res);
}

export async function updateDocument(id, data) {
  const res = await fetch(`${API_BASE_URL}/documents/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function deleteDocument(id) {
  const res = await fetch(`${API_BASE_URL}/documents/${id}`, {
    method: 'DELETE',
    headers: { ...authHeaders() },
  });
  return handleResponse(res);
}

export async function getExpiringDocuments() {
  const res = await fetch(`${API_BASE_URL}/documents/expiring`, {
    headers: { ...authHeaders() },
  });
  return handleResponse(res);
}

export async function getDocumentStats() {
  const res = await fetch(`${API_BASE_URL}/documents/stats`, {
    headers: { ...authHeaders() },
  });
  return handleResponse(res);
}
