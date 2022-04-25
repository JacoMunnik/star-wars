import React from "react";
import { Outlet, Link } from "react-router-dom";
import styled, { css } from 'styled-components'

const Button = styled.button`
  display: inline-block;
  color: yellow;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid yellow;
  border-radius: 3px;
  display: block;
  width: fit-content;
`;

export default function App() {
  return (
    <div className="Header">
      <nav className="navMenu">
            <h1>Star Wars app</h1>
                <Button as="a" href="/StarWarsTable">Home</Button>
                <div className="dot">
            </div>
      </nav>
      <Outlet />
    </div>
  );
}
