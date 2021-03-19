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
              You have 30 minutes.<br/>  
              You can refer to the instructions by clicking on "About" on the top right corner.
            </div>
            :
            <div>
              <b>Please write a short love story (at least 200 words) by editing a draft.</b> <br/>
              If the draft on the left is unsatisfying, you can generate a new one by clicking on the "generate a new draft" button.<br/>
              You can always choose to use or view the previously generated drafts using the sidebar on the right.<br/>
              You have 30 minutes.
              You can refer to the instructions by clicking on "About" on the top right corner.
            </div>
          }
        </div>

    );
  }
}
