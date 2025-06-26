<template>
    <div :class="baseClass">
    <Header 
      :opened-menu="isOpenMenu"
      :opened-user-menu="isOpenUserMenu"
      :opened-whist-list="isOpenWhistList"
      :opened-shopping-cart="isOpenShoppingCart"
      @updateMenu="value => (isOpenMenu = value)"
      @updateUserMenu="value => (isOpenUserMenu = value)"
      @selectFavourite="loadProducts()"
      @updateWhistList="value => (isOpenWhistList = value)"
      @updateShoppingCart="value => (isOpenShoppingCart = value)"
      @addToCart="addToCartWhistList"
    />
    <UiProductDetailsModal
      v-if="productDetails"
      @addToCart="isOpenShoppingCart = true"
      @selectFavourite="selectFavourite"
      @close="productDetails = undefined"
      :is-open="true"
      :product="productDetails"
      :is-favourite="!!productDetails.isFavouriteUsersIds?.includes(user?._id || '')"
    />
    
    <main :class="`${baseClass}__content`">
      <h1 :class="`${baseClass}__title`">Preguntas Frecuentes</h1>
      <p :class="`${baseClass}__description`">Encuentra respuestas a las dudas más comunes sobre nuestra tienda, productos y servicios.</p>
      
      <div :class="`${baseClass}__faq-container`">
        <UiHierarchicalList
          :items="faqItems"
          :expansible="true"
          clickable
        />
      </div>
      
      <div :class="`${baseClass}__contact-info`">
        <h2>¿No encuentras lo que buscas?</h2>
        <p>Nuestro equipo de atención al cliente está aquí para ayudarte.</p>
        <router-link to="/contact" :class="`${baseClass}__contact-link`">Contáctanos</router-link>
      </div>
    </main>
    
    </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import Header from './app-header.view.vue';
  import { Product } from '@/interfaces';
  import { customService, productService } from '@/services';
  import { useProducts, useUsers } from '@/composables';
  import UiProductDetailsModal from '@/components/products/ui-product-details-modal.component.vue';
  import UiHierarchicalList from '@/components/shared/ui-hierarchical-list.component.vue';

  const baseClass = 'questions-and-answers';

  const { loadProducts } = useProducts();
  const { user } = useUsers();

  const isOpenMenu = ref(false);  
  const isOpenUserMenu = ref(false);
  const isOpenWhistList = ref(false);
  const isOpenShoppingCart = ref(false);
  const productDetails = ref<Product | undefined>(undefined);

  const contactUsCustom = ref();
  
  const faqItems = ref([
    {
      id: 1,
      label: 'Envíos y Entregas',
      subItem: [
        { id: 11, label: '¿Cuánto tarda en llegar mi pedido?', description: 'El envío tarda entre 2 y 4 días laborables. No disponemos de envío exprés.' },
        { id: 12, label: '¿Realizáis envíos internacionales?', description: 'Sí, enviamos a la mayoría de países de Europa. Consulta los plazos y tarifas en el proceso de compra.' },
        { id: 13, label: '¿Cuánto cuesta el envío?', description: 'El envío es gratuito para todos los pedidos.' }
      ]
    },
    {
      id: 2,
      label: 'Devoluciones y Reembolsos',
      subItem: [
        { id: 21, label: '¿Puedo devolver un producto?', description: 'Sí, puedes devolver cualquier producto en un plazo de 30 días desde la recepción, siempre que esté en perfecto estado.' },
        { id: 22, label: '¿Cómo solicito una devolución?', description: `Para solicitar una devolución, envía un correo electrónico a ${contactUsCustom.value?.data.sections[0]} con los detalles de tu pedido.` },
        { id: 23, label: '¿Cuándo recibiré mi reembolso?', description: 'Procesamos los reembolsos en un plazo de 3 a 5 días laborables tras recibir y comprobar el producto devuelto.' }
      ]
    },
    {
      id: 3,
      label: 'Cuenta y Pedidos',
      subItem: [
        { id: 31, label: '¿Cómo puedo seguir mi pedido?', description: 'Puedes consultar el estado de tu pedido en tu cuenta, en la sección "Mis pedidos".' },
        { id: 32, label: '¿Puedo modificar o cancelar mi pedido?', description: 'No, los pedidos no pueden ser modificados ni cancelados una vez realizados.' },
        { id: 33, label: '¿Necesito una cuenta para comprar?', description: 'No es necesario, puedes comprar como invitado. Sin embargo, tener una cuenta te permite más funcionalidades.' }
      ]
    },
    {
      id: 4,
      label: 'Pagos y Seguridad',
      subItem: [
        { id: 41, label: '¿Qué métodos de pago aceptáis?', description: 'Solo aceptamos tarjetas de crédito.' },
        { id: 42, label: '¿Es seguro comprar en vuestra tienda?', description: 'Sí, todos los pagos se procesan de forma segura y tus datos están protegidos.' },
        { id: 43, label: '¿Puedo pagar a plazos?', description: 'No, no ofrecemos pago a plazos.' }
      ]
    },
    {
      id: 5,
      label: 'Información de Productos',
      subItem: [
        { id: 51, label: '¿Vuestros productos tienen garantía?', description: 'Sí, la mayoría de nuestros productos cuentan con garantía del fabricante.' },
        { id: 52, label: '¿Dónde puedo ver las tallas y medidas?', description: 'Las tallas disponibles se muestran en cada producto. No disponemos de guía de tallas.' },
        { id: 53, label: '¿Hacéis descuentos por compras grandes?', description: 'Sí, ofrecemos descuentos para compras al por mayor. Contacta con nuestro equipo para recibir una oferta personalizada.' }
      ]
    }
  ]);

  const selectFavourite = async (favourite: boolean, product: Product) => {
    if (user.value && user.value._id && product._id) {
      const updateProduct: Product = {
        ...product,
        isFavouriteUsersIds: favourite
          ? [...(product.isFavouriteUsersIds ?? []), user.value._id]
          : product.isFavouriteUsersIds?.filter(f => f !== user.value?._id)
      };
      if (productDetails.value) {
        productDetails.value = updateProduct;
      }
      await productService.updateProduct(updateProduct);
    } else if (product._id) {
      const localFavouritesProductsIds = JSON.parse(
        localStorage.getItem('favouriteProducts') || '[]'
      ) as string[];
      if (favourite) {
        if (!localFavouritesProductsIds.includes(product._id)) {
          localFavouritesProductsIds.push(product._id);
        }
      } else {
        const index = localFavouritesProductsIds.indexOf(product._id);
        if (index !== -1) {
          localFavouritesProductsIds.splice(index, 1);
        }
      }
      localStorage.setItem('favouriteProducts', JSON.stringify(localFavouritesProductsIds));
    }
    await loadProducts();
    isOpenWhistList.value = true;
  };

  const addToCartWhistList = (product: Product) => {
    productDetails.value = product;
    isOpenWhistList.value = false;
  };

  onMounted(async () => {
    const customContactUsTexts = await customService.getCustom("contactUs");
    contactUsCustom.value = customContactUsTexts;
  });
</script>

<style scoped lang="scss">
.questions-and-answers {
  &__content {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1rem;
  }

  &__title {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--color-dark);
    margin-bottom: 1rem;
    text-align: center;
  }

  &__description {
    font-size: 1.2rem;
    color: var(--color-medium-dark);
    margin-bottom: 3rem;
    text-align: center;
  }

  &__faq-container {
    margin-bottom: 3rem;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &__contact-info {
    text-align: center;
    margin: 4rem 0;
    padding: 2rem;
    background-color: var(--color-soft-primary);
    border-radius: 10px;

    h2 {
      font-size: 1.8rem;
      margin-bottom: 1rem;
    }

    p {
      margin-bottom: 1.5rem;
    }
  }

  &__contact-link {
    display: inline-block;
    padding: 0.8rem 2rem;
    background-color: var(--color-primary);
    color: var(--color-light);
    font-weight: 600;
    border-radius: 8px;
    text-decoration: none;
    transition: background-color 0.2s;

    &:hover {
      background-color: var(--color-dark-primary);
    }
  }
}
</style>
