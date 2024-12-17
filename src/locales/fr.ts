import {
  AppMessages,
  DashboardMessages,
  GeneralMessages,
  LogInMessages,
  PersonalDataMessages,
  ShoppingCartMessages,
  SignUpMessages,
  UserMessages
} from './locales';

const shoppingCartMessages: ShoppingCartMessages = {
  toggle: {
    cart: 'Panier',
    whistList: 'WhistList'
  },
  empty: {
    you: 'Toi ',
    description: " c'est vide"
  },
  categories: 'Voir tous les ',
  buy: 'Continuer mes achats'
};

const logInMessages: LogInMessages = {
  title: 'Se connecter',
  inputsPlaceholders: {
    username: {
      title: "Nom d'utilisateur",
      error: "Le champ du nom d'utilisateur est vide"
    },
    password: {
      title: 'Mot de passe',
      error: 'Le champ du mot de passe est vide',
      showPassword: 'Afficher le mot de passe',
      rememberMe: 'Souviens-toi de moi'
    },
    generalError: "Le nom d'utilisateur ou le mot de passe n'est pas correct"
  },
  forgotPassword: 'Avez-vous oublié votre mot de passe ?',
  action: 'Se connecter',
  signUp: {
    description: "Vous n'avez pas encore de compte ?",
    action: 'Registre'
  }
};

const signUpMessages: SignUpMessages = {
  title: 'Inscription des utilisateurs',
  inputsPlaceholders: {
    username: {
      title: "Nom d'utilisateur",
      error: {
        empty: "Le champ du nom d'utilisateur est vide",
        exits: "Le nom d'utilisateur existe déjà"
      }
    },
    email: {
      title: 'E-mail',
      error: {
        empty: 'Le champ email est vide',
        incorrect: "L'e-mail est incorrect"
      }
    },
    password: {
      title: 'Mot de passe',
      error: 'Le champ du mot de passe est vide',
      requirements: {
        letter: 'Au moins une lettre',
        characters: 'Minimum 8 caractères',
        uppercase: 'Au moins une lettre majuscule',
        specialCharacter: 'Au moins un numéro'
      }
    },
    repeatPassword: {
      title: 'Répéter le mot de passe',
      error: 'Les mots de passe ne correspondent pas'
    },
    acceptTerms: 'Vous devez accepter les termes et conditions'
  },
  checkboxText: 'Accepter les termes et conditions',
  action: 'Registre',
  logIn: {
    description: 'Avez-vous déjà un compte ?',
    action: 'Se connecter'
  }
};

const personalDataMessages: PersonalDataMessages = {
  personal: {
    title: 'Données personnelles',
    label: {
      username: 'Nombre de usuario',
      email: 'E-mail',
      password: 'Mot de passe'
    },
    action: 'Modifier'
  }
};

const generalMessages: GeneralMessages = {
  mobile: {
    login: 'Se connecter'
  },
  items: {
    home: 'Commencer',
    shop: {
      title: 'Magasin',
      subItems: {
        clothes: {
          title: 'Vêtements',
          subItems: {
            jackets: 'Vestes',
            sweatshirts: 'Sweat-shirts',
            shirts: 'Chemises',
            tops: 'Tops',
            pants: 'Pantalon',
            skirts: 'Jupes',
            dresses: 'Vêtements'
          }
        },
        accessories: {
          title: 'Accessoires',
          subItems: {
            bags: 'Sacs',
            jewelry: 'Bijoux'
          }
        },
        shoes: 'Chaussures',
        promotions: 'Promotions'
      },
      seeAll: 'Voir tout'
    },
    contact: 'Contact',
    about: 'À propos de nous',
    faq: 'Questions fréquemment posées'
  },
  backToMenu: 'Retour au menu principal'
};

const dashboardMessages: DashboardMessages = {
  action: 'Aller à la maison'
};

const userMessages: UserMessages = {
  items: {
    general: {
      personalData: 'Données personnelles'
    },
    client: {
      cart: 'Mon panier',
      orders: 'Mes commandes',
      whistList: 'Ma liste de souhaits'
    },
    admin: {
      productsManagement: 'Gestion des produits',
      ordersManagement: 'Gestion des commandes',
      userManagement: 'Gestion des utilisateurs',
      personalization: 'Personnalisation',
      dataAnalytics: 'Analyse des données'
    }
  },
  goProfile: 'Aller sur mon profil',
  logOut: 'Se déconnecter'
};

const messages: AppMessages['fr'] = {
  languages: {
    es: 'Espagnol',
    en: 'Anglais',
    fr: 'Français'
  },
  header: {
    searchBox: 'Rechercher...'
  },
  landing: {
    carousel: {
      newProducts: 'Nouveaux produits',
      seeAll: 'Voir tout'
    },
    properties: {
      size: 'Tailles comprises',
      design: 'Modèles espagnols',
      made: 'Fabriqué en Espagne',
      return: 'Retours gratuits',
      material: 'Matériaux durables'
    }
  },
  products: {
    allProducts: 'Tous les produits',
    results: 'Résultats'
  },
  asides: {
    shoppingCart: shoppingCartMessages,
    register: {
      logIn: logInMessages,
      signUp: signUpMessages
    }
  },
  dashboard: {
    personalData: personalDataMessages,
    emptyView: {
      title: 'c\'est vide',
      action: 'Continuer mes achats'
    }
  },
  menus: {
    general: generalMessages,
    dashboard: dashboardMessages,
    user: userMessages
  },
  footer: {
    company: {
      name: 'KUSTO',
      description:
        'Magasin de vêtements avec des designs espagnols, des tailles inclusives et des matériaux durables.'
    },
    policies: {
      title: 'Politiques',
      shipping: "Politiques d'expédition",
      return: 'Politiques de retour',
      privacy: 'Politiques de confidentialité',
      termsAndConditions: 'Termes et conditions'
    },
    knowUs: {
      title: 'Apprenez à nous connaître',
      about: 'À propos de nous',
      contact: 'Contact',
      faqs: 'Questions fréquemment posées'
    },
    contactUs: {
      title: 'Contact',
      email: {
        label: 'andreadlgdo',
        domain: 'hotmail.com'
      },
      phone: '+34657832444'
    },
    caption: {
      description: '2024 - Application de commerce électronique Andrea',
      payment: {
        paypal: 'PayPal',
        visa: 'VISA'
      }
    }
  }
};

export default messages;
