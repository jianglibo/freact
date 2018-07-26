import { ModalOption } from "bootstrap";
import * as React from "react";
import IBsConfirmData from "../datashape/bs-confirm-props";

import * as ReactDOM from "react-dom";
import "../../node_modules/bootstrap/dist/js/bootstrap";

export default class BsConfirm extends React.Component<IBsConfirmData, {}> {
  private fm: React.RefObject<HTMLDivElement>;
  private timer: NodeJS.Timer | undefined;
  constructor(props: IBsConfirmData) {
    super(props);
    this.fm = React.createRef();
    this.btnClicked = this.btnClicked.bind(this);
  }

  public render() {
    const { cancelLabel, confirmLabel } = this.props;

    return (
      <div
        className="modal fade bs-confirm-modal"
        role="dialog"
        aria-labelledby="confirmModalLabel"
        aria-hidden="true"
        ref={this.fm}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{this.props.title}</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>{this.props.content}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary no"
                data-dismiss="modal"
                onClick={this.btnClicked}
              >
                {cancelLabel ? cancelLabel : "暂缓一缓"}
              </button>
              <button
                type="button"
                className="btn btn-primary yes"
                onClick={this.btnClicked}
              >
                {confirmLabel ? confirmLabel : "心意已决"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  public componentDidMount() {
    const he = this.fm.current;
    const c = document.getElementById(this.props.container);
    if (!he || !c) {
      return;
    }

    const mo: ModalOption = this.props.modalOption
      ? this.props.modalOption
      : {};

    jQuery(he).modal(mo);

    this.timer = global.setTimeout(() => {
      this.props.callback(false);
      jQuery(he).modal("hide");
      ReactDOM.unmountComponentAtNode(c);
    }, 5000);
  }

  private removeSelf(timeout: number) {
    const he = this.fm.current;
    const c = document.getElementById(this.props.container);
    if (!he || !c) {
      return;
    }

    jQuery(he).modal("hide");

    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(c);
    }, timeout);
  }

  private btnClicked(event: React.MouseEvent<HTMLElement>): void {
    event.preventDefault();
    if (this.timer) {
      global.clearTimeout(this.timer);
    }
    const target = jQuery(event.currentTarget);
    let confirm = false;
    if (target.hasClass("yes")) {
      confirm = true;
    }
    this.props.callback(confirm);
    this.removeSelf(1000);
  }
}
