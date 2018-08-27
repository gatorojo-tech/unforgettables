import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Footer from '../Footer/';
import Navbar from '../Navbar/';
import LoginForm from '../../login_page/LoginForm';
import LoadingDataInfo from '../../login_page/LoadingDataInfo';
import * as actions from "../../../redux/actions";
import BaseComponent from '../../app_level/BaseComponent/';

class MainContainer extends BaseComponent {
  componentDidMount() {
    this.props.fetchUser();
  }

  renderContent() {
    switch (this.props.auth) {
      case null:
        return <LoadingDataInfo />;

      case false:
        return <LoginForm />;

      default:
        return (
          <div id="unf_app">
            <Navbar/>
            {React.cloneElement(this.props.pageContent, this.props)}
            <Footer/>
          </div>
        );
    }
  }

  render() {
    return this.renderContent();
  }
}


function mapStateToProps(state) {
  return {
    auth: state.settings && !!state.settings.userId
  };
}

export default connect(mapStateToProps, actions)(MainContainer);

MainContainer.propTypes = {
  pageContent: PropTypes.element.isRequired
};