import ActionMenuDescription from "./action-menu-description";

export default 
class ActionMenuBarProps {
  constructor(
    public tableContainer: JQuery<HTMLElement>,
    public baseUrl: string,
    public menuDescriptions: ActionMenuDescription[]
  ) {}
}