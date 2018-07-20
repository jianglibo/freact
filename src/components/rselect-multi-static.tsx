
import * as React from "react";
import ReactSelectClass, { Option } from "react-select";
import 'react-select/dist/react-select.css';

export default class RselectMultiStatic extends React.Component<{staticOptions: Array<Option<string|number>>}, {selectedOption: Array<string|number|undefined>}> {
    constructor(props: {staticOptions: Array<Option<string|number>>}) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            selectedOption: []
        }
    }
    public render() {
        const { selectedOption } = this.state;

        return (
            <ReactSelectClass
                name="form-field-name"
                value={selectedOption}
                onChange={this.handleChange}
                joinValues={false}
                multi={true}
                options={this.props.staticOptions}
            />
        );
    }
    
    private handleChange(newSelectedOption: Array<Option<string|number>> | null) {
        if (newSelectedOption) {
            const v = newSelectedOption.map(it => it.value).filter(it => it);
            if (v) {
                this.setState({selectedOption: v });
            }
        } else {
            this.setState({selectedOption: []});
        }
    }
}