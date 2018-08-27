import React from 'react';
import {connect} from 'react-redux';
import BaseComponent from '../../app_level/BaseComponent/';
import ConfirmBlock from '../ConfirmBlock/';
import TitleBlock from '../TitleBlock/';
import ProductEntry from '../ProductEntry/';
import ProductInputForm from '../ProductInputForm/';
import constants from '../../app_level/constants.jsx';
import * as actions from '../../../redux/actions/';
import './list_view_contatainer.css';

class ListViewContainer extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      mode: 'showList',
      productsToDelete: []
    };

    this.bindMethod('getConfirmBlockContent', 'changeTitle', 'getProducts', 'clearList',
      'deleteProducts', 'selectProduct', 'setDeleteProductsMode', 'getNewProductForm',
      'processForm', 'editProductEntry', 'getActionRow', 'setNewMode', 'onConfirmBlockYes',
      'onConfirmBlockNo');

    this.currentList = this.props.productLists[0] ? this.props.productLists[0] : {};
    this.confirmSettings = constants.getListViewConfirmSettings();
    this.setModeTo = null;
  }

  componentWillMount() {
    if (!this.props.productLists.length) {
      this.props.router.push('/my_lists');
    }
  }
  
  componentWillUpdate(nextProps, nextState) {
    this.currentList = nextProps.productLists[0] ? nextProps.productLists[0] : {};
    
    if (this.setModeTo) {
      nextState.mode = this.setModeTo;
      this.setModeTo = null;
    }
  
    if (this.state.mode === 'deleteProducts' && nextState.mode === 'showList') {
      nextState.productsToDelete = [];
    }
  }
  
  setNewMode(newMode) {
    this.setState(
      () => { return {mode: newMode} }
    );
  }
  
  onConfirmBlockYes() {
    if (this.state.mode === 'editTitle') {
      this.changeTitle();
    } else if (this.state.mode === 'clearList') {
      this.clearList();
    } else if (this.state.mode === 'deleteProducts') {
      this.deleteProducts();
    } else {
      throw Error('Strange behaviour onConfirmBlockYes. Mode:', this.state.mode);
    }
  }
  
  onConfirmBlockNo() {
    this.setNewMode('showList');
  }

  getConfirmBlockContent() {
    if (this.state.mode in this.confirmSettings) {
      return (
        <ConfirmBlock options={this.confirmSettings[this.state.mode]}
                      confirmYes={this.onConfirmBlockYes}
                      confirmNo={this.onConfirmBlockNo} />
      );
    }
    return '';
  }

  changeTitle() {
    this.setModeTo = 'showList';
    const newTitle = this.titleBlock.titleInput.value;
    const saveNeeded = this.currentList.title !== newTitle;
    this.props.changeCurrentListTitle(newTitle, saveNeeded);
  }
  
  clearList() {
    this.setModeTo = 'showList';
    this.props.clearCurrentList();
  }
  
  deleteProducts() {
    this.setModeTo = 'showList';
    const saveNeeded = !!this.state.productsToDelete.length;
    this.props.deleteSelectedProducts(this.state.productsToDelete, saveNeeded);
  }

  getProducts() {
    const notSelectedProducts = this.currentList.products.filter(product => {
      return !product.bought
    });
    const selectedProducts = this.currentList.products.filter(product => {
      return product.bought
    });
    const productArray = [].concat(...notSelectedProducts).concat(...selectedProducts);

    return productArray.map(product => {
      const productToDelete = this.state.productsToDelete.includes(product.id);
      
      return (
        <ProductEntry key={product.id}
                      product={product}
                      reportSelection={this.selectProduct}
                      productToDelete={productToDelete}
                      mode={this.state.mode}
                      onEdit={this.editProductEntry} />
      )
    })
  }

  editProductEntry(productToEdit) {
    if (this.state.mode === 'showList') {
      this.productToEdit = productToEdit;
      this.setState({
        mode: 'editProduct'
      }, () => {
        this.productToEdit = null
      });
    }
  }

  selectProduct(productId) {
    if (!(this.state.mode === 'deleteProducts' || this.state.mode === 'showList')) {
      return;
    }
    
    if (this.state.mode === 'deleteProducts') {
      this.toggleProductToDelete(productId);
    } else if (this.state.mode === 'showList') {
      this.props.markProductAsBought(productId);
    }
  }
  
  toggleProductToDelete(productId) {
    this.setState(oldState => {
      let updatedProductsToDelete;
      
      if (!oldState.productsToDelete.includes(productId)) {
        updatedProductsToDelete = [...oldState.productsToDelete, productId];
      } else {
        const indexToRemove = oldState.productsToDelete.indexOf(productId);
        updatedProductsToDelete = [...oldState.productsToDelete.slice(0, indexToRemove),
          ...oldState.productsToDelete.slice(indexToRemove + 1)];
      }
      
      return {
        productsToDelete: updatedProductsToDelete
      };
    });
  }

  setDeleteProductsMode() {
    this.setNewMode('deleteProducts');
  }

  getNewProductForm() {
    if (this.state.mode === 'editProduct') {
      return (
        <ProductInputForm productToEdit={this.productToEdit}
                          processForm={this.processForm}
                          addProduct={this.props.addProduct} />
      )
    }
    return '';
  }

  processForm(newProductData, actionToProcess, saveNeeded) {
    if (!newProductData) {
      this.setState({mode: 'showList'});
      return;
    }

    this.setModeTo = actionToProcess === 'next' ? 'editProduct' : 'showList';

    if (actionToProcess === 'add' || actionToProcess === 'next') {
      this.props.addProduct(newProductData, this.props.newProductPosition);
    } else if (actionToProcess === 'edit') {
      this.props.editProduct(newProductData, saveNeeded);
    }
  }

  getActionRow() {
    return this.state.mode === 'showList' ?
      <div className="action_row">
        <div className="add_product action_button"
             onClick={() => {
               this.setState({mode: 'editProduct'})
             }}
        >
          {constants.viewList.addProduct}
        </div>
        <div className="delete_product action_button"
             onClick={this.setDeleteProductsMode}
        >
          {constants.viewList.deleteProduct}
        </div>
        <div className="clear_list action_button"
             onClick={() => {
               this.setState({mode: 'clearList'})
             }}
        >
          {constants.viewList.clearList}
        </div>
      </div> : null;
  }

  render() {
    if (!this.props.productLists.length) return '';

    const confirmBlockContent = this.getConfirmBlockContent();
    const newProductForm = this.getNewProductForm();
    const products = this.getProducts();
    const actionRow = this.getActionRow();

    return (
      <div className="list_view_main_container">
        <div className="title_confirm_row">
          <TitleBlock title={this.currentList.title}
                      mode={this.state.mode}
                      setEditTitleMode={this.setNewMode}
                      confirmYes={this.onConfirmBlockYes}
                      confirmNo={this.onConfirmBlockNo}
                      ref={r => { this.titleBlock = r }} />
          {confirmBlockContent}
        </div>

        {actionRow}

        <div className="product_form_container">{newProductForm}</div>

        <div className="product_list_container">{products}</div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    productLists: state.productLists,
    newProductPosition: state.settings.preferences.newProductPosition,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeCurrentListTitle: (newTitle, saveNeeded) =>
      dispatch(actions.changeCurrentListTitle(newTitle, saveNeeded)),
    clearCurrentList: () => dispatch(actions.clearCurrentList()),
    deleteSelectedProducts: (products, saveNeeded) =>
      dispatch(actions.deleteSelectedProducts(products, saveNeeded)),
    addProduct: (productData, position) => dispatch(actions.addProduct(productData, position)),
    editProduct: (productData, saveNeeded) =>
      dispatch(actions.editProduct(productData, saveNeeded)),
    markProductAsBought: productId => dispatch(actions.markProductAsBought(productId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListViewContainer);
