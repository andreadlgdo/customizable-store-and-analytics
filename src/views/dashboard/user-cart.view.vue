<template>
  <dashboard :selected-item="menuElements[1]">
    <div :class="baseClass">
      <h1 :class="`${baseClass}__text ${baseClass}__text--title`">
        {{ t('dashboard.cart.title') }}
      </h1>
      <UiLoading v-if="loading" />   
      <!-- Empty State -->
      <template v-else-if="!openOrder">
        <div :class="`${baseClass}__empty-state`">
          <p :class="`${baseClass}__text ${baseClass}__text--empty`">
            Aun no hay ningun producto en el carrito
          </p>
          <ui-button
            @click="router.push('/products')"
            text="Empezar a comprar"
            :class="`${baseClass}__button`"
          />
        </div>
      </template>
      <!-- Cart Content -->
      <template v-else>
        <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--column`">
          <!-- Cart Items -->
          <div
            v-for="product in openOrder.products"
            :key="product.productId"
            :class="`${baseClass}__wrapper ${baseClass}__wrapper--row ${baseClass}__wrapper--content`"
          >
            <UiImage
              :image="findProduct(product.productId)?.imageUrl"
              type="semi-round"
              size="small"
            />
            <div :class="`${baseClass}__content`">
              <h3 :class="`${baseClass}__text ${baseClass}__text--name`">
                {{ findProduct(product.productId)?.name }}
              </h3>
              <p>
                {{ formatPrice(findProduct(product.productId)) }}
              </p>
            </div>
            <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--button`">
              <UiSelect 
                :value="product.units"
                :options="[{ title: product.units }]"
                :class="`${baseClass}__select`" 
                disabled 
              />
              <h3 :class="`${baseClass}__text ${baseClass}__text--price`">
                {{ formatTotalPrice(product) }}
              </h3>
              <UiIconButton icon="heart" />
              <UiIconButton icon="delete" @click="deleteOrderProduct(product.id || product.productId)" />
            </div>
          </div>
          <hr />
          <!-- Cart Summary -->
          <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--row`">
            <p :class="`${baseClass}__text ${baseClass}__text--label`">
              {{ t('dashboard.cart.label') }}
            </p>
            <p :class="`${baseClass}__text ${baseClass}__text--label`">
              {{ formatPrice({ price: openOrder?.total }) }}
            </p>
          </div>
          <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--button`">
            <ui-button
              @click="router.push('/products')"
              text="Seguir comprando"
              :class="`${baseClass}__button`"
              transparent
            />
            <ui-button
              @click="router.push('/order')"
              :text="t('asides.cart.action')"
              :class="`${baseClass}__button`"
            />
          </div>
          <!-- Related Products -->
          <div v-if="relatedCategoriesWithCardProduct.length" :class="`${baseClass}__carrousel`">
            <UiProductCarrousel 
              title="Completa tu pedido" 
              :products="relatedCategoriesWithCardProduct" 
            />
          </div>
        </div>
      </template>
    </div>
  </dashboard>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

import UiLoading from '@/components/shared/ui-loading.component.vue';
import UiImage from '@/components/shared/ui-image.component.vue';
import UiSelect from '@/components/shared/ui-select.component.vue';
import UiIconButton from '@/components/shared/ui-icon-button.component.vue';
import UiButton from '@/components/shared/ui-button.component.vue';
import UiProductCarrousel from '@/components/products/ui-product-carrousel.component.vue';

import { useCart, useCategories, useProducts, useRecommendations, useUserMenu } from '@/composables';
import Dashboard from '@/views/dashboard/base-dashboard.view.vue';
import { productService } from '@/services';
import { Product } from '@/interfaces';

const { menuElements } = useUserMenu();
const { openOrder, loadUserOrders, deleteProduct } = useCart();
const { loadProducts, findProduct } = useProducts();
const { processCategories } = useRecommendations();
const { getRelatedIdCategories, loadCategories } = useCategories()

const router = useRouter();
const { t } = useI18n();

const baseClass = 'user-cart';

const loading = ref(false);
const relatedCategoriesWithCardProduct = ref<Product[]>([]);

const allCategories = computed<string[]>(() => {
  if (!openOrder.value?.products) return [];
  const categories = new Set<string>();
  
  openOrder.value.products.forEach(product => {
    const productInfo = findProduct(product.productId);
    productInfo?.categories?.forEach(category => {
      categories.add(category);
    });
  });
  
  return Array.from(categories);
});

const formatPrice = (product?: Partial<Product>): string => {
  const price = product?.priceWithDiscount ?? product?.price ?? 0;
  return `${price} €`;
};

const formatTotalPrice = (product: { productId: string; units: string }): string => {
  const productInfo = findProduct(product.productId);
  const price = productInfo?.priceWithDiscount ?? productInfo?.price ?? 0;
  return `${Number(product.units) * price} €`;
};

const deleteOrderProduct = async (productId: string) => {
  await deleteProduct(productId);
};

const loadRelatedCategories = async () => {
  const productCategories = await processCategories(allCategories.value ?? []);
  let relatedCategories = await getRelatedIdCategories(productCategories);
  relatedCategories = relatedCategories.filter((cat: string) => !productCategories.includes(cat));
  relatedCategoriesWithCardProduct.value = await productService.getCategoriesWithProductCount(relatedCategories, 5);
};

watch(
  () => openOrder.value?.products,
  async () => {
    if (openOrder.value?.products) {
      await loadRelatedCategories();
    }
  },
  { deep: true }
);

onMounted(async () => {
  try {
    loading.value = true;
    await Promise.all([
      loadProducts(),
      loadUserOrders(),
      loadCategories()
    ]);
    
    await loadRelatedCategories();
  } finally {
    loading.value = false;
  }
});
</script>

<style lang="scss" scoped>
.user-cart {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem;
  height: 100%;
  width: calc(100% - 400px);
  padding-bottom: 2rem;

  &__empty-state {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 85%;
    text-align: center;
    gap: 1rem;
  }

  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;

    &--column {
      flex-direction: column;
      overflow-y: scroll;
    }

    &--content {
      padding: 1rem;
      border: 1px solid var(--color-dark-primary);
      border-radius: 20px;
      width: 100%;
    }

    &--button {
      justify-content: flex-end;
    }
  }

  &__content {
    width: 100%;
  }

  &__text {
    font-weight: bold;

    &--title {
      padding-bottom: 1rem;
    }

    &--price {
      width: 3rem;
    }

    &--label {
      font-size: 22px;
    }

    &--empty {
      font-size: 1.5rem;
    }

    &--category {
      background-color: var(--color-primary);
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      margin: 0 0.25rem;
    }
  }

  &__select {
    width: 5rem;
    margin-right: 1rem;
  }

  &__button {
    width: 12rem;
    align-self: center;
  }

  &__carrousel {
    width: 100%;
  }
}
</style>
