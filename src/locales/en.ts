import { AppMessages } from './locales';

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
        error: 'The password field is empty',
        showPassword: 'Show password',
        rememberMe: 'Remember me'
      },
      generalError: 'The username or password is incorrect'
    },
    forgotPassword: 'Forgot password?',
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
        error: 'The password field is empty',
        requirements: {
          letter: 'Minium 1 letter',
          characters: 'Minium 8 characters',
          uppercase: 'Atleast 1 uppercase',
          specialCharacter: 'Atleast 1 number'
        }
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
          description: "Save products you'd like to purchase later."
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

const appMenuMessages = {
  mobile: {
    login: 'Login'
  },
  items: {
    home: 'Home',
    shop: {
      title: 'Shop',
      subItems: {
        clothes: 'Clothes',
        accessories: {
          title: 'Accessories',
          subItems: {
            bags: 'Bags',
            jewelry: 'Jewelry'
          }
        },
        shoes: 'Shoes',
        promotions: 'Promotions'
      },
      seeAll: 'See all'
    },
    contact: 'Contact',
    about: 'About',
    faq: 'FAQ'
  },
  backToMenu: 'Back to the main menu'
};

const messages: AppMessages['en'] = {
  languages: {
    es: 'Spanish',
    en: 'English',
    fr: 'French'
  },
  header: {
    searchBox: 'Search...'
  },
  landing: {
    carousel: {
      newProducts: 'New products',
      seeAll: 'See all'
    },
    properties: {
      size: 'Inclusive sizes',
      design: 'Spanish designs',
      made: 'Made in Spain',
      return: 'Free returns',
      material: 'Sustainable materials'
    }
  },
  asides: {
    shop: {
      toggle: {
        cart: 'Cart',
        whistList: 'WhistList'
      },
      empty: {
        you: 'You ',
        description: ' is empty'
      },
      categories: 'See all of them ',
      buy: 'Go shopping'
    },
    user: {
      menu: {
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
              description: "Save products you'd like to purchase later."
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
    }
  },
  userAsides: userAsidesMessages,
  productAsides: productAsidesMessages,
  menus: {
    appMenu: appMenuMessages
  },
  footer: {
    company: {
      name: 'KUSTO',
      description:
        'Clothing store with Spanish designs, inclusive sizes and sustainable materials. .'
    },
    policies: {
      title: 'Policies',
      shipping: 'Shipping policies',
      return: 'Return policies',
      privacy: 'Privacy policies',
      termsAndConditions: 'Terms and conditions'
    },
    knowUs: {
      title: 'Get to know us',
      about: 'About',
      contact: 'Contact',
      faqs: 'FAQs'
    },
    contactUs: {
      title: 'Contact us',
      email: {
        label: 'andreadlgdo',
        domain: 'hotmail.com'
      },
      phone: '+34657832444'
    },
    caption: {
      description: '2024 - Andrea ecommerce application',
      payment: {
        paypal: 'PayPal',
        visa: 'VISA'
      }
    }
  }
};

export default messages;
