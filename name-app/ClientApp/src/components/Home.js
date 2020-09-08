import React, { Component } from "react";
import { Table } from "reactstrap";
import CallApi from "../api_call/CallApi";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      names: [],
    };
  }

  componentDidMount = async () => {
    let allNames = await CallApi.GetAllNames();
    this.setState({ names: allNames });
  };

  render = () => {
    return (
      <div className="Home">
        <Table className="text-center">
          <thead>
            <tr>
              <th>GUID</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            {this.state.names.map((data, index) => {
              return (
                <tr key={`name-row-${index}`}>
                  <td>{data.id}</td>
                  <td>{data.first}</td>
                  <td>{data.last}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  };
}
