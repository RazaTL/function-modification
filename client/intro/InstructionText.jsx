import React from "react";

export default class InstructionText extends React.Component {


  render() {
    const { game } = this.props;

    const text1 = (!game || game.treatment.order == 0) ? (
      <span>
        <b>In round 1, you will write a short love story from scratch, in 30 minutes (required).</b><br/>
        - After writing 1 story, if time is left, you can write more stories if you want to get paid more (optional).<br/>
        <br/>
        <b>In round 2, you will write a short love story by editing one of the drafts provided, in 15 minutes (required).</b><br/>
        - After writing 1 story, if time is left, you can write more stories if you want to get paid more (optional).<br/>
      </span>
    ): (
      <span>
        <b>In round 1, you will write a short love story by editing one of the drafts provided, in 15 minutes (required).</b><br/>
        - After writing 1 story, if time is left, you can write more stories if you want to get paid more (optional).<br/>
        <br/>
        <b>In round 2, you will write a short love story from scratch, in 30 minutes (required).</b><br/>
        - After writing 1 story, if time is left, you can write more stories if you want to get paid more (optional).<br/>
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
            After completing the two rounds, you will get a code. If you submit this code back at Mechanical Turk, you're done!
          </p>

          <h3>Payment</h3>
          <p className="instruction-text">
            <b>Base payment: $1 for participation</b><br/>
            - Requirement: writing a minimum of 1 story in each of two rounds.<br/>
            &nbsp; &nbsp; - Length: at least 200 words <br/>
            <br/>
            <b>Bonus payment for quality: $3 per story</b><br/>
            - Requirement: writing a story that satisfies our quality criterion.<br/>
            &nbsp; &nbsp; - Please refer to the examples below.<br/>
            <br/>
            ex) Payment for writing 1 unacceptable story in round 1 and 3 acceptable stories in round 2 = 1 + 3 * 3 = $10<br/>
            ex) Payment for writing 2 acceptable stories in round 1 only = $0<br/>
            ex) Payment for writing 1 unacceptable story in A and 1 unacceptable story in B = 1 = $1<br/>
          </p>

          <h3>Examples</h3>
          <div className="instruction-text examples">
            <div className="good example">
              <div className="label">Example of a high quality story</div>
              Iaculis, habitant facilisis nullam ultricies dui eget suspendisse ipsum urna hymenaeos sociis pellentesque vitae. Massa leo iaculis facilisi eleifend. Elit auctor nostra, mus eu. Et magnis magna augue tristique urna tortor sagittis litora imperdiet et feugiat tempus leo placerat vel dui ante egestas commodo luctus feugiat, placerat taciti curae; turpis Tincidunt orci. Senectus justo hymenaeos lacus hendrerit est penatibus hymenaeos at dictumst suspendisse sociis commodo varius pretium pretium venenatis et curae;. Lobortis interdum, sociosqu praesent cras purus mollis auctor ornare inceptos elit nunc, litora ante. Rutrum nonummy. Erat est ad. Dis. Fusce phasellus lacinia donec, vivamus dis urna nam lectus. Fames porta massa dolor fusce ultricies, proin, eget augue mollis tortor, vivamus senectus nec natoque proin risus etiam turpis curae; mi quis senectus proin condimentum lectus primis curabitur curabitur sed phasellus porttitor varius. Pharetra, pede penatibus sed senectus cursus tempor commodo laoreet per vulputate blandit nisl. Ultrices. Nostra aptent justo faucibus inceptos parturient augue quam pede pretium ac ac quam vel. Bibendum scelerisque magnis quam a dui sagittis ut eleifend mattis egestas nullam. Faucibus ut arcu netus aliquam mollis venenatis sit dictumst, fames imperdiet sociis tristique dis. Sodales vel neque phasellus ridiculus. Odio taciti mattis nisi ornare conubia ipsum aliquet.
            </div>
            <div className="bad example">
            <div className="label">Example of a story that will NOT be paid</div>
              Iaculis, habitant facilisis nullam ultricies dui eget suspendisse ipsum urna hymenaeos sociis pellentesque vitae. Massa leo iaculis facilisi eleifend. Elit auctor nostra, mus eu. Et magnis magna augue tristique urna tortor sagittis litora imperdiet et feugiat tempus leo placerat vel dui ante egestas commodo luctus feugiat, placerat taciti curae; turpis Tincidunt orci. Senectus justo hymenaeos lacus hendrerit est penatibus hymenaeos at dictumst suspendisse sociis commodo varius pretium pretium venenatis et curae;. Lobortis interdum, sociosqu praesent cras purus mollis auctor ornare inceptos elit nunc, litora ante. Rutrum nonummy. Erat est ad. Dis. Fusce phasellus lacinia donec, vivamus dis urna nam lectus. Fames porta massa dolor fusce ultricies, proin, eget augue mollis tortor, vivamus senectus nec natoque proin risus etiam turpis curae; mi quis senectus proin condimentum lectus primis curabitur curabitur sed phasellus porttitor varius. Pharetra, pede penatibus sed senectus cursus tempor commodo laoreet per vulputate blandit nisl. Ultrices. Nostra aptent justo faucibus inceptos parturient augue quam pede pretium ac ac quam vel. Bibendum scelerisque magnis quam a dui sagittis ut eleifend mattis egestas nullam. Faucibus ut arcu netus aliquam mollis venenatis sit dictumst, fames imperdiet sociis tristique dis. Sodales vel neque phasellus ridiculus. Odio taciti mattis nisi ornare conubia ipsum aliquet.
            </div>
          </div>
        </div>
    );
  }
}
