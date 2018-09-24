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
		// const htmlid = this.props.name;
		// let idx = 0;
		// if (htmlid === 'seconds') {
		// 	idx = 0;
		// } else if (htmlid === 'minutes') {
		// 	idx = 1;
		// } else if (htmlid === 'hours') {
		// 	idx = 2;
		// } else if (htmlid === 'dayOfMonth') {
		// 	idx = 3;
		// } else if (htmlid === 'month') {
		// 	idx = 4;
		// } else if (htmlid === 'dayOfWeek') {
		// 	idx = 5;
		// } else if (htmlid === 'year') {
		// 	idx = 6;
		// }

		const currentCronValue = this.props.currentCronValue;
		const currentFieldValue = currentCronValue.split(' ')[this.props.idx];
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
