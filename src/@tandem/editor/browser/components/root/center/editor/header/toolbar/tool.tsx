import * as cx from "classnames";
import * as React from "react";
import { Workspace } from "@tandem/editor/browser/models";
import { SetToolAction } from "@tandem/editor/browser/actions";
import { WorkspaceToolFactoryProvider } from "@tandem/editor/browser/providers";

class ToolComponent extends React.Component<{ app: any, workspace: Workspace, toolProvider: WorkspaceToolFactoryProvider }, any> {


  render() {
    const dep = this.props.toolProvider;

    const className = cx({
      selected: false,
      [`m-preview-tool s s-${this.props.toolProvider.icon}`]: true,
    });

    return (
      <li
        className={className}
        tabIndex={-1}
        title={`${dep.id} (${dep.keyCommand})`}
      >

      </li>
    );
  }
}

export default ToolComponent;
