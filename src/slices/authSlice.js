import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import authService from "../features/auth/authService";

const user = JSON.parse(localStorage.getItem("user"))

// Define el estado inicial
const initialState = {
    user: user ? user : null,
    userInfo: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}


export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
      try {
          return await authService.register(userData)
      } catch (error) {
          const message = (error.response && error.response.data
              && error.response.data.message) ||
              error.message || error.toString()

          return thunkAPI.rejectWithValue(message)
      }
  }
)

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
      try {
          return await authService.login(userData)
      } catch (error) {
          const message = (error.response && error.response.data
              && error.response.data.message) ||
              error.message || error.toString()

          return thunkAPI.rejectWithValue(message)
      }
  }
)

export const logout = createAsyncThunk(
  "auth/logout",
  async () => {
      authService.logout()
  }
)

export const activate = createAsyncThunk(
  "auth/activate",
  async (userData, thunkAPI) => {
      try {
          return await authService.activate(userData)
      } catch (error) {
          const message = (error.response && error.response.data
              && error.response.data.message) ||
              error.message || error.toString()

          return thunkAPI.rejectWithValue(message)
      }
  }
)

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (userData, thunkAPI) => {
      try {
          return await authService.resetPassword(userData)
      } catch (error) {
          const message = (error.response && error.response.data
              && error.response.data.message) ||
              error.message || error.toString()

          return thunkAPI.rejectWithValue(message)
      }
  }
)

export const resetPasswordConfirm = createAsyncThunk(
  "auth/resetPasswordConfirm",
  async (userData, thunkAPI) => {
      try {
          return await authService.resetPasswordConfirm(userData)
      } catch (error) {
          const message = (error.response && error.response.data
              && error.response.data.message) ||
              error.message || error.toString()

          return thunkAPI.rejectWithValue(message)
      }
  }
)

export const getUserInfo = createAsyncThunk(
  "auth/getUserInfo",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token;

    if (!token) {
      return rejectWithValue("No token found");
    }

    try {
      const response = await axios.get("http://localhost:8000/api/v1/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);


// Async thunk para login
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Solicitud para obtener el token JWT
      const response = await axios.post('http://localhost:8000/api/v1/auth/jwt/create/', {
        email,
        password,
      });
      const { access: token } = response.data;

      // Guarda el token en localStorage
      localStorage.setItem('auth_token', token);

      // Segunda solicitud para obtener los datos del usuario con el token
      const userResponse = await axios.get('http://localhost:8000/api/v1/auth/users/me/', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const userData = userResponse.data;

      const fullName = `${userData.first_name} ${userData.last_name}`;
      console.log('Nombre del usuario logeado:', fullName);
      console.log('Tipo de usuario:');
      console.log(' - is_superuser:', userData.is_superuser);
      console.log(' - is_staff:', userData.is_staff);
      console.log(' - is_staff_limited:', userData.is_staff_limited);
      console.log(' - is_active:', userData.is_active);

      toast.success('Logged in successfully!');

      // Devuelve tanto el token como los datos del usuario
      return { token, user: userData };
    } catch (error) {
      console.error('Error en la autenticación:', error);
      toast.error('Login failed! Check your credentials.');
      return rejectWithValue(error.response?.data || 'Error de autenticación');
    }
  }
);

// Crea el slice de autenticación
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
      // Acción para cerrar sesión
      logout: (state) => {
          // Eliminar token de localStorage
          localStorage.removeItem('auth_token');

          // Resetear el estado
          state.token = null;
          state.user = null;
          state.loading = false;
          state.error = null;
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = false;
          state.message = '';
          toast.info('Logged out successfully');
      },
      reset: (state) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = false;
          state.message = '';
      },
  },
  extraReducers: (builder) => {
    builder
        .addCase(login.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.error = null;
        })
        .addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
            state.user = null;
        })
        // Agrega aquí los otros casos de extraReducers
        .addCase(register.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        })
        .addCase(register.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
            state.user = null;
        })
        .addCase(logout.fulfilled, (state) => {
            state.user = null;
        })
        .addCase(activate.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(activate.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        })
        .addCase(activate.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
            state.user = null;
        })
        .addCase(resetPassword.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(resetPassword.fulfilled, (state) => {
            state.isLoading = false;
            state.isSuccess = true;
        })
        .addCase(resetPassword.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
            state.user = null;
        })
        .addCase(resetPasswordConfirm.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(resetPasswordConfirm.fulfilled, (state) => {
            state.isLoading = false;
            state.isSuccess = true;
        })
        .addCase(resetPasswordConfirm.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
            state.user = null;
        })
        .addCase(getUserInfo.fulfilled, (state, action) => {
            state.userInfo = action.payload;
        });
},
});


// Exporta la acción logout para usarla en los componentes
export const { reset } = authSlice.actions;

// Exporta el reducer para configurarlo en el store
export default authSlice.reducer;
