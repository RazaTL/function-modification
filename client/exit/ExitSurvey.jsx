import React from "react";

import { Centered } from "meteor/empirica:core";
import Slider from "meteor/empirica:slider";

import { Callout, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

const Radio = ({ selected, name, value, label, onChange }) => (
  <label>
    <input
      type="radio"
      name={name}
      value={value}
      checked={selected === value}
      onChange={onChange}
    />
    {label}
  </label>
);

export default class ExitSurvey extends React.Component {
  static stepName = "ExitSurvey";
  state = { age: "", gender: "", strength: "", fair: "", feedback: "" };

  handleChange = (event) => {
    const el = event.currentTarget;
    this.setState({ [el.name]: el.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
  };

  render() {
    const { player } = this.props;
    const {
      age,
      gender,
      strength,
      fair,
      feedback,
      education,
      task1,
      task2,
    } = this.state;
    const wasOut = player.exitStepsDone.length >= 2;
    const notSatisfied = player.get("isFinished") == "false";
    const warning = wasOut
      ? "The task ended since you were idle or offline for more than 3 minutes."
      : "You did not satisfy the minimum requirement of writing 1 story per each condition.";

    return (
      <Centered>
        {!wasOut && !notSatisfied ? (
          <div className="exit-survey">
            <h1> Exit Survey (optional) </h1>
            <h3>
              Please submit the following code to receive the payment back on (YOU DO NOT NEED TO DO THIS): <strong>{player._id}</strong>
            </h3>

            <br />
            <p>
              Please answer the following short survey. You do not have to
              provide any information you feel uncomfortable with.
            </p>
            <form onSubmit={this.handleSubmit}>
              <div className="form-line">
                <div>
                  <label htmlFor="task1">
                    <b>The first task was enjoyable.</b>
                  </label>
                  <Radio
                    selected={task1}
                    name="task1"
                    value="5"
                    label="Strongly agree"
                    onChange={this.handleChange}
                  />
                  <Radio
                    selected={task1}
                    name="task1"
                    value="4"
                    label="Somewhat agree"
                    onChange={this.handleChange}
                  />
                  <Radio
                    selected={task1}
                    name="task1"
                    value="3"
                    label="Neutral"
                    onChange={this.handleChange}
                  />
                  <Radio
                    selected={task1}
                    name="task1"
                    value="2"
                    label="Somewhat disagree"
                    onChange={this.handleChange}
                  />
                  <Radio
                    selected={task1}
                    name="task1"
                    value="1"
                    label="Strongly disagree"
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="task2">
                    <b>The second task was enjoyable.</b>
                  </label>
                  <Radio
                    selected={task2}
                    name="task2"
                    value="5"
                    label="Strongly agree"
                    onChange={this.handleChange}
                  />
                  <Radio
                    selected={task2}
                    name="task2"
                    value="4"
                    label="Somewhat agree"
                    onChange={this.handleChange}
                  />
                  <Radio
                    selected={task2}
                    name="task2"
                    value="3"
                    label="Neutral"
                    onChange={this.handleChange}
                  />
                  <Radio
                    selected={task2}
                    name="task2"
                    value="2"
                    label="Somewhat disagree"
                    onChange={this.handleChange}
                  />
                  <Radio
                    selected={task2}
                    name="task2"
                    value="1"
                    label="Strongly disagree"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="form-line">
                <div>
                  <label>
                    <b>Highest Education Qualification</b>
                  </label>
                  <div>
                    <Radio
                      selected={education}
                      name="education"
                      value="high-school"
                      label="High School"
                      onChange={this.handleChange}
                    />
                    <Radio
                      selected={education}
                      name="education"
                      value="bachelor"
                      label="US Bachelor's Degree"
                      onChange={this.handleChange}
                    />
                    <Radio
                      selected={education}
                      name="education"
                      value="master"
                      label="Master's or higher"
                      onChange={this.handleChange}
                    />
                    <Radio
                      selected={education}
                      name="education"
                      value="other"
                      label="Other"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="age">
                    <b>Age</b>
                  </label>
                  <div>
                    <input
                      id="age"
                      type="number"
                      min="0"
                      max="150"
                      step="1"
                      dir="auto"
                      name="age"
                      value={age}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="gender">
                    <b>Gender</b>
                  </label>
                  <div>
                    <input
                      id="gender"
                      type="text"
                      dir="auto"
                      name="gender"
                      value={gender}
                      onChange={this.handleChange}
                      autoComplete="off"
                    />
                  </div>
                </div>
              </div>

              <div className="form-line thirds">
                <div>
                  <label htmlFor="strength">
                    <b>
                    Did you find the commentary in the functions (whenever there was one) useful?
                    </b>
                  </label>
                  <div>
                    <textarea
                      dir="auto"
                      id="strength"
                      name="strength"
                      value={strength}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="feedback">
                    <b>Any problems you encountered or things that would help us make the instructions and website more clear?</b>
                  </label>
                  <div>
                    <textarea
                      dir="auto"
                      id="feedback"
                      name="feedback"
                      value={feedback}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="fair">
                    <b>Any Other Comments</b>
                  </label>
                  <div>
                    <textarea
                      dir="auto"
                      id="fair"
                      name="fair"
                      value={fair}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>

              <button type="submit">Submit</button>
            </form>
          </div>
        ) : (
          <Callout
            icon={IconNames.ERROR}
            intent={Intent.DANGER}
            title="Warning"
          >
            {warning} Please email us at{" "}
            <a href="mailto:jyo3on@gmail.com">jyo3on@gmail.com</a> if you had
            any technical issues.
          </Callout>
        )}
      </Centered>
    );
  }
}
