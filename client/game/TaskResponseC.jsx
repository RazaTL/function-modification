import React from "react";

export default class TaskResponseC extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numOfWords: 0,
      selected: 0,
      confirmed: localStorage.getItem("confirmed") || false,
    };
  }

  handleSelect = (id) => {
    if (id >= 0) {
        this.setState(prevState => ({
            ...prevState,
            selected: id,
        }));
    }
    
  }

  handleSkip = () => {
      const { selected } = this.state;
      const { round } = this.props;
      const drafts = round.data.drafts;
      let newSelected = selected + 1;

      if (selected >= 0 && selected < drafts.length - 1) {
        this.setState(prevState => ({
            ...prevState,
            selected: newSelected,
        }));
      }
      else {
        this.setState(prevState => ({
            ...prevState,
            selected: 0,
        }));
      }
  }

  handleConfirm = () => {
    const { selected, confirmed } = this.state;
    const { round, player } = this.props;
    const drafts = round.data.drafts;

    if (selected >= 0) {
        this.setState(prevState => ({
            ...prevState,
            confirmed: !confirmed,
        }));

        player.round.set("value", drafts[selected].content);
        localStorage.setItem("confirmed", true);
    }
    
  }

  handleBack = () => {
    const { confirmed } = this.state;

    this.setState(prevState => ({
        ...prevState,
        confirmed: !confirmed,
    }));

    localStorage.setItem("confirmed", "");
    
  }

  handleChange = (event) => {
    const { player } = this.props;
    const value = event.target.value

    const newNum = this.countWords(value);

    this.setState(prevState => ({
        ...prevState,
        numOfWords: newNum,
    }));

    player.round.set("value", value);
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const {numOfWords} = this.state;
    
    if (numOfWords < 200)
      alert("The story is less than 200 words.");
    else {
      localStorage.setItem("confirmed", "");
      this.props.player.stage.submit();
    }
  };

  countWords = (str) => {
    const result = str.trim().split(/\s+/)
    if (result == "")
      return 0;
    return result.length;
  }

  renderDraft = (draft) => {
    const { selected } = this.state;

    let classes = "draft";
    if (selected == draft.id)  
        classes = "draft selected";
    
    return (
        <div className={classes} key={draft.id}>
            <b>Draft {draft.id + 1}</b> &nbsp;
            {draft.content.substring(0,100)}...<br/>
            {selected == draft.id ? "" : <button className="btn" onClick={() => this.handleSelect(draft.id)}>View this draft</button>}
        </div>
    )
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
    if (document.querySelector("textarea")) {
        const newNum = this.countWords(document.querySelector("textarea").value)
        this.setState(prevState => ({
            ...prevState,
            numOfWords: newNum,
        }));
    }
  }

  render() {
    const { player, round } = this.props;
    const { numOfWords, selected, confirmed } = this.state;
    const drafts = round.data.drafts;

    // If the player already submitted, don't show the slider or submit button
    if (player.stage.submitted) {
      return this.renderSubmitted();
    }

    return (
      <div className="task-response">
        {confirmed ? 
            <form className="task-response-form" onSubmit={this.handleSubmit}>
                {this.renderTextarea()}
                <div>Total {numOfWords} words</div>
                <button className="green" type="submit">Submit</button>
                <button className="orange" onClick={this.handleBack}>Go back to choose a different draft</button>
            </form>
            :
            <div className="task-response-form">
                <div className="selected-draft">
                    {drafts[selected].content}
                </div>
                <button className="green" onClick={this.handleConfirm}>Use this draft</button>
                <button className="orange" onClick={this.handleSkip}>Skip this draft</button>
            </div>
        }

        <div className={confirmed ? "archive confirmed" : "archive"}>
            <h4>All drafts</h4>
            {drafts.map(this.renderDraft)}
        </div>
        
      </div>
    );
  }
}
