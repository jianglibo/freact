import * as jQuery from "jquery";
import * as React from "react";
import ActionFormProps from '../datashape/action-form-props';
import ActionMenuDescription from "../datashape/action-menu-description";
import { StrUtil } from '../util/str-util';



export default class CronBuilder extends React.Component<ActionFormProps, {}> {
  private fm: React.RefObject<HTMLFormElement>;
  constructor(props: ActionFormProps) {
    super(props);
    this.fm = React.createRef();
  }

  public submit(md: ActionMenuDescription) {
      const f = jQuery(this.fm.current);
      let mt = "POST";
      switch (md.actionId) {
          case "delete":
            mt = "DELETE";
            break;
          default:
              break;
      }
      f.find('input[name=_method]').attr('value', mt);
      f.submit();
  }

  public render() {
      return <form action={this.props.baseUrl} ref={this.fm} method="POST">
          <input type="hidden" name="_method" value={this.props.method}/>
          <input type="hidden" name="ids" value={
              this.props.selectedItems.map(ido => StrUtil.chopDashPrefix(ido.id.toString())).join(",")
          }/>
      </form>;
  }
}
