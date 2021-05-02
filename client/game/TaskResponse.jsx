import React from "react";

import { Callout, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

export default class TaskResponse extends React.Component {
  constructor(props) {
    super(props);
    this.submitBtnRef = React.createRef();

    this.state = {
      numOfWords: 0,
      stories: [],
      submitted: false,
    };
  }

  handleChange = (event) => {
    const { stories } = this.state;
    const { player } = this.props;
    const value = event.target.value;

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

    // if (numOfWords < 200) alert("The story is less than 200 words.");
    // else {
    // add story to state array
    const newStories = [...stories, ""];

    this.setState(
      (prevState) => ({
        ...prevState,
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

    console.log(newStories);
    console.log(newStories.length);
    console.log(this.props);

    player.round.set("value", newStories);
    this.props.handleScore(newStories.length - 1, round.index);
    // player.round.set("scores", newStories.length);
    // }
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
    // if (stories.length == 0)
    // isActive = (stories.length )
    const isActive = stories.length - 1 == index ? "active " : "";

    return (
      <textarea
        onChange={this.handleChange}
        value={story}
        key={index}
        // className={isActive + "story story" + index}
        className={"active " + "story story" + index}
      ></textarea>
    );
  }

  componentDidMount() {
    const { player } = this.props;

    console.log(this.props);

    if (player) {
      const currentValue = player.round.get("value");

      if (!currentValue || currentValue.length == 0) {
        this.setState((prevState) => ({
          ...prevState,
          stories: [""],
        }));
      } else {
        this.setState((prevState) => ({
          ...prevState,
          stories: currentValue,
        }));
      }
      console.log(currentValue);
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
    const { player, stage } = this.props;
    const { numOfWords, stories, submitted } = this.state;

    // If the player already submitted, don't show the slider or submit button
    if (player.stage.submitted) {
      return this.renderSubmitted();
    }

    if (stage.ended) {
      this.submitBtnRef.click();
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
              function!
            </Callout>
          </div>
        ) : (
          ""
        )}
        <div className="task-response-form">
          <div className="selected-draft">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Quibusdam saepe veritatis eaque ipsa laboriosam voluptas sint
              perspiciatis tempore nesciunt ad! Suscipit sint voluptas non
              explicabo minus molestiae sapiente fugit, maiores delectus
              doloremque qui blanditiis facere sed error et illum quos
              aspernatur ipsam. Accusantium maiores tenetur, laboriosam,
              molestias unde vero repellendus possimus ipsam omnis error alias?
              Modi accusantium vero itaque harum est ex ullam aperiam blanditiis
              cupiditate! Error blanditiis iure maiores nemo omnis nesciunt
              cumque esse dolorum magni voluptatem perferendis deserunt
              reiciendis dolore placeat maxime est asperiores rerum expedita,
              libero consequatur. Nostrum, exercitationem. Quis libero labore
              iste totam consectetur magni distinctio itaque sed eum vitae
              excepturi ut natus harum doloribus fuga dolor dolore, inventore
              sit vel provident!
            </p>
          </div>
        </div>
        <form className="task-response-form" onSubmit={this.handleSubmit}>
          {/* {stories.map((s, i) => this.renderTextarea(s, i))} */}
          <textarea
            onChange={this.handleChange}
            // value={story}
            // key={index}
            // className={isActive + "story story" + index}
            className={"active " + "story"}
          ></textarea>

          <div>Total {numOfWords} words</div>

          <button ref={this.submitBtnRef} className="hidden" type="submit">
            Submit
          </button>

          <button className="green" onClick={this.handleNext}>
            Submit (Start writing next story)
          </button>
        </form>
      </div>
    );
  }
}
