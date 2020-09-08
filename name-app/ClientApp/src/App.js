import React, { Component } from "react";
import { Route } from "react-router";
import { Container, Nav, NavLink } from "reactstrap";
import Home from "./components/Home";
import GetGuid from "./components/GetGuid";
import MatchingGuid from "./components/MatchingGuid";

import "./custom.css";

export default class App extends Component {
  render = () => {
    return (
      <Container fluid>
        <Nav horizontal="center">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/get-guid">Get GUID Call</NavLink>
          <NavLink href="/matching-guid">Find Matching GUIDs</NavLink>
        </Nav>
        <Route exact path="/" component={Home} />
        <Route exact path="/get-guid" component={GetGuid} />
        <Route exact path="/matching-guid" component={MatchingGuid} />
      </Container>
    );
  };
}
