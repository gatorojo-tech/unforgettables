import React from 'react';
import {Link, IndexLink} from 'react-router';
import {connect} from 'react-redux';
import BaseComponent from '../../app_level/BaseComponent/';
import constants from '../constants.jsx';
import './navbar.css';

class Navbar extends BaseComponent {
  constructor(props) {
    super(props);

    this.bindMethod('checkForAvailableLists');
  }

  checkForAvailableLists(e) {
    if (!this.props.areProductListsAvailable) e.preventDefault();
  }

  render() {
    const disableButtonClass = this.props.areProductListsAvailable ? '' : 'disabled_link';
    const saveMessage = this.props.saveNeeded ? constants.navTabs.saving : constants.navTabs.saved;
    const saveNotificationColor = this.props.saveNeeded ? 'saving' : 'saved';

    return (
      <div className="navbar">
        <div className="navbar_container">
          <nav>
            <IndexLink to="/"
                       className={`link_wrapper ${disableButtonClass}`}
                       activeClassName="active_link"
                       title={constants.navTabs.activeListTab}
                       onClick={this.checkForAvailableLists}
            >
              <i className="nav_link_image fa fa-file-text-o" />
              <span className="nav_link_description">{constants.navTabs.activeListTab}</span>
            </IndexLink>

            <Link to="/my_lists"
                  className="link_wrapper"
                  activeClassName="active_link"
                  title={constants.navTabs.allListsTab}
            >
              <i className="nav_link_image fa fa-files-o" />
              <span className="nav_link_description">{constants.navTabs.allListsTab}</span>
            </Link>

            <div className={`save_notification_wrapper ${saveNotificationColor}`}>
              <i className="nav_link_image fa fa-save" />
              <span className="save_notification_description">{saveMessage}</span>
            </div>

            <Link to="/settings"
                  className="link_wrapper settings_link"
                  activeClassName="active_link"
                  title={constants.navTabs.settingsTab}
            >
              <i className="nav_link_image fa fa-cog" />
              <span className="nav_link_description">{constants.navTabs.settingsTab}</span>
            </Link>
          </nav>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    areProductListsAvailable: !!state.productLists.length,
    saveNeeded: state.saveCheck.saveNeeded || false,
  };
}

export default connect(mapStateToProps)(Navbar);
