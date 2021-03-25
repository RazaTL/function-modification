import React from "react";

import PlayerProfile from "./PlayerProfile.jsx";
import Task from "./Task.jsx";
import About from "../intro/About.jsx";

export default class Round extends React.Component {
  render() {
    const { game, round, stage, player } = this.props;

    return (
      <div className="round">
        <About/>
        <div className="content">
          <PlayerProfile player={player} stage={stage} game={game} />
          <Task game={game} round={round} stage={stage} player={player} />
        </div>
      </div>
    );
  }
}
