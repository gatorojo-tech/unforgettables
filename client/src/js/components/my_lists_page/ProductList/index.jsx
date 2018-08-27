import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '../../app_level/BaseComponent/';
import constants from '../../app_level/constants.jsx';
import './product_list.css';

export default class ProductList extends BaseComponent {
  constructor(props) {
    super(props);
    
    this.state = {
      infoMode: true,
      deletionMode: false,
      shareMode: false,
      confirmShareMode: false
    };
    
    this.connectionToShareWith = null;
    
    this.bindMethod('toggleInfo', 'toggleDeletionMode', 'removeList', 'openList', 'toggleShareMode',
      'shareList', 'getConfirmationToShare', 'toggleConfirmShareMode');
  }
  
  openList() {
    this.props.openList(this.props.listData.id);
  }
  
  toggleInfo() {
    this.setState({
      infoMode: !this.state.infoMode
    });
  }
  
  toggleDeletionMode() {
    this.setState({
      deletionMode: !this.state.deletionMode
    });
  }
  
  toggleShareMode() {
    this.setState({
      shareMode: !this.state.shareMode
    });
  }
  
  toggleConfirmShareMode() {
    this.setState({
      confirmShareMode: !this.state.confirmShareMode
    });
  }
  
  removeList() {
    this.props.removeList(this.props.listData.id);
  }
  
  getConnectionsToShareWith() {
    if (!this.props.connections.length) return [];
    
    return this.props.connections.filter(connection => {
      return !this.props.listData.sharedWith.includes(connection.id);
    });
  }
  
  getConfirmationToShare(connection) {
    this.connectionToShareWith = connection;
    this.toggleConfirmShareMode();
  }
  
  shareList() {
    const {id: connectionId, name: connectionName} = this.connectionToShareWith;
    this.connectionToShareWith = null;
    
    this.setState({
      confirmShareMode: !this.state.confirmShareMode
    }, () => this.props.shareListWithConnection(this.props.listData.id, connectionId, connectionName));
  }
  
  getShareContent() {
    const connectionsToShareWith = this.getConnectionsToShareWith();
    
    if (!connectionsToShareWith.length) {
      return (
        <div className='share_content_wrapper'>
          <div className='no_available_connections'>
            {constants.myLists.noAvailableConnection}
          </div>
        </div>
      );
    }
  
    const shareConfirmationContent = !this.state.confirmShareMode ? '' :
      this.getShareConfirmationContent();
    
    const connectionsElements = connectionsToShareWith.map(connection => {
      return (
        <div className='connection_element'
             key={connection.id}
             onClick={() => this.getConfirmationToShare(connection)}>
          {connection.name}
        </div>
      );
    });
    
    return (
      <div className='share_content_wrapper'>
        <div className='sharing_instruction'>{constants.myLists.sharingInstruction}</div>
  
        <div className='share_connections_wrapper'>
          {connectionsElements}
        </div>
        
        {shareConfirmationContent}
      </div>
    );
  }
  
  getSharedUsers() {
    const { updatedConnections } = this.props.listData;
    const sharedWithUsers = [];

    for (let connectionKey in updatedConnections) {
      const connection = updatedConnections[connectionKey];

      sharedWithUsers.push(
        (<div key={connection.id}
             className='connection_name'>
          {connection.name}
        </div>)
      );
    }
    
    return (
      <div className='connections_wrapper'>
        <div className='connection_description'>{constants.myLists.connectionsDescription}</div>
        {sharedWithUsers}
      </div>
    );
  }
  
  getVerboseModeContent() {
    const creationDate = new Date(this.props.listData.creationDate);
    const lastChangeDate = new Date(this.props.listData.lastAmendmentsDate);
    const sharedUsers = !this.props.listData.sharedWith.length ? '' : this.getSharedUsers();
    
    return (
      <div className='verbose_mode_content'>
        <div className='creation_date'>
          {`${constants.myLists.listCreatedCopy} ${creationDate.toDateString()}`}
        </div>
        
        <div className='last_change_date'>
          {`${constants.myLists.listLastAmendedCopy} ${lastChangeDate.toDateString()}`}
        </div>
  
        {sharedUsers}
      </div>);
  }
  
  getShareConfirmationContent() {
    return (
      <div className='share_confirmation_content_wrapper'>
        <div className='share_confirmation_confirmation_copy'>
          {`${constants.myLists.shareListConfirmationCopy} ${this.connectionToShareWith.name}`}
        </div>
        
        <div className='share_confirmation_actions_wrapper'>
          <div className='yes_button'
               onClick={this.shareList}>
            {constants.myLists.actionButtonYesCopy}
          </div>
          
          <div className='no_button'
               onClick={this.toggleConfirmShareMode}>
            {constants.myLists.actionButtonNoCopy}
          </div>
        </div>
      </div>
    );
  }
  
  getDeletionContent() {
    return (
      <div className='deletion_content_wrapper'>
        <div className='deletion_confirmation_copy'>
          {constants.myLists.deletionConfirmationCopy}
        </div>
        
        <div className='deletion_actions_wrapper'>
          <div className='yes_button'
               onClick={this.removeList}>
            {constants.myLists.actionButtonYesCopy}
          </div>
          
          <div className='no_button'
               onClick={this.toggleDeletionMode}>
            {constants.myLists.actionButtonNoCopy}
          </div>
        </div>
      </div>
    );
  }
  
  render() {
    const listItemsNumber = this.props.listData.products.length;
    const wrapperCss = this.state.infoMode ? 'short_mode' : 'verbose_mode';
    const verboseModeContent = this.state.infoMode ? '' : this.getVerboseModeContent();
    const shareContent = this.state.shareMode ? this.getShareContent() : '';
    const deletionContent = this.state.deletionMode ? this.getDeletionContent() : '';
    
    return (
      <div className={`product_list_wrapper ${wrapperCss}`}>
        <div className='text_divs_wrapper'>
          <div className='list_title'>
            <div>{this.props.listData.title}</div>
          </div>
  
          <div className='list_items_number'>
            {`${constants.myLists.itemsInListCopy} ${listItemsNumber}`}
          </div>
        </div>
        
        <div className='list_actions_wrapper'>
          <div className='go_to_list list_action'
               onClick={this.openList}>
            <i className="fa fa-sign-in" aria-hidden="true" />
          </div>
          
          <div className='get_info list_action'
               onClick={this.toggleInfo}>
            <i className="fa fa-info" aria-hidden="true" />
          </div>
  
          <div className='share_list list_action'
               onClick={this.toggleShareMode}>
            <i className="fa fa-share-alt" aria-hidden="true" />
          </div>
          
          <div className='delete_list list_action'
               onClick={this.toggleDeletionMode}>
            <i className="fa fa-remove" aria-hidden="true" />
          </div>
        </div>
        
        {verboseModeContent}
        {shareContent}
        {deletionContent}
      </div>
    )
  }
}

ProductList.propTypes = {
  listData: PropTypes.object.isRequired,
  openList: PropTypes.func.isRequired,
  connections: PropTypes.array,
  removeList: PropTypes.func.isRequired,
  shareListWithConnection: PropTypes.func.isRequired
};
