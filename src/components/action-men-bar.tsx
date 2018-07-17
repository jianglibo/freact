import * as $ from "jquery";
import * as React from "react";
import { SyntheticEvent } from "react";
import ActionMenuBarProps from "../datashape/action-menu-bar-props";
import ActionMenuDescription from "../datashape/action-menu-description";
import { IActionMenuOnClick } from "../datashape/action-menu-description";
import { StrUtil } from "../util/str-util";
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
  private singleSelect = false;

  constructor(props: ActionMenuBarProps) {
    super(props);
    const tbodyCheckboxes = this.props.tableContainer.find(
      "tbody input[type='checkbox']"
    );
    const theadCheckbox = this.props.tableContainer.find(
      "thead input[type='checkbox']"
    );

    this.singleSelect = this.props.tableContainer.hasClass('item-list-single-select');

    if (this.singleSelect) {
      theadCheckbox.prop('disabled', true);
    }

    this.actionBtnClicked = this.actionBtnClicked.bind(this);

    theadCheckbox.change(() => {
      if (theadCheckbox.is(":checked")) {
        tbodyCheckboxes.prop("checked", true);
      } else {
        tbodyCheckboxes.prop("checked", false);
      }
      const ids = this.getSelectedIds();
      this.setState({selectedItems: ids});
    });

    tbodyCheckboxes.change((e) => {
      const tchecked = $(e.target).prop('checked');
      const c = this.props.tableContainer;
      const allNodes = c.find("tbody input[type='checkbox']");
      let ids = this.getSelectedIds();
      if (this.singleSelect) {
        allNodes.prop('checked', false);
        $(e.target).prop('checked', tchecked);
        ids = this.getSelectedIds();
      } else {
        if (allNodes.length === ids.length) {
          theadCheckbox.prop("checked", true);
        } else {
          theadCheckbox.prop("checked", false);
        }
      }
      this.setState({selectedItems: ids});
    });

    const initSelectedItems = this.getSelectedIds();
    this.state = { selectedItems: initSelectedItems, method: "POST" };
    this.af = React.createRef();
  }

  public getSelectedIds(): Array<{ id: string | number }> {
    const c = this.props.tableContainer;
    const checkedNodes = c.find("tbody input[type='checkbox']:checked");
    const ids: Array<{ id: string | number }> = [];
    checkedNodes.each((idx, val) => {
      const idValue = $(val).attr("id");
      if (idValue) {
        ids.push({ id: StrUtil.chopDashPrefix(idValue) });
      }
    });
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
            currentUrl={window.location.href}
          />
        ))}
      </div>
    );
  }

  private confirm(md: ActionMenuDescription): boolean {
    if (md.confirm) {
      let msg = "继续执行？";
      if (typeof md.confirm === 'string') {
        msg = md.confirm;
      }
      return window.confirm(msg);
    }
    return true;
  }

  private doDefault(md: ActionMenuDescription, e: SyntheticEvent): void {
    if (md.actionId === "create") {
      window.location.href = this.props.baseUrl + "/create";
    } else if (md.actionId === 'edit') {
      const items = this.state.selectedItems;
      if (items.length === 1) {
        window.location.href = `${this.props.baseUrl}/${items[0].id}/edit`;
      }
    } else {
      if (this.confirm(md) && this.state.selectedItems.length > 0 && this.af.current != null) {
        this.af.current.submit(md);
      }
    }
  }

  private actionBtnClicked(md: ActionMenuDescription, e: SyntheticEvent) {
    e.preventDefault();

    if (!this.confirm(md)) {return;}

    const oc = md.onClick;
    if (!oc) {
      this.doDefault(md, e);
      return;
    }

    if (isIActionMenuOnClick(oc)) {
      switch (oc.react) {
        case "GET":
          e.preventDefault();
          let url = oc.url;
          if (this.state.selectedItems.length === 1) {
            url = StrUtil.format(oc.url, { id: this.state.selectedItems[0].id });
          }
          window.location.href = url;
          break;
        case 'POST':
        case 'DELETE':
        case 'PUT':
          let dt = oc.data;
          if (typeof dt === 'function') {
            dt = dt.call(this);
          }
          $.ajax(oc.url, { data: dt, method: oc.react })
            .done((data, textStatus, jqXHR) => {
              if (data.redirect) {
                window.location.href = data.redirect;
              } else {
                const st = JSON.stringify(data);
                window.alert(`server return  data: ${st}`);
              }
            }).fail((jqXHR, textStatus, errorThrown) => {
              window.alert(`server return status: ${jqXHR.status}, textStatus: ${textStatus}, errorThrown: ${errorThrown}`);
              // console.log(jqXHR.status);
              // jqXHR.getResponseHeader("location");
              // console.log(textStatus);
            });
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
