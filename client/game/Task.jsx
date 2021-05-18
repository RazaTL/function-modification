import React from "react";

import TaskResponse from "./TaskResponse";
import TaskResponseC from "./TaskResponseC";
import TaskResponceD from "./TaskResponseD"
import TaskStimulus from "./TaskStimulus";

export default class Task extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAfirst: true,
    };
  }

  componentDidMount() {
    const { game } = this.props;

    // if CA, change isAfirst to false
    if (game.treatment.order == 3) {
      console.log("CA");
      this.setState({
        isAfirst: false,
      });
    }
  }

  render() {
    const { round } = this.props;
    const { isAfirst } = this.state;

    const showA =
      (isAfirst && round.index == 0) || (!isAfirst && round.index == 1);

    return (
      <div className="task">
        <TaskStimulus {...this.props} showA={showA} />

        {showA ? (
          <TaskResponse {...this.props} />
        ) : (
          <TaskResponse {...this.props} />
        )}
      </div>
    );
  }
}
