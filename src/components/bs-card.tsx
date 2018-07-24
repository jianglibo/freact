import * as React from "react";

import * as ReactDOM from "react-dom";
import "../../node_modules/bootstrap/dist/js/bootstrap";
import IBsCardProps from "../datashape/bs-card-props";

export default class BsCard extends React.Component<IBsCardProps, {}> {
  private fm: React.RefObject<HTMLDivElement>;
  private timer: NodeJS.Timer | undefined;

  constructor(props: IBsCardProps) {
    super(props);
    this.fm = React.createRef();
    this.mo = this.mo.bind(this);
    this.ml = this.ml.bind(this);
  }

  public componentDidMount() {
    this.showCard();
  }

  public render() {
    const { title, subTitle, content, links, styles } = this.props;
    return (
      <div
        className="card"
        style={styles}
        ref={this.fm}
        onMouseOver={this.mo}
        onMouseLeave={this.ml}
      >
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          {subTitle ? (
            <h6 className="card-subtitle mb-2 text-muted">{subTitle}</h6>
          ) : (
            ""
          )}
          <p className="card-text">{content}</p>
          {links.map((lk, idx) => (
            <a href="#" className="card-link" onClick={lk.onClick} key={idx}>
              {lk.label}
            </a>
          ))}
        </div>
      </div>
    );
  }

  private showCard() {
    const he = this.fm.current;
    if (he) {
      jQuery(he).show();
      this.startFade();
    }
  }

  private startFade() {
    const { staySeconds } = this.props;
    const c = document.getElementById(this.props.container);
    const he = this.fm.current;
    if (he) {
        if (this.timer) {
            global.clearTimeout(this.timer);
            this.timer = undefined;
        }
      this.timer = global.setTimeout(() => {
        jQuery(he).hide("slow", () => {
          if (c) {
            ReactDOM.unmountComponentAtNode(c);
          }
        });
      }, staySeconds * 1000);
    }
  }

  private mo() {
      if (this.timer) {
        global.clearTimeout(this.timer);
      }
  }

  private ml() {
      this.startFade();
  }
}
