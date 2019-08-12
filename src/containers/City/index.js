import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SharedButton from '../../components/button/index'
import ListItem from '../../components/listItem/index';
import { connect } from 'react-redux';
import { actions } from '../../actions/actions';
import './index.scss';

class City extends Component{
    static propTypes = {
        payload: PropTypes.object,
        loading: PropTypes.bool,
        error: PropTypes.any,
        fetchWeatherData: PropTypes.func
    }

    static defaultProps = {
        payload: {name: "Nothing yet"},
        loading: false,
        error: "No error",
        fetchWeatherData: ()=>{console.log("Need to pass in a function")}
    }

    render(){
        const configButton = {
            buttonText: "Change City",
            emitEvent: this.props.fetchWeatherData
        }

        const city = this.props.payload?this.props.payload.name:"loading";
        return (
            <div className='city'>
                <input type="text" data-test='city-input' placeholder="Please Enter town name" />
                <SharedButton {...configButton}/>
                <div className='city-display'  data-test='city-display'>
                    <p>{`payload: ${city}`}</p>
                    <p>{`error: ${this.props.error}`}</p>
                    <p>{`loading: ${this.props.loading}`}</p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const post = state.post;
    return {
        payload: post.payload,
        loading: post.loading,
        error: post.error
    };
}

const mapDispatchToProps = dispatch =>{
    return {
        fetchWeatherData: () => dispatch(actions.fireSaga())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(City); 