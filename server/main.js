import Empirica from "meteor/empirica:core";
import "./bots.js";
import "./callbacks.js";
import { drafts } from "./constants";

// gameInit is where the structure of a game is defined.
// Just before every game starts, once all the players needed are ready, this
// function is called with the treatment and the list of players.
// You must then add rounds and stages to the game, depending on the treatment
// and the players. You can also get/set initial values on your game, players,
// rounds and stages (with get/set methods), that will be able to use later in
// the game.
Empirica.gameInit(game => {
  game.players.forEach((player, i) => {
    player.set("avatar", `/avatars/jdenticon/${player._id}`);
    player.set("score", {score1: 0, score2: 0});
    console.log("gameinit");
  });

  _.times(game.treatment.nRounds, i => {
    const round = game.addRound();

    round.set("drafts", drafts);

    round.addStage({
      name: "response",
      displayName: "Writing a short love story",
      durationInSeconds: game.treatment.stageDuration
    });
  });
});
