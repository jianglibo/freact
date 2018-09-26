import * as React from "react";
import CronBuilderPros from "../datashape/cron-builder/cron-builder-props";
import CronFieldDescription from "../datashape/cron-builder/cron-field-description";
import PredefinedPattern from "../datashape/cron-builder/predefined-pattern";
import { CronBuilderUtil } from "../util/cron-builder-util";
import CronFieldDetail from "./cron-field-detail";
import CronFieldExplain from "./cron-field-explain";
import CronFieldInput from "./cron-field-input";

export default class CronBuilder extends React.Component<
  CronBuilderPros,
  {
    focusedField: CronFieldDescription;
    currentCronValue: string[];
  }
> {
  constructor(props: CronBuilderPros) {
    super(props);
    const predefined: PredefinedPattern = props.preDefinedPatterns[0];
    this.state = {
      currentCronValue: predefined.cronValue.split(" "),
      focusedField: props.fieldDescriptions[0]
    };

    this.handlePatternChange = this.handlePatternChange.bind(this);
    this.handleFieldFocusChanged = this.handleFieldFocusChanged.bind(this);
    this.handleFieldValueChanged = this.handleFieldValueChanged.bind(this);
    this.handleFieldBlur = this.handleFieldBlur.bind(this);
  }

  public render() {
    const cva = this.state.currentCronValue;
    const cv = cva.join(" ");

    const {maxValueNumber, allTemplate, specifiedTemplate} = this.props;
    const explainedValues = this.props.fieldDescriptions.map((fd, idx) => {
      return CronBuilderUtil.getExpandedValues(idx, fd, cva, maxValueNumber, allTemplate, specifiedTemplate);
    });

    const hasError = explainedValues.find(it => it.err) ? true : false;

    return (
      <div>
        <form className="pure-form pure-form-stacked">
          <fieldset>
            <div className="pure-g">
              <div className="pure-u-1">
                <select
                  id="loop-unit"
                  className="pure-input-1"
                  onChange={this.handlePatternChange}
                >
                  {this.props.preDefinedPatterns.map(pdp => (
                    <option value={pdp.name} key={pdp.name}>
                      {pdp.iname}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </fieldset>
        </form>
        <p>
          {explainedValues.map((ev, idx) => (
            <CronFieldExplain {...ev} key={"explained-" + idx} />
          ))}
        </p>
        <p>
          <span style={{ fontWeight: "bolder", color: hasError ? 'red' : 'blue' }}>
            Cron表达式：
            {cv}
          </span>
          <button className="pure-button" disabled={hasError}>{this.props.nextTimeLabel}</button>
        </p>
        <form className="pure-form pure-form-stacked">
          <fieldset>
            <div className="pure-g">
              {this.props.fieldDescriptions.map((fd, idx) => (
                <CronFieldInput
                  {...fd}
                  onFieldBlur={this.handleFieldBlur}
                  onFieldFocusChanged={this.handleFieldFocusChanged}
                  idx={idx}
                  currentCronValue={this.state.currentCronValue}
                  key={fd.name}
                  onFieldValueChanged={this.handleFieldValueChanged}
                />
              ))}
            </div>
          </fieldset>
        </form>
        <CronFieldDetail {...this.state.focusedField} />
      </div>
    );
  }

  private handleFieldBlur(idx: number, value: string) {
    const nv = CronBuilderUtil.updateCronFieldValue(
      idx,
      value,
      this.state.currentCronValue
    );
    if (nv) {
      this.setState({ currentCronValue: nv });
    }
  }

  private handleFieldValueChanged(idx: number, value: string) {
    const av: string[] = this.state.currentCronValue;
    av[idx] = value;
    this.setState({ currentCronValue: av });
  }

  private handleFieldFocusChanged(idx: number) {
    const cfd = this.props.fieldDescriptions[idx];
    this.setState({ focusedField: cfd });
  }

  private handlePatternChange(event: React.FormEvent<HTMLSelectElement>) {
    const pdf = this.props.preDefinedPatterns.find(
      it => it.name === event.currentTarget.value
    );
    if (pdf) {
      this.setState({ currentCronValue: pdf.cronValue.split(" ") });
    }
  }

  /*
    在每个月的1号
    */
}
