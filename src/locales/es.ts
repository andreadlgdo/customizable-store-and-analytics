import { AppMessages, DashboardMessages, GeneralMessages, LogInMessages } from './locales';

const userAsidesMessages = {
  signUp: {
    title: 'Registro de usuario',
    inputsPlaceholders: {
      username: {
        title: 'Nombre de usuario',
        error: {
          empty: 'El campo nombre de usuario esta vacio',
          exits: 'El nombre de usuario ya existe'
        }
      },
      email: {
        title: 'Correo electronico',
        error: {
          empty: 'El campo correo electronico esta vacio',
          incorrect: 'El correo electronico es incorrecto'
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

const dashboardMessages: DashboardMessages = {
  action: 'Volver al inicio'
};

const logInMessages: LogInMessages = {
  title: 'Inicio de sesion',
  inputsPlaceholders: {
    username: {
      title: 'Nombre de usuario',
      error: 'El campo nombre de usuario esta vacio'
    },
    password: {
      title: 'Contraseña',
      error: 'El campo contraseña esta vacio',
      showPassword: 'Mostrar contraseña',
      rememberMe: 'Recuerdame'
    },
    generalError: 'El usuario o la contraseña no son correctos'
  },
  forgotPassword: '¿Has olvidado tu contraseña?',
  action: 'Iniciar sesión',
  signUp: {
    description: '¿No tienes cuenta aun?',
    action: 'Registrate'
  }
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
    results: 'Resultados'
  },
  asides: {
    shop: {
      toggle: {
        cart: 'Carrito',
        whistList: 'WhistList'
      },
      empty: {
        you: 'Tu ',
        description: ' esta vacia'
      },
      categories: 'Ver todos los ',
      buy: 'Continuar comprando'
    },
    user: {
      menu: {
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
      }
    }
  },
  userAsides: userAsidesMessages,
  menus: {
    general: generalMessages,
    dashboard: dashboardMessages,
    register: {
      logIn: logInMessages
    }
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
  }
};

export default messages;
