import * as React from "react";
import CronFieldDescription from "../datashape/cron-builder/cron-field-description";

export default class CronFieldDetail extends React.Component<CronFieldDescription, {}> {
  constructor(props: CronFieldDescription) {
    super(props);
  }

  public render() {
      return	<table className="pure-table pure-table-bordered" style={{'width': '100%'}}>
						<tbody>
							<tr>
								<td>字段名</td>
								<td>{this.props.iname}</td>
							</tr>
							<tr>
								<td>允许值</td>
								<td>{this.props.allowedValues}</td>
							</tr>
							<tr>
								<td>特殊字符</td>
								<td>{this.props.allowedSpecialCharacters}</td>
							</tr>
						</tbody>
					</table>
  }
}
