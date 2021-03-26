import React from "react";

export default class InstructionText extends React.Component {


  render() {
    const { game } = this.props;

    const text1 = (!game || game.treatment.order == 0) ? (
      <span>
        <b>In round 1, you will write as many short love stories from scratch, for 15 minutes (required).</b><br/>
        <b>In round 2, you will write as many short love stories by editing one of the drafts provided, for 15 minutes (required).</b><br/>
        <br/>
      </span>
    ): (
      <span>
        <b>In round 2, you will write as many short love stories by editing one of the drafts provided, for 15 minutes (required).</b><br/>
        <b>In round 1, you will write as many short love stories from scratch, for 15 minutes (required).</b><br/>
        <br/>
      </span>
    );

    return (
        <div>
          <h1>Instructions</h1>

          <h3>Task</h3>
          <p className="instruction-text">
            Your task is to write a minimum of 1 short love story (at least 200 words) in each of two rounds.<br/>
            <br/>
            {text1}
            If you are idle or offline for more than 2 minutes, the task will be suspended and you will NOT get any reward.<br/>
            After completing the two rounds, you will get a code. If you submit this code back at Mechanical Turk, you're done!
          </p>

          <h3>Payment</h3>
          <p className="instruction-text">
            <b>Base payment: $4 for participation</b><br/>
            - Requirement: writing a minimum of 1 story in each of two rounds that meets our minimum quality criteria.<br/>
            &nbsp; &nbsp; - Length: at least 200 words <br/>
            <br/>
            <b>Bonus payment: $1 per additional story or high-quality story</b><br/>
            - Case 1: writing a story that satisfies our high quality criteria.<br/>
            - Case 2: writing a story in addition to the minimum of 1 story in each round.<br/>
            &nbsp; &nbsp; - Please refer to the examples below.<br/>
            <br/>
            ex) Payment for writing 1 high-quality story in round 1 and 1 acceptable stories in round 2 = 4 + 1 * 1 = $5<br/>
            ex) Payment for writing 2 acceptable stories in round 1 only = $0<br/>
            ex) Payment for writing 1 unacceptable story in round 1 and 1 unacceptable story in round 2 = $0<br/>
            ex) Payment for writing 4 acceptable stories in round 1 and 4 acceptable stories in round 2 = 4 + 6 * 1 = $10<br/>
          </p>

          <h3>Examples</h3>
          <div className="instruction-text examples">
            <div className="good example">
              <div className="label">Example of a high-quality story</div>
              Lily was bored. It was Friday night and she had to be at the dance hall in half an hour, but she didn't want to go. She was tired of dancing every night and she didn't like the boys who were always asking her out. Max was there, though, and he always asked her to dance, so Lily decided to stay a little while longer. She liked Max. He was the only one who ever had a conversation with her, and she thought he might ask her out if she stayed long enough.<br/><br/>

              "Let's go for a walk," Max suggested as he came up to Lily. "It's hot in here."<br/><br/>

              "All right," Lily said gladly. "But I have to be back by ten."<br/><br/>

              They walked up and down the avenue, talking comfortably about everything and anything, until finally they found themselves looking at each other with amused grins on their faces.<br/><br/>

              "We've been through this before," Max said, indicating all that they had talked about on their walk up the avenue; then he added: "But isn't it funny how you can enjoy talking about yourself?"<br/><br/>

              "Yes," Lily admitted; "it is funny." Then she asked him: "What makes you think you know so much about me?"<br/><br/>

              Max laughed at her question: "What makes you think I know so much about myself?" he countered; but his question was not answered because suddenly they realized that they were in love and that everything else had been just talk before that moment when they stood looking at each other in the bright light of a street lamp on Friday night at eleven-thirty when everyone else was dancing and having fun but them...<br/><br/>

            </div>
            <div className="bad example">
            <div className="label">Example of a story that will NOT be paid</div>
              <b>Pasting the same phrases or sentences</b>:
              Lily and Max met each other in a party. Then they talked and laughed and talked and laughed and talked and laughed and talked and laughed together.<br/><br/>

              <b>Copying a famous story</b>:
              It was 12 o'clock when Cinderella met the prince. He was tall, handsome man with a brown hair.<br/><br/>

              <b>Not making sense at all</b>:
              Lily met Max on Friday. Ten years later, they married. Then they divorced, and Lily fell in love with Eric.<br/><br/>

              <b>Not in english</b>:
              Iaculis, habitant facilisis nullam<br/><br/>

            </div>
          </div>
        </div>
    );
  }
}
