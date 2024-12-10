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
    landing: {
      carousel: {
        newProducts: string;
        seeAll: string;
      };
      properties: {
        size: string;
        design: string;
        made: string;
        return: string;
        material: string;
      };
    };
    products: {
      allProducts: string;
      results: string;
    };
    asides: {
      shop: {
        toggle: {
          cart: string;
          whistList: string;
        };
        empty: {
          you: string;
          description: string;
        };
        categories: string;
        buy: string;
      };
      user: {
        menu: {
          items: {
            general: {
              personalData: string;
            };
            client: {
              cart: string;
              orders: string;
              whistList: string;
            };
            admin: {
              productsManagement: string;
              ordersManagement: string;
              userManagement: string;
              personalization: string;
              dataAnalytics: string;
            };
          };
          goProfile: string;
          logOut: string;
        };
      };
    };
    menus: {
      general: GeneralMessages;
      dashboard: DashboardMessages;
      register: {
        logIn: LogInMessages;
        signUp: SignUpMessages;
      };
    };
    footer: {
      company: {
        name: string;
        description: string;
      };
      policies: {
        title: string;
        shipping: string;
        return: string;
        privacy: string;
        termsAndConditions: string;
      };
      knowUs: {
        title: string;
        about: string;
        contact: string;
        faqs: string;
      };
      //TO DO: email and phone for the admin user?
      contactUs: {
        title: string;
        email: {
          label: string;
          domain: string;
        };
        phone: string;
      };
      caption: {
        description: string;
        payment: {
          paypal: string;
          visa: string;
        };
      };
    };
  };
}

export interface GeneralMessages {
  mobile: {
    login: string;
  };
  items: {
    home: string;
    shop: {
      title: string;
      subItems: {
        clothes: {
          title: string;
          subItems: {
            jackets: string;
            sweatshirts: string;
            shirts: string;
            tops: string;
            pants: string;
            skirts: string;
            dresses: string;
          };
        };
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
      seeAll: string;
    };
    contact: string;
    about: string;
    faq: string;
  };
  backToMenu: string;
}

export interface DashboardMessages {
  action: string;
}

export interface LogInMessages {
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
}

export interface SignUpMessages {
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
}
