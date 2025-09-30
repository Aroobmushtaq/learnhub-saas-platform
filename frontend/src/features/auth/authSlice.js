// // src/features/auth/authSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import authService from "./authService";

// const stored = JSON.parse(localStorage.getItem("user"));

// const initialState = {
//   user: stored ?? null,
//   isError: false,
//   isSuccess: false,
//   isLoading: false,
//   message: "",
// };

// // ✅ Register
// export const register = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
//   try {
//     return await authService.register(userData);
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
//   }
// });

// // ✅ Login
// export const login = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
//   try {
//     return await authService.login(userData);
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
//   }
// });

// // ✅ Logout
// export const logout = createAsyncThunk("auth/logout", async () => {
//   await authService.logout();
// });

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     resetState: (state) => {
//       state.isLoading = false;
//       state.isError = false;
//       state.isSuccess = false;
//       state.message = "";
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // register
//       .addCase(register.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.user = action.payload;
//         localStorage.setItem("user", JSON.stringify(action.payload)); // ✅ save token
//       })
//       // login
//       .addCase(login.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.user = action.payload;
//         localStorage.setItem("user", JSON.stringify(action.payload)); // ✅ save token
//       })
//       // logout
//       .addCase(logout.fulfilled, (state) => {
//         state.user = null;
//         localStorage.removeItem("user");
//       })
//       // errors
//       .addCase(register.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//         state.user = null;
//       });
//   },
// });

// export const { resetState } = authSlice.actions;
// export default authSlice.reducer;




// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const getUserFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem("user")) || null;
  } catch {
    return null;
  }
};

const initialState = {
  user: getUserFromStorage(),
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// ✅ Register
export const register = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
  try {
    return await authService.register(userData);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

// ✅ Login
export const login = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
  try {
    return await authService.login(userData);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

// ✅ Logout
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
  localStorage.removeItem("user");
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    rehydrateUser: (state) => {
      state.user = getUserFromStorage();
    },
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      // login
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      // logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      // errors
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});

export const { resetState, rehydrateUser } = authSlice.actions;
export default authSlice.reducer;
