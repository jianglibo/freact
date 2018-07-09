import * as React from "react";

export default class QuartzExpression extends React.Component<{}, { finalExpression: string, partExpression: string, errors: string[] }> {
    constructor(props: {}) {
        super(props);
        this.state = { finalExpression: '', partExpression: '', errors: [] }
        this.handleChange = this.handleChange.bind(this);
    }
    public render() {
        return <div>
            {
                this.state.errors.length > 0 ? 
                    <aside className="warn">
                        <ul>
                            {}            
                        </ul>
                    </aside>
               : ""
                
            }
            <pre className="code" data-language="html">
                <code>{this.state.finalExpression === '' ? "请尝试输入数字" : this.state.finalExpression}</code>
            </pre>
            <form className="pure-form pure-form-aligned">
                <fieldset>
                    <div className="pure-control-group">
                        <label htmlFor="name">Username</label>
                        <input type="text" placeholder="" value={this.state.partExpression} onChange={this.handleChange} />
                        <span className="pure-form-message-inline">.</span>
                    </div>
                </fieldset>
            </form>
        </div >;
    }

    private handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        // const oldValue = this.state.partExpression;
        // const oldSegs = oldValue.split(' ');

        const v = e.target.value.replace(/\s+/g, ' ');
        const segs: string[] = v.split(' ');
        let fe: string = "";
        if (v.length === 0) {
            fe = "请尝试输入数字，并且以空格分隔。";
        } else {
            segs.forEach((f, idx) => {
                // let allowed = false;
                // switch (idx) {
                //     case 0:
                //         if (f === '*' || f === "0") {
                //             allowed = true;
                //         } else if ()
                //         console.log(f);
                //         break;
                //     case 1:
                //         console.log(f);
                //     default:
                //         break;
                // }
            });
        }


        this.setState({ finalExpression: fe })
        this.setState({ partExpression: v });
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