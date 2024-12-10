import {
  AppMessages,
  DashboardMessages,
  GeneralMessages,
  LogInMessages,
  ShoppingCartMessages,
  SignUpMessages,
  UserMessages
} from './locales';

const shoppingCartMessages: ShoppingCartMessages = {
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
};

const generalMessages: GeneralMessages = {
  mobile: {
    login: 'Login'
  },
  items: {
    home: 'Home',
    shop: {
      title: 'Shop',
      subItems: {
        clothes: {
          title: 'Clothes',
          subItems: {
            jackets: 'Jackets',
            sweatshirts: 'Sweatshirts',
            shirts: 'Shirts',
            tops: 'Tops',
            pants: 'Jeans',
            skirts: 'Skirts',
            dresses: 'Dresses'
          }
        },
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

const dashboardMessages: DashboardMessages = {
  action: 'Go to home'
};

const userMessages: UserMessages = {
  items: {
    general: {
      personalData: 'Personal Data'
    },
    client: {
      cart: 'My Cart',
      orders: 'My Orders',
      whistList: 'My Whist List'
    },
    admin: {
      productsManagement: 'Product management',
      ordersManagement: 'Order management',
      userManagement: 'User management',
      personalization: 'Personalization',
      dataAnalytics: 'Data analytics'
    }
  },
  goProfile: 'Go to profile',
  logOut: 'Log out'
};

const logInMessages: LogInMessages = {
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
};

const signUpMessages: SignUpMessages = {
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
  products: {
    allProducts: 'All products',
    results: 'Results'
  },
  asides: {
    shoppingCart: shoppingCartMessages,
  },
  menus: {
    general: generalMessages,
    dashboard: dashboardMessages,
    user: userMessages,
    register: {
      logIn: logInMessages,
      signUp: signUpMessages
    }
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
