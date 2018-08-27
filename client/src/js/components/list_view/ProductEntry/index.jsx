import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import BaseComponent from '../../app_level/BaseComponent/';
import './product_entry.css';

export default class ProductEntry extends BaseComponent {
  constructor(props) {
    super(props);

    this.bindMethod('editProduct');
  }

  editProduct(event) {
    event.stopPropagation();
    if (!this.props.product.bought) {
      this.props.onEdit(this.props.product);
    }
  }

  render() {
    const {product} = this.props;
    const containerClasses = classNames('product_container',
      {
        item_to_delete: this.props.productToDelete && this.props.mode === 'deleteProducts',
        bought_item: product.bought
      });
    const boughtNotBoughtClass = classNames({'fa-pencil': !product.bought, 'fa-check': product.bought});

    return (
      <div className={containerClasses}
           onClick={() => {
             this.props.reportSelection(product.id)
           }}
      >
        <div className="product_name">
          <div className="name_wrapper">
            {product.name}
          </div>
        </div>
        <div className="product_comment">
          <div className="comment_wrapper">
            {product.comment}
          </div>
        </div>
        <div className="edit_product"
             onClick={this.editProduct}
        >
          <i className={`fa ${boughtNotBoughtClass}`} />
        </div>
      </div>
    )
  }
}

ProductEntry.propTypes = {
  mode: PropTypes.string.isRequired,
  reportSelection: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  product: PropTypes.shape({
    comment: PropTypes.string,
    date: PropTypes.number,
    id: PropTypes.string,
    name: PropTypes.string
  }),
  productToDelete: PropTypes.bool.isRequired
};
