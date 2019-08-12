import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SharedButton from '../../components/button/index'
import Error from '../../components/Error/index';
import Loading from '../../components/Loading/index';
import Weather from '../../components/Weather/index';
import { connect } from 'react-redux';
import { actions } from '../../actions/actions';
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
        this.props.fetchWeatherData();
    }

    _checkStatus = ()=>{
        const {payload, loading, error} = this.props;
        if(error.length > 0){
            return <Error errorMessage={error}/>;
        }
        if(loading){
            return <Loading />;
        }
        return <Weather payload={payload}/>
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