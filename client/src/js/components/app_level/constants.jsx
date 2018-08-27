const constants = {
  navTabs: {
    activeListTab: 'Last List',
    allListsTab: 'My Lists',
    settingsTab: 'Settings',
    saving: 'Saving',
    saved: 'Saved',
  },
  
  footer: {
    repoLinkTitle: 'Repository link',
    repoLink: 'https://github.com/gatorojo-tech/unforgettables.git',
    versionMessage: 'v 1.0.1',
  },
  
  productInput: {
    saveEditButtonText: 'Save',
    saveNewButtonText: 'Add',
    saveNewAndContinueButtonText: 'Next',
    cancelButtonText: 'Cancel'
  },

  viewList: {
    addProduct: 'Add Product',
    deleteProduct: 'Delete Product',
    clearList: 'Clear List',
    productFieldInfo: 'Name of the Product',
    commentFieldInfo: 'Comment',
    commentFieldAddition: '  -  Optional',
    newListTitle: 'New List'
  },
  
  loginPage: {
    greeting: 'Welcome to Unforgettables!',
    loginPlaceholder: 'Enter your login',
    passwordPlaceholder: 'Enter your password',
    loginButtonText: 'Sign in with Google'
  },

  startingScreenLoadingMessage: 'Loading',
  
  myLists: {
    itemsInListCopy: 'Items in list:',
    listCreatedCopy: 'Created:',
    listLastAmendedCopy: 'Last changed:',
    connectionsDescription: 'This list is shared with:',
    deletionConfirmationCopy: 'Delete List?',
    shareListConfirmationCopy: 'Do you want to share this list with',
    actionButtonYesCopy: 'Yes',
    actionButtonNoCopy: 'No',
    noAvailableConnection: 'There is no new connections to share this list with.',
    sharingInstruction: 'You can share this list with following connections:',
    addNewListMessage: 'Create New List',
  },
  
  settings: {
    pageTitle: 'Settings',
    mainOptions: {
      profile: 'Profile',
      preferences: 'Preferences',
      connections: 'Connections'
    },
    removeConnectionButton: 'Remove Connection',
    confirmConnectionButton: 'Confirm',
    addConnectionButton: 'Add Connection',
    addConnectionInfo: 'Enter ID',
    userIdErrorDescription: 'Sorry. I couldn\'t locate a single living soul with id:',
    nameInfoLabel: 'User Name',
    idInfoLabel: 'User ID',
    newProductPositionChoiceDescription: 'Where should new products be positioned?',
    newProductPositionChoiceVariantTop: 'On the top',
    newProductPositionChoiceVariantBottom: 'On the bottom'
  },
  
  appCreationYear: '2018',

  getListViewConfirmSettings() {
    return {
      editTitle: {
        yesButtonClass: 'green_button',
        yesButtonText: 'Save',
        noButtonClass: 'grey_button',
        noButtonText: 'Cancel'
      },
      clearList: {
        yesButtonClass: 'red_button',
        yesButtonText: 'Delete',
        noButtonClass: 'grey_button',
        noButtonText: 'Cancel',
        confirmMessage: 'Do you want to delete all products in this list?'
      },
      deleteProducts: {
        yesButtonClass: 'red_button',
        yesButtonText: 'Delete',
        noButtonClass: 'grey_button',
        noButtonText: 'Cancel',
        confirmMessage: 'Do you want to delete selected products?'
      }
    }
  }
};

export default constants;
