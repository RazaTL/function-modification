import React from "react";

import { Callout, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

export default class TaskResponseC extends React.Component {
  constructor(props) {
    super(props);
    this.submitRef = React.createRef();

    this.state = {
      numOfWords: 0,
      selected: 0,
      stories: [],
      confirmed: localStorage.getItem("confirmed") || false,
      submitted: false,
    };
  }

  handleSelect = (id) => {
    if (id >= 0) {
      this.setState((prevState) => ({
        ...prevState,
        selected: id,
      }));
    }
  };

  handleSkip = () => {
    const { selected } = this.state;
    const { round } = this.props;
    const drafts = round.data.drafts;
    let newSelected = selected + 1;

    if (selected >= 0 && selected < drafts.length - 1) {
      this.setState((prevState) => ({
        ...prevState,
        selected: newSelected,
      }));
    } else {
      this.setState((prevState) => ({
        ...prevState,
        selected: 0,
      }));
    }
  };

  handleConfirm = () => {
    const { selected, stories } = this.state;
    const { round, player } = this.props;
    const drafts = round.data.drafts;

    // const newStories = [...stories, drafts[selected].content];
    const newStories = [""];

    console.log(newStories);

    if (selected >= 0) {
      this.setState(
        (prevState) => ({
          ...prevState,
          confirmed: true,
          stories: newStories,
        }),
        () => {
          player.round.set("value", newStories);
          localStorage.setItem("confirmed", true);
        }
      );
    }
  };

  handleBack = () => {
    const { stories } = this.state;
    const { player } = this.props;

    const newStories = stories.filter((s, i) => i != stories.length - 1);
    console.log(newStories);

    this.setState(
      (prevState) => ({
        ...prevState,
        confirmed: false,
        stories: newStories,
      }),
      () => {
        player.round.set("value", newStories);
      }
    );

    localStorage.setItem("confirmed", "");
  };

  handleChange = (e) => {
    const { stories } = this.state;
    const { player } = this.props;
    const value = e.target.value;

    const newNum = this.countWords(value);
    const newStories = [...stories];
    newStories[stories.length - 1] = value;

    this.setState(
      (prevState) => ({
        ...prevState,
        numOfWords: newNum,
        stories: newStories,
      }),
      () => {
        player.round.set("value", newStories);
      }
    );
  };

  handleNext = (e) => {
    e.preventDefault();

    const { numOfWords, stories } = this.state;
    const { player, round } = this.props;

    if (numOfWords < 200) alert("The story is less than 200 words.");
    else {
      localStorage.setItem("confirmed", "");

      // show drafts again
      // add story to state array
      const newStories = [...stories];
      console.log(newStories);

      this.setState(
        (prevState) => ({
          ...prevState,
          confirmed: false,
          stories: newStories,
          submitted: true,
          numOfWords: 0,
        }),
        () => {
          setTimeout(() => {
            if (this.state.submitted) {
              this.setState((prevState) => ({
                ...prevState,
                submitted: false,
              }));
            }
          }, 4000);
        }
      );

      player.round.set("value", newStories);
      this.props.handleScore(newStories.length, round.index);
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("confirmed", "");
    this.props.player.stage.submit();
  };

  countWords = (str) => {
    const result = str.trim().split(/\s+/);
    if (result == "") return 0;
    return result.length;
  };

  renderDraft = (draft) => {
    const { selected } = this.state;

    let classes = "draft";
    if (selected == draft.id) classes = "draft selected";

    return (
      <div className={classes} key={draft.id}>
        <b>Draft {draft.id + 1}</b> &nbsp;
        {draft.content.substring(0, 100)}...
        <br />
        {selected == draft.id ? (
          ""
        ) : (
          <button className="btn" onClick={() => this.handleSelect(draft.id)}>
            View this draft
          </button>
        )}
      </div>
    );
  };

  renderSubmitted() {
    return (
      <div className="task-response">
        <div className="response-submitted">
          <h5>You already submitted the story in this stage.</h5>
        </div>
      </div>
    );
  }

  renderTextarea(story, index) {
    const { stories } = this.state;
    const isActive = stories.length - 1 == index ? "active " : "";

    return (
      <textarea
        onChange={this.handleChange}
        value={story}
        key={index}
        className={isActive + "story story" + index}
      ></textarea>
    );
  }

  componentDidMount() {
    const { player, game } = this.props;

    if (player) {
      const currentValue = player.round.get("value");

      console.log(player.get("score"));
      console.log(game.get("score"));

      if (!currentValue || currentValue.length == 0) {
        this.setState((prevState) => ({
          ...prevState,
          stories: [],
        }));
      } else {
        this.setState((prevState) => ({
          ...prevState,
          stories: currentValue,
        }));
      }
    }

    if (document.querySelector(".story.active")) {
      const newNum = this.countWords(
        document.querySelector(".story.active").value
      );
      this.setState((prevState) => ({
        ...prevState,
        numOfWords: newNum,
      }));
    }
  }

  render() {
    const { player, stage, round } = this.props;
    const { numOfWords, selected, confirmed, stories, submitted } = this.state;
    const drafts = round.data.drafts;

    // If the player already submitted, don't show the slider or submit button
    if (player.stage.submitted) {
      return this.renderSubmitted();
    }

    if (stage.ended) {
      this.submitRef.click();
    }

    return (
      <div className="task-response">
        {submitted ? (
          <div className="success">
            <Callout
              icon={IconNames.TICK}
              intent={Intent.SUCCESS}
              title="Success"
            >
              Successfully submitted. Thank you so much. Enjoy writing your next
              story!
            </Callout>
          </div>
        ) : (
          ""
        )}
        {confirmed ? (
          <div style={{ width: "70%" }}>
            <div className="task-response-form">
              <div className="selected-draft">{drafts[selected].content}</div>
            </div>
            <form className="task-response-form" onSubmit={this.handleSubmit}>
              {stories.map((s, i) => this.renderTextarea(s, i))}

              <div>Total {numOfWords} words</div>
              <button ref={this.submitRef} className="hidden" type="submit">
                Submit
              </button>
              <button className="green" onClick={this.handleNext}>
                Submit (Start writing next story)
              </button>
              <button className="orange" onClick={this.handleBack}>
                Go back to choose a different draft
              </button>
            </form>
          </div>
        ) : (
          <div className="task-response-form">
            <div className="selected-draft">{drafts[selected].content}</div>
            <button className="green" onClick={this.handleConfirm}>
              Use this draft
            </button>
            <button className="orange" onClick={this.handleSkip}>
              Skip this draft
            </button>
          </div>
        )}

        <div className={confirmed ? "archive confirmed" : "archive"}>
          <h4>All drafts</h4>
          {drafts.map(this.renderDraft)}
        </div>
      </div>
    );
  }
}
