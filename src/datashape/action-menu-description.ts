export enum ActiveWhen {
  ALWAYS,
  SINGLE,
  NOT_EMPTY
}

export default class ActionMenuDescription {
  constructor(
    public actionId: string,
    public name?: string,
    public onClick?: () => void | null,
    public icon?: string,
    public activeOn?: ActiveWhen
  ) {
    switch (actionId) {
      case "edit":
        this.name = name === undefined ? "编辑" : name;
        this.icon = icon === undefined ? "fas fa-edit" : icon;
        this.activeOn = ActiveWhen.SINGLE;
        break;
      case "create":
        this.name = name === undefined ? "新建" : name;
        this.icon = icon === undefined ? "far fa-plus-square" : icon;
        this.activeOn = ActiveWhen.ALWAYS;
        break;
      case "delete":
        this.name = name === undefined ? "删除" : name;
        this.icon = icon === undefined ? "fas fa-trash" : icon;
        this.activeOn = ActiveWhen.NOT_EMPTY;
        break;
      default:
        break;
    }
  }
}
