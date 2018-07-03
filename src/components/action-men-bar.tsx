import * as $ from "jquery";
import * as React from "react";
import ActionMenuBarProps from "../datashape/action-menu-bar-props";
import ActionMenu from "./action-menu";

export default class ActionMenuBar extends React.Component<
  ActionMenuBarProps,
  {  selectedItems: Array<{id: string|number}> }
> {
  constructor(props: ActionMenuBarProps) {
    super(props);
    this.state = { selectedItems: [] };
    const tbodyCheckboxes = this.props.tableContainer.find("tbody input[type='checkbox']");
    const theadCheckbox = this.props.tableContainer.find("thead input[type='checkbox']");

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
            theadCheckbox.prop('checked', true);
        } else {
            theadCheckbox.prop('checked', false);
        }
    });
  }

  public getSelectedIds(): Array<{id: string|number}> {
    const c = this.props.tableContainer;
    const checkedNodes = c.find("tbody input[type='checkbox']:checked");
    const ids: Array<{ id: string|number }> = [];
    checkedNodes.each((idx, val) => {
        const id = $(val).attr("id");
        if (!!id) {
          // tslint:disable-next-line:object-literal-shorthand
          ids.push({id: id});
        }
    });
    this.setState({selectedItems: ids});
    return ids;
  }

  public render() {
    return (
      <div
        className="pure-button-group button-xsmall action-menu"
        role="group"
        aria-label="..."
      >
        {this.props.menuDescriptions.map(md => (
          <ActionMenu
            baseUrl={this.props.baseUrl}
            menuDescription={md}
            key={md.actionId}
            selectedItems={this.state.selectedItems}
          />
        ))}
      </div>
    );
  }
}
