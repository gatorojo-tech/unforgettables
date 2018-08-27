import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '../../../app_level/BaseComponent/index';
import SettingsBackButton from '../../shared_components/SettingsBackButton.jsx';
import constants from '../../../app_level/constants.jsx';
import './preferences_content.css';

export default class PreferencesContent extends BaseComponent {
  constructor(props) {
    super(props);
    
    this.state = {
      mode: 'show_connections'
    };
    
    this.bindMethod('changeNewProductPosition');
  }

  changeNewProductPosition(newPosition) {
    this.props.changeNewProductPosition(newPosition);
  }

  getPositionOfNewProductChoice() {
    return (
      <div className="preference_choice">
        <div className="choice_description">
          {constants.settings.newProductPositionChoiceDescription}
        </div>

        <div className="variants_wrapper">
          <div className="variant_element">
            <input type="radio"
                   name="radio"
                   checked={this.props.settings.preferences.newProductPosition === 'top'}
                   onChange={() => this.changeNewProductPosition('top')}
                   id="position_choice_top" />
            <label htmlFor="position_choice_top">
              {constants.settings.newProductPositionChoiceVariantTop}
            </label>
          </div>

          <div className="variant_element">
            <input type="radio"
                   name="radio"
                   checked={this.props.settings.preferences.newProductPosition === 'bottom'}
                   onChange={() => this.changeNewProductPosition('bottom')}
                   id="position_choice_bottom" />
            <label htmlFor="position_choice_bottom">
              {constants.settings.newProductPositionChoiceVariantBottom}
            </label>
          </div>
        </div>
      </div>
    );
  }
  
  render() {
    return (
      <div className="profile_content_container">
        <div className="settings_title">{constants.settings.mainOptions.preferences}</div>
        <SettingsBackButton handleClick={this.props.handleBackButtonClick}
                            goBackDestination={this.props.goBackDestination} />
        
        <div className="preferences_block">
          {this.getPositionOfNewProductChoice()}
        </div>
      </div>
    );
  }
}

PreferencesContent.propTypes = {
  handleBackButtonClick: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    connections: PropTypes.array.isRequired
  }).isRequired,
  changeNewProductPosition: PropTypes.func.isRequired
};
