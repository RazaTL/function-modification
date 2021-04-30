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
      );

    return (
      <div>
        <h1>Instructions</h1>

        <h3>Task</h3>
        <p className="instruction-text">
          Your task is to modify a simple piece of code in java in order to
          achieve an indicated functionality. <br />
          There will be three rounds <br />
          You must stay in the system for a total of 30 minutes or finish the
          three rounds successfully. If you are idle or offline for more than 2
          minutes, the task will be suspended and you will NOT get any reward.
          <br />
          After completing the three rounds, you will get a code. If you submit
          this code back at Mechanical Turk, you're done!
        </p>

        <h3>Payment</h3>
        <p className="instruction-text">
          <b>Base payment: $4 for participation</b>
          <br />
          - Requirement: modify code in the three rounds in a non gibbersih
          functional manner.
          <br />
          <br />
          <b>
            Bonus payment: $2 per function which achieves desired functionality
            successfully
          </b>
          <br />
        </p>

        <h3>Payment</h3>
        <p className="instruction-text">
          <b>Base payment: $4 for participation</b>
          <br />
          - Requirement: modify code in the three rounds in a non gibbersih
          functional manner.
          <br />
          <br />
          <b>
            Bonus payment: $2 per function which achieves desired functionality
            successfully
          </b>
          <br />
        </p>
      </div>
    );
  }
}
