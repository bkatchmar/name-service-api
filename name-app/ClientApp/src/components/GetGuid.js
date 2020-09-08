import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import CallApi from "../api_call/CallApi";

export default class GetGuid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first: "",
      last: "",
      foundGuid: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  };

  handleSubmit = async () => {
    let result = await CallApi.ReturnNameGuid(
      this.state.first,
      this.state.last
    );
    this.setState({ foundGuid: result });
  };

  render = () => {
    return (
      <div className="GetGuid">
        <Form>
          <FormGroup>
            <Label for="first">First Name</Label>
            <Input
              type="text"
              name="first"
              id="first"
              placeholder="First Name"
              value={this.state.first}
              onChange={this.handleChange}
              invalid={this.state.first.trim() === ""}
            />
          </FormGroup>
          <FormGroup>
            <Label for="last">Last Name</Label>
            <Input
              type="text"
              name="last"
              id="last"
              placeholder="Last Name"
              value={this.state.last}
              onChange={this.handleChange}
              invalid={this.state.last.trim() === ""}
            />
          </FormGroup>
        </Form>
        <Button
          color="primary"
          disabled={
            this.state.first.trim() === "" || this.state.last.trim() === ""
          }
          onClick={() => this.handleSubmit()}
        >
          Submit
        </Button>
        <div className="result">
          The GUID for the looked up user is: {this.state.foundGuid}
        </div>
      </div>
    );
  };
}
