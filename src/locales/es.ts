import {
  AppMessages,
  DashboardOldMessages,
  GeneralMessages,
  LogInMessages,
  PersonalDataMessages,
  ProductsManagementMessages,
  SignUpMessages,
  UserMessages,
  UsersManagementMessages
} from './locales';

const logInMessages: LogInMessages = {
  title: 'Inicio de sesion',
  inputsPlaceholders: {
    email: {
      title: 'Correo electronico',
      error: 'El campo correo electronico esta vacio'
    },
    password: {
      title: 'Contraseña',
      error: 'El campo contraseña esta vacio',
      showPassword: 'Mostrar contraseña',
      rememberMe: 'Recuerdame'
    },
    generalError: 'El email o la contraseña no son correctos'
  },
  forgotPassword: '¿Has olvidado tu contraseña?',
  action: 'Iniciar sesión',
  signUp: {
    description: '¿No tienes cuenta aun?',
    action: 'Registrate'
  }
};

const signUpMessages: SignUpMessages = {
  title: 'Registro de usuario',
  inputsPlaceholders: {
    email: {
      title: 'Correo electronico',
      error: {
        empty: 'El campo correo electronico esta vacio',
        incorrect: 'El correo electronico es incorrecto',
        exits: 'El correo electronico ya existe'
      }
    },
    password: {
      title: 'Contraseña',
      error: 'El campo contraseña esta vacio',
      requirements: {
        letter: 'Minimo una letra',
        characters: 'Minimo 8 caracteres',
        uppercase: 'Al menos una mayuscula',
        specialCharacter: 'Al menos un numero'
      }
    },
    repeatPassword: {
      title: 'Repetir contraseña',
      error: 'Las contraseñas no coinciden'
    },
    acceptTerms: 'Debes aceptar los terminos y condiciones'
  },
  checkboxText: 'Aceptar terminos y condiciones',
  action: 'Registrarse',
  logIn: {
    description: '¿Ya tienes cuenta?',
    action: 'Inicia sesion'
  }
};

const personalDataMessages: PersonalDataMessages = {
  user: {
    title: 'Datos personales',
    label: {
      name: 'Nombre',
      surname: 'Apellido',
      email: 'Email'
    }
  },
  address: {
    title: 'Direcciones de envio',
    label: {
      street: 'Calle',
      number: 'Numero',
      letter: 'Letra',
      zipCode: 'Código postal',
      label: 'Etiqueta',
      city: 'Ciudad',
      country: 'Pais'
    },
    default: 'Por defecto',
    form: {
      title: 'Nueva dirección'
    },
    action: {
      add: 'Añadir dirección',
      new: 'Añadir',
      remove: 'Eliminar'
    }
  }
};

const productsManagementMessages: ProductsManagementMessages = {
  title: {
    list: 'Gestión de productos',
    form: {
      create: 'Añadir producto',
      edit: 'Editar producto'
    }
  },
  table: {
    id: 'ID',
    name: 'Nombre',
    categories: 'Categorias',
    price: 'Precio',
    stock: 'Cantidad'
  },
  action: {
    add: 'Añadir producto'
  },
  form: {
    id: 'ID',
    name: 'Nombre',
    description: 'Descripción',
    categories: 'Categorias',
    price: 'Precio',
    priceWithDiscount: 'Precio con descuento',
    quantity: 'Cantidad',
    onSale: 'Rebajado'
  }
};

const usersManagementMessages: UsersManagementMessages = {
  title: {
    list: 'Gestión de usuarios',
    form: {
      create: 'Añadir usuario',
      edit: 'Editar usuario'
    }
  },
  table: {
    id: 'ID',
    name: 'Nombre',
    email: 'Email',
    type: 'Tipo'
  },
  action: {
    add: 'Añadir usuario'
  },
  form: {
    id: 'ID',
    name: 'Nombre',
    surname: 'Apellido',
    email: 'Email',
    type: 'Tipo'
  }
};

const generalMessages: GeneralMessages = {
  mobile: {
    login: 'Iniciar sesion'
  },
  items: {
    home: 'Inicio',
    shop: {
      title: 'Tienda',
      subItems: {
        clothes: {
          title: 'Ropa',
          subItems: {
            jackets: 'Chaquetas',
            sweatshirts: 'Sudaderas',
            shirts: 'Camisetas',
            tops: 'Tops',
            pants: 'Pantalones',
            skirts: 'Faldas',
            dresses: 'Vestidos'
          }
        },
        accessories: {
          title: 'Accesorios',
          subItems: {
            bags: 'Bolsos',
            jewelry: 'Joyas'
          }
        },
        shoes: 'Zapatos',
        promotions: 'Promociones'
      },
      seeAll: 'Ver todo'
    },
    contact: 'Contacto',
    about: 'Conocenos',
    faq: 'Preguntas frecuentes'
  },
  backToMenu: 'Volver al menu principal'
};

const dashboardOldMessages: DashboardOldMessages = {
  action: 'Volver al inicio'
};

const userMessages: UserMessages = {
  items: {
    general: {
      personalData: 'Datos personales'
    },
    client: {
      cart: 'Mi carrito',
      orders: 'Mis pedidos',
      whistList: 'Mi lista de deseos'
    },
    admin: {
      productsManagement: 'Gestión de productos',
      ordersManagement: 'Gestión de pedidos',
      userManagement: 'Gestión de usuarios',
      personalization: 'Personalización',
      dataAnalytics: 'Analiticas de datos'
    }
  },
  goProfile: 'Ir a mi perfil',
  logOut: 'Cerrar sesión'
};

const messages: AppMessages['es'] = {
  languages: {
    es: 'Español',
    en: 'Ingles',
    fr: 'Frances'
  },
  header: {
    searchBox: 'Buscar...'
  },
  landing: {
    carousel: {
      newProducts: 'Nuevos productos',
      seeAll: 'Ver todo'
    },
    properties: {
      size: 'Tallas inclusivas',
      design: 'Diseños españoles',
      made: 'Hecho en España',
      return: 'Devolución gratuita',
      material: 'Materiales sostenibles'
    }
  },
  products: {
    allProducts: 'Todos los productos',
    results: 'productos',
    card: {
      action: 'Añadir'
    },
    modal: {
      action: 'Añadir a la cesta'
    }
  },
  asides: {
    register: {
      form: {
        name: 'Nombre',
        surname: 'Apellido',
        email: {
          label: 'Correo electronico',
          placeholder: 'Correo electronico'
        },
        password: 'Contraseña',
        repeatPassword: 'Repetir contraseña',
        termsAndConditions: 'Acepto los terminos y condiciones'
      },
      actions: {
        logIn: 'Iniciar sesion',
        signUp: 'Registrarse'
      },
      logIn: logInMessages,
      signUp: signUpMessages
    },
    whistList: {
      title: 'Lista de deseos',
      empty: {
        description: 'Aun no has añadido ningun producto a tu lista de deseos',
        action: 'Ver productos'
      },
      action: 'Añadir a la cesta'
    },
    cart: {
      title: 'Tu carrito',
      label: {
        size: 'Talla',
        units: 'Unidades'
      },
      action: 'Tramitar pedido',
      empty: {
        description: 'Aun no hay ningun producto en tu cesta',
        action: 'Ver productos'
      }
    }
  },
  order: {
    options: {
      personalData: 'Datos personales',
      shipping: 'Envio',
      payment: 'Pago',
      summary: 'Resumen'
    },
    formData: {
      separator: 'O si lo prefieres continua sin registrarte',
      action: {
        edit: 'Editar datos',
        save: 'Guardar',
        cancel: 'Cancelar'
      }
    },
    address: {
      title: 'Dirección de envio',
      toggle: {
        first: 'Direcciones guardadas',
        second: 'Nueva dirección'
      }
    },
    payment: {
      title: 'Datos de la tarjeta',
      owner: 'Titular de la tarjeta',
      cardNumber: {
        label: 'Numero de tarjeta',
        error: 'Numero de tarjeta invalido'
      },
      month: {
        label: 'Mes',
        error: 'Mes invalido'
      },
      year: {
        label: 'Año',
        error: 'Año invalido'
      },
      cvv: {
        label: 'CVV',
        error: 'CVV invalido'
      }
    },
    completed: {
      title: 'Pedido completado',
      action: {
        shop: 'Seguir comprando',
        orders: 'Mis pedidos'
      }
    },
    action: {
      continue: 'Continuar',
      back: 'Atras',
      finish: 'Finalizar pedido'
    }
  },
  dashboard: {
    personalData: personalDataMessages,
    emptyView: {
      title: 'esta vacia',
      action: 'Seguir comprando'
    },
    action: {
      save: 'Guardar',
      cancel: 'Cancelar',
      edit: 'Editar'
    },
    products: productsManagementMessages,
    users: usersManagementMessages
  },
  menus: {
    general: generalMessages,
    dashboard: dashboardOldMessages,
    user: userMessages
  },
  footer: {
    company: {
      name: 'KUSTO',
      description:
        'Tienda de ropa con diseños españoles, tallas inclusivas y materiales sostenibles.'
    },
    policies: {
      title: 'Politicas',
      shipping: 'Politica de envio',
      return: 'Politica de devolución',
      privacy: 'Politica de privacidad',
      termsAndConditions: 'Terminos y condiciones'
    },
    knowUs: {
      title: 'Conocenos',
      about: 'Sobre nosotros',
      contact: 'Contacto',
      faqs: 'Preguntas frecuentes'
    },
    contactUs: {
      title: 'Contactanos',
      email: {
        label: 'andreadlgdo',
        domain: 'hotmail.com'
      },
      phone: '+34657832444'
    },
    caption: {
      description: '2024 - Aplicación de comercio electrónico Andrea',
      payment: {
        paypal: 'PayPal',
        visa: 'VISA'
      }
    }
  },
  keyword: {
    error: 'Esta palabra clave ya ha sido añadida',
    help: 'Utilice punto y coma (;) para agregar varias categorías'
  }
};

export default messages;
