import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// Async thunk para login
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Solicitud para obtener el token JWT
      const response = await axios.post('http://localhost:8000/api/v1/auth/jwt/create/', {
        email,
        password
      });
      const { access: token } = response.data;

      // Guarda el token en localStorage
      localStorage.setItem('auth_token', token);

      // Imprime el token en la consola para verificar que se obtuvo correctamente
      console.log("Token obtenido:", token);

      // Segunda solicitud para obtener los datos del usuario con el token
      const userResponse = await axios.get('http://localhost:8000/api/v1/auth/users/me/', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const userData = userResponse.data;
      toast.success('Logged in successfully!');
      
      // Devuelve tanto el token como los datos del usuario
      return { token, user: userData };
    } catch (error) {
      console.error("Error en la autenticación:", error);
      toast.error('Login failed! Check your credentials.');
      return rejectWithValue(error.response?.data || "Error de autenticación");
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('auth_token') || null,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('auth_token');
      state.token = null;
      state.user = null;
      toast.info('Logged out successfully');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
