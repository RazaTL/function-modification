import React from "react";

import { Centered } from "meteor/empirica:core";
import InstructionText from "./InstructionText";
import { isMobile } from "react-device-detect";

export default class Instruction extends React.Component {
  render() {
    const { hasPrev, hasNext, onNext, onPrev, game } = this.props;

    return (
      <Centered>
        {isMobile ? (
          "Please use desktop to perform this task."
        ) : (
          <div className="instructions">
            <InstructionText {...this.props} />

            <p>
              <button type="button" onClick={onPrev} disabled={!hasPrev}>
                Previous
              </button>
              
              <button type="button" onClick={onNext}>
                Next
              </button>
            </p>
          </div>
        )}
      </Centered>
    );
  }
}
