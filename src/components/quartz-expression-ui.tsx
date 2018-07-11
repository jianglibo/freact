import * as React from "react";
import QuartzExpression from '../datashape/quartz-expression';

export default class QuartzExpressionUi extends React.Component<
  {},
  QuartzExpression
> {
  constructor(props: {}) {
    super(props);
    this.state = { explain: "从0秒开始，每隔1秒钟执行一次。", expression: "0/1 * * * * ? *", errors: [] };
    this.handleChange = this.handleChange.bind(this);
    this.collectErrors = this.collectErrors.bind(this);
  }
  public render() {
    return (
      <div>
        <form className="pure-form pure-form-aligned">
          <fieldset>
            <div className="pure-control-group">
              <label htmlFor="express">7段表达式</label>
              <input
                id="express"
                name="express"
                type="text"
                placeholder=""
                value={this.state.expression}
                onChange={this.handleChange}
              />
              <i
                className={
                  this.state.errors.length > 0
                    ? "fas fa-exclamation-circle"
                    : "far fa-check-circle"
                }
              />
            </div>
          </fieldset>
        </form>
        {this.collectErrors()}
        {
            this.state.errors.length === 0 ?
        <aside>
           <p>当前表达式的意义：</p>
          <p>{this.state.explain}</p>
        </aside>
        : null
        }
      </div>
    );
  }

  // private formatExplain(segs: string[]): string {
  //   return segs.map((it, idx) => {
  //       return it + idx;
  //   }).join(",");
  // }

  private collectErrors(): JSX.Element | null {
    const errorsTmp = this.state.errors;
    return (
        errorsTmp.length > 0 ?
      <aside className="warn">
        <ul>
          {errorsTmp.map((it, idx) => {
            return <li key={idx}>{it}</li>;
          })}
        </ul>
      </aside>
      : null
    );
  }

  private handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const qe = new QuartzExpression(e.target.value);
    this.setState(qe);
  }

  // , - * /
  // , - * /
  // , - * /
  // , - * ? / L W
  // , - * /
  // , - * ? / L #
  // , - * /

  // private checkSeconds(seconds: string[]): string {
  //     throw new Error("Method not implemented.");
  // }

  // private checkMinutes(seconds: string[]): string {
  //     throw new Error("Method not implemented.");
  // }

  // private checkHours(seconds: string[]): string {
  //     throw new Error("Method not implemented.");
  // }

  // private checkDayOfMonth(seconds: string[]): string {
  //     throw new Error("Method not implemented.");
  // }

  // private checkMonth(seconds: string[]): string {
  //     throw new Error("Method not implemented.");
  // }

  // private checkDayOfWeek(seconds: string[]): string {
  //     throw new Error("Method not implemented.");
  // }

  // private checkYear(seconds: string): string {
  //     throw new Error("Method not implemented.");
  // }
}
