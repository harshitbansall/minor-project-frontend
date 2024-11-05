import {
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
  BrowserRouter,
} from "react-router-dom";
import "./App.css";

import React, { useEffect, useState, Suspense } from "react";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* ////////////////////////////////////////////////////////////////////////////////////////// DASHBOARD */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
