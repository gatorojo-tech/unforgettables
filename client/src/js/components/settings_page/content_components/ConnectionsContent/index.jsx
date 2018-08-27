import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '../../../app_level/BaseComponent/index';
import SettingsBackButton from '../../shared_components/SettingsBackButton.jsx';
import constants from '../../../app_level/constants.jsx';
import './connections_content.css';

export default class ConnectionsContent extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      mode: 'show_connections'
    };
    this.setToInitialMode = false;
  
    this.bindMethod('addConnection', 'setAddConnectionMode', 'setShowConnectionsMode',
      'handleKeyPress', 'getErrorNotice');
  }
  
  componentWillUpdate(nextProps, nextState) {
    if (this.setToInitialMode) {
      nextState.mode = 'show_connections';
      this.setToInitialMode = null;
    }
  }

  getErrorNotice(connection) {
    const description = `${constants.settings.userIdErrorDescription} ${connection.id}`;
    return (
      <div className="connection_row error"
           key={connection.id}
      >
        <div className='error_description'>
          {description}
        </div>
      </div>)
  }

  formatConnections() {
    return this.props.settings.connections.map(connection => {
      if (connection.error) return this.getErrorNotice(connection);
      return (
        <div className="connection_row"
             key={connection.id}
        >
          <div className="connection_name"
               title={connection.name}
          >
            {connection.name}
          </div>
          <div className="connection_id">{connection.id}</div>
          <i className="close_button fa fa-times"
             title={constants.settings.removeConnectionButton}
             onClick={() => {
               this.props.deleteConnection(connection.id, connection.sharedListsIds)
             }} />
        </div>)
    });
  }
  
  setAddConnectionMode() {
    this.setState({mode: 'add_connection'});
  }
  
  setShowConnectionsMode() {
    this.setState({mode: 'show_connections'});
  }
  
  isAlreadyIncluded(connectionId) {
    return !this.props.settings.connections.every(connection => connection.id !== connectionId);
  }

  addConnection() {
    if (this.newConnectionInput.value && !this.isAlreadyIncluded(this.newConnectionInput.value) &&
      this.newConnectionInput.value !== this.props.settings.userId) {
      this.setToInitialMode = true;
      this.props.addConnection(this.newConnectionInput.value);
    } else {
      this.setShowConnectionsMode();
    }
  }

  getAddNewConnectionRow() {
    return this.state.mode === 'add_connection' ? this.getAddConnectionForm()
      : this.getAddConnectionButton();
  }
  
  getAddConnectionButton() {
    return (
      <div className="connection_row add_connection_wrapper">
        <div className="add_connection_button"
             title={constants.settings.addConnectionButton}
             onClick={this.setAddConnectionMode}
        >
          {constants.settings.addConnectionButton}
        </div>
      </div>);
  }
  
  getAddConnectionForm() {
    return (
      <div className="connection_row">
        <div className="connection_name">
          {constants.settings.addConnectionInfo}
        </div>
    
        <input className="connection_id_input"
               ref={r => { this.newConnectionInput = r }}
               onKeyPress={this.handleKeyPress}
               autoFocus />
    
        <i className="confirm_connection_button fa fa-check"
           title={constants.settings.confirmConnectionButton}
           onClick={this.addConnection} />
      </div>);
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.addConnection();
    } else if (e.key === 'Esc') {
      this.addConnection();
    }
  }

  render() {
    return (
      <div className="profile_content_container">
        <div className="settings_title">{constants.settings.mainOptions.connections}</div>
        <SettingsBackButton handleClick={this.props.handleBackButtonClick}
                            goBackDestination={this.props.goBackDestination} />

        <div className="connections_block">
          {this.formatConnections()}
          {this.getAddNewConnectionRow()}
        </div>
      </div>
    );
  }
}

ConnectionsContent.propTypes = {
  handleBackButtonClick: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    connections: PropTypes.array.isRequired
  }).isRequired,
  deleteConnection: PropTypes.func.isRequired,
  addConnection: PropTypes.func.isRequired
};
