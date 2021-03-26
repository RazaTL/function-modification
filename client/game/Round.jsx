import React from "react";

import PlayerProfile from "./PlayerProfile.jsx";
import Task from "./Task.jsx";
import About from "../intro/About.jsx";
import {
  Callout, Intent,
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

export default class Round extends React.Component {
  timeout = false;
  t1; t2;

  render() {
    const { game, round, stage, player } = this.props;

    if (this.timeout && !(player.idle || !player.online)) {
      clearTimeout(this.t1);
      clearTimeout(this.t2);
      console.log("timeout cleared");
      this.timeout = false;
    }
    else if (!this.timeout && (player.idle || !player.online)) {
      this.timeout = true;
      console.log("timeout set")

      this.t1 = setTimeout(() => {
        alert("If you are idle or offline for more than 3 minutes, the task will be cancelled.")
      }, 1 * 60 * 1000);

      this.t2 = setTimeout(() => {
        if (player.idle || !player.online) {
          localStorage.setItem("confirmed", "");
          player.exit("Thanks")
        }
      }, 15 * 60 * 1000);
    }

    return (
      <div className="round">

        {player.idle || !player.online?
            <Callout
              icon={IconNames.ERROR}
              intent={Intent.DANGER}
              title="Warning"
            >
              If you are idle or offline for more than 3 minutes, the task will be cancelled.
            </Callout>
          :
          ""
        }
        <About {...this.props}/>
        <div className="content">
          <PlayerProfile player={player} stage={stage} game={game} />
          <Task game={game} round={round} stage={stage} player={player} />
        </div>
      </div>
    );
  }
}
