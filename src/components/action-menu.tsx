import * as React from "react";
import { ActiveWhen } from "../datashape/action-menu-description";
import ActionMenuProps from "../datashape/action-menu-props";

export default class ActionMenu extends React.Component<ActionMenuProps, {}> {
  constructor(props: ActionMenuProps) {
    super(props);
  }

  public render() {
    return (
      <button className={this.calcClass()}>
        {this.props.menuDescription.icon && (
          <i className={this.props.menuDescription.icon} />
        )}
        <a href={this.calcHref()}>{this.props.menuDescription.name}</a>
      </button>
    );
  }

  private calcClass(): string {
    let cname = "pure-button am-" + this.props.menuDescription.actionId;
    const activeOn = this.props.menuDescription.activeOn;
    const selectedItems = this.props.selectedItems;
    const disabledClass = " pure-button-disabled";
    switch (activeOn) {
      case ActiveWhen.SINGLE:
        if (selectedItems.length !== 1) {
          cname += disabledClass;
        }
        break;
      case ActiveWhen.NOT_EMPTY:
        if (selectedItems.length < 1) {
          cname += disabledClass;
        }
        break;
      default:
        break;
    }
    return cname;
  }

  private calcHref(): string {
    let href = "#";
    const md = this.props.menuDescription;
    const items = this.props.selectedItems;
    switch (md.actionId) {
      case "create":
        href = this.props.baseUrl + "/create";
        break;
      case "edit":
        if (items.length === 1) {
          href = this.props.baseUrl + "/" + items[0].id + "/edit/";
        }
      default:
        break;
    }
    return href;
  }
}

/**
 * lifting the states to parent. So I need only props.
 */
