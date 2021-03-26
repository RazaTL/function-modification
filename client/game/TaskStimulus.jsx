import React from "react";

export default class TaskStimulus extends React.Component {
  render() {
    // game - round - stage
    const { round, stage, showA } = this.props;

    return (
      
        <div className="task-stimulus">
          Round {round.index + 1}. 
          {showA ?
            <div>
              <b>Please write a short love story (at least 200 words).</b> <br/>
              You have 15 minutes.<br/>  
              You can refer to the instructions by clicking on the button on the top right corner.
            </div>
            :
            <div>
              <b>Please write a short love story (at least 200 words) by editing a draft.</b> <br/>
              If the draft below is unsatisfying, you can skip it and read a new one by clicking on the "Skip this draft" button.<br/>
              You can always choose to use or view the previous drafts using the sidebar on the right.<br/>
              You have 15 minutes.
              You can refer to the instructions by clicking on the button on the top right corner.
            </div>
          }
        </div>

    );
  }
}
