import axios from 'axios';


export const getallEventos = () => {
  return axios.get('http://localhost:8000/eventos/api/v1/evento/')
}

export const getallMadres = () => {
  return axios.get('http://localhost:8000/madres/api/v1/madre/')
}

export const getallHijo = () => {  
  return axios.get('http://localhost:8000/ninos/api/v1/hijo/')
}

export const getallSector = () => {
    return axios.get('http://localhost:8000/sectores/api/v1/sector/')
    }