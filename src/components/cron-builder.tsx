import * as React from "react";
import CronBuilderPros from "../datashape/cron-builder/cron-builder-props";
import CronFieldDescription from "../datashape/cron-builder/cron-field-description";
import PredefinedPattern from "../datashape/cron-builder/predefined-pattern";
import CronFieldDetail from "./cron-field-detail";
import CronFieldInput from "./cron-field-input";


export default class CronBuilder extends React.Component<CronBuilderPros, { focusedField: CronFieldDescription, currentCronValue: string }> {
    constructor(props: CronBuilderPros) {
        super(props);
        const predefined: PredefinedPattern = props.preDefinedPatterns[0];
        this.state = { focusedField: props.fieldDescriptions[0], currentCronValue: predefined.cronValue }

        this.handlePatternChange = this.handlePatternChange.bind(this);
        this.handleFieldFocusChanged = this.handleFieldFocusChanged.bind(this);
        this.handleFieldValueChanged = this.handleFieldValueChanged.bind(this);
        this.handleFieldBlur = this.handleFieldBlur.bind(this);
    }

    public render() {
        return <div><form className="pure-form pure-form-stacked">
            <fieldset>
                <div className="pure-g">
                    <div className="pure-u-1">
                        <select id="loop-unit" className="pure-input-1" onChange={this.handlePatternChange}>
                            {this.props.preDefinedPatterns.map(pdp => (
                                <option value={pdp.name} key={pdp.name}>{pdp.iname}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </fieldset>
        </form>
            <p>每秒钟执行1次, <span style={{ fontWeight: "bolder" }}>Cron表达式：{this.state.currentCronValue}</span></p>
            <form className="pure-form pure-form-stacked">
                <fieldset>
                    <div className="pure-g">
                        {this.props.fieldDescriptions.map((fd, idx) => (
                            <CronFieldInput {...fd} onFieldBlur={this.handleFieldBlur} onFieldFocusChanged={this.handleFieldFocusChanged} idx={idx} currentCronValue={this.state.currentCronValue} key={fd.name} onFieldValueChanged={this.handleFieldValueChanged} />
                        ))}
                    </div>
                </fieldset>
            </form>
            <CronFieldDetail {...this.state.focusedField} />
        </div>
    }

    private handleFieldBlur(idx: number, value: string) {
        let needUpdate = false;
        const av: string[] = this.state.currentCronValue.split(' ');
        if (!value) {
            if (idx === 5) {
                if (av[3] === '?') {
                    av[idx] = '*';
                } else {
                    av[idx] = '?';
                }
            } else if (idx === 3) {
                if (av[5] === '?') {
                    av[idx] = '*';
                } else {
                    av[idx] = '?';
                }
            } else {
                av[idx] = '*';
            }
            needUpdate = true;
        } else if (value === '?') {
            if (idx === 5) {
                if (av[3] === '?') {
                    av[idx] = '*';
                    needUpdate = true;
                }
            } else if (idx === 3) {
                if (av[5] === '?') {
                    av[idx] = '*';
                    needUpdate = true;
                }
            }
        } else if (value === '*') {
            if (idx === 5) {
                if (av[3] !== '?') {
                    av[idx] = '?';
                    needUpdate = true;
                }
            } else if (idx === 3) {
                if (av[5] !== '?') {
                    av[idx] = '?';
                    needUpdate = true;
                }
            }
        }
        if (needUpdate) {
            this.setState({ currentCronValue: av.join(' ') });
        }
    }

    private handleFieldValueChanged(idx: number, value: string) {
        const av: string[] = this.state.currentCronValue.split(' ');
        av[idx] = value;
        this.setState({ currentCronValue: av.join(' ') });
    }

    private handleFieldFocusChanged(idx: number) {
        const cfd = this.props.fieldDescriptions[idx];
        this.setState({ focusedField: cfd });

    }

    private handlePatternChange(event: React.FormEvent<HTMLSelectElement>) {
        const pdf = this.props.preDefinedPatterns.find(it => it.name === event.currentTarget.value);
        if (pdf) {
            this.setState({ currentCronValue: pdf.cronValue });
        }
    }

}
