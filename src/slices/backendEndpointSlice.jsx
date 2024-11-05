import { createSlice } from "@reduxjs/toolkit";

const isProduction = false;
const localhost = "http://192.168.1.10:8000";
const production = "https://15pcdashboardbackend.pythonanywhere.com";

const frontendLocalhost = "http://localhost:3000";
const frontendProduction = "https://dashboard.the15percentclub.in";

export const backendEndpointSlice = createSlice({
  name: "backendEndpoint",
  initialState: {
    isProduction: isProduction,
    endpoint: isProduction ? production : localhost,
    localhost: localhost,
    production: production,

    frontend: isProduction ? frontendProduction : frontendLocalhost,
  },
  reducers: {
    setLocalhost: (state) => {
      state.endpoint = localhost;
    },
    setProduction: (state) => {
      state.endpoint = production;
    },
  },
});

export const { setLocalhost, setProduction } = backendEndpointSlice.actions;

export default backendEndpointSlice.reducer;
