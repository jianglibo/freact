import * as React from "react";
import ReactSelectClass, { Option } from "react-select";
import "react-select/dist/react-select.css";

export default class RselectMultiStatic extends React.Component<
  {
    staticOptions: Array<Option<string | number>>,
    fieldName: string,
    joinValues?: boolean,
    initSelected?: Array<string | number | undefined>,
  },
  { selectedOption: Array<string | number | undefined> }
> {
  constructor(props: {
    staticOptions: Array<Option<string | number>>,
    fieldName: string,
    joinValues?: boolean,
    initSelected?: Array<string | number | undefined>
  }) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      selectedOption: this.props.initSelected ? this.props.initSelected : []
    };
  }
  public render() {
    const { selectedOption } = this.state;

    return (
      <ReactSelectClass
        name={this.props.fieldName}
        value={selectedOption}
        onChange={this.handleChange}
        joinValues={this.props.joinValues}
        multi={true}
        options={this.props.staticOptions}
      />
    );
  }

  private handleChange(
    newSelectedOption: Array<Option<string | number>> | null
  ) {
    if (newSelectedOption) {
      const v = newSelectedOption.map(it => it.value).filter(it => it);
      if (v) {
        this.setState({ selectedOption: v });
      }
    } else {
      this.setState({ selectedOption: [] });
    }
  }
}
