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
  title: 'Se connecter',
  inputsPlaceholders: {
    email: {
      title: 'E-mail',
      error: 'Le champ email est vide'
    },
    password: {
      title: 'Mot de passe',
      error: 'Le champ du mot de passe est vide',
      showPassword: 'Afficher le mot de passe',
      rememberMe: 'Souviens-toi de moi'
    },
    generalError: "Le e-mail ou le mot de passe n'est pas correct"
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
    email: {
      title: 'E-mail',
      error: {
        empty: 'Le champ email est vide',
        incorrect: "L'e-mail est incorrect",
        exits: "L'e-mail existe déjà"
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
  user: {
    title: 'Données personnelles',
    label: {
      name: 'Nom',
      surname: 'Prénom',
      email: 'E-mail'
    }
  },
  address: {
    title: 'Adresses de livraison',
    label: {
      street: 'Rue',
      number: 'Numéro',
      letter: 'Lettre',
      zipCode: 'Code postal',
      label: 'Étiquette',
      city: 'Ville',
      country: 'Pays'
    },
    default: 'Défaut',
    form: {
      title: 'Nouvelle adresse'
    },
    action: {
      add: 'Ajouter une adresse',
      new: 'Ajouter',
      remove: 'Éliminer'
    }
  }
};

const productsManagementMessages: ProductsManagementMessages = {
  title: {
    list: 'Gestion des produits',
    form: {
      create: 'Ajouter un produit',
      edit: 'Modifier un produit'
    }
  },
  table: {
    id: 'ID',
    name: 'Nom',
    categories: 'Catégories',
    price: 'Prix',
    stock: 'Stock'
  },
  action: {
    add: 'Ajouter un produit'
  },
  form: {
    id: 'ID',
    name: 'Nom',
    description: 'Description',
    categories: 'Catégories',
    price: 'Prix',
    priceWithDiscount: 'Prix avec réduction',
    uniqueSize: 'Taille unique',
    stock: 'Stock',
    quantity: 'Quantité',
    onSale: 'Reduced'
  }
};

const usersManagementMessages: UsersManagementMessages = {
  title: {
    list: 'Gestion des utilisateurs',
    form: {
      create: 'Ajouter un utilisateur',
      edit: 'Modifier un utilisateur'
    }
  },
  table: {
    id: 'ID',
    name: 'Nom',
    email: 'Courriel',
    type: 'Type'
  },
  action: {
    add: 'Ajouter utilisateur'
  },
  form: {
    id: 'ID',
    name: 'Nom',
    surname: 'Nom de famille',
    email: 'Email',
    type: 'Gars'
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

const dashboardOldMessages: DashboardOldMessages = {
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
    results: 'produits',
    card: {
      action: 'Ajouter'
    },
    modal: {
      action: 'Ajouter au panier'
    }
  },
  asides: {
    register: {
      form: {
        name: 'Nom',
        surname: 'Nom de famille',
        email: {
          label: 'E-mail',
          placeholder: 'e-amil@exemple.com'
        },
        password: 'Mot de passe',
        repeatPassword: 'Répéter le mot de passe',
        termsAndConditions: "J'accepte les termes et conditions"
      },
      actions: {
        logIn: 'Se connecter',
        signUp: 'Inscription'
      },
      logIn: logInMessages,
      signUp: signUpMessages
    },
    whistList: {
      title: 'Liste de souhaits',
      empty: {
        description: "Vous n'avez pas encore ajouté de produits à votre liste de souhaits.",
        action: 'Voir les produits'
      },
      action: 'Ajouter au panier'
    },
    cart: {
      title: 'Votre panier',
      label: {
        size: 'Taille',
        unique: 'unique',
        units: 'Unités'
      },
      action: 'Traiter la commande',
      empty: {
        description: "Il n'y a pas encore de produits dans votre panier.",
        action: 'Voir les produits'
      }
    }
  },
  order: {
    options: {
      personalData: 'Données personnelles',
      shipping: 'Expédition',
      payment: 'Paiement',
      summary: 'Résumé'
    },
    formData: {
      separator: 'Ou si vous préférez, continuez sans vous inscrire',
      action: {
        edit: 'Modifier les données',
        save: 'Enregistrer',
        cancel: 'Annuler'
      }
    },
    address: {
      title: 'Adresse postale',
      toggle: {
        first: 'Adresses enregistrées',
        second: 'Nouvelle adresse'
      }
    },
    payment: {
      title: 'Données de la carte',
      owner: 'Titulaire de la carte',
      cardNumber: {
        label: 'Numéro de carte',
        error: 'Numéro de carte invalide'
      },
      month: {
        label: 'Mois',
        error: 'Mois invalide'
      },
      year: {
        label: 'Année',
        error: 'Année invalide'
      },
      cvv: {
        label: 'CVV',
        error: 'CVV invalide'
      }
    },
    completed: {
      title: 'Commande terminée',
      action: {
        shop: 'Continuer les achats',
        orders: 'Mes commandes'
      }
    },
    action: {
      continue: 'Continuer',
      back: 'Retour',
      finish: 'Finaliser la commande'
    }
  },
  dashboard: {
    personalData: personalDataMessages,
    cart: {
      title: 'Votre panier',
      empty: 'Le panier est vide',
      label: 'Prix total'
    },
    action: {
      save: 'Enregistrer',
      cancel: 'Annuler',
      edit: 'Modifier'
    },
    products: productsManagementMessages,
    users: usersManagementMessages,
    orders: {
      title: 'Gestion des commandes',
      table: {
        id: 'ID commande',
        idUser: 'User ID',
        products: 'Produits',
        total: 'Prix',
        status: 'Status'
      },
      form: {
        id: 'ID Commande',
        total: 'Prix total',
        status: 'Status',
        user: {
          idUser: 'ID Utilisateur',
          name: 'Nom',
          email: 'E-mail'
        },
        address: 'Adresse postale',
        products: {
          title: 'Produits',
          id: 'ID Produit',
          name: 'Nom',
          price: 'Prix',
          units: 'Unités',
          size: 'Taille'
        }
      },
      action: {
        close: 'Fermer'
      }
    }
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
  },
  keyword: {
    error: 'Ce mot-clé a déjà été ajouté',
    help: 'Utilisez des points-virgules (;) pour ajouter plusieurs catégories'
  }
};
export default messages;
