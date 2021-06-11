import React from "react";

export default class TaskStimulus extends React.Component {
  render() {
    // game - round - stage
    const { round, stage, showA } = this.props;

    return (
      <div className="task-stimulus">
        Round {round.index + 1}.
        {showA ? (
          <div>
            <b>Please modify the provided function to achieve the indicated functionality and submit the code in the window on the right.</b>
            <br />
            You can refer to the instructions by clicking on the button on the
            top right corner. If the task description does not appear at first, try refreshing the page.
          </div>
        ) : (
          <div>
            <b>Please modify the provided function to achieve the indicated functionality and submit the code in the window on the right.</b>
            <br />
            You have up to 30 minutes.
            <br />
            You can refer to the instructions by clicking on the button on the
            top right corner. If the task description does not appear at first, try refreshing the page.
          </div>
        )}
      </div>
    );
  }
}
