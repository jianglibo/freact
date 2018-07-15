import * as React from "react";
import { ActiveWhen } from "../datashape/action-menu-description";
import ActionMenuProps from "../datashape/action-menu-props";
import { StrUtil } from "../util/str-util";
export default class ActionMenu extends React.Component<ActionMenuProps, {}> {

  public urlParametesMap: { [key: string]: string | string[] }

  private actived: boolean;

  constructor(props: ActionMenuProps) {
    super(props);
    this.btnClicked = this.btnClicked.bind(this);
    const idx = props.currentUrl.indexOf('?');
    if (idx === -1) {
      this.urlParametesMap = {};
    } else {
      this.urlParametesMap = StrUtil.parseQueryString(props.currentUrl.substring(idx + 1));
    }
  }

  public render() {
    return (
      <button className={this.calcClass()} onClick={this.btnClicked}>
        {this.props.menuDescription.icon && (
          <i className={this.props.menuDescription.icon} />
        )}
        <a href="#">{this.props.menuDescription.name}</a>
      </button>
    );
  }

  private btnClicked(e: React.SyntheticEvent) {
    if (!this.actived) {
      return;
    }
    this.props.actionBtnClicked(this.props.menuDescription, e);
  }

  private calcClass(): string {
    let cname = "pure-button am-" + this.props.menuDescription.actionId;
    const activeOn = this.props.menuDescription.activeOn;
    const selectedItems = this.props.selectedItems;
    const disabledClass = " pure-button-disabled";
    if (typeof activeOn === 'function') {
      const ab = activeOn.call(this);
      if (!ab) {
        cname += disabledClass;
        this.actived = false;
      } else {
        this.actived = true;
      }
    } else {
      switch (activeOn) {
        case ActiveWhen.SINGLE:
          if (selectedItems.length !== 1) {
            cname += disabledClass;
            this.actived = false;
          } else {
            this.actived = true;
          }
          break;
        case ActiveWhen.NOT_EMPTY:
          if (selectedItems.length < 1) {
            cname += disabledClass;
            this.actived = false;
          } else {
            this.actived = true;
          }
          break;
        case ActiveWhen.ALWAYS:
          this.actived = true;
          break;
        default:
          cname += disabledClass;
          this.actived = false;
          break;
      }
    }
    return cname;
  }

}

/**
 * lifting the states to parent. So I need only props.
 */
