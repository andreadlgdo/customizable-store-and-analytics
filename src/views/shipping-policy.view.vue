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
    <div class="shipping-policy-content">
      <h1>Política de Envíos de {{ defaultName }}</h1>
      <h2>Ámbito de Envío</h2>
      <p>
        En {{ defaultName }} realizamos envíos a toda España peninsular y Baleares. Actualmente, no realizamos envíos a Canarias, Ceuta, Melilla ni internacionalmente.
      </p>
      <h2>Plazos de Entrega</h2>
      <p>
        El plazo estimado de entrega es de 2 a 5 días hábiles desde la confirmación del pedido. Los pedidos realizados durante fines de semana o festivos serán procesados el siguiente día laborable.
      </p>
      <h2>Costes de Envío</h2>
      <p>
        Los gastos de envío son gratuitos para todos los pedidos realizados en nuestra tienda online, salvo que se indique lo contrario en promociones específicas.
      </p>
      <h2>Procesamiento de Pedidos</h2>
      <p>
        Todos los pedidos se procesan en un plazo de 24 horas laborables tras la confirmación del pago.
      </p>
      <h2>Dirección de Entrega</h2>
      <p>
        Es responsabilidad del cliente proporcionar una dirección de entrega completa y correcta. {{ defaultName }} no se hace responsable de retrasos o pérdidas debidas a direcciones incorrectas o incompletas.
      </p>
      <h2>Incidencias en la Entrega</h2>
      <p>
        Si su pedido no llega en el plazo estimado, por favor contacte con nosotros en {{ customContactUsData?.data.sections[0] }} o al teléfono {{ customContactUsData?.data.sections[1] }}. Investigaremos la incidencia y le daremos una solución lo antes posible.
      </p>
      <h2>Pedidos Dañados o Perdidos</h2>
      <p>
        Si recibe un pedido dañado o su pedido se ha extraviado durante el transporte, notifíquelo en un plazo máximo de 48 horas desde la recepción o desde la fecha estimada de entrega. Gestionaremos la reposición o reembolso según corresponda.
      </p>
      <h2>Restricciones de Envío</h2>
      <p>
        Algunos productos pueden estar sujetos a restricciones de envío debido a su naturaleza o a la normativa vigente. En caso de que su pedido se vea afectado, nos pondremos en contacto con usted para informarle y buscar una solución.
      </p>
      <h2>Contacto</h2>
      <p>
        Para cualquier consulta relacionada con envíos, puede contactarnos en {{ customContactUsData?.data.sections[0] }} o al teléfono {{ customContactUsData?.data.sections[1] }}.
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { customService } from '@/services';
import Header from './app-header.view.vue';

const baseClass = 'shipping-policy';

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
  console.log(customContactUsData.value);
});
</script>

<style lang="scss" scoped>
.shipping-policy {
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
      color: var(--color-main);
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
