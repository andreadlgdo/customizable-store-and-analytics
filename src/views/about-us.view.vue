<template>
  <div :class="baseClass">
    <Header 
      :opened-menu="isOpenMenu"
      :opened-user-menu="isOpenUserMenu"
      :opened-whist-list="isOpenWhistList"
      :opened-shopping-cart="isOpenShoppingCart"
      @updateMenu="value => (isOpenMenu = value)"
      @updateUserMenu="value => (isOpenUserMenu = value)"
      @selectFavourite="loadProducts([])"
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
    
    <div class="about-us-content">
      <h1>About Our Company</h1>
      
      <section class="about-section">
        <h2>Our Story</h2>
        <p>Founded in 2018, our company began with a simple idea: to create beautiful products that make people's lives better. What started as a small workshop in a garage has grown into a thriving business serving customers worldwide.</p>
        <p>Over the years, we've expanded our product line while maintaining our commitment to quality and customer satisfaction. Each item in our collection is crafted with care and attention to detail.</p>
      </section>
      
      <section class="about-section">
        <h2>Our Mission</h2>
        <p>At our core, we believe in sustainable production, ethical business practices, and creating products that stand the test of time. We're committed to reducing our environmental footprint while delivering exceptional value to our customers.</p>
        <p>Our mission is to provide innovative solutions that enhance everyday experiences while fostering a culture of creativity and respect.</p>
      </section>
      
      <section class="about-section">
        <h2>Meet Our Team</h2>
        <div class="team-grid">
          <div class="team-member">
            <div class="member-image placeholder-image"></div>
            <h3>Jane Doe</h3>
            <p>Founder & CEO</p>
            <p>Jane brings over 15 years of industry experience and a passion for design excellence.</p>
          </div>
          
          <div class="team-member">
            <div class="member-image placeholder-image"></div>
            <h3>John Smith</h3>
            <p>Head of Product Development</p>
            <p>John oversees our product innovation pipeline, ensuring quality at every stage.</p>
          </div>
          
          <div class="team-member">
            <div class="member-image placeholder-image"></div>
            <h3>Maria Garcia</h3>
            <p>Customer Experience Director</p>
            <p>Maria leads our efforts to create memorable shopping experiences for our customers.</p>
          </div>
        </div>
      </section>
      
      <section class="about-section">
        <h2>Our Values</h2>
        <ul class="values-list">
          <li><strong>Quality:</strong> We never compromise on materials or craftsmanship.</li>
          <li><strong>Innovation:</strong> We continuously explore new ideas and technologies.</li>
          <li><strong>Sustainability:</strong> We're committed to environmentally responsible practices.</li>
          <li><strong>Community:</strong> We invest in the communities where we operate.</li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Header from './app-header.view.vue';
import { Product } from '@/interfaces';
import { productService } from '@/services';
import { useProducts, useUsers } from '@/composables';
import UiProductDetailsModal from '@/components/shared/products/ui-product-details-modal.component.vue';


const baseClass = 'about-us';

const { loadProducts } = useProducts();
const { user } = useUsers();

const isOpenMenu = ref(false);  
const isOpenUserMenu = ref(false);
const isOpenWhistList = ref(false);
const isOpenShoppingCart = ref(false);
const productDetails = ref<Product | undefined>(undefined);

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
await loadProducts([]);
isOpenWhistList.value = true;
};

const addToCartWhistList = (product: Product) => {
productDetails.value = product;
isOpenWhistList.value = false;
};
</script>

<style scoped lang="scss">
.about-us {
  &-content {
    max-width: 1200px;
    margin: 40px auto;
    padding: 0 20px;
    
    h1 {
      text-align: center;
      margin-bottom: 40px;
      font-size: 2.5rem;
    }
  }
  
  .about-section {
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
  
  .team-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 30px;
    margin-top: 30px;
  }
  
  .team-member {
    background: #f9f9f9;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    
    h3 {
      margin: 15px 0 5px;
    }
    
    p {
      margin: 5px 0;
    }
  }
  
  .placeholder-image {
    width: 100%;
    height: 200px;
    background-color: #e0e0e0;
    border-radius: 4px;
  }
  
  .values-list {
    li {
      margin-bottom: 15px;
      font-size: 1.1rem;
    }
  }
}
</style>
