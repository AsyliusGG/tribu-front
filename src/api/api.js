import axios from 'axios';


export const getallEventos = () => {
  return axios.get('http://localhost:8000/eventos/api/v1/evento/')
}

export const getallMadres = () => {
  return axios.get('http://localhost:8000/madre/api/v1/madre/')
}

export const getallHijo = () => {  
  return axios.get('http://localhost:8000/hijo/api/v1/hijo/')
}

export const getallSector = () => {
    return axios.get('http://localhost:8000/sector/api/v1/sector/')
    }