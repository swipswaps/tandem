/*

TODOS:

- [ ] display expressions within each open file

*/

import "./index.scss";
import * as React from "react";
import { PaneComponent } from "front-end/components/pane";

const BaseOpenFilesPaneComponent = () => <PaneComponent header="Open Files" className="m-open-files-pane">
  Open Files
</PaneComponent>;

export const OpenFilesPaneComponent = BaseOpenFilesPaneComponent;
