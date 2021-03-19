import React from "react";

export default class TaskResponse extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numOfWords: 0
    };
  }

  handleChange = event => {
    const { player, isAfirst } = this.props;
    const value = event.target.value
    
    console.log(event.target.value)
    
    const newNum = this.countWords(value);

    this.setState({
      numOfWords: newNum
    });

    player.round.set("value", value);
  };

  handleSubmit = event => {
    event.preventDefault();

    const {numOfWords} = this.state;
    
    if (numOfWords < 200)
      alert("The story is less than 200 words.");
    else
      this.props.player.stage.submit();
  };

  countWords = (str) => {
    const result = str.trim().split(/\s+/)
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

  renderTextarea() {
    const { player } = this.props;
    const value = player.round.get("value");
    return (
      <textarea
        onChange={this.handleChange}
        value={value}
      >
      </textarea>
    );
  }

  componentDidMount() {
    const newNum = this.countWords(document.querySelector("textarea").value)
    this.setState({
      numOfWords: newNum
    });
  }

  render() {
    const { player } = this.props;
    const { numOfWords } = this.state;

    // If the player already submitted, don't show the slider or submit button
    if (player.stage.submitted) {
      return this.renderSubmitted();
    }

    return (
      <div className="task-response">
        <form className="task-response-form" onSubmit={this.handleSubmit}>
          {this.renderTextarea()}

          <div>Total {numOfWords} words</div>

          <button type="submit">Submit</button>
        </form>
        
      </div>
    );
  }
}
