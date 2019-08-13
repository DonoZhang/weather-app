import React from 'react';
import loadingLogo from '../../assets/loading.gif';
import './_index.scss';

export default ()=>{
    return (
        <div className="loading-page" data-test="loading-page">
            <img data-test="loading-image" src={loadingLogo} alt="loading" />
        </div>
    );
}