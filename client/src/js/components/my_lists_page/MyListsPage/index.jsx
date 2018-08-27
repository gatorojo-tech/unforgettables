import React from 'react';
import {connect} from 'react-redux';
import BaseComponent from '../../app_level/BaseComponent/';
import ProductList from '../ProductList/';
import * as actions from '../../../redux/actions/';
import constants from '../../app_level/constants.jsx';
import './my_lists_page_container.css';

class MyListsPage extends BaseComponent {
  constructor(props) {
    super(props);
    
    this.bindMethod('openList', 'processAddNewList');
  }
  
  openList(listId) {
    this.props.positionListAsFirst(listId);
    this.props.router.push('/');
  }
  
  getContent() {
    return this.props.productLists.map(list => {
      return (<ProductList key={list.id}
                          listData={list}
                          openList={this.openList}
                          connections={this.props.connections}
                          removeList={this.props.removeList}
                          shareListWithConnection={this.props.shareListWithConnection} />);
    });
  }

  getAddNewListElement() {
    return (
      <div className='product_list_wrapper add_new_list_button_wrapper'>
        <div className='add_new_list_button'
             onClick={this.processAddNewList}
        >
          {constants.myLists.addNewListMessage}
        </div>
      </div>
    );
  }

  processAddNewList() {
    this.props.addNewList();
  }
  
  render() {
    return (
      <div className="my_lists_page_main_container">
        {this.getContent()}
        {this.getAddNewListElement()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    productLists: state.productLists,
    connections: state.settings.connections
  };
}

function mapDispatchToProps(dispatch) {
  return {
    positionListAsFirst: listId => dispatch(actions.positionListAsFirst(listId)),
    removeList: listId => dispatch(actions.removeList(listId)),
    shareListWithConnection: (listId, connectionId, connectionName) =>
      dispatch(actions.shareListWithConnection(listId, connectionId, connectionName)),
    addNewList: () => dispatch(actions.addNewList()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyListsPage);
