import React from "react";
import styled from "styled-components";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////// CSS

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: #333;
  color: white;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #48c6ef;
`;

////////////////////////////////////////////////////////////////////////////////////////////////////////

const Navbar = () => {
  return (
    <Nav>
      <Logo>e-DEL</Logo>
    </Nav>
  );
};

export default Navbar;
