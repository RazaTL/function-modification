import { StageTimeWrapper } from "meteor/empirica:core";
import React from "react";

class timer extends React.Component {
  render() {
    const { remainingSeconds } = this.props;

    const classes = ["timer"];
    if (remainingSeconds <= 5) {
      classes.push("lessThan5");
    } else if (remainingSeconds <= 10) {
      classes.push("lessThan10");
    }

    return (
      <div className={classes.join(" ")}>
        <h4>This round has lasted</h4>
        <span className="seconds">
          {Math.floor(60 - remainingSeconds / 60)} minutes <br />
          {60 - remainingSeconds % 60} seconds
        </span>
      </div>
    );
  }
}

export default Timer = StageTimeWrapper(timer);
