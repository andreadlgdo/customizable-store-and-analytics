import { AppMessages } from './locales';

const libraryMessages = {
  title: 'Libreria de componentes',
  toggle: {
    language: 'Cambio de idioma',
    theme: 'Cambio de tema'
  },
  icons: {
    button: 'Botones de Iconos',
    svg: 'Iconos SVG'
  },
  inputs: {
    text: {
      title: 'Inputs de texto',
      password: 'Input Contraseña'
    },
    button: 'Botones',
    checkbox: 'Checkboxes'
  },
  asides: {
    title: 'Asides'
  },
  header: {
    title: 'Cabecera'
  },
  products: {
    title: {
      whistList: 'Whist List Tarjetas de productos',
      cart: 'Carrito Tarjetas de productos'
    }
  }
};

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
        error: 'El campo contraseña esta vacio'
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
  },
  userMenu: {
    title: '¡Hola!',
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
          description: 'Accede a informes y estadísticas para mejorar el rendimiento del negocio.'
        }
      }
    },
    goProfile: 'Ir a mi perfil',
    logOut: 'Cerrar sesión'
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

const messages: AppMessages['es'] = {
  library: libraryMessages,
  header: {
    searchBox: 'Buscar...'
  },
  userAsides: userAsidesMessages,
  productAsides: productAsidesMessages,
  mobile: {
    menu: {
      login: 'Iniciar sesion'
    }
  }
};

export default messages;
