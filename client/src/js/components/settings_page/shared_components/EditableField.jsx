import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '../../app_level/BaseComponent/';
import utils from '../../app_level/utils';
import './editable_field.css';

export default class EditableField extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      mode: 'show',
      userName: this.props.text
    };

    this.bindMethod('handleCLick', 'handleKeyPress');
  }

  handleCLick(modeToSwitchOn) {
    if (modeToSwitchOn === 'show' && this.props.userName !== this.inputField.value) {
      this.props.changeUserName(this.inputField.value);
    }
    this.setState({mode: modeToSwitchOn});
  }

  getActionButton() {
    if (this.state.mode === 'show') {
      return (
        <div className='edit_field_action edit fa fa-pencil'
             onClick={() => {
               this.handleCLick('edit')
             }} />
      )
    } else if (this.state.mode === 'edit') {
      return (
        <div className='edit_field_action save fa fa-check'
             onClick={() => {
               this.handleCLick('show')
             }} />
      )
    }
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleCLick('show');
    } else if (e.key === 'Esc') {
      this.handleCLick('show');
    }
  }

  getContent() {
    if (this.state.mode === 'show') {
      return <div className="edit_field_content">{this.props.userName}</div>
    } else if (this.state.mode === 'edit') {
      return (
        <input className="edit_field_content"
               ref={r => {
                 this.inputField = r
               }}
               defaultValue={this.props.userName}
               onKeyPress={this.handleKeyPress}
               autoFocus
               onFocus={e => utils.setCursorToEnd(e)} />
      )
    }
  }

  render() {
    const additionalCssClass = this.props.cssClass ? this.props.cssClass : '';
    const editClass = this.state.mode === 'edit' ? 'edit_mode' : '';

    return (
      <div className={`edit_field ${additionalCssClass} ${editClass}`}>
        {this.getActionButton()}
        {this.getContent()}
      </div>
    )
  }
}

EditableField.propTypes = {
  userName: PropTypes.string,
  cssClass: PropTypes.string,
  changeUserName: PropTypes.func.isRequired
};
