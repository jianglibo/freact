import * as $ from "jquery";
import * as React from "react";
import { SyntheticEvent } from "react";
import ActionMenuBarProps from "../datashape/action-menu-bar-props";
import ActionMenuDescription from "../datashape/action-menu-description";
import { IActionMenuOnClick } from "../datashape/action-menu-description";
import ActionForm from "./action-form";
import ActionMenu from "./action-menu";

function isIActionMenuOnClick(o: any): o is IActionMenuOnClick {
  if (!o) {
    return false;
  }
  return (o as IActionMenuOnClick).react !== undefined;
}

export default class ActionMenuBar extends React.Component<
  ActionMenuBarProps,
  {
    selectedItems: Array<{ id: string | number }>;
    method: "POST" | "PUT" | "DELETE";
  }
> {
  private af: React.RefObject<ActionForm>;

  constructor(props: ActionMenuBarProps) {
    super(props);
    this.state = { selectedItems: [], method: "POST" };
    const tbodyCheckboxes = this.props.tableContainer.find(
      "tbody input[type='checkbox']"
    );
    const theadCheckbox = this.props.tableContainer.find(
      "thead input[type='checkbox']"
    );

    this.actionBtnClicked = this.actionBtnClicked.bind(this);

    theadCheckbox.change(() => {
      if (theadCheckbox.is(":checked")) {
        tbodyCheckboxes.prop("checked", true);
      } else {
        tbodyCheckboxes.prop("checked", false);
      }
      this.getSelectedIds();
    });

    tbodyCheckboxes.change(() => {
      const c = this.props.tableContainer;
      const allNodes = c.find("tbody input[type='checkbox']");
      const ids = this.getSelectedIds();
      if (allNodes.length === ids.length) {
        theadCheckbox.prop("checked", true);
      } else {
        theadCheckbox.prop("checked", false);
      }
    });

    this.af = React.createRef();
  }

  public getSelectedIds(): Array<{ id: string | number }> {
    const c = this.props.tableContainer;
    const checkedNodes = c.find("tbody input[type='checkbox']:checked");
    const ids: Array<{ id: string | number }> = [];
    checkedNodes.each((idx, val) => {
      const id = $(val).attr("id");
      if (!!id) {
        // tslint:disable-next-line:object-literal-shorthand
        ids.push({ id: id });
      }
    });
    this.setState({ selectedItems: ids });
    return ids;
  }

  public render() {
    return (
      <div
        className="pure-button-group button-xsmall action-menu"
        role="group"
        aria-label="..."
      >
        <ActionForm
          baseUrl={this.props.baseUrl}
          method={this.state.method}
          selectedItems={this.state.selectedItems}
          ref={this.af}
        />
        {this.props.menuDescriptions.map(md => (
          <ActionMenu
            baseUrl={this.props.baseUrl}
            menuDescription={md}
            key={md.actionId}
            selectedItems={this.state.selectedItems}
            actionBtnClicked={this.actionBtnClicked}
          />
        ))}
      </div>
    );
  }

  private doDefault(md: ActionMenuDescription, e: SyntheticEvent): void {
    if (md.actionId === "create" || md.actionId === "edit") {
      return;
    } else {
      if (this.af.current != null) {
        e.preventDefault();
        this.af.current.submit(md);
      }
    }
    e.preventDefault();
  }

  private actionBtnClicked(md: ActionMenuDescription, e: SyntheticEvent) {
    const oc = md.onClick;
    if (!oc) {
      this.doDefault(md, e);
      return;
    }

    if (isIActionMenuOnClick(oc)) {
      switch (oc.react) {
        case "GET":
          e.preventDefault();
          window.location.href = oc.url;
          break;
        default:
          break;
      }
    } else if (typeof oc === 'function') {
      const thisoc = oc.bind(this);
      thisoc();
    }
  }
}
