import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import StarWarsTable from "./StarWarsTable";
import PersonDetails from "./PersonDetails";
import styled from 'styled-components'

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


const client = new ApolloClient({
  uri: 'https://g26utt.sse.codesandbox.io/',
  cache: new InMemoryCache()
});

const rootElement = document.getElementById("root");
render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <nav className="nav">
        <h1>Star Wars app</h1>
        <Button as="a" href="/StarWarsTable">Home</Button>
        <div className="dot">
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<App />}>
        </Route>
      </Routes>
      <div id="intro" className="animation-iteration-count: 1"> A long time ago, in a galaxy far, far away....</div>
      <div id="logo" className="animation-iteration-count: 1"></div>
      <div id="scroller" className="animation-iteration-count: 1">
        <div>
          <p>
            <Routes>
              <Route path="StarWarsTable" element={<StarWarsTable />} />
              <Route
                path="*"
                element={
                  <main style={{ padding: "1rem", color: "yellow" }}>
                    There's nothing here!
                  </main>
                }
              />
            </Routes>
          </p>
        </div>
      </div>
      <Routes>
        <Route path="PersonDetails/:name" element={<PersonDetails />} />
      </Routes>
      <div id="showMe">
        <p>
          <Routes>
            <Route path="StarWarsTable" element={<StarWarsTable />} />
          </Routes>
        </p>
      </div>
    </BrowserRouter>
  </ApolloProvider>,
  rootElement
);

reportWebVitals();
