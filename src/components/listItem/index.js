import React, { Component } from 'react';
import PropTypes from 'prop-types';

//a single forecast

class ListItem extends Component{
    static propTypes = {
        time: PropTypes.string,
        image: PropTypes.string,
        temperature: PropTypes.string
    }

    render(){
        const {time, image, temperature} = this.props;

        if(!(time&&image&&temperature)){
            return null;
        }

        return(
            <div data-test="listItemComponent">
                <h2 class="time" data-test="time">{time}</h2>
                <img alt="symbol" src={image} data-test="symbol"/>
                <p class="temperature" data-test="temperature">{temperature}</p>
            </div>
        );
    }
}

export default ListItem;