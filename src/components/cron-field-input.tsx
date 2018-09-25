import * as React from "react";
import CronFieldDescription from "../datashape/cron-builder/cron-field-description";

export default class CronFieldInput extends React.Component<CronFieldDescription, {}> {
	constructor(props: CronFieldDescription) {
		super(props);
		this.handleOnFocus = this.handleOnFocus.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleOnBlur = this.handleOnBlur.bind(this);
	}

	public render() {
		const currentCronValue = this.props.currentCronValue;
		const currentFieldValue = currentCronValue[this.props.idx];
		return (
			<div className="pure-u-1-8">
				<input className="pure-u-23-24" onBlur={this.handleOnBlur} type="text" value={currentFieldValue} placeholder={this.props.iname} onFocus={this.handleOnFocus} onChange={this.handleChange}/>
			</div>);
	}

	private handleChange(event: React.FormEvent<HTMLInputElement>) {
		this.props.onFieldValueChanged(this.props.idx, event.currentTarget.value);
	}

	private handleOnBlur(event: React.FormEvent<HTMLInputElement>) {
		this.props.onFieldBlur(this.props.idx, event.currentTarget.value);
	}

	private handleOnFocus(event: React.FormEvent<HTMLInputElement>) {
		this.props.onFieldFocusChanged(this.props.idx);
	}
}
