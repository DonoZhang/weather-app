import React from 'react';
import loadingLogo from '../../assets/loading.gif';

export default ()=>{
    return (
        <div data-test="loading-page">
            <img data-test="loading-image" src={loadingLogo} alt="loading" />
        </div>
    );
}