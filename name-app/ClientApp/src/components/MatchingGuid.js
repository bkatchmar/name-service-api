import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Table } from "reactstrap";
import CallApi from "../api_call/CallApi";

export default class MatchingGuid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "First",
      name: "",
      found: [],
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  };

  search = async () => {
    let result = await CallApi.AllGuidsMatchName(
      this.state.mode,
      this.state.name
    );
    this.setState({ found: result });
  };

  render = () => {
    return (
      <div className="MatchingGuid">
        <Form>
          <FormGroup>
            <Label for="first">First Name</Label>
            <Input
              type="select"
              name="mode"
              id="mode"
              value={this.state.mode}
              onChange={this.handleChange}
            >
              <option>First</option>
              <option>Last</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="last">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              value={this.state.name}
              onChange={this.handleChange}
              invalid={this.state.name.trim() === ""}
            />
          </FormGroup>
        </Form>
        <Button
          color="primary"
          disabled={this.state.name.trim() === ""}
          onClick={() => this.search()}
        >
          Search
        </Button>
        <Table striped bordered className="text-center">
          <thead>
            <tr>
              <th>Found GUID</th>
            </tr>
          </thead>
          <tbody>
            {this.state.found.map((data) => {
              return (
                <tr key={data}>
                  <td>{data}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  };
}
