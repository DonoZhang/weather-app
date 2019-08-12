import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SharedButton extends Component {
    static propTypes = {
        buttonText: PropTypes.string,
        emitEvent: PropTypes.func
    }

    onSubmit = ()=>{
        if(this.props.emitEvent){
            this.props.emitEvent();
        }
    }

    render(){
        const { buttonText } = this.props;
        return (
            <button data-test="buttonComponent" onClick={this.onSubmit}>
                {buttonText}
            </button>
        );
    }
}

export default SharedButton;