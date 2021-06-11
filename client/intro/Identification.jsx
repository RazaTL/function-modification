import React, { Component } from "react";
import { Centered } from "meteor/empirica:core";

export default class Identification extends Component {
  state = { id: "", email: "" };
  
  // Update the stored state of the id
  handleUpdate = (event) => {
    const { value, name } = event.currentTarget;
    this.setState({ [name]: value });
  };

  handleChange = (event) => {
    const el = event.currentTarget;
    this.setState({ [el.name]: el.value });
  };

  // Submit the id when submit button is clicked
  handleSubmit = (event) => {
    event.preventDefault();

    const { handleNewPlayer } = this.props;
    const { id } = this.state;
    const { email } = this.state;
    handleNewPlayer(id + "," + email);
  };

  render() {
    const { id } = this.state;
    const { email } = this.state;

    return (
      <Centered>
        <div className="new-player">
          <form onSubmit={this.handleSubmit}>
            <h1>Identification</h1>

            <p>Please enter your SONA ID:</p>

            <input
              className="bp3-input"
              dir="auto"
              type="text"
              name="id"
              id="id"
              value={id}
              onChange={this.handleChange}
              placeholder="e.g. XXXXX"
              required
              autoComplete="off"
            />

            <h1>Identification</h1>

            <p>Please enter your MIT email:</p>

            <input
              className="bp3-input"
              dir="auto"
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={this.handleChange}
              placeholder="e.g. jdoe@mit.edu"
              required
              autoComplete="off"
            />
            <p className="button-holder">
              <button type="submit">Submit</button>
            </p>
          </form>
        </div>
      </Centered>

      
    );
  }
}
