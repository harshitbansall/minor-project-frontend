import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Cookies from "universal-cookie";

////////////////////////////////////////////////////////////////////////////////////// REDUX

import { useSelector, useDispatch } from "react-redux";

//////////////////////////////////////////////////////////////////////////////////////

import { motion, AnimatePresence } from "framer-motion";

////////////////////////////////////////////////////////////////////////////////////// COMPONENTS

import CircularProgress from "@mui/joy/CircularProgress";
import Switch from "@mui/joy/Switch";
import LinearProgress from "@mui/joy/LinearProgress";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

//////////////////////////////////////////////////////////////////////////////////////

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #6f86d6, #48c6ef);
`;

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #333;
  margin: 0 0 10px 0;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  color: #555;
  &:focus {
    border-color: #6f86d6;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  color: white;
  background-color: #6f86d6;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #586ab2;
  }
`;

const SwitchLabel = styled(Typography)`
  && {
    color: ${(props) => `${props.color}`};
    font-weight: 600;
    font-size: 17px;
    pointer-events: none;
  }
`;

//////////////////////////////////////////////////////////////////////////////////////

const Login = () => {
  const cookies = new Cookies();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isTeacher, setIsTeacher] = useState(false);

  ///////////////////////////////////////////////////////////

  const backendEndpoint = useSelector(
    (state) => state.backendEndpoint.endpoint
  );

  /////////////////////////////////////////////////////////////////

  const handleLogin = async (e) => {
    e.preventDefault();

    const emailInput = email;
    const passwordInput = password;

    const { data } = await axios.post(
      `${backendEndpoint}/api/auth/student/login`,
      {
        email: emailInput,
        password: passwordInput,
      }
    );
    login(data);
  };

  /////////////////////////////////////////////////////////////////

  function login(data) {
    if (data.success === "true" && data.access) {
      cookies.set("access_token", data.access, {
        path: "/",
        expires: new Date(Date.now() + 2592000),
      });
      cookies.set("refresh_token", data.refresh, {
        path: "/",
        expires: new Date(Date.now() + 2592000),
      });
      navigate("/");
    } else if (data.success === "true" && !data.access) {
      setHas2faEnabled(true);
      dispatch(setErrorSnackbarMessage(data.message));
    } else if (data.success === "false") {
      dispatch(setErrorSnackbarMessage(data.message));
    }
    setProgress(100);
    setNormalLoading(false);
    setGoogleLoading(false);
  }

  /////////////////////////////////////////////////////////////////

  return (
    <Container>
      <LoginForm>
        <Title>Login</Title>

        <Switch
          style={{ margin: "0 0 20px 0" }}
          component={motion.button}
          whileTap={{ scale: 0.95 }}
          color={isTeacher ? "primary" : "success"}
          slotProps={{ input: { "aria-label": "dark mode" } }}
          startDecorator={
            <SwitchLabel color={isTeacher ? "gray" : "green"}>
              Student
            </SwitchLabel>
          }
          endDecorator={
            <SwitchLabel color={isTeacher ? "#185EA5" : "gray"}>
              Teacher
            </SwitchLabel>
          }
          checked={isTeacher}
          onClick={(event) => {
            setIsTeacher(!isTeacher);
          }}
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" onClick={handleLogin}>
          Sign In
        </Button>
      </LoginForm>
    </Container>
  );
};

export default Login;
