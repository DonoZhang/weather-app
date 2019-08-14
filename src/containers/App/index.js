import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SharedButton from '../../components/button/index';
import SharedTextInput from '../../components/input/index';
import Error from '../../components/Error/index';
import Loading from '../../components/Loading/index';
import Weather from '../../components/Weather/index';
import { connect } from 'react-redux';
import { actions } from '../../actions/actions';
import { payloadToProps } from './payloadToProps';
import './_index.scss';

class App extends Component{
    static propTypes = {
        payload: PropTypes.object,
        loading: PropTypes.bool,
        error: PropTypes.string,
        city: PropTypes.string,
        fetchWeatherData: PropTypes.func
    }

    static defaultProps = {
        payload: {name: "Nothing yet"},
        loading: false,
        error: "No error",
        fetchWeatherData: ()=>{console.log("Need to pass in a function")}
    }

    constructor(){
        super();
        this.state = {
            city: undefined
        }
    }

    componentWillMount(){
        this.setState({city: this.props.city});
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
        if(loading){
            return <Loading />;
        }
        if(error.length > 0){
            return <Error errorMessage={error}/>;
        }
        const props = payloadToProps(payload);
        return <Weather {...props}/>
    }

    onTextInputChange = (city)=>{
        this.setState({city})
    }

    onSubmit = ()=>{
        this.props.setCity(this.state.city);
    }

    weatherUpdate = ()=>{
        this.props.fetchWeatherData();
    }

    render(){
        const configTextInput = {
            placeholder: "Please enter the town name",
            emitEvent: this.onTextInputChange
        }

        const configButton = {
            buttonText: "Change City",
            emitEvent: ()=>{
                this.onSubmit();
                this.props.fetchWeatherData();
            }
        }
        
        return (
            <div className='app'>
                <div className='city-search' data-test="city-search">
                    <SharedTextInput {...configTextInput}/>
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
    const post = state.posts;
    const city = state.city.city;
    return {
        payload: post.payload,
        loading: post.loading,
        error: post.error,
        city
    };
}

const mapDispatchToProps = dispatch =>{
    return {
        fetchWeatherData: () => dispatch(actions.fireSaga()),
        setCity: city => dispatch(actions.setCity(city))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App); 