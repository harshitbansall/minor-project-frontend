import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Cookies from "universal-cookie";

////////////////////////////////////////////////////////////////////////////////////// REDUX

import { useSelector, useDispatch } from "react-redux";

////////////////////////////////////////////////////////////////////////////////////// CSS

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  /* font-family: "Courier New", Courier, monospace; */
  resize: vertical;
  margin-bottom: 1rem;
  color: #333;
  &:focus {
    border-color: #6f86d6;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  color: white;
  background-color: #6f86d6;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #586ab2;
  }
`;

//////////////////////////////////////////////////////////////////////////////////////
const Ngspice = () => {
  const cookies = new Cookies();
  const [ngspiceCode, setNgspiceCode] = useState("");

  const [loading, isLoading] = useState(false);
  const [output, setOutput] = useState(false);

  ///////////////////////////////////////////////////////////

  const backendEndpoint = useSelector(
    (state) => state.backendEndpoint.endpoint
  );

  ///////////////////////////////////////////////////////////

  const handleSubmit = async (e) => {
    isLoading(true);
    e.preventDefault();

    const { data } = await axios.post(`${backendEndpoint}/api/run_ngspice`, {
      code: ngspiceCode,
    });

    setOutput(data.output);
    isLoading(false);
  };

  ///////////////////////////////////////////////////////////

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Title>Ngspice Code Editor</Title>
      <Textarea
        placeholder="Enter your Ngspice code here..."
        value={ngspiceCode}
        onChange={(e) => setNgspiceCode(e.target.value)}
      />
      <Button type="submit">Submit Code</Button>
      {output && (
        <>
          <h1>Output</h1>
          <p>{output}</p>
        </>
      )}
    </FormContainer>
  );
};

export default Ngspice;
