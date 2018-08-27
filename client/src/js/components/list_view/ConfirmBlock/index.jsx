import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '../../app_level/BaseComponent/index.jsx';
import './confirm_block.css';

export default class ConfirmBlock extends BaseComponent {
  constructor(props) {
    super(props);
    
    this.bindMethod('confirmYes', 'confirmNo');
  }
  
  confirmYes() {
    this.props.confirmYes();
  }
  
  confirmNo() {
    this.props.confirmNo();
  }
  
  render() {
    const {options} = this.props;
    const confirmBlockText = options.confirmMessage ?
      <div className="confirm_text">{options.confirmMessage}</div> : '';
    
    return (
      <div className="confirm_block">
        <div className={`confirm_button ${options.yesButtonClass}`}
             onClick={this.confirmYes}
        >
          {options.yesButtonText}
        </div>
        
        {confirmBlockText}
        
        <div className={`confirm_button ${options.noButtonClass}`}
             onClick={this.confirmNo}
        >
          {options.noButtonText}
        </div>
      </div>
    )
  }
}

ConfirmBlock.propTypes = {
  confirmNo: PropTypes.func.isRequired,
  confirmYes: PropTypes.func.isRequired,
  options: PropTypes.shape({
    yesButtonClass: PropTypes.string.isRequired,
    yesButtonText: PropTypes.string.isRequired,
    noButtonClass: PropTypes.string.isRequired,
    noButtonText: PropTypes.string.isRequired,
    confirmMessage: PropTypes.string
  }).isRequired
};
