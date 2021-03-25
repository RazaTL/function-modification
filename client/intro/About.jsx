import React from "react";
import InstructionText from "./InstructionText";
import {
  Button,
  Classes,
  Dialog,
  Intent,
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

export default class About extends React.Component {
  state = { isAboutOpen: false };

  handleToggleAbout = () =>
    this.setState({ isAboutOpen: !this.state.isAboutOpen });
  
  render() {
    console.log(this.props);
    return <>
            <Button
              text="Instruction"
              minimal
              icon={IconNames.info_sign}
              onClick={this.handleToggleAbout}
            />

            <Dialog
              icon={IconNames.INBOX}
              isOpen={this.state.isAboutOpen}
              onClose={this.handleToggleAbout}
              title="Instruction"
            >
              <div className={Classes.DIALOG_BODY}>
                <InstructionText {...this.props}/>
              </div>

              <div className={Classes.DIALOG_FOOTER}>
                <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                  <Button
                    text="Close"
                    intent={Intent.PRIMARY}
                    onClick={this.handleToggleAbout}
                  />
                </div>
              </div>
            </Dialog>
          </>;
  }
}
