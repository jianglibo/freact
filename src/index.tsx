import * as jQuery from "jquery";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ActionMenuBar from './components/action-men-bar';
import ActionMenuDescription from './datashape/action-menu-description';
import './index.css';
import registerServiceWorker from './registerServiceWorker';



// import { jQuery } from "jquery";
(window as any).showHello = "showHello";
(window as any).jQuery = jQuery;
// window.alert((window as any)['abc']);
// showHello("greeting", "TypeScript");
// const e = document.getElementById("root");

const mds = [new ActionMenuDescription("create"), new ActionMenuDescription("edit"),  new ActionMenuDescription("delete")];

ReactDOM.render(
  <ActionMenuBar menuDescriptions={mds} baseUrl="/app/servers" tableContainer={jQuery(".item-list")}/>,
  document.getElementById('action-menu-bar')
);

// Union type. type guard.
// const x: string|number = 1;

registerServiceWorker();
