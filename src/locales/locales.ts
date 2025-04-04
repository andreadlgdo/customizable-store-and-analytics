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
      card: {
        action: string;
      };
      modal: {
        action: string;
      };
    };
    asides: {
      register: {
        form: {
          name: string;
          surname: string;
          email: {
            label: string;
            placeholder: string;
          };
          password: string;
          repeatPassword: string;
          termsAndConditions: string;
        };
        actions: {
          logIn: string;
          signUp: string;
        };
        logIn: LogInMessages;
        signUp: SignUpMessages;
      };
      whistList: {
        title: string;
        empty: {
          description: string;
          action: string;
        };
        action: string;
      };
      cart: {
        title: string;
        label: {
          size: string;
          units: string;
        };
        action: string;
        empty: {
          description: string;
          action: string;
        };
      };
    };
    order: {
      options: {
        personalData: string;
        shipping: string;
        payment: string;
        summary: string;
      };
      formData: {
        separator: string;
        action: {
          edit: string;
          save: string;
          cancel: string;
        };
      };
      address: {
        title: string;
        toggle: {
          first: string;
          second: string;
        };
      };
      payment: {
        title: string;
        owner: string;
        cardNumber: {
          label: string;
          error: string;
        };
        month: {
          label: string;
          error: string;
        };
        year: {
          label: string;
          error: string;
        };
        cvv: {
          label: string;
          error: string;
        };
      };
      completed: {
        title: string;
        action: {
          shop: string;
          orders: string;
        };
      };
      action: {
        continue: string;
        back: string;
        finish: string;
      };
    };
    dashboard: DashboardMessages;
    menus: {
      general: GeneralMessages;
      dashboard: DashboardOldMessages;
      user: UserMessages;
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
    keyword: {
      error: string;
      help: string;
    };
  };
}

export interface LogInMessages {
  title: string;
  inputsPlaceholders: {
    email: {
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
    email: {
      title: string;
      error: {
        empty: string;
        incorrect: string;
        exits: string;
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

export interface DashboardMessages {
  personalData: PersonalDataMessages;
  cart: {
    title: string;
    empty: string;
    label: string;
  }
  action: {
    save: string;
    cancel: string;
    edit: string;
  };
  products: ProductsManagementMessages;
  users: UsersManagementMessages;
  orders: OrdersManagementMessages;
}

export interface PersonalDataMessages {
  user: {
    title: string;
    label: {
      name: string;
      surname: string;
      email: string;
    };
  };
  address: {
    title: string;
    label: {
      street: string;
      number: string;
      letter: string;
      zipCode: string;
      label: string;
      city: string;
      country: string;
    };
    default: string;
    form: {
      title: string;
    };
    action: {
      add: string;
      new: string;
      remove: string;
    };
  };
}

export interface ProductsManagementMessages {
  title: {
    list: string;
    form: {
      create: string;
      edit: string;
    };
  };
  table: {
    id: string;
    name: string;
    categories: string;
    price: string;
    stock: string;
  };
  action: {
    add: string;
  };
  form: {
    id: string;
    name: string;
    description: string;
    categories: string;
    price: string;
    priceWithDiscount: string;
    quantity: string;
    onSale: string;
  };
}

export interface UsersManagementMessages {
  title: {
    list: string;
    form: {
      create: string;
      edit: string;
    };
  };
  table: {
    id: string;
    name: string;
    email: string;
    type: string;
  };
  action: {
    add: string;
  };
  form: {
    id: string;
    name: string;
    surname: string;
    email: string;
    type: string;
  };
}

export interface OrdersManagementMessages {
  title: string;
  table: {
    id: string;
    idUser: string;
    products: string;
    total: string;
    status: string;
  };
  form: {
    id: string;
    total: string;
    status: string;
    user: {
      idUser: string;
      name: string;
      email: string;
    };
    address: string;
    products: {
      title: string;
      id: string;
      name: string;
      price: string;
      units: string;
      size: string;
    };
  };
  action: {
    close: string;
  }
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

export interface DashboardOldMessages {
  action: string;
}

export interface UserMessages {
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
}
