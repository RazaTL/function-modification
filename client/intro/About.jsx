import React from "react";
import InstructionText from "./InstructionText";

export default class About extends React.Component {
  
  render() {
    console.log(this.props);
    return <div>
      <InstructionText {...this.props}/>
    </div>;
  }
}
