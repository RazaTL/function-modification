import React from "react";

import Timer from "./Timer.jsx";

export default class PlayerProfile extends React.Component {
  state = { score: 0 };

  renderProfile() {
    const { player } = this.props;
    return (
      <div className="profile-score">
        <p>
          <b>Your Worker ID</b>: {player.id}
          <br />
          <br />
        </p>
      </div>
    );
  }

  renderScore() {
    const { score1, score2 } = this.props;

    return (
      <div className="profile-score">
        <b>Round 1</b>:<br />
        <span>{score1} functions submitted</span>
        <br />
        <br />
        <b>Round 2</b>:<br />
        <span>{score2} functions submitted</span>
        <br />
        <br />
        <b>Total</b>:<br />
        <span>{score1 + score2} functions submitted</span>
        <br />
        <br />
        <b>Expected reward</b>:<br />
        {score1 == 0 ? (
          <span>
            $0 <br />
            <small>*You need to write at least 1 function in each round</small>
          </span>
        ) : (
          <span>$8 ~ ${8 + 4*score1 + 4*score2}</span>
        )}
        <br />
        <small>
          {score1 != 0 && score2 == 0
            ? "*Only if you write at least 1 function in round 2"
            : ""}
        </small>
      </div>
    );
  }
  render() {
    const { stage } = this.props;

    return (
      //<aside className="player-profile">
       // {this.renderProfile()}
        //{this.renderScore()}
        <Timer stage={stage}/>
      //</aside>
    );
  }
}
