import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './_index.scss';

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
            <a className="button-component" data-test="buttonComponent" onClick={this.onSubmit}>
                {buttonText}
            </a>
        );
    }
}

export default SharedButton;