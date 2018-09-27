import * as jQuery from "jquery";
import * as React from "react";
import AjaxDataResult from '../datashape/ajaxresult/ajax-data-result';
import AjaxErrorResult from '../datashape/ajaxresult/ajax-error-result';
import { isAjaxDataResult } from '../datashape/ajaxresult/ajax-result-util';
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
    currentExecuteTime: Date | null;
    serverError: string;
  }
> {
  constructor(props: CronBuilderPros) {
    super(props);
    const predefined: PredefinedPattern = props.preDefinedPatterns[0];
    this.state = {
      currentCronValue: predefined.cronValue.split(" "),
      currentExecuteTime: null,
      focusedField: props.fieldDescriptions[0],
      serverError: ''
    };

    this.handlePatternChange = this.handlePatternChange.bind(this);
    this.handleFieldFocusChanged = this.handleFieldFocusChanged.bind(this);
    this.handleFieldValueChanged = this.handleFieldValueChanged.bind(this);
    this.handleFieldBlur = this.handleFieldBlur.bind(this);
    this.getNextExecuteTime = this.getNextExecuteTime.bind(this);
  }

  public render() {
    const cva = this.state.currentCronValue;
    const cv = cva.join(" ");

    const { maxValueNumber, allTemplate, specifiedTemplate } = this.props;
    const explainedValues = this.props.fieldDescriptions.map((fd, idx) => {
      return CronBuilderUtil.getExpandedValues(
        idx,
        fd,
        cva,
        maxValueNumber,
        allTemplate,
        specifiedTemplate
      );
    });

    const hasError = explainedValues.find(it => it.err) ? true : false;

    const nxttime = this.state.currentExecuteTime ? this.state.currentExecuteTime.toISOString() : '';

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
          <span
            style={{
              color: hasError ? "red" : "blue",
              fontWeight: "bolder",
              paddingRight: "20px"
            }}
          >
            Cron表达式：
            {cv}
          </span>
          <button
            className="pure-button"
            disabled={hasError}
            onClick={this.getNextExecuteTime}
          >
            {this.props.nextTimeLabel}
          </button>
          <span style={{ paddingLeft: "20px" }}>{nxttime}</span>
          <span style={{paddingLeft: "20px" ,color: "red"}}>{this.state.serverError}</span>
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

  private getNextExecuteTime(event: React.FormEvent<HTMLButtonElement>) {
    const nextTimeUrl = this.props.nextTimeUrl;
    const cronValue = this.state.currentCronValue.join(' ');
    const msValue = (this.state.currentExecuteTime || new Date()).getTime();
    const that = this;
    jQuery
      .ajax({
        method: "GET",
        url: nextTimeUrl,
        // tslint:disable-next-line:object-literal-sort-keys
        data: { ms: msValue, cron: cronValue },
        dataType: 'json'
      })
      .done(data => {
        const typedData: AjaxDataResult|AjaxErrorResult = data;
        if (isAjaxDataResult(typedData)) {
          const t = typedData.data[0];
          that.setState({currentExecuteTime: new Date(t), serverError: ''});
        } else {
          const m = typedData.message;
          this.setState({serverError: m, currentExecuteTime: null});
        }
      }).fail((jqXHR, textStatus, errorThrown) => {
        this.setState({serverError: 'Ajax Request failed.'});
      });
  }

  /*
    在每个月的1号
    */
}
