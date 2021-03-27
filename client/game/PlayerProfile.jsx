import React from "react";

import Timer from "./Timer.jsx";

export default class PlayerProfile extends React.Component {
  state = { score: 0 };

  renderProfile() {
    const { player } = this.props;
    return (
      <div className="profile-score">
        <p>Your Worker ID: {player.id}</p>
      </div>
    );
  }

  renderScore() {
    const { player } = this.props;
    return (
      <div className="profile-score">
        <h4>Total stories submitted</h4>
        <span>{(player.get("score") || 0)}</span>
      </div>
    );
  }
  render() {
    const { stage } = this.props;

    return (
      <aside className="player-profile">
        {this.renderProfile()}
        {this.renderScore()}
        <Timer stage={stage} />
      </aside>
    );
  }
}
