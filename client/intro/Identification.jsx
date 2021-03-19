import React, { Component } from 'react';
import { Centered } from "meteor/empirica:core";

export default class Identification extends Component {
    state = { id: "" };
    
    // Update the stored state of the id
    handleUpdate = event => {
        const { value, name } = event.currentTarget;
        this.setState({ [name]: value });
    };
    
    // Submit the id when submit button is clicked
    handleSubmit = event => {
        event.preventDefault();

        const { handleNewPlayer } = this.props;
        const { id } = this.state;
        handleNewPlayer(id);
    };

    render() {
        const { id } = this.state;

        return (
            <Centered>
                <div className="new-player">
                    <form onSubmit={this.handleSubmit}>
                        <h1>Identification</h1>

                        <p>
                            Please enter your Worker ID:
                        </p>

                        <input
                            className="bp3-input"
                            dir="auto"
                            type="text"
                            name="id"
                            id="id"
                            value={id}
                            onChange={this.handleUpdate}
                            placeholder="e.g. A1HXXXXXXXXX"
                            required
                            autoComplete="off"
                        />

                        <div>
                            <small>You can find your Worker ID on the top left corner of mTurk website.</small><br/><br/>
                        </div>

                        <p className="button-holder">
                            <button type="submit">Submit</button>
                        </p>

                    </form>
                </div>
            </Centered>
        )
    }
}