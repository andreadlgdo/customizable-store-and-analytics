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
      <h1 :class="`${baseClass}__title`">Frequently Asked Questions</h1>
      <p :class="`${baseClass}__description`">Find answers to the most common questions about our products and services.</p>
      
      <div :class="`${baseClass}__faq-container`">
        <UiHierarchicalList
          :items="faqItems"
          :expansible="true"
          @clickItem="handleFaqClick"
        />
      </div>
      
      <div :class="`${baseClass}__contact-info`">
        <h2>Can't find what you're looking for?</h2>
        <p>Our customer service team is here to help.</p>
        <a href="mailto:support@example.com" :class="`${baseClass}__contact-link`">Contact Us</a>
      </div>
    </main>
    
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
  import Header from './app-header.view.vue';
  import { Product } from '@/interfaces';
  import { productService } from '@/services';
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

  const faqItems = ref([
    {
      id: 1,
      label: 'Shipping & Delivery',
      subItem: [
        { id: 11, label: 'How long does shipping take?', description: 'Standard shipping takes 3-5 business days. Express shipping takes 1-2 business days.' },
        { id: 12, label: 'Do you ship internationally?', description: 'Yes, we ship to most countries worldwide. International shipping typically takes 7-14 business days.' },
        { id: 13, label: 'How much does shipping cost?', description: 'Standard shipping is free for orders over $50. For orders under $50, shipping costs $5.99. Express shipping is available for an additional fee.' }
      ]
    },
    {
      id: 2,
      label: 'Returns & Refunds',
      subItem: [
        { id: 21, label: 'What is your return policy?', description: 'You can return any unused item within 30 days of delivery for a full refund.' },
        { id: 22, label: 'How do I start a return?', description: 'To start a return, go to your order history and select the items you wish to return. Print the return label and drop off your package at any post office.' },
        { id: 23, label: 'How long do refunds take?', description: 'Once we receive your return, refunds are processed within 3-5 business days. It may take an additional 2-7 days for the funds to appear in your account.' }
      ]
    },
    {
      id: 3,
      label: 'Account & Orders',
      subItem: [
        { id: 31, label: 'How do I track my order?', description: 'You can track your order by logging into your account and viewing your order history. You will also receive tracking information via email once your order ships.' },
        { id: 32, label: 'Can I change or cancel my order?', description: 'You can modify or cancel your order within 1 hour of placing it. After that, please contact customer service for assistance.' },
        { id: 33, label: 'Do I need an account to place an order?', description: 'No, you can check out as a guest. However, creating an account allows you to track orders, save favorites, and enjoy a faster checkout experience.' }
      ]
    },
    {
      id: 4,
      label: 'Payment & Security',
      subItem: [
        { id: 41, label: 'What payment methods do you accept?', description: 'We accept all major credit cards, PayPal, Apple Pay, and Google Pay.' },
        { id: 42, label: 'Is my payment information secure?', description: 'Yes, all payment information is encrypted and we never store your full credit card details.' },
        { id: 43, label: 'Do you offer financing options?', description: 'Yes, we offer financing through Affirm for orders over $100. Apply at checkout to see if you qualify.' }
      ]
    },
    {
      id: 5,
      label: 'Product Information',
      subItem: [
        { id: 51, label: 'Are your products covered by warranty?', description: 'Most products come with a manufacturer\'s warranty. Check the product description for specific warranty information.' },
        { id: 52, label: 'How can I find product dimensions?', description: 'Product dimensions are listed in the "Specifications" section of each product page.' },
        { id: 53, label: 'Do you offer bulk discounts?', description: 'Yes, we offer discounts for bulk orders. Please contact our sales team for a custom quote.' }
      ]
    }
  ]);

  const handleFaqClick = (item: any) => {
    console.log('FAQ item clicked:', item);
    // You can implement custom behavior here if needed
  };

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
