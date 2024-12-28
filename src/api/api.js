import axios from "axios";

const API_BASE_URL = "http://20.51.120.81:8000/api/v1";

export const getallEventos = () => {
  return axios.get(`${API_BASE_URL}/evento/`);
};

export const getallMadres = () => {
  return axios.get(`${API_BASE_URL}/madre/`);
};

export const getallHijo = () => {
  return axios.get(`${API_BASE_URL}/hijo/`);

};

export const getallSector = () => {
  return axios.get(`${API_BASE_URL}/sector/`);
};

export const getEventoById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/evento/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el evento por ID", error);
    throw error;
  }
};

export const getAlianzas = () => {
  return axios.get(`${API_BASE_URL}/alianzas/`);
};

export const getAlianzaById = (id) => {
  return axios.get(`${API_BASE_URL}/alianzas/${id}/`);
};

export const deleteAlianza = (id, token) => {
  return axios.delete(`${API_BASE_URL}/alianzas/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createAlianza = (data, token) => {
  return axios.post(`${API_BASE_URL}/alianzas/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateAlianza = (id, data, token) => {
  return axios.put(`${API_BASE_URL}/alianzas/${id}/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getMembershipByUUID = (uuid, token) => {
  return axios.get(`${API_BASE_URL}/memberships/${uuid}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => response.data);
};

export const getUserById = (userId, token) => {
  return axios.get(`${API_BASE_URL}/users/${userId}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => response.data);
};


export const iniciarPago = (data, token) => {
  return axios.post(`${API_BASE_URL}/iniciar_pago/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const enviarFormularioContacto = (data) => {
  return axios.post(`${API_BASE_URL}/contact/`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const obtenerSectores = () => {
  return axios.get(`${API_BASE_URL}/sector/`).then((response) => response.data);
};

export const crearSector = (data, token) => {
  return axios.post(`${API_BASE_URL}/sector/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const actualizarSector = (id, data, token) => {
  return axios.put(`${API_BASE_URL}/sector/${id}/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const eliminarSector = (id, token) => {
  return axios.delete(`${API_BASE_URL}/sector/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getMembershipQRCode = (token) => {
  return axios.get(`${API_BASE_URL}/memberships/generate-qr`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => response.data);
};


