import * as jQuery from "jquery";
import * as React from "react";
import * as ReactDOM from "react-dom";
import ActionMenuBar from "./components/action-menu-bar";
import QuartzExpressionUi from "./components/quartz-expression-ui";
import ActionMenuDescription from "./datashape/action-menu-description";
import "./index.css";
// import registerServiceWorker from "./registerServiceWorker";

// import { jQuery } from "jquery";
import { Option } from "react-select";
import BsCard from './components/bs-card';
import BsConfirm from "./components/bs-confirm";
import BsModal from "./components/bs-modal";
import RselectMultiStatic from "./components/rselect-multi-static";
import { formUtil } from "./util/form-util";
import { pureCombo } from "./util/pure-combo";
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

(window as any).freact.unmountComponentAtNode = (container: string | Element) => {
  let ele: Element | null;
  if (typeof container === 'string') {
    if (container.startsWith('#')) {
      container = container.substring(1);
    }
    ele = document.getElementById(container);
  } else {
    ele = container;
  }
  if (ele) {
    ReactDOM.unmountComponentAtNode(ele);
  }
}

(window as any).freact.showCard = (
    container: string,
    title: string,
    subTitle: string,
    content: string,
    staySeconds: number,
    links: Array<{label: string, onClick: () => void}>,
    styles: {[key: string]: string}
) => {
  ReactDOM.render(
    <BsCard
     container={container}
     title={title}
     subTitle={subTitle}
     content={content}
     staySeconds={staySeconds}
     links={links}
     styles={styles}
    />,
    document.getElementById(container)
  );
}

(window as any).freact.showModal = (
  wrapperDomId: string,
  title: string,
  content: string,
  ttl?: number,
  size?: "modal-lg" | "modal-sm",
  closeLabel?: string
) => {
  ReactDOM.render(
    <BsModal 
    container={wrapperDomId}
    title={title}
    content={content}
    size={size}
    ttl={ttl}
    closeLabel={closeLabel}/>,
    document.getElementById(wrapperDomId)
  );
}


(window as any).freact.confirm = (
  wrapperDomId: string,
  title: string,
  content: string,
  callback: (yes: boolean) => void,
  cancelLabel?: string,
  confirmLabel?: string
) => {
  ReactDOM.render(
    <BsConfirm 
    container={wrapperDomId}
    title={title}
    content={content}
    callback={callback}
    cancelLabel={cancelLabel}
    confirmLabel={confirmLabel} />,
    document.getElementById(wrapperDomId)
  );
}

(window as any).freact.renderQuartzExpression = () => {
  ReactDOM.render(
    <QuartzExpressionUi />,
    document.getElementById("quartz-expression")
  );
};

(window as any).freact.renderActionMenuBar = (
  baseUrl: string,
  tableContainerCss: string,
  mds: Array<ActionMenuDescription | string>
) => {
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

(window as any).freact.renderRselect = (
  wrapperDomId: string,
  fieldName: string,
  options: Array<Option<string | number>>,
  joinValues?: boolean,
  initSelected?: Array<string | number | undefined>
) => {
  ReactDOM.render(
    <RselectMultiStatic staticOptions={options} fieldName={fieldName} joinValues={true} initSelected={initSelected} />,
    document.getElementById(wrapperDomId)
  );
};

// registerServiceWorker();
