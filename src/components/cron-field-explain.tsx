import * as React from "react";
// import { CronBuilderUtil } from "../util/cron-builder-util";

export default class CronFieldExplain extends React.Component<
  {err: boolean, value: string},
  {}
> {
  constructor(props: {err: boolean, value: string}) {
    super(props);
  }

  public render() {
    const st = this.props.err ? { color: "red" } : { color: "blue" };
    const value = this.props.value;
    // this.props.onFieldExplained(explained.err, this.props.idx);
    return <span style={st}>{value}</span>;
  }
}
