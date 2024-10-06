import { AppMessages } from './locales';

const libraryMessages = {
  title: 'Component library',
  toggle: {
    language: 'Language Toggle',
    theme: 'Theme Toggle'
  },
  icons: {
    button: 'Button Icons',
    svg: 'SVG Icons'
  },
  inputs: {
    text: {
      title: 'Text Inputs',
      password: 'Password Input'
    },
    button: 'Buttons',
    checkbox: 'Checkboxes'
  },
  asides: {
    title: 'Asides'
  },
  header: {
    title: 'Header'
  },
  products: {
    title: {
      whistList: 'Whist List Products cards',
      cart: 'Cart Products cards'
    }
  }
};

const userAsidesMessages = {
  logIn: {
    title: 'Log in',
    inputsPlaceholders: {
      username: {
        title: 'Username',
        error: 'The username field is empty'
      },
      password: {
        title: 'Password',
        error: 'The password field is empty'
      },
      generalError: 'The username or password is incorrect'
    },
    forgotPassword: 'Have you forgotten your password?',
    action: 'Log in',
    signUp: {
      description: "Don't have an account yet?",
      action: 'Sign up'
    }
  },
  signUp: {
    title: 'Sign up',
    inputsPlaceholders: {
      username: {
        title: 'Username',
        error: {
          empty: 'The username field is empty',
          exits: 'The username already exists'
        }
      },
      email: {
        title: 'Email',
        error: {
          empty: 'The email field is empty',
          incorrect: 'The email is not correct'
        }
      },
      password: {
        title: 'Password',
        error: 'The password field is empty'
      },
      repeatPassword: {
        title: 'Repeat password',
        error: 'The password fields do not match'
      },
      acceptTerms: 'You must accept the terms and conditions to sign up'
    },
    checkboxText: 'Accept terms and conditions',
    action: 'Sign up',
    logIn: {
      description: 'Already have an account?',
      action: 'Log in'
    }
  },
  userMenu: {
    title: 'Hello!',
    items: {
      general: {
        personalData: {
          label: 'Personal Data',
          description: 'Update and manage your personal information.'
        }
      },
      client: {
        cart: {
          label: 'My Cart',
          description: 'View and modify the products you want to buy.'
        },
        orders: {
          label: 'My Orders',
          description: 'Check the status and details of your previous purchases.'
        },
        whistList: {
          label: 'My Whist List',
          description: 'Save products you\'d like to purchase later.'
        }
      },
      admin: {
        productsManagement: {
          label: 'Product management',
          description: 'Add, edit or delete products in the store.'
        },
        stockManagement: {
          label: 'Stock management',
          description: 'Control the availability and quantity of products in inventory.'
        },
        ordersManagement: {
          label: 'Order management',
          description: 'Monitors and organizes orders placed by users.'
        },
        personalization: {
          label: 'Personalization',
          description: 'Adjust the appearance and functionality of the app to suit your needs.'
        },
        dataAnalytics: {
          label: 'Data analytics',
          description: 'Access reports and statistics to improve business performance.'
        }
      }
    },
    goProfile: 'Go to profile',
    logOut: 'Log out'
  }
};

const productAsidesMessages = {
  cart: {
    title: 'Cart (X)',
    empty: {
      title: 'Your cart is empty',
      description: 'Add products to your cart to enjoy a complete shopping experience'
    },
    button: 'Move to whist list',
    products: {
      discount: 'Promo code',
      buttons: {
        buy: 'Go shopping',
        pay: 'Place order'
      }
    }
  },
  whistList: {
    title: 'Whist List (X)',
    empty: {
      title: 'Your whist list is empty',
      description: 'Save your favorites to access them at any time'
    },
    button: 'Move to cart',
    products: {
      action: 'Add to cart'
    }
  },
  action: 'Go shopping'
};

const messages: AppMessages['en'] = {
  library: libraryMessages,
  header: {
    searchBox: 'Search...'
  },
  userAsides: userAsidesMessages,
  productAsides: productAsidesMessages,
  mobile: {
    menu: {
      login: 'Login'
    }
  }
};

export default messages;
