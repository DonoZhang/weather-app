import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './_index.scss';

class SharedTextInput extends Component{
    static propTypes = {
        placeholder: PropTypes.string,
        emitEvent: PropTypes.func
    }

    constructor(){
        super();
        this.state={
            textEntered: ""
        }
    }

    onTextChange = (event)=>{
        const input = event.target.value;
        this.setState(
            {
                textEntered: input
            }
        );
        if(this.props.emitEvent)
        this.props.emitEvent(input);
    }

    render(){
        return (
            <div className="text-input" data-test="text-input">
                <input type="text" placeholder={this.props.placeholder} onChange={this.onTextChange} value={this.state.textEntered} />
            </div>
        );
    }
}

export default SharedTextInput;

