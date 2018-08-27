import React from 'react';
import PropTypes from 'prop-types';
import constants from '../../app_level/constants.jsx';
import MainOption from '../shared_components/MainOption.jsx';

function InitialContent(props) {
  function getOptions() {
    return props.options.map(option => {
      return (
        <MainOption key={option.text}
                    text={option.text}
                    goToMode={option.mode}
                    handleClick={props.handleClick} />
      );
    });
  }

  return (
    <div className="profile_content_container">
      <div className="settings_title">{constants.settings.pageTitle}</div>
      {getOptions()}

      <div className='main_option'>
        <a className="option_text"
           href="/api/logout"
        >
          Log out
        </a>
      </div>
    </div>
  );
}

export default InitialContent;

InitialContent.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    yesButtonClass: PropTypes.string,
    yesButtonText: PropTypes.string,
    noButtonClass: PropTypes.string,
    noButtonText: PropTypes.string,
    confirmYes: PropTypes.func,
    confirmMessage: PropTypes.string
  })).isRequired,
  router: PropTypes.object.isRequired
};
