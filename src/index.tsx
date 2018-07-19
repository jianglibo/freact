import * as jQuery from "jquery";
import * as React from "react";
import * as ReactDOM from "react-dom";
import ActionMenuBar from "./components/action-menu-bar";
import QuartzExpressionUi from './components/quartz-expression-ui';
import ActionMenuDescription from './datashape/action-menu-description';
import "./index.css";
// import registerServiceWorker from "./registerServiceWorker";

// import { jQuery } from "jquery";
import Rselect from "./components/rselect";
import { formUtil } from './util/form-util';
import { pureCombo } from './util/pure-combo';
import { StrUtil } from "./util/str-util";
(window as any).showHello = "showHello";
(window as any).jQuery = jQuery;
// window.alert((window as any)['abc']);
// showHello("greeting", "TypeScript");
// const e = document.getElementById("root");

// const mds = [
//   new ActionMenuDescription("create"),
//   new ActionMenuDescription("edit"),
//   new ActionMenuDescription("delete")
// ];

// ReactDOM.render(
//   <ActionMenuBar
//     menuDescriptions={mds}
//     baseUrl="/app/servers"
//     tableContainer={jQuery(".item-list")}
//   />,
//   document.getElementById("action-menu-bar")
// );

// Union type. type guard.
// const x: string|number = 1;

(window as any).freact = {};

(window as any).freact.pureCombo = pureCombo;

(window as any).freact.strUtil = StrUtil;
(window as any).freact.formUtil = formUtil;


(window as any).freact.renderQuartzExpression = () => {
  ReactDOM.render(<QuartzExpressionUi/>,
    document.getElementById("quartz-expression"));
};

(window as any).freact.renderActionMenuBar = (baseUrl: string, tableContainerCss: string, mds: Array<ActionMenuDescription | string>) => {
  const mdobs = mds.map(md => {
    if (typeof md === "string") {
      return new ActionMenuDescription(md);
    } else {
      return md;
    }
  });
  ReactDOM.render(
    <ActionMenuBar
      menuDescriptions={mdobs}
      baseUrl={baseUrl}
      tableContainer={jQuery(tableContainerCss)}
    />,
    document.getElementById("action-menu-bar")
  );
};

(window as any).freact.renderRselect = (wrapperDomId: string) => {
  ReactDOM.render(
    <Rselect/>,
    document.getElementById(wrapperDomId)
  );
};


// registerServiceWorker();
