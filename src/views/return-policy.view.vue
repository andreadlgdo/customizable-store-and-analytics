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
    <div class="return-policy-content">
      <h1>Política de Devoluciones de {{ defaultName }}</h1>
      <h2>Plazo para Devoluciones</h2>
      <p>
        En {{ defaultName }} puedes devolver cualquier producto en un plazo de 30 días naturales desde la recepción del pedido, siempre que el producto esté en perfecto estado, sin usar y en su embalaje original.
      </p>
      <h2>Condiciones para la Devolución</h2>
      <p>
        El producto debe estar sin usar, en perfecto estado y con todos sus accesorios y embalaje original.<br/>
        No se aceptarán devoluciones de productos personalizados o que, por razones de higiene, no puedan ser devueltos.
      </p>
      <h2>Proceso para Solicitar una Devolución</h2>
      <p>
        Para solicitar una devolución, envía un correo electrónico a {{ customContactUsData?.data.sections[0] }} con los detalles de tu pedido y el motivo de la devolución. Nuestro equipo te indicará los pasos a seguir y la dirección de envío para la devolución.
      </p>
      <h2>Costes de Envío de la Devolución</h2>
      <p>
        Salvo error o defecto en el producto, los gastos de envío de la devolución correrán a cargo del cliente.
      </p>
      <h2>Reembolsos</h2>
      <p>
        Una vez recibido y comprobado el producto devuelto, procesaremos el reembolso en un plazo de 3 a 5 días laborables utilizando el mismo método de pago empleado en la compra. Te notificaremos por correo electrónico una vez realizado el reembolso.
      </p>
      <h2>Productos Dañados o Incorrectos</h2>
      <p>
        Si recibes un producto dañado o incorrecto, por favor contacta con nosotros en {{ customContactUsData?.data.sections[0] }} en un plazo máximo de 48 horas desde la recepción. Gestionaremos la reposición o el reembolso según corresponda, sin coste adicional para ti.
      </p>
      <h2>Excepciones</h2>
      <ul>
        <li>Productos personalizados.</li>
        <li>Productos que, por razones de higiene, no puedan ser devueltos si han sido desprecintados.</li>
      </ul>
      <h2>Contacto</h2>
      <p>
        Para cualquier consulta relacionada con devoluciones, puedes contactarnos en {{ customContactUsData?.data.sections[0] }} o al teléfono {{ customContactUsData?.data.sections[1] }}.
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { customService } from '@/services';
import Header from './app-header.view.vue';

const baseClass = 'return-policy';

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
.return-policy {
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
