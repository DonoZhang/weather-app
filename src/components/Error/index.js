import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Error extends Component{
    static propTypes = {
        errorMessage: PropTypes.string
    }

    render(){
        return (
            <div className="error-page" data-test="error-page">
                <div className="error-message" data-test="error-message">
                    <p>{this.props.errorMessage}</p>
                </div>
            </div>);
    }
}

export default Error;
