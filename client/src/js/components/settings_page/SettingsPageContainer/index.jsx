import React from 'react';
import {connect} from 'react-redux';
import BaseComponent from '../../app_level/BaseComponent/';
import constants from '../../app_level/constants.jsx';
import InitialContent from '../content_components/InitialContent.jsx';
import ProfileContent from '../content_components/ProfileContent.jsx';
import ConnectionsContent from '../content_components/ConnectionsContent/index.jsx';
import PreferencesContent from '../content_components/PreferencesContent/index.jsx';
import * as actions from '../../../redux/actions/';
import './settings_page_container.css';

class SettingsPageContainer extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      mode: 'initial',
      userName: 'Example Name'
    };

    this.bindMethod('changeMode');
  }

  changeMode(newMode) {
    this.setState({mode: newMode});
  }

  getContent() {
    if (this.state.mode === 'initial') {
      const options = this.getSettingsPageInitialOptions();
      return (
        <InitialContent options={options}
                        handleClick={this.changeMode}
                        router={this.props.router} />
      );
    } else if (this.state.mode === 'profile') {
      return (
        <ProfileContent userName={this.props.settings.userName}
                        userId={this.props.settings.userId}
                        changeUserName={this.props.changeUserName}
                        handleBackButtonClick={this.changeMode}
                        goBackDestination='initial' />
      );
    } else if (this.state.mode === 'connections') {
      return (
        <ConnectionsContent handleBackButtonClick={this.changeMode}
                            goBackDestination='initial'
                            settings={this.props.settings}
                            deleteConnection={this.props.deleteConnection}
                            addConnection={this.props.addConnection} />
      );
    } else if (this.state.mode === 'preferences') {
      return (
        <PreferencesContent handleBackButtonClick={this.changeMode}
                            goBackDestination='initial'
                            settings={this.props.settings}
                            changeNewProductPosition={this.props.changeNewProductPosition} />
      );
    }
  }
  
  getSettingsPageInitialOptions() {
    return [
      {
        mode: 'profile',
        text: constants.settings.mainOptions.profile
      },
      {
        mode: 'preferences',
        text: constants.settings.mainOptions.preferences
      },
      {
        mode: 'connections',
        text: constants.settings.mainOptions.connections
      }
    ];
  }

  render() {
    return (
      <div className="settings_page_main_container">
        {this.getContent()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    settings: state.settings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeUserName: newName => dispatch(actions.changeUserName(newName)),
    deleteConnection: (connectionId, sharedListsIds) =>
      dispatch(actions.deleteConnection(connectionId, sharedListsIds)),
    addConnection: connectionId => dispatch(actions.addConnection(connectionId)),
    changeNewProductPosition: newPosition =>
      dispatch(actions.changeNewProductPosition(newPosition)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPageContainer);
