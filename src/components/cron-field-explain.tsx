import * as React from "react";
import CronFieldDescription from "../datashape/cron-builder/cron-field-description";
import { CronBuilderUtil } from '../util/cron-builder-util';

export default class CronFieldExplain extends React.Component<
  CronFieldDescription,
  {}
> {
  constructor(props: CronFieldDescription) {
    super(props);
  }

  public render() {
    const explained = CronBuilderUtil.getExpandedValues(this.props.idx, this.props, this.props.currentCronValue);
    const st = explained.err ? { color: "red" } : { color: "blue" };
    return <span style={st}>{explained.value}</span>;
  }

}
