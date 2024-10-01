<template>
  <div :class="baseClass">
    <h1>Terminos y condiciones de nombre_de_la_empresa</h1>
    <h2>Información General</h2>
    <p>
      Bienvenido a [Nombre de la Tienda], una tienda online dedicada a la venta de [descripción de
      productos o servicios]. Estos términos y condiciones regulan el uso del sitio web y las
      compras realizadas en nuestra tienda. Al realizar un pedido, usted acepta estos términos.
    </p>
    <h2>Identificación del Vendedor</h2>
    <p>
      El vendedor es [Nombre de la Empresa], con domicilio en [Dirección completa], y NIF [Número de
      identificación fiscal]. Para cualquier consulta, puede contactarnos a través de [Correo
      electrónico] o [Teléfono].
    </p>
    <h2>Productos y Servicios</h2>
    <p>
      En [Nombre de la Tienda] ofrecemos [descripción breve de los productos/servicios]. Nos
      reservamos el derecho de modificar los productos y precios sin previo aviso.
    </p>
    <h2>Proceso de Compra</h2>
    <p>Para realizar una compra, el cliente debe seguir estos pasos:</p>
    <ul>
      <li>Seleccionar los productos deseados y añadirlos al carrito.</li>
      <li>Completar el formulario de compra con la información requerida.</li>
      <li>Aceptar los términos y condiciones marcando la casilla correspondiente.</li>
      <li>Proceder al pago utilizando los métodos disponibles.</li>
    </ul>
    <h2>Precios y Formas de Pago</h2>
    <p>
      Todos los precios incluyen IVA, salvo que se indique lo contrario. Las formas de pago
      aceptadas son [especificar métodos, como tarjeta de crédito, PayPal, etc.]. Los gastos de
      envío se calcularán al finalizar la compra.
    </p>
    <h2>Envío y Entrega</h2>
    <p>
      Realizamos envíos a toda España. El plazo estimado de entrega es de [número] días hábiles
      desde la confirmación del pedido. Los gastos de envío son [especificar costos o condiciones
      para envío gratuito].
    </p>
    <h2>Derecho de Desistimiento</h2>
    <p>
      El cliente tiene derecho a desistir del contrato en un plazo de 14 días naturales desde la
      recepción del pedido, sin necesidad de justificar su decisión. Para ejercer este derecho, debe
      notificarnos a través de [correo electrónico o formulario específico].
    </p>
    <h2>Devoluciones y Reembolsos</h2>
    <p>
      Los productos deben ser devueltos en su estado original y con el embalaje original. Los gastos
      de devolución correrán a cargo del cliente, salvo en caso de productos defectuosos o errores
      en el envío.
    </p>
    <h2>Protección de Datos Personales</h2>
    <p>
      La información personal proporcionada será tratada conforme a nuestra Política de Privacidad,
      que puede consultar en [enlace a la política].
    </p>
    <h2>Propiedad Intelectual</h2>
    <p>
      Todos los contenidos del sitio web (textos, gráficos, logotipos) están protegidos por derechos
      de propiedad intelectual. Queda prohibida su reproducción total o parcial sin autorización
      previa.
    </p>
    <h2>Limitación de Responsabilidad</h2>
    <p>
      [Nombre de la Tienda] no se hace responsable por daños indirectos o pérdidas que puedan surgir
      del uso del sitio web o la imposibilidad para acceder a él.
    </p>
    <h2>Modificaciones</h2>
    <p>
      Nos reservamos el derecho a modificar estos términos y condiciones en cualquier momento. Las
      modificaciones serán efectivas desde su publicación en el sitio web.
    </p>
    <h2>Legislación Aplicable</h2>
    <p>
      Estos términos se rigen por la legislación española. Cualquier disputa que surja en relación
      con estos términos será sometida a los tribunales competentes en [Ciudad]. Este modelo cubre
      los aspectos esenciales que deben incluirse en los términos y condiciones para un ecommerce en
      España, cumpliendo con las normativas relevantes como la Ley 34/2002 sobre Servicios de la
      Sociedad de la Información y el Comercio Electrónico (LSSI-CE) y el Reglamento General de
      Protección de Datos (RGPD).
    </p>
  </div>
</template>

<script lang="ts" setup>
  const baseClass = 'terms-and-conditions';
</script>
<style lang="scss" scoped>
  .terms-and-conditions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow-y: scroll;
    margin: 2rem 4rem;
  }
</style>
