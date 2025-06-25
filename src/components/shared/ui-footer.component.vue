<template>
  <footer :class="baseClass">
    <div :class="`${baseClass}__container`">
      <div :class="`${baseClass}__section`">
        <h2 @click="router.push('/')" :class="`${baseClass}__title`">{{ defaultName}}</h2>
        <p :class="`${baseClass}__description`">Tienda de ropa con diseños españoles, tallas inclusivas y materiales sostenibles.</p>
      </div>
      <div :class="`${baseClass}__section`">
        <h3>Conócenos</h3>
        <ul :class="`${baseClass}__links`">
          <li><a href="/about">Sobre nosotros</a></li>
          <li><a href="/contact">Contacto</a></li>
          <li><a href="/faq">Preguntas frecuentes</a></li>
        </ul>
      </div>
      <div :class="`${baseClass}__section`">
        <h3>Políticas</h3>
        <ul :class="`${baseClass}__links`">
          <li><a href="/shipping-policy">Política de envío</a></li>
          <li><a href="/return-policy">Política de devolución</a></li>
          <li><a href="/privacy-policy">Política de privacidad</a></li>
          <li><a href="/terms-and-conditions">Términos y condiciones</a></li>
        </ul>
      </div>
      <div :class="`${baseClass}__section`">
        <h3>Contáctanos</h3>
        <ul :class="`${baseClass}__contact`">
          <li>
            <UiIcon :src="require('@/assets/media/icons/email.svg')" size="small" />
            <a href="mailto:{{ contactUsCustom?.data.sections[0] }}" :class="`${baseClass}__link`">{{ contactUsCustom?.data.sections[0] }}</a>
          </li>
          <li>
            <UiIcon :src="require('@/assets/media/icons/phone.svg')" size="small" />
            <a href="tel:{{ contactUsCustom?.data.sections[1] }}" :class="`${baseClass}__link`">{{ contactUsCustom?.data.sections[1] }}</a>
          </li>
          <li>
            <UiIcon :src="require('@/assets/media/icons/ubication.svg')" size="small" />
            <a :class="`${baseClass}__link`">{{ contactUsCustom?.data.sections[2] }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div :class="`${baseClass}__bottom`">
      <span>2024 - Aplicación de comercio electrónico Andrea</span>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { customService } from '@/services';

import UiIcon from '@/components/shared/ui-icon.component.vue';

const baseClass = 'ui-footer';

const router = useRouter();

const defaultName = ref();
const contactUsCustom = ref();

onMounted(async () => {
    const customHomeTexts = await customService.getCustomTexts('home');
    defaultName.value = customHomeTexts.name;
    const customContactUsTexts = await customService.getCustom("contactUs");
    contactUsCustom.value = customContactUsTexts;
});
</script>

<style scoped lang="scss">
.ui-footer {
  background-color: var(--color-primary);
  width: 100%;
  padding: 2rem 0 0 0;
  color: var(--color-main);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1rem;

  &__container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    gap: 2rem;
  }

  &__section {
    flex: 1 1 200px;
    min-width: 200px;
    margin-bottom: 1.5rem;
  }

  &__section h3 {
    color: black;
    font-size: 1.15rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    margin-bottom: 0.7rem;
    position: relative;
    display: inline-block;
    padding-bottom: 0.2em;
  }
  &__section h3::after {
    content: '';
    display: block;
    width: 2.2em;
    height: 3px;
    background: linear-gradient(90deg, #111 80%, transparent 100%);
    border-radius: 2px;
    margin-top: 0.18em;
    margin-left: 0;
  }

  &__title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    cursor: pointer;
  }

  &__description {
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  &__links {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      margin-bottom: 0.5rem;
      a {
        color: var(--color-main);
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  &__link {
    cursor: pointer;
    color: var(--color-main);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  &__contact {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }
  }

  &__bottom {
    width: 100%;
    text-align: center;
    padding: 0.8rem 0 1rem 0;
    font-size: 0.88rem;
    border-top: 1px solid rgba(0,0,0,0.07);
    font-weight: 400;
    letter-spacing: 0.02em;
    box-shadow: 0 -1px 8px 0 rgba(0,0,0,0.03);
  }

  @media (max-width: 800px) {
    &__container {
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }
    &__section {
      min-width: 0;
      width: 100%;
      text-align: center;
    }
  }
}
</style>