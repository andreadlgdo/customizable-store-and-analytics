<template>
  <Header
    :opened-menu="isOpenMenu"
    :opened-user-menu="isOpenUserMenu"
    :opened-whist-list="isOpenWhistList"
    :opened-shopping-cart="isOpenShoppingCart"
    @updateMenu="value => (isOpenMenu = value)"
    @updateUserMenu="value => (isOpenUserMenu = value)"
    @updateWhistList="value => (isOpenWhistList = value)"
    @updateShoppingCart="value => (isOpenShoppingCart = value)"
  />
  <div :class="baseClass">
    <div class="privacy-policy-content">
      <h1>Política de Privacidad de {{ defaultName }}</h1>
      <h2>Introducción</h2>
      <p>
        En {{ defaultName }}, nos comprometemos a proteger tu privacidad y garantizar la seguridad de tus datos personales. Esta política explica cómo recopilamos, utilizamos y protegemos tu información cuando utilizas nuestra tienda online.
      </p>
      <h2>Datos que Recopilamos</h2>
      <p>
        Podemos recopilar la siguiente información personal:
        <ul>
          <li>Nombre y apellidos</li>
          <li>Dirección de correo electrónico</li>
          <li>Dirección postal y de envío</li>
        </ul>
      </p>
      <h2>Finalidad del Tratamiento de Datos</h2>
      <p>
        Utilizamos tus datos para:
        <ul>
          <li>Procesar y gestionar tus pedidos</li>
          <li>Contactarte en relación a tu compra</li>
          <li>Enviar comunicaciones comerciales si has dado tu consentimiento</li>
          <li>Mejorar nuestros servicios y tu experiencia de usuario</li>
        </ul>
      </p>
      <h2>Conservación de los Datos</h2>
      <p>
        Conservaremos tus datos personales solo durante el tiempo necesario para cumplir con las finalidades para las que fueron recogidos y para cumplir con obligaciones legales.
      </p>
      <h2>Compartición de Datos</h2>
      <p>
        No compartimos tus datos personales con terceros, salvo cuando sea necesario para la prestación del servicio (por ejemplo, empresas de mensajería) o por obligación legal.
      </p>
      <h2>Tus Derechos</h2>
      <p>
        Tienes derecho a acceder, rectificar o suprimir tus datos, así como otros derechos reconocidos por la normativa vigente. Para ejercerlos, puedes contactarnos en {{ customContactUsData?.data.sections[0] }} o al teléfono {{ customContactUsData?.data.sections[1] }}.
      </p>
      <h2>Seguridad de los Datos</h2>
      <p>
        En {{ defaultName }}, implementamos medidas técnicas y organizativas para proteger tus datos personales contra el acceso no autorizado, pérdida o alteración.
      </p>
      <h2>Contacto</h2>
      <p>
        Si tienes cualquier duda sobre nuestra política de privacidad o el tratamiento de tus datos, puedes contactarnos en {{ customContactUsData?.data.sections[0] }} o al teléfono {{ customContactUsData?.data.sections[1] }}.
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { customService } from '@/services';
import Header from './app-header.view.vue';

const baseClass = 'privacy-policy';

const defaultName = ref();
const customContactUsData = ref();

const isOpenMenu = ref(false);
const isOpenUserMenu = ref(false);
const isOpenWhistList = ref(false);
const isOpenShoppingCart = ref(false);

onMounted(async () => {
  const customTexts = await customService.getCustomTexts('home');
  defaultName.value = customTexts.name;
  const customContactUs = await customService.getCustom('contactUs');
  customContactUsData.value = customContactUs;
});
</script>

<style lang="scss" scoped>
.privacy-policy {
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
  
  h2 {
    margin-bottom: 20px;
    font-size: 1.8rem;
    border-bottom: 2px solid #f0f0f0;
    padding-bottom: 10px;
    margin-top: 40px;
    font-weight: bold;
    letter-spacing: -0.5px;
  }
  
  p {
    margin-bottom: 20px;
    line-height: 1.6;
    font-size: 1.1rem;
    color: var(--color-submain);
  }
  
  ul {
    margin-left: 1.5rem;
    margin-bottom: 0.5rem;
    list-style: disc inside;
    li {
      margin-bottom: 0.25rem;
      color: var(--color-submain);
      font-size: 1.1rem;
    }
  }
  
  a {
    color: var(--color-strong-primary);
    text-decoration: underline;
    &:hover {
      color: var(--color-vibrant-primary);
    }
  }
}
</style>
