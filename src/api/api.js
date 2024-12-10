import axios from "axios";

export const getallEventos = () => {
  return axios.get("http://20.51.120.81:8000/api/v1/evento/");
};

export const getallMadres = () => {
  return axios.get("http://20.51.120.81:8000/api/v1/madre/");
};

export const getallHijo = () => {
  return axios.get("http://20.51.120.81:8000/api/v1/hijo/");
};

export const getallSector = () => {
  return axios.get("http://20.51.120.81:8000/api/v1/sector/");
};

const API_URL = "http://20.51.120.81:8000/api/v1/evento";

export const getEventoById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el evento por ID", error);
    throw error;
  }
};

