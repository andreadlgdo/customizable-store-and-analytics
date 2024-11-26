import { AppMessages } from './locales';

const userAsidesMessages = {
  logIn: {
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
  },
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

const productAsidesMessages = {
  cart: {
    title: 'Carrito (X)',
    empty: {
      title: 'Tu cesta esta vacia',
      description:
        'Añade productos a tu carrito para poder disfrutar de una experiencia de compra completa'
    },
    button: 'Ver la lista de deseos',
    products: {
      discount: 'Código promocional',
      buttons: {
        buy: 'Seguir comprando',
        pay: 'Realizar pedido'
      }
    }
  },
  whistList: {
    title: 'Lista de deseos (X)',
    empty: {
      title: 'Tu whist list esta vacia',
      description: 'Guarda tus favoritos para poder acceder a ellos en cualquier momento'
    },
    button: 'Ver el carrito',
    products: {
      action: 'Añadir al carrito'
    }
  },
  action: 'Ir a comprar'
};

const appMenuMessages = {
  mobile: {
    login: 'Iniciar sesion'
  },
  items: {
    home: 'Inicio',
    shop: {
      title: 'Tienda',
      subItems: {
        clothes: 'Ropa',
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
            personalData: {
              label: 'Datos personales',
              description: 'Actualiza y gestiona tu información personal.'
            }
          },
          client: {
            cart: {
              label: 'Mi carrito',
              description: 'Visualiza y modifica los productos que deseas comprar.'
            },
            orders: {
              label: 'Mis pedidos',
              description: 'Consulta el estado y detalles de tus compras anteriores.'
            },
            whistList: {
              label: 'Mi lista de deseos',
              description: 'Guarda productos que te gustaría adquirir más adelante.'
            }
          },
          admin: {
            productsManagement: {
              label: 'Gestión de productos',
              description: 'Añade, edita o elimina productos en la tienda.'
            },
            stockManagement: {
              label: 'Gestión de stock',
              description: 'Controla la disponibilidad y cantidad de productos en inventario.'
            },
            ordersManagement: {
              label: 'Gestión de pedidos',
              description: 'Supervisa y organiza los pedidos realizados por los usuarios.'
            },
            personalization: {
              label: 'Personalización',
              description: 'Ajusta la apariencia y funcionalidad de la app según tus necesidades.'
            },
            dataAnalytics: {
              label: 'Analiticas de datos',
              description:
                'Accede a informes y estadísticas para mejorar el rendimiento del negocio.'
            }
          }
        },
        goProfile: 'Ir a mi perfil',
        logOut: 'Cerrar sesión'
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
