import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const darkTheme = {
  name: "dark",
  backgrounds: {
    primary: "black",
    shadow: "black",
    skeleton: "#121212",
    skeletonLoading: "#323232",
  },
  colors: {
    theme: "#05fc2a",
    primary: "white",
    secondary: "rgb(255 255 255 / 80%)",
    tertiary: "rgb(255 255 255 / 60%)",
    quaternary: "rgb(255 255 255 / 40%)",
    quinary: "rgb(255 255 255 / 20%)",
    senary: "rgb(255 255 255 / 10%)",
    septenary: "rgb(255 255 255 / 5%)",
    octonary: "rgb(255 255 255 / 2%)",
  },
  fonts: {
    primary: "Geist",
    // primarySemibold: "Calibre Semibold",
  },
  fontSizes: {
    small: "1em",
    medium: "2em",
    large: "3em",
  },
  custom: {
    sideMenuFontWeight: 400,
    pageDetailsContainerWidth: "70%",
  },
};

export const lightTheme = {
  name: "light",
  backgrounds: {
    // primary: "#f9f9f9",
    primary: "#F7F9F2",
    shadow: "gray",
    skeleton: "rgb(0 0 0 / 10%)",
    skeletonLoading: "rgb(0 0 0 / 50%)",
  },
  colors: {
    theme: "black",
    primary: "black",
    secondary: "rgb(0 0 0 / 80%)",
    tertiary: "rgb(0 0 0 / 60%)",
    quaternary: "rgb(0 0 0 / 40%)",
    quinary: "rgb(0 0 0 / 20%)",
    senary: "rgb(0 0 0 / 10%)",
    septenary: "rgb(0 0 0 / 10%)",
    octonary: "rgb(0 0 0 / 3%)",
  },
  fonts: {
    primary: "Calibre",
    primarySemibold: "Calibre Semibold",
  },
  fontSizes: {
    small: "1em",
    medium: "2em",
    large: "3em",
  },
  custom: {
    sideMenuFontWeight: 600,
    pageDetailsContainerWidth: "90%",
  },
};

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: lightTheme,
  },
  reducers: {
    setLightTheme: (state) => {
      cookies.set("theme", "light", { path: "/" });
      state.theme = lightTheme;
    },
    setDarkTheme: (state) => {
      cookies.set("theme", "dark", { path: "/" });
      state.theme = darkTheme;
    },
    toggleTheme: (state) => {
      if (state.theme.name === "dark") {
        cookies.set("theme", "light", { path: "/" });
        state.theme = lightTheme;
      } else if (state.theme.name === "light") {
        cookies.set("theme", "dark", { path: "/" });
        state.theme = darkTheme;
      }
    },
  },
});

export const { setLightTheme, setDarkTheme, toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
