import { AppMessages } from './locales';

const userAsidesMessages = {
  logIn: {
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
  },
  signUp: {
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
  }
};

const productAsidesMessages = {
  cart: {
    title: 'Panier (X)',
    empty: {
      title: 'Votre panier est vide',
      description:
        "Ajoutez des produits à votre panier pour profiter d'une expérience d'achat complète"
    },
    button: 'Afficher la liste de souhaits',
    products: {
      discount: 'Code promotionnel',
      buttons: {
        buy: 'Continuer mes achats',
        pay: 'Passer la commande'
      }
    }
  },
  whistList: {
    title: 'Liste de souhaits (X)',
    empty: {
      title: 'Votre liste de souhaits est vide',
      description: 'Enregistrez vos favoris pour pouvoir y accéder à tout moment'
    },
    button: 'Voir le panier',
    products: {
      action: 'Ajouter au panier'
    }
  },
  action: 'faire du shopping'
};

const appMenuMessages = {
  mobile: {
    login: 'Se connecter'
  },
  items: {
    home: 'Commencer',
    shop: {
      title: 'Magasin',
      subItems: {
        clothes: 'Vêtements',
        accessories: {
          title: 'Accessoires',
          subItems: {
            bags: 'Sacs',
            jewelry: 'Bijoux'
          }
        },
        shoes: 'Chaussures',
        promotions: 'Promotions'
      }
    },
    contact: 'Contact',
    about: 'À propos de nous',
    faq: 'Questions fréquemment posées'
  },
  backToMenu: 'Retour au menu principal'
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
    }
  },
  asides: {
    shop: {
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
    },
    user: {
      menu: {
        items: {
          general: {
            personalData: {
              label: 'Données personnelles',
              description: 'Mettez à jour et gérez vos informations personnelles.'
            }
          },
          client: {
            cart: {
              label: 'Mon panier',
              description: 'Visualisez et modifiez les produits que vous souhaitez acheter.'
            },
            orders: {
              label: 'Mes commandes',
              description: 'Vérifiez le statut et les détails de vos achats précédents.'
            },
            whistList: {
              label: 'Ma liste de souhaits',
              description: 'Enregistrez les produits que vous souhaitez acheter plus tard.'
            }
          },
          admin: {
            productsManagement: {
              label: 'Gestion des produits',
              description: 'Ajoutez, modifiez ou supprimez des produits dans la boutique.'
            },
            stockManagement: {
              label: 'Gestion des stocks',
              description: 'Contrôler la disponibilité et la quantité des produits en inventaire.'
            },
            ordersManagement: {
              label: 'Gestion des commandes',
              description: 'Surveiller et organiser les commandes passées par les utilisateurs.'
            },
            personalization: {
              label: 'Personnalisation',
              description:
                "Ajustez l'apparence et les fonctionnalités de l'application en fonction de vos besoins."
            },
            dataAnalytics: {
              label: 'Analyse des données',
              description:
                'Accédez à des rapports et des statistiques pour améliorer les performances de votre entreprise.'
            }
          }
        },
        goProfile: 'Aller sur mon profil',
        logOut: 'Se déconnecter'
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
