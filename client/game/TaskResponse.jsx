import React from "react";

import { Callout, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { remainingSeconds } from "./Timer";

var a = ["https://pastebin.com/s3RFXSzh", "https://pastebin.com/dhSTrpLu"];
var b = ["https://pastebin.com/yybmKCeD", "https://pastebin.com/cWGK68hS"];
var c = ["https://pastebin.com/tKT1uwCJ", "https://pastebin.com/yhmhhdA0"];
var d = ["https://pastebin.com/jZbCwN8q","https://pastebin.com/gtrjw2ux"];
var e = ["https://pastebin.com/DBkKGAKK", "https://pastebin.com/S9JHfq4W"];
var f = ["https://pastebin.com/CX7UMGQR", "https://pastebin.com/qGM0KrJa"];
var g = ["https://pastebin.com/Ua99QdAM", "https://pastebin.com/ZnRWzia3"];
var h = ["https://pastebin.com/w0Ld5GE9", "https://pastebin.com/TvVdFfsV"];

var desc = ["At a certain party there were two teams represented by 0 and 1 sitting in a long table. The organizer wanted to encourage integration and defined that a sitting arrangement was “sad” if there were 7 players or more within a single team sitting next to each other: 00101101111111010 was sad, while 101010111001111100 was not. So he was writing a function to evaluate whether an arrangement was sad or not. But he couldn’t finish it. Help him edit this function to print “YES” if the situation is sad and NO otherwise.", "Once upon a time a programmer wanted to write a function to compare two strings lexicographically ignoring the letter’s case (whether it was uppercase or lowercase) so that it printed -1 if the first string was less, “1” if the second was less than the first one, and “equal” if the strings are equal. Help her by modifying the code below to achieve this functionality.", "Task: A customer shopping in a store decides he never wants to leave again. Modify the class below so that the customer will always be able to add items to his cart. If adding an item to the cart will make the total value of the cart exceed a customer’s budget, then remove the most expensive item from that cart before adding the new item.", "There are n rocks in a row which can be of three different types represented by a character. John wants figure out the minimum number of rocks needed to be removed so that any two neighboring rocks have different types. Help him edit this function to print the number of rocks that need to be removed from a given row.", "Andres types the word s. It is considered that it successfully said hello if several letters can be deleted so that it results in “hello” so that “ahhellloou” is good but ‘hlelooo’ isn’t. Help him edit this function to print “YES” if Andres managed to say hello and otherwise print “NO”.", "Given a string consisting of upper and lowercase letters we would like to: delete all the vowels (A,O,Y,E,U,I), insert a character “.” before consonants, and replace uppercase consonants with corresponding lowercase ones. Help by modifying the code below to achieve this functionality.", "Modify the code below so that when the user tries to get the price of the item the price will change under the following condition: if the price can be reduced, it should be reduced before it is returned to the user.", "Modify the class below so that the addStudent method will only add a student if the average class GPA is equal to the range of the class's GPA's!"]

var links = {
  1: [a[1], b[0], c[1], d[0], e[1], f[0], g[1], h[0]],
  2: [a[0], b[1], c[0], d[1], e[0], f[1], g[0], h[1]],
  3: [h[0], g[1], f[0], e[1], d[0], c[1], b[0], a[1]],
  4: [h[1], g[0], f[1], e[0], d[1], c[0], b[1], a[0]]
};

var tasks = {
  1: [desc[0], desc[1], desc[2], desc[3], desc[4], desc[5], desc[6], desc[7]],
  2: [desc[0], desc[1], desc[2], desc[3], desc[4], desc[5], desc[6], desc[7]],
  3: [desc[7], desc[6], desc[5], desc[4], desc[3], desc[2], desc[1], desc[0]],
  4: [desc[7], desc[6], desc[5], desc[4], desc[3], desc[2], desc[1], desc[0]]
};

var p_index = 1;

var count = 0;


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
    
    console.log(remainingSeconds);

    if (window.confirm("Are you sure?")){

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
    //player.round.set("scores", newStories.length);

    //count += 1;
    localStorage.setItem("confirmed", "");
    this.props.player.stage.submit();

    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (window.confirm("Are you sure?")){
    
    localStorage.setItem("confirmed", "");
    this.props.player.stage.submit();
    }

    //console.log(this.remainingSeconds);
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
    const { game } = this.props;
    const { round } = this.props;

    p_index = game.treatment.order - 1;
    count = round.index;

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
    const { round } = this.props;

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
          <div>
            <p>
              <td>{tasks[p_index][count]}</td>
            </p>
          </div>
          <div className="selected-draft">
            <p>
            <a href={links[p_index][count]} target="_blank" rel="noopener noreferrer">Click here to view the code for the task.</a>
            </p>
          </div>
        </div>
        <form className="task-response-form" onSubmit={this.handleNext}>
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
            Submit
          </button>

        </form>
      </div>
    );
  }
}
