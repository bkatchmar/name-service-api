import React, { Component } from "react";
import { Route } from "react-router";
import { Container } from "reactstrap";
import { Home } from "./components/Home";

import "./custom.css";

export default class App extends Component {
  render() {
    return (
      <Container fluid>
        <Route exact path="/" component={Home} />
      </Container>
    );
  }
}
