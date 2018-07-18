export enum ActiveWhen {
  ALWAYS = "ALWAYS",
  SINGLE = "SINGLE",
  NOT_EMPTY = "NOT_EMPTY"
}

export interface IActionMenuOnClick {
  react: 'GET' | 'POST' | 'DELETE' | 'PUT'
  url: string | (() => {})
  data?: {[key: string]: any} | (() => {[key: string]: string}),
  settings?: {[key: string]: any},
  done?: ((data: any, textStatus: JQuery.Ajax.ErrorTextStatus, jqXHR: JQuery.jqXHR<any>) => {}),
  fail?: ((jqXHR: JQuery.jqXHR<any>, textStatus: JQuery.Ajax.ErrorTextStatus, errorThrown: string) => {}),

}

export default class ActionMenuDescription {
  constructor(
    public actionId: string,
    public name?: string,
    public onClick?: (() => void) | IActionMenuOnClick,
    public icon?: string,
    public activeOn?: (() => boolean) | ActiveWhen,
    public confirm?: boolean | string
  ) {
    switch (actionId) {
      case "edit":
        this.name = name === undefined ? "编辑" : name;
        this.icon = icon === undefined ? "fas fa-edit" : icon;
        this.activeOn = this.activeOn ? this.activeOn : ActiveWhen.SINGLE;
        break;
      case "create":
        this.name = name === undefined ? "新建" : name;
        this.icon = icon === undefined ? "far fa-plus-square" : icon;
        this.activeOn = this.activeOn ? this.activeOn : ActiveWhen.ALWAYS;
        break;
      case "delete":
        this.name = name === undefined ? "删除" : name;
        this.icon = icon === undefined ? "fas fa-trash" : icon;
        this.activeOn = this.activeOn ? this.activeOn : ActiveWhen.NOT_EMPTY;
        this.confirm = confirm === undefined ? "确认删除？" : confirm;
        break;
      default:
        break;
    }
  }
}
