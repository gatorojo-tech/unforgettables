import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '../../app_level/BaseComponent/';
import utils from '../../app_level/utils.jsx';
import constants from '../../app_level/constants.jsx';
import './product_input_form.css';

export default class ProductInputForm extends BaseComponent {
  constructor(props) {
    super(props);

    this.bindMethod('handleSubmit', 'createProductId', 'handleKeyPress');
  }

  gatherFormData() {
    const id = this.currentProduct.id || this.createProductId();

    return {
      id,
      name: this.productName.value,
      comment: this.comment.value,
      date: Date.now()
    };
  }

  clearFormValues() {
    this.productName.value = '';
    this.comment.value = '';
  }

  checkIfSaveNeeded(newProduct) {
    return newProduct.name !== this.currentProduct.name ||
      newProduct.comment !== this.currentProduct.comment;
  }

  handleSubmit(actionToProcess) {
    if (!this.productName.value) return;

    const product = this.gatherFormData();
    const saveNeeded = this.checkIfSaveNeeded(product);
    this.clearFormValues();

    if (this.props.productToEdit) {
      this.props.processForm(product, 'edit', saveNeeded);
    } else {
      this.props.processForm(product, actionToProcess);
    }
  }

  createProductId() {
    return utils.createUniqueId();
  }

  getNextButton() {
    return this.props.productToEdit ? null : (
      <div className="action_button"
           onClick={() => { this.handleSubmit('next') }}
      >
        {constants.productInput.saveNewAndContinueButtonText}
      </div>
    );
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSubmit('add');
    } else if (e.key === 'Esc') {
      this.props.processForm(null)
    }
  }

  render() {
    this.currentProduct = this.props.productToEdit || {};
    const submitText = this.props.productToEdit ? constants.productInput.saveEditButtonText
      : constants.productInput.saveNewButtonText;
    const nextButton = this.getNextButton();

    return (
      <div className="product_form"
           onKeyPress={this.handleKeyPress} >
        <div className="name_block">
          <div className="label">{constants.viewList.productFieldInfo}</div>
          <input className="product_name"
                 ref={r => { this.productName = r }}
                 defaultValue={this.currentProduct.name} />
        </div>

        <div className="action_block">
          <div className="action_button"
               onClick={() => { this.handleSubmit('add') }}
          >
            {submitText}
          </div>

          {nextButton}

          <div className="action_button"
               onClick={() => { this.props.processForm(null) }}
          >
            {constants.productInput.cancelButtonText}
          </div>
        </div>

        <div className="comment_block">
          <div className="label">
            {constants.viewList.commentFieldInfo}
            <span className="optional">{constants.viewList.commentFieldAddition}</span>
          </div>
          <textarea className="comment"
                    ref={r => { this.comment = r }}
                    defaultValue={this.currentProduct.comment} />
        </div>
      </div>
    )
  }
}

ProductInputForm.propTypes = {
  processForm: PropTypes.func.isRequired,
  productToEdit: PropTypes.shape({
    comment: PropTypes.string,
    date: PropTypes.number,
    id: PropTypes.string,
    name: PropTypes.string
  })
};
