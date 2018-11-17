import * as React from "react";
import * as cx from "classnames";
import { BaseTblrInputProps } from "./view.pc";
import { ButtonBarOption } from "../../../../../../../inputs/button-bar/controller";
import {
  EmptySquareIcon,
  BordersIcon
} from "../../../../../../../../icons/view.pc";

export type Props = {
  connected?: boolean;
  selectedId: string;
};

const TOGGLE_OPTIONS: ButtonBarOption[] = [
  {
    icon: <EmptySquareIcon style={{ height: "100%" }} />,
    value: true
  },
  {
    icon: <BordersIcon style={{ height: "100%" }} />,
    value: false
  }
];

type State = {
  connected: boolean;
  selectedId: string;
};

export default (Base: React.ComponentClass<BaseTblrInputProps>) =>
  class TBLRController extends React.PureComponent<Props, State> {
    state = {
      connected: this.props.connected,
      selectedId: this.props.selectedId
    };
    static getDerivedStateFromProps(props: Props, state: State) {
      if (props.selectedId !== state.selectedId) {
        return {
          ...state,
          connected: props.connected,
          selectedId: props.selectedId
        };
      }
      return null;
    }
    onToggleOptionChange = (connected: boolean) => {
      this.setState({ connected });
    };
    render() {
      const { onToggleOptionChange } = this;
      const { connected } = this.state;
      const { ...rest } = this.props;
      return (
        <Base
          {...rest}
          variant={cx({
            connected,
            disconnected: !connected
          })}
          togglerProps={{
            value: connected,
            options: TOGGLE_OPTIONS,
            onChange: onToggleOptionChange
          }}
        />
      );
    }
  };
