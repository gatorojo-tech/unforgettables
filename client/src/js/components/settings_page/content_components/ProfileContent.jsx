import React from 'react';
import PropTypes from 'prop-types';
import SettingsBackButton from '../shared_components/SettingsBackButton.jsx';
import EditableField from '../shared_components/EditableField.jsx';
import constants from '../../app_level/constants.jsx';

function ProfileContent(props) {
  return (
    <div className="profile_content_container">
      <div className="settings_title">{constants.settings.mainOptions.profile}</div>
      <SettingsBackButton handleClick={props.handleBackButtonClick}
                          goBackDestination={props.goBackDestination} />

      <div className="info_block">
        <div className="info_label">{constants.settings.nameInfoLabel}</div>
        <EditableField userName={props.userName}
                       changeUserName={props.changeUserName}
                       cssClass="info_value" />
      </div>

      <div className="info_block">
        <div className="info_label">{constants.settings.idInfoLabel}</div>
        <div className="info_value owner_id">{props.userId}</div>
      </div>
    </div>
  );
}

export default ProfileContent;

ProfileContent.propTypes = {
  handleBackButtonClick: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  changeUserName: PropTypes.func.isRequired,
  goBackDestination: PropTypes.string.isRequired
};
