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
    
    <div :class="`${baseClass}__content`">
      <h1>Sobre nosotros</h1>
      
      <section :class="`${baseClass}__section`">
        <h2>Nuestra Historia</h2>
        <p>{{ defaultName }} nació de la pasión por ofrecer productos de calidad y una experiencia de compra única. Desde nuestros inicios en 2020, hemos crecido gracias a la confianza de nuestros clientes y el amor por lo que hacemos.</p>
        <p>Hoy, seguimos innovando para acercarte lo mejor en <span style="font-style: italic;">ropa</span>, siempre con atención personalizada y compromiso con la satisfacción.</p>
      </section>
      
      <section :class="`${baseClass}__section`">
        <h2>Nuestra Misión</h2>
        <p>Queremos que cada compra sea especial. Por eso, trabajamos para ofrecerte productos seleccionados, atención cercana y un servicio rápido y seguro.</p>
      </section>

      <section :class="`${baseClass}__section`">
        <h2>¿Por qué elegirnos?</h2>
        <ul :class="`${baseClass}__values`">
          <li><strong>Calidad garantizada:</strong> Solo trabajamos con los mejores materiales y marcas.</li>
          <li><strong>Atención personalizada:</strong> Estamos aquí para ayudarte en cada paso.</li>
          <li><strong>Envíos rápidos:</strong> Recibe tus productos en tiempo récord.</li>
          <li><strong>Compra segura:</strong> Tus datos y pagos están protegidos.</li>
        </ul>
      </section>

      <section :class="`${baseClass}__section`">
        <h2>Conoce al equipo</h2>
        <div :class="`${baseClass}__team-grid`">
          <div :class="`${baseClass}__team-member`">
            <div :class="`${baseClass}__image`"></div>
            <h3>Andrea</h3>
            <p>Fundadora y CEO</p>
            <p>Apasionada por la innovación y el servicio al cliente, lidero este proyecto con el objetivo de ofrecer la mejor experiencia de compra.</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { useProducts, useUsers } from '@/composables';
import { Product } from '@/interfaces';
import { customService, productService } from '@/services';

import Header from '@/views/app-header.view.vue';

import UiProductDetailsModal from '@/components/products/ui-product-details-modal.component.vue';

const baseClass = 'about-us';

const { loadProducts } = useProducts();
const { user } = useUsers();

const isOpenMenu = ref(false);  
const isOpenUserMenu = ref(false);
const isOpenWhistList = ref(false);
const isOpenShoppingCart = ref(false);
const productDetails = ref<Product | undefined>(undefined);
const defaultName = ref('Nuestra Tienda');

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

onMounted(async() => {
  const customTexts = await customService.getCustomTexts('home') as { name: string };
  defaultName.value = customTexts.name;
});
</script>

<style scoped lang="scss">
.about-us {
  &__content {
    max-width: 1200px;
    margin: 40px auto;
    padding: 0 20px;
    
    h1 {
      text-align: center;
      margin-bottom: 40px;
      font-size: 2.5rem;
    }
  }
  
  &__section {
    margin-bottom: 60px;
    
    h2 {
      margin-bottom: 20px;
      font-size: 1.8rem;
      border-bottom: 2px solid #f0f0f0;
      padding-bottom: 10px;
    }
    
    p {
      margin-bottom: 20px;
      line-height: 1.6;
      font-size: 1.1rem;
    }
  }
  
  &__team-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 30px;
    margin-top: 30px;
  }
  
  &__team-member {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
    border-radius: 8px;
    padding: 24px 16px 16px 16px;
    box-shadow: 0 2px 8px rgba(80, 80, 160, 0.06);
    border: 1px solid #ececec;
    transition: transform 0.15s, box-shadow 0.15s, border-color 0.15s;
    position: relative;
    min-height: 340px;
    
    &:hover {
      transform: translateY(-2px) scale(1.01);
      box-shadow: 0 4px 16px rgba(80, 80, 160, 0.10);
      border-color: #e0e7ff;
    }
    
    h3 {
      margin: 16px 0 4px;
      font-size: 1.15rem;
      font-weight: 600;
      color: #222;
      letter-spacing: 0.2px;
      text-align: center;
    }
    
    p {
      margin: 5px 0;
      text-align: center;
      font-size: 1rem;
      &:nth-of-type(2) {
        color: #6d6d6d;
        font-weight: 500;
        font-size: 1rem;
        margin-bottom: 8px;
      }
      &:nth-of-type(3) {
        color: #444;
        font-size: 0.97rem;
        font-weight: 400;
      }
    }
  }
  
  &__image {
    width: 90px;
    height: 90px;
    background-color: #f3f4f6;
    border-radius: 50%;
    border: 2px solid #e0e7ff;
    box-shadow: 0 1px 4px rgba(80, 80, 160, 0.05);
    margin-bottom: 10px;
    object-fit: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: #b4b4b4;
  }
  
  &__values {
    li {
      margin-bottom: 15px;
      font-size: 1.1rem;
    }
  }
}
</style>
