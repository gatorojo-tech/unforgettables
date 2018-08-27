import React from 'react';
import PropTypes from 'prop-types';

function SettingsBackButton(props) {
  function processClick() {
    props.handleClick(props.goBackDestination);
  }
  
  return (
    <div className="back_button">
      <i className="fa fa-reply"
         onClick={processClick} />
    </div>
  );
}

export default SettingsBackButton;

SettingsBackButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  goBackDestination: PropTypes.string.isRequired
};
