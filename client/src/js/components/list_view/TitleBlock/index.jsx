import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '../../app_level/BaseComponent/';
import utils from '../../app_level/utils';
import './title_block.css';

export default class TitleBlock extends BaseComponent {
  constructor(props) {
    super(props);
    
    this.bindMethod('getTitleBlockContent', 'setEditTitleMode', 'handleKeyPress');
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.props.confirmYes();
    } else if (e.key === 'Esc') {
      this.props.confirmNo();
    }
  }

  getTitleBlockContent() {
    if (this.props.mode === 'editTitle') {
      return (
        <input
          className="list_title"
          defaultValue={this.props.title}
          autoFocus
          onKeyPress={this.handleKeyPress}
          onFocus={e => utils.setCursorToEnd(e)}
          ref={r => { this.titleInput = r }} />
      )
    }

    return (
      <div
        className="list_title"
        onClick={this.setEditTitleMode}
      >
        <div>{this.props.title}</div>
      </div>
    )
  }

  setEditTitleMode() {
    if (this.props.mode === 'showList') {
      this.props.setEditTitleMode('editTitle');
    }
  }

  render() {
    const titleBlockContent = this.getTitleBlockContent();
    
    return (
      <div className="title_block">
        {titleBlockContent}
      </div>
    )
  }
}

TitleBlock.propTypes = {
  title: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  setEditTitleMode: PropTypes.func,
  confirmNo: PropTypes.func.isRequired,
  confirmYes: PropTypes.func.isRequired,
};
