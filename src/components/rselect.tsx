
import * as React from "react";
import ReactSelectClass, { Option } from "react-select";
import 'react-select/dist/react-select.css';

export default class Rselect extends React.Component<{}, {selectedOption: Array<string|undefined>}> {
    constructor(props: {}) {
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
                options={[
                    { value: 'one', label: 'One' },
                    { value: 'two', label: 'Two' },
                    { value: 'three', label: 'Three' },
                    { value: 'four', label: 'Four' }
                ]}
            />
        );
    }
    
    private handleChange(newSelectedOption: Array<Option<string>> | null) {
        if (newSelectedOption) {
            console.log(newSelectedOption);
            const v = newSelectedOption.map(it => it.value).filter(it => it);
            console.log(v);
            if (v) {
                this.setState({selectedOption: v });
            }
        } else {
            this.setState({selectedOption: []});
        }
        // selectedOption can be null when the `x` (close) button is clicked
        // if (newSelectedOption) {
        //     console.log(`Selected: ${newSelectedOption.label}`);
        // }
    }
}