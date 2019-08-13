import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SharedButton from '../../components/button/index'
import Error from '../../components/Error/index';
import Loading from '../../components/Loading/index';
import Weather from '../../components/Weather/index';
import { connect } from 'react-redux';
import { actions } from '../../actions/actions';
import { payloadToProps } from './payloadToProps';
import './index.scss';

class App extends Component{
    static propTypes = {
        payload: PropTypes.object,
        loading: PropTypes.bool,
        error: PropTypes.string,
        fetchWeatherData: PropTypes.func
    }

    static defaultProps = {
        payload: {name: "Nothing yet"},
        loading: false,
        error: "No error",
        fetchWeatherData: ()=>{console.log("Need to pass in a function")}
    }

    componentDidMount(){
       this.weatherUpdate();
       //update weather per half hour
       this.weatherUpdateTimer = setInterval(this.weatherUpdate, 1800000);
    }

    componentWillUnmount(){
        clearInterval(this.weatherUpdateTimer);
    }

    _checkStatus = ()=>{
        const {payload, loading, error} = this.props;
        if(error.length > 0){
            return <Error errorMessage={error}/>;
        }
        if(loading){
            return <Loading />;
        }
        const props = payloadToProps(payload);
        return <Weather {...props}/>
    }

    weatherUpdate = ()=>{
        this.props.fetchWeatherData();
    }

    render(){
        const configButton = {
            buttonText: "Change City",
            emitEvent: this.props.fetchWeatherData
        }
        
        return (
            <div className='app'>
                <div className='city-search' data-test="city-search">
                    <input type="text" data-test='city-input' placeholder="Please Enter town name" />
                    <SharedButton {...configButton}/>
                </div>
                <div className='page-display'  data-test='page-display'>
                    {this._checkStatus()}
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

export default connect(mapStateToProps, mapDispatchToProps)(App); 