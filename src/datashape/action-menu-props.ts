import ActionMenuDescription from "./action-menu-description";

export default class ActionMenuProps {
  constructor(
    public baseUrl: string,
    public menuDescription: ActionMenuDescription,
    public selectedItems: Array<{ id: string|number }>
  ) {}
}