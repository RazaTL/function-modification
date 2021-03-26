import React from "react";

import {
  Callout, Intent,
} from "@blueprintjs/core";
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


  handleChange = event => {
    const { stories } = this.state;
    const { player } = this.props;
    const value = event.target.value

    const newNum = this.countWords(value);
    const newStories = [...stories];
    newStories[stories.length - 1] = value;

    this.setState(prevState => ({
        ...prevState,
        numOfWords: newNum,
        stories: newStories,
    }), () => {
      player.round.set("value", newStories);
    });
  };


  handleNext = (e) => {
    e.preventDefault();

    const { player } = this.props;
    const { numOfWords, stories } = this.state;

    if (numOfWords < 200)
      alert("The story is less than 200 words.");
    else {
      // add story to state array
      const newStories = [...stories, ""]
      
      this.setState(prevState => ({
        ...prevState,
        stories: newStories,
        submitted: true,
      }), () => {
        setTimeout(() => {
          if (this.state.submitted) {
            this.setState(prevState => ({
              ...prevState,
              submitted: false,
            }))
          }
        }, 4000)
      });

      console.log(newStories)
      console.log(newStories.length)

      player.round.set("value", newStories);
      player.round.set("score", newStories.length);

    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("confirmed", "");
    this.props.player.stage.submit();
  };

  countWords = (str) => {
    const result = str.trim().split(/\s+/);
    if (result == "")
      return 0;
    return result.length;
  }

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
    const isActive = (stories.length - 1 == index) ? "active " : "";

    return (
      <textarea
        onChange={this.handleChange}
        value={story}
        key={index}
        className={isActive + "story story" + index}
      >
      </textarea>
    );
  }

  componentDidMount() {
    const { player } = this.props;

    if (player) {
      const currentValue = player.round.get("value");

      if (!currentValue || currentValue.length == 0) {
        this.setState(prevState => ({
          ...prevState,
          stories: [""],
        }));
      }
      else {
        this.setState(prevState => ({
          ...prevState,
          stories: currentValue,
        }));
      }
    }
    
    if (document.querySelector(".story.active")) {
      const newNum = this.countWords(document.querySelector(".story.active").value)
      this.setState(prevState => ({
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
        {
          submitted ? 
          <div className="success">
            <Callout
                icon={IconNames.TICK}
                intent={Intent.SUCCESS}
                title="Success"
              >
                Successfully submitted. Thank you so much. Enjoy writing your next story!
            </Callout>
          </div>
          :
          ""
        }
        <form className="task-response-form" onSubmit={this.handleSubmit}>
          {stories.map((s, i) => this.renderTextarea(s, i))}

          <div>Total {numOfWords} words</div>

          <button ref={this.submitBtnRef} className="hidden" type="submit">Submit</button>
          <button className="green" onClick={this.handleNext}>Submit (Start writing next story)</button>
        </form>
        
      </div>
    );
  }
}
