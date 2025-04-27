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
    <div :class="`${baseClass}__content`">
      <h1 :class="`${baseClass}__title`">
        {{ t('contactUs.title') }}
      </h1>

      <div :class="`${baseClass}__form-container`">
        <form :class="`${baseClass}__form`" @submit.prevent="submitForm">
          <div :class="`${baseClass}__form-group`">
            <UiTextbox
              @input="value => (contactForm.name = value)"
              :value="contactForm.name"
              :label="t('contactUs.form.name.label')"
              :placeholder="t('contactUs.form.name.placeholder')"
            />
          </div>
          
          <div :class="`${baseClass}__form-group`">
            <UiTextbox
              @input="value => (contactForm.email = value)"
              :value="contactForm.email"
              :label="t('contactUs.form.email.label')"
              :placeholder="t('contactUs.form.email.placeholder')"
              :error="emailError"
            />
          </div>
          
          <div :class="`${baseClass}__form-group`">
            <UiTextbox
              @input="value => (contactForm.subject = value)"
              :value="contactForm.subject"
              :label="t('contactUs.form.subject.label')"
              :placeholder="t('contactUs.form.subject.placeholder')"
            />
          </div>
          
          <div :class="`${baseClass}__form-group`">
            <UiTextbox
              @input="value => (contactForm.message = value)"
              :value="contactForm.message"
              :label="t('contactUs.form.message.label')"
              :placeholder="t('contactUs.form.message.placeholder')"
              multiline
            />
          </div>
          
          <div :class="`${baseClass}__form-actions`">
            <UiButton
              @click="submitForm"
              :text="t('contactUs.form.action')"
              :disabled="!isFormValid"
              :class="`${baseClass}__submit-button`"
            >
            </UiButton>
          </div>
        </form>
      </div>

      <div :class="`${baseClass}__contact-details`">
        <h2 :class="`${baseClass}__contact-heading`">{{ t('contactUs.legend.title') }}</h2>
        
        <div :class="`${baseClass}__contact-cards`">
          <a :class="`${baseClass}__contact-card email-card`" href="mailto:support@fashionstore.com">
            <div :class="`${baseClass}__contact-icon email-icon`">
              <ui-icon size="small" :src="require('../assets/media/icons/email.svg')" />
            </div>
            <div :class="`${baseClass}__contact-info`">
              <h3>{{ t('contactUs.legend.email') }}</h3>
              <p>support@fashionstore.com</p>
            </div>
          </a>
          
          <a :class="`${baseClass}__contact-card phone-card`" href="tel:+15551234567">
            <div :class="`${baseClass}__contact-icon phone-icon`">
              <ui-icon size="small" :src="require('../assets/media/icons/phone.svg')" />
            </div>
            <div :class="`${baseClass}__contact-info`">
              <h3>{{ t('contactUs.legend.phone') }}</h3>
              <p>+1 (555) 123-4567</p>
            </div>
          </a>
          
          <a :class="`${baseClass}__contact-card address-card`" href="https://maps.google.com/?q=123+Fashion+Street,+Design+District,+New+York,+NY+10001" target="_blank">
            <div :class="`${baseClass}__contact-icon address-icon`">
              <ui-icon size="small" :src="require('../assets/media/icons/ubication.svg')" />
            </div>
            <div :class="`${baseClass}__contact-info`">
              <h3>{{ t('contactUs.legend.address') }}</h3>
              <p>123 Fashion St, NY 10001</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { useI18n } from 'vue-i18n';

  import UiProductDetailsModal from '../components/shared/products/ui-product-details-modal.component.vue';
  import UiTextbox from '../components/shared/ui-textbox.component.vue';
  import UiButton from '../components/shared/ui-button.component.vue';
  import UiIcon from '../components/shared/ui-icon.component.vue';

  import { useProducts, useUsers } from '../composables';
  import { Product } from '../interfaces';
  import { productService } from '../services';

  import Header from './header.view.vue';

  const baseClass = 'contact-us';

  const { loadProducts } = useProducts();
  const { user } = useUsers();
  const { t } = useI18n();
  
  const isOpenMenu = ref(false);  
  const isOpenUserMenu = ref(false);
  const isOpenWhistList = ref(false);
  const isOpenShoppingCart = ref(false);
  const productDetails = ref<Product | undefined>(undefined);

  // Contact form state
  const contactForm = ref({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const emailError = ref('');

  const validateForm = () => {
    emailError.value = ''

    if (!/^\S+@\S+\.\S+$/.test(contactForm.value.email)) {
      emailError.value = t('contactUs.form.email.error');
      return false;
    }
    return true;
  };

  const isFormValid = computed(() => {
    return contactForm.value.name && 
           contactForm.value.email && 
           contactForm.value.subject && 
           contactForm.value.message;
  });

  const submitForm = () => {
    if (validateForm()) {
      console.log('Form submitted:', contactForm.value);
      
      contactForm.value = {
        name: '',
        email: '',
        subject: '',
        message: ''
      };
      
      alert('Thank you for your message! We will get back to you soon.');
    }
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
    await loadProducts([]);
    isOpenWhistList.value = true;
  };

  const addToCartWhistList = (product: Product) => {
    productDetails.value = product;
    isOpenWhistList.value = false;
  };
</script>

<style lang="scss" scoped>
.contact-us {
  --color-dark-primary-rgb: 0, 0, 0;
  
  &__content {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1rem;
  }
  
  &__title {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    
    i {
      color: #4285f4;
    }
  }
  
  &__contact-info {
    text-align: center;
    margin-bottom: 2rem;
    
    p {
      margin: 0.5rem 0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      
      i {
        color: #db4437;
      }
    }
  }
  
  &__form-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    border-radius: 10px;
    border: 1px solid var(--color-dark-primary);
  }
  
  &__form-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    justify-content: center;
    font-size: 1.2rem;
    
    i {
      font-size: 1.5rem;
      color: #109856;
    }
    
    h2 {
      margin: 0;
      font-size: 1.5rem;
    }
  }
  
  &__form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  &__form-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
  }
  
  &__contact-details {
    max-width: 700px;
    margin: 1.5rem auto;
    padding: 0;
    text-align: center;
  }
  
  &__contact-heading {
    margin-bottom: 1rem;
    font-size: 1.3rem;
    position: relative;
    display: inline-block;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -6px;
      left: 50%;
      transform: translateX(-50%);
      width: 40px;
      height: 2px;
      background: linear-gradient(to right, #4285f4, #0f9d58, #db4437);
      border-radius: 2px;
    }
  }
  
  &__contact-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }
  
  &__contact-card {
    flex: 1;
    min-width: 180px;
    max-width: 220px;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    border-left: 0;
    border-right: 0;
    border-bottom: 0;
    border-top: 3px solid transparent;
    text-decoration: none;
    color: inherit;
    transition: transform 0.3s, box-shadow 0.3s, background-color 0.3s;
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    }
    
    &.email-card {
      border-top-color: #4285f4;
      background: linear-gradient(to bottom, rgba(66, 133, 244, 0.08), rgba(66, 133, 244, 0.02));
      
      &:hover {
        background: linear-gradient(to bottom, rgba(66, 133, 244, 0.12), rgba(66, 133, 244, 0.04));
      }
      
      h3 {
        color: #4285f4;
      }
    }
    
    &.phone-card {
      border-top-color: #0f9d58;
      background: linear-gradient(to bottom, rgba(15, 157, 88, 0.08), rgba(15, 157, 88, 0.02));
      
      &:hover {
        background: linear-gradient(to bottom, rgba(15, 157, 88, 0.12), rgba(15, 157, 88, 0.04));
      }
      
      h3 {
        color: #0f9d58;
      }
    }
    
    &.address-card {
      border-top-color: #db4437;
      background: linear-gradient(to bottom, rgba(219, 68, 55, 0.08), rgba(219, 68, 55, 0.02));
      
      &:hover {
        background: linear-gradient(to bottom, rgba(219, 68, 55, 0.12), rgba(219, 68, 55, 0.04));
      }
      
      h3 {
        color: #db4437;
      }
    }
  }
  
  &__contact-icon {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 0.5rem;
    transition: transform 0.2s;
    
    &.email-icon {
      color: #4285f4;
      background: linear-gradient(135deg, rgba(66, 133, 244, 0.15), rgba(66, 133, 244, 0.05));
      border: 1px solid rgba(66, 133, 244, 0.2);
    }
    
    &.phone-icon {
      color: #0f9d58;
      background: linear-gradient(135deg, rgba(15, 157, 88, 0.15), rgba(15, 157, 88, 0.05));
      border: 1px solid rgba(15, 157, 88, 0.2);
    }
    
    &.address-icon {
      color: #db4437;
      background: linear-gradient(135deg, rgba(219, 68, 55, 0.15), rgba(219, 68, 55, 0.05));
      border: 1px solid rgba(219, 68, 55, 0.2);
    }
  }
  
  &__contact-card:hover &__contact-icon {
    transform: scale(1.05);
  }
  
  &__contact-info {
    h3 {
      margin-bottom: 0.15rem;
      font-size: 0.95rem;
    }
    
    p {
      margin: 0.1rem 0;
      font-size: 0.85rem;
      color: #555;
    }
  }

  &__form-group {
    position: relative;
    padding-left: 30px;
  }
  
  &__input-icon {
    position: absolute;
    left: 0;
    top: 32px;
    color: #555;
    width: 20px;
    text-align: center;
    font-size: 16px;
  }

  &__submit-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
}
</style>