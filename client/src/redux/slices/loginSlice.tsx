import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
export interface LoginState {
  // Shared
  formDisplay: string,
  // Login
  loginEmail: string,
  _loginPassword: string,
  // Registration
  regEmail: string,
  _regPassword: string,
  _regPasswordConfirm: string;
}

// Define the initial state using that type
const initialState: LoginState = {
  // Shared
  formDisplay: "login",
  // Login
  loginEmail: "",
  _loginPassword: "",
  // Registration
  regEmail: "",
  _regPassword: "",
  _regPasswordConfirm: ""
};

export const loginSlice = createSlice({
  name: 'login',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Shared
    switchForm: (state, action: PayloadAction<string>) => {
      state.formDisplay = action.payload;
    },
    // Login
    loginAutoFill: (state) => {
      state.loginEmail = "guest@gmail.com";
      state._loginPassword = "guestpeasword";
    },
    loginReset: (state) => {
      state.loginEmail = "";
      state._loginPassword = "";
    },
    loginEmailTyping: (state, action: PayloadAction<string>) => {
      state.loginEmail = action.payload;
    },
    loginPasswordTyping: (state, action: PayloadAction<string>) => {
      state._loginPassword = action.payload;
    },
    // Registration
    regEmailTyping: (state, action: PayloadAction<string>) => {
      state.regEmail = action.payload;
    },
    regPasswordTyping: (state, action: PayloadAction<string>) => {
      state._regPassword = action.payload;
    },
    regPasswordConfirmTyping: (state, action: PayloadAction<string>) => {
      state._regPasswordConfirm = action.payload;
    }
  },
});

export const { switchForm, loginAutoFill, loginReset, loginEmailTyping, loginPasswordTyping, regEmailTyping, regPasswordTyping, regPasswordConfirmTyping } = loginSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export default loginSlice.reducer;


