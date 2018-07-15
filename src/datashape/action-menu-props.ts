import { SyntheticEvent } from 'react';
import ActionMenuDescription from './action-menu-description';

export default class ActionMenuProps {
  constructor(
    public baseUrl: string,
    public currentUrl: string,
    public menuDescription: ActionMenuDescription,
    public selectedItems: Array<{ id: string|number }>,
    public actionBtnClicked: (md: ActionMenuDescription, e: SyntheticEvent) => void
  ) {}
}