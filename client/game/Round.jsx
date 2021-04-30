import React from "react";

import PlayerProfile from "./PlayerProfile.jsx";
import Task from "./Task.jsx";
import About from "../intro/About.jsx";
import { Callout, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

export default class Round extends React.Component {
  timeout = false;
  t1;
  t2;

  constructor(props) {
    super(props);

    this.state = {
      score1: 0,
      score2: 0,
    };

    this.handleScore = this.handleScore.bind(this);
  }

  handleScore(newScore, condition) {
    const { game } = this.props;
    const currentScore = game.get("score") || { score1: 0, score2: 0 };

    console.log(currentScore);

    if (condition == 0) {
      game.set("score", { score1: newScore, score2: currentScore.score2 });

      this.setState((prevState) => ({
        ...prevState,
        score1: newScore,
      }));
    } else {
      game.set("score", { score1: currentScore.score1, score2: newScore });

      this.setState((prevState) => ({
        ...prevState,
        score2: newScore,
      }));
    }
  }

  componentDidMount() {
    const { player, game } = this.props;

    if (player) {
      // const currentScore = player.get("scores") || {score1: 0, score2: 0};
      const currentScore = game.get("score") || { score1: 0, score2: 0 };

      this.setState((prevState) => ({
        ...prevState,
        score1: currentScore.score1,
        score2: currentScore.score2,
      }));
    }
  }

  render() {
    const { game, round, stage, player } = this.props;
    const { score1, score2 } = this.state;

    if (this.timeout && !(player.idle || !player.online)) {
      clearTimeout(this.t1);
      clearTimeout(this.t2);
      console.log("timeout cleared");
      this.timeout = false;
    } else if (!this.timeout && (player.idle || !player.online)) {
      this.timeout = true;
      console.log("timeout set");

      this.t1 = setTimeout(() => {
        alert(
          "If you are idle or offline for more than 3 minutes, the task will be cancelled."
        );
      }, 1 * 60 * 1000);

      // TODO: change this to 3 minutes
      this.t2 = setTimeout(() => {
        if (player.idle || !player.online) {
          localStorage.setItem("confirmed", "");
          player.exit("Thanks");
        }
      }, 15 * 60 * 1000);
    }

    return (
      <div className="round">
        {player.idle || !player.online ? (
          <Callout
            icon={IconNames.ERROR}
            intent={Intent.DANGER}
            title="Warning"
          >
            If you are idle or offline for more than 3 minutes, the task will be
            cancelled.
          </Callout>
        ) : (
          ""
        )}
        <About {...this.props} />
        <div className="content">
          <PlayerProfile
            player={player}
            stage={stage}
            game={game}
            score1={score1}
            score2={score2}
          />
          <Task
            game={game}
            round={round}
            stage={stage}
            player={player}
            handleScore={this.handleScore}
          />
        </div>
      </div>
    );
  }
}
