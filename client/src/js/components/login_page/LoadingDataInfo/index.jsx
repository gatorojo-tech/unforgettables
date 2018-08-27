import React from 'react';
import constants from '../../app_level/constants.jsx';
import '../starting_screen.css';

function LoadingDataInfo() {
  return (
    <div className='loading_container'
         id='unf_app'>
      <div className='loading_container_description'>{constants.startingScreenLoadingMessage}</div>
    </div>
  );
}

export default LoadingDataInfo;
