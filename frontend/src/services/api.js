// src/services/api.js
// API service layer for Kaagaz frontend

const API_BASE_URL = "http://localhost:5000/api";

async function handleResponse(response) {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `API request failed with status ${response.status}`);
  }
  return response.json();
}

export async function getDocuments() {
  const res = await fetch(`${API_BASE_URL}/documents`);
  return handleResponse(res);
}

export async function getDocument(id) {
  const res = await fetch(`${API_BASE_URL}/documents/${id}`);
  return handleResponse(res);
}

export async function createDocument(data) {
  const res = await fetch(`${API_BASE_URL}/documents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function updateDocument(id, data) {
  const res = await fetch(`${API_BASE_URL}/documents/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function deleteDocument(id) {
  const res = await fetch(`${API_BASE_URL}/documents/${id}`, {
    method: "DELETE",
  });
  return handleResponse(res);
}

export async function getExpiringDocuments() {
  const res = await fetch(`${API_BASE_URL}/documents/expiring`);
  return handleResponse(res);
}

export async function getDocumentStats() {
  const res = await fetch(`${API_BASE_URL}/documents/stats`);
  return handleResponse(res);
}
