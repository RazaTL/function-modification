import React from "react";

export default class InstructionText extends React.Component {
  render() {
    const { game } = this.props;

    const text1 =
      !game || game.treatment.order == 0 ? (
        <span>
          <b>
            In round 1, you create a function that accomplishes a given task
            while incorporating functions from Java code that is given to you.
            (required).
          </b>
          <br />
          <b>
            In round 2, you will do the same task as in round 1, but this time
            the code given to you has comments about the functionality of the
            code. (required).
          </b>
          <br />
          <br />
        </span>
      ) : (
        <span>
          <b>
            In each round, you will create a function that accomplishes a given task
            while incorporating functions from Java code that is given to you.
            (required).
          </b>
          <br />
          <br />
        </span>
      );

    return (
      <div>
        <h1>Instructions</h1>

        <h3>Task</h3>
        <p className="instruction-text">
          Your task is to modify a simple piece of code in java in order to
          achieve an indicated functionality. <br />
          There will be three rounds <br />
        </p>

        <h3>Payment</h3>
        <p className="instruction-text">
          <b>Base payment: $8 for participation</b>
          <br />
          - Requirement: modify code in the three rounds in a non gibbersih
          functional manner.
          <br />
          <br />
          <b>
            Bonus payment: $2-4.50 per function which achieves desired functionality
            successfully. Up to $4.50 based on how fast the modification was realized.
          </b>
          <br />
        </p>
      </div>
    );
  }
}
