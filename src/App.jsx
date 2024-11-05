import {
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
  BrowserRouter,
} from "react-router-dom";
import "./App.css";

import styled from "styled-components";

import React, { useEffect, useState, Suspense } from "react";
import { ThemeProvider } from "styled-components";

//////////////////////////////////////////////////////////////// REDUX

import { useSelector, useDispatch } from "react-redux";

/////////////////////////////////////////////////////////////////

import Login from "./pages/Login";
import SideMenu from "./pages/Sidemenu";
import TopNavbar from "./pages/TopNavbar";
import Ngspice from "./pages/Ngspice";

/////////////////////////////////////////////////////////////////

const MainWindowMainFrame = styled.div`
  display: grid;
  grid-template-columns: 17% 83%;
  width: 100%;

  @media (max-width: 431px) {
    grid-template-columns: ${(props) =>
      `${props.$issidebarcollapsed ? `100% ` : `100%`}`};
  }
`;

/////////////////////////////////////////////////////////////////

function App() {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          {/* ////////////////////////////////////////////////////////////////////////////////////////// DASHBOARD */}
          <Route
            path="/"
            element={
              <>
                {/* <TopNavbar setProgress={setProgress} key="topnavbar" />
                <MainWindowMainFrame
                  $issidebarcollapsed={isSidebarCollapsed}
                  $location={location}
                >
                  <SideMenu setProgress={setProgress} key="sidemenu" />
                  <MainComponentLoadSuspense>
                    <MainComponentMobileWrapper
                      $smalldevicemenuopen={smallDeviceMenuOpen}
                    >
                      <IndianMarkets key="IndianMarkets" />
                    </MainComponentMobileWrapper>
                  </MainComponentLoadSuspense>
                </MainWindowMainFrame> */}
                <TopNavbar />
                <MainWindowMainFrame>
                  <SideMenu />
                </MainWindowMainFrame>
              </>
            }
          />
          {/* ////////////////////////////////////////////////////////////////////////////////////////// DASHBOARD */}
          <Route
            path="/ngspice"
            element={
              <>
                <TopNavbar />
                <MainWindowMainFrame>
                  <SideMenu />
                  <Ngspice />
                </MainWindowMainFrame>
              </>
            }
          />

          {/* ////////////////////////////////////////////////////////////////////////////////////////// LOGIN */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
