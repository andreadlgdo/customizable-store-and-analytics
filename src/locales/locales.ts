export interface AppMessages {
  [locale: string]: {
    languages: {
      es: string;
      en: string;
      fr: string;
    };
    header: {
      searchBox: string;
    };
    asides: {
      shop: {
        toggle: {
          cart: string;
          whistList: string;
        },
        empty: {
          you: string;
          description: string;
        },
        categories: string;
        buy: string;
      }
    };
    userAsides: UserAsideMessages;
    productAsides: ProductAsideMessages;
    menus: {
      appMenu: AppMenuMessages;
    };
  };
}

export interface UserAsideMessages {
  logIn: {
    title: string;
    inputsPlaceholders: {
      username: {
        title: string;
        error: string;
      };
      password: {
        title: string;
        error: string;
        showPassword: string;
        rememberMe: string;
      };
      generalError: string;
    };
    forgotPassword: string;
    action: string;
    signUp: {
      description: string;
      action: string;
    };
  };
  signUp: {
    title: string;
    inputsPlaceholders: {
      username: {
        title: string;
        error: {
          empty: string;
          exits: string;
        };
      };
      email: {
        title: string;
        error: {
          empty: string;
          incorrect: string;
        };
      };
      password: {
        title: string;
        error: string;
        requirements: {
          letter: string;
          characters: string;
          uppercase: string;
          specialCharacter: string;
        };
      };
      repeatPassword: {
        title: string;
        error: string;
      };
      acceptTerms: string;
    };
    checkboxText: string;
    action: string;
    logIn: {
      description: string;
      action: string;
    };
  };
  userMenu: {
    title: string;
    items: {
      general: {
        personalData: {
          label: string;
          description: string;
        };
      };
      client: {
        cart: {
          label: string;
          description: string;
        };
        orders: {
          label: string;
          description: string;
        };
        whistList: {
          label: string;
          description: string;
        };
      };
      admin: {
        productsManagement: {
          label: string;
          description: string;
        };
        stockManagement: {
          label: string;
          description: string;
        };
        ordersManagement: {
          label: string;
          description: string;
        };
        personalization: {
          label: string;
          description: string;
        };
        dataAnalytics: {
          label: string;
          description: string;
        };
      };
    };
    goProfile: string;
    logOut: string;
  };
}
export interface ProductAsideMessages {
  cart: {
    title: string;
    empty: {
      title: string;
      description: string;
    };
    button: string;
    products: {
      discount: string;
      buttons: {
        buy: string;
        pay: string;
      };
    };
  };
  whistList: {
    title: string;
    empty: {
      title: string;
      description: string;
    };
    button: string;
    products: {
      action: string;
    };
  };
  action: string;
}

export interface AppMenuMessages {
  mobile: {
    login: string;
  };
  items: {
    home: string;
    shop: {
      title: string;
      subItems: {
        clothes: string;
        accessories: {
          title: string;
          subItems: {
            bags: string;
            jewelry: string;
          };
        };
        shoes: string;
        promotions: string;
      };
    };
    contact: string;
    about: string;
    faq: string;
  };
  backToMenu: string;
}
