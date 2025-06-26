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
    <div class="terms-and-conditions-content">
      <h1>Términos y Condiciones de {{ defaultName }}</h1>
      <h2>Información General</h2>
      <p>
        Bienvenido a {{ defaultName }}, una tienda online dedicada a la venta de productos electrónicos y accesorios. Estos términos y condiciones regulan el uso del sitio web y las compras realizadas en nuestra tienda. Al realizar un pedido, usted acepta estos términos.
      </p>
      <h2>Identificación del Vendedor</h2>
      <p>
        El vendedor es {{ defaultName }}, con domicilio en {{ customContactUsData?.data.sections[2] }}, y NIF B12345678. Para cualquier consulta, puede contactarnos a través de {{ customContactUsData?.data.sections[0] }} o al teléfono {{customContactUsData?.data.sections[1]}}.
      </p>
      <h2>Productos y Servicios</h2>
      <p>
        En {{ defaultName }} ofrecemos una amplia gama de productos electrónicos, gadgets y accesorios. Nos reservamos el derecho de modificar los productos y precios sin previo aviso.
      </p>
      <h2>Proceso de Compra</h2>
      <p>Para realizar una compra, el cliente debe seguir estos pasos:</p>
      <ul>
        <li>Seleccionar los productos deseados y añadirlos al carrito.</li>
        <li>Completar el formulario de compra con la información requerida.</li>
        <li>Aceptar los términos y condiciones marcando la casilla correspondiente.</li>
        <li>Proceder al pago utilizando los métodos disponibles.</li>
        <li>Recibirá un correo electrónico de confirmación del pedido.</li>
      </ul>
      <h2>Precios y Formas de Pago</h2>
      <p>
        Todos los precios incluyen IVA, salvo que se indique lo contrario. Las formas de pago aceptadas son tarjeta de crédito/débito, PayPal y transferencia bancaria.
      </p>
      <h2>Envío y Entrega</h2>
      <p>
        Realizamos envíos a toda España peninsular y Baleares. El plazo estimado de entrega es de 2 a 5 días hábiles desde la confirmación del pedido. Los gastos de envío son gratuitos para todos los pedidos.
      </p>
      <h2>Derecho de Desistimiento</h2>
      <p>
        El cliente tiene derecho a desistir del contrato en un plazo de 14 días naturales desde la recepción del pedido, sin necesidad de justificar su decisión. Para ejercer este derecho, debe notificarnos a través de info@ejemplotienda.com o mediante el formulario de desistimiento disponible en nuestra web. El reembolso se realizará en un plazo máximo de 14 días desde la recepción de la devolución.
      </p>
      <h2>Devoluciones y Reembolsos</h2>
      <p>
        Los productos deben ser devueltos en su estado original y con el embalaje original. Los gastos de devolución correrán a cargo del cliente, salvo en caso de productos defectuosos o errores en el envío. Para más información, consulte nuestra política de devoluciones.
      </p>
      <h2>Garantía Legal</h2>
      <p>
        Todos los productos cuentan con una garantía legal de 3 años conforme a la legislación vigente. En caso de producto defectuoso, {{ defaultName }} procederá, según corresponda, a la reparación, sustitución, rebaja del precio o resolución del contrato.
      </p>
      <h2>Protección de Datos Personales</h2>
      <p>
        La información personal proporcionada será tratada conforme a nuestra <a href="/privacy-policy" target="_blank">Política de Privacidad</a>, en cumplimiento del Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica 3/2018.
      </p>
      <h2>Propiedad Intelectual</h2>
      <p>
        Todos los contenidos del sitio web (textos, gráficos, logotipos, imágenes) están protegidos por derechos de propiedad intelectual. Queda prohibida su reproducción total o parcial sin autorización previa por escrito de {{ defaultName }}.
      </p>
      <h2>Limitación de Responsabilidad</h2>
      <p>
        {{ defaultName }} no se hace responsable por daños indirectos o pérdidas que puedan surgir del uso del sitio web o la imposibilidad para acceder a él, salvo disposición legal en contrario.
      </p>
      <h2>Modificaciones</h2>
      <p>
        Nos reservamos el derecho a modificar estos términos y condiciones en cualquier momento. Las modificaciones serán efectivas desde su publicación en el sitio web.
      </p>
      <h2>Legislación Aplicable y Jurisdicción</h2>
      <p>
        Estos términos se rigen por la legislación española. Cualquier disputa que surja en relación con estos términos será sometida a los tribunales competentes de Madrid, salvo que la ley disponga otra cosa.
      </p>
      <h2>Contacto</h2>
      <p>
        Para cualquier duda o consulta sobre estos términos y condiciones, puede contactarnos en {{ customContactUsData?.data.sections[0] }} o al teléfono {{ customContactUsData?.data.sections[1] }}.
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { customService } from '@/services';
import Header from './app-header.view.vue';

const baseClass = 'terms-and-conditions';

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
.terms-and-conditions {
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
