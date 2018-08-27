import React from 'react';
import PropTypes from 'prop-types';

function MainOption(props) {
  function processClick() {
    props.handleClick(props.goToMode);
  }
  
  return (
    <div className='main_option'>
      <span className="option_text"
            onClick={processClick}
      >
        {props.text}
      </span>
    </div>
  );
}

export default MainOption;

MainOption.propTypes = {
  handleClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  goToMode: PropTypes.string.isRequired
};
