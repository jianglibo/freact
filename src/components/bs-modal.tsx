import { ModalOption } from "bootstrap";
import * as React from "react";

import "bootstrap";
import * as ReactDOM from "react-dom";
import IBsModalData from "../datashape/bs-modal-props";

export default class BsModal extends React.Component<IBsModalData, {}> {
  private fm: React.RefObject<HTMLDivElement>;
  private timer: NodeJS.Timer | undefined;
  constructor(props: IBsModalData) {
    super(props);
    this.fm = React.createRef();
    this.btnClicked = this.btnClicked.bind(this);
  }

  public render() {
    const { closeLabel, title, content, size } = this.props;
    const sizec = size ? "modal-dialog " + size : "modal-dialog";
    return (
      <div className="modal fade" tabIndex={-1} role="dialog" aria-labelledby="myModalTitle" aria-hidden="true" ref={this.fm}>
					<div className={sizec} role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">{title}</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								{content}
							</div>
							<div className="modal-footer">
								<button type="button" onClick={this.btnClicked} className="btn btn-secondary" data-dismiss="modal">{closeLabel ? closeLabel : 'Close'}</button>
							</div>
						</div>
					</div>
				</div>
    );
  }

  public componentDidMount() {
    const he = this.fm.current;
    let {ttl} = this.props;
    if (!ttl) {
      ttl = 50000;
    }
    const c = document.getElementById(this.props.container);
    if (!he || !c) {
      alert(c);
      return;
    }

    const mo: ModalOption = this.props.modalOption
      ? this.props.modalOption
      : {};

    jQuery(he).modal(mo);

    this.timer = global.setTimeout(() => {
      jQuery(he).modal("hide");
      ReactDOM.unmountComponentAtNode(c);
    }, ttl);
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
    this.removeSelf(1000);
  }
}
