import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = "http://20.51.120.81:8000/api/v1";

// Crear una instancia de axios
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor para añadir el token a todas las solicitudes
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Exportar funciones con la nueva instancia
export const getallEventos = () => axiosInstance.get("/evento/");
export const getallMadres = () => axiosInstance.get("/madre/");
export const getallHijo = () => axiosInstance.get("/hijo/");
export const getallSector = () => axiosInstance.get("/sector/");
export const getMemberships = () => axiosInstance.get("/memberships/");
export const getAlianzas = () => axiosInstance.get("/alianzas/");

export const getEventoById = (id) => axiosInstance.get(`/evento/${id}/`).then((res) => res.data);

export const getAlianzaById = (id) => axiosInstance.get(`/alianzas/${id}/`).then((res) => res.data);

export const deleteAlianza = (id) => axiosInstance.delete(`/alianzas/${id}/`);

export const createAlianza = (data) => axiosInstance.post("/alianzas/", data);

export const updateAlianza = (id, data) => axiosInstance.put(`/alianzas/${id}/`, data);

export const getMembershipByUUID = (uuid) =>
  axiosInstance.get(`/memberships/${uuid}/`).then((res) => res.data);

export const getUserById = (userId) =>
  axiosInstance.get(`/users/${userId}/`).then((res) => res.data);

export const iniciarPago = (data) =>
  axiosInstance.post("/iniciar_pago/", data, {
    headers: { "Content-Type": "application/json" },
  });

export const enviarFormularioContacto = (data) =>
  axiosInstance.post("/contact/", data, {
    headers: { "Content-Type": "application/json" },
  });

export const obtenerSectores = () =>
  axiosInstance.get("/sector/").then((response) => response.data);

export const crearSector = (data) => axiosInstance.post("/sector/", data);

export const actualizarSector = (id, data) =>
  axiosInstance.put(`/sector/${id}/`, data, {
    headers: { "Content-Type": "application/json" },
  });

export const eliminarSector = (id) => axiosInstance.delete(`/sector/${id}/`);

export const getMembershipQRCode = () =>
  axiosInstance.get("/memberships/generate-qr").then((response) => response.data);

export default axiosInstance;
