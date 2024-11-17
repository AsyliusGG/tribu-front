import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // Contendrá eventos seleccionados y sus cantidades
  expirationTime: null, // Tiempo límite de 1 min para completar la compra
};

const carritoSlice = createSlice({
  name: "carrito",
  initialState,
  reducers: {
    agregarEvento: (state, action) => {
      const eventoExistente = state.items.find(
        (item) => item.eventoId === action.payload.eventoId
      );
      if (eventoExistente) {
        eventoExistente.cantidadNino += action.payload.cantidadNino;
        eventoExistente.cantidadAdulto += action.payload.cantidadAdulto;
      } else {
        state.items.push(action.payload);
      }
      state.expirationTime = Date.now() + 60000; // Agregar 1 min al carrito
    },
    resetearCarrito: (state) => {
      state.items = [];
      state.expirationTime = null;
    },
    extenderTiempo: (state) => {
      state.expirationTime = Date.now() + 60000; // Extender 1 min
    },
  },
});

export const { agregarEvento, resetearCarrito, extenderTiempo } = carritoSlice.actions;

export default carritoSlice.reducer;
