<template>
    <div @click="router.push({ name: 'Personalization' })" :class="`${baseClass}__header`">
        <ui-icon-button icon="go-to" :class="`${baseClass}__icon`"/>
        <p :class="`${baseClass}__text`">Volver al menu</p>
    </div>
    <h1 :class="`${baseClass}__title`">Personalizacion de textos</h1>
    <ui-toggle @click="selectToggle" :options="options" border :class="`${baseClass}__toggle`"/>
    <div v-if="options[0].selected" :class="`${baseClass}__wrapper`">
        <ui-textbox @input="value => home.name = value" :value="home?.name" label="Nombre de la tienda" />
       <div>
        <ui-textbox @input="value => home.highlights[0] = value" :value="home?.highlights?.[0]" label="Highlights" />
        <ui-textbox @input="value => home.highlights[1] = value" :value="home?.highlights?.[1]" />
        <ui-textbox @input="value => home.highlights[2] = value" :value="home?.highlights?.[2]" />
       </div>
    </div>
    <div v-else-if="options[1].selected" :class="`${baseClass}__wrapper`">
        <div :class="`${baseClass}__content`">
        <p :class="`${baseClass}__subtitle`">El carrito</p>
        <ui-textbox @input="value => asides.cart.title = value" :value="asides?.cart?.title" label="Titulo" />
        <ui-textbox @input="value => asides.cart.empty = value" :value="asides?.cart?.empty" label="Mensaje carrito vacío" info="El mensaje que se muestra cuando el carrito está vacío" />
        <ui-textbox @input="value => asides.cart.actionEmpty = value" :value="asides?.cart?.actionEmpty" label="Accion carrito vacio" info="Texto del botón que redirige al usuario a la landing con los productos" />
        <ui-textbox @input="value => asides.cart.action = value" :value="asides?.cart?.action" label="Accion carrito con productos" info="Texto del botón que redirige al usuario a realizar el pedido" />
       </div>
       <hr/>
       <div :class="`${baseClass}__content`">
        <p :class="`${baseClass}__subtitle`">Los productos favoritos</p>
        <ui-textbox @input="value => asides.whistlist.title = value" :value="asides?.whistlist?.title" label="Titulo" />
        <ui-textbox @input="value => asides.whistlist.empty = value" :value="asides?.whistlist?.empty" label="Mensaje carrito vacío" info="El mensaje que se muestra cuando la lista de deseos está vacía" />
        <ui-textbox @input="value => asides.whistlist.actionEmpty = value" :value="asides?.whistlist?.actionEmpty" label="Accion carrito vacio" info="Texto del botón que redirige al usuario a la landing con los productos" />
       </div>
    </div>
    <div v-else-if="options[2].selected" :class="`${baseClass}__wrapper`">
        <div :class="`${baseClass}__content`">
        <p :class="`${baseClass}__subtitle`">Menu del usuario</p>
        <ui-textbox @input="value => dashboard.menu[0] = value" :value="dashboard?.menu[0]" label="Sección 1" info="La sección donde el usuario puede editar sus datos personales" />
        <ui-textbox @input="value => dashboard.menu[1] = value" :value="dashboard?.menu[1]" label="Sección 2" info="La sección donde el usuario puede ver su carrito" />
        <ui-textbox @input="value => dashboard.menu[2] = value" :value="dashboard?.menu[2]" label="Sección 3" info="La sección donde el usuario puede ver sus productos favoritos" />
        <ui-textbox @input="value => dashboard.menu[3] = value" :value="dashboard?.menu[3]" label="Sección 4" info="La sección donde el usuario puede ver los pedidos realizados" />
       </div>
    </div>
    <div :class="`${baseClass}__footer`">
        <UiButton
        @click="save"
        text="Guardar"
        icon="edit"
        :class="`${baseClass}__button`"
        />
    </div>
</template>

<script lang="ts" setup>
import UiToggle from '../../shared/ui-toggle.component.vue';
import UiTextbox from '../../shared/ui-textbox.component.vue';
import UiButton from '../../shared/ui-button.component.vue';
import UiIconButton from '../../shared/ui-icon-button.component.vue';
import { ref, onMounted } from 'vue';
import { customTextsService } from '@/services';
import { useRouter } from 'vue-router';

const baseClass = 'custom-text';

const router = useRouter();

const home = ref();
const asides = ref();
const dashboard = ref();

const options = ref([
  { label: 'Home page', selected: true },
  { label: 'Asides', selected: false },
  { label: 'Dashboard', selected: false }
]);

const selectToggle = (option: { label: string; selected: boolean }) => {
  options.value = options.value.map(item => ({
    ...item,
    selected: item.label === option.label
  }));
};

const save = async () => {
  try {
      await customTextsService.updateCustomTexts('home', home.value);
      await customTextsService.updateCustomTexts('asides', asides.value);
      await customTextsService.updateCustomTexts('dashboard', dashboard.value);
  } catch (error) {
    console.error('Error saving custom texts:', error);
  }
}

onMounted(async () => {
  const customTexts = await customTextsService.getCustomTexts('home');
  home.value = customTexts[0].texts;
  const customTextsAsides = await customTextsService.getCustomTexts('asides');
  asides.value = customTextsAsides[0].texts;
  const customTextsDashboard = await customTextsService.getCustomTexts('dashboard');
  dashboard.value = customTextsDashboard[0].texts;
});
</script>

<style lang="scss" scoped>
.custom-text {
    &__header {
        display: flex;
        align-items: center;
        position: absolute;
        left: 21rem;
        cursor: pointer;
    }

    &__title {
        margin-top: 3rem;
    }

    &__text {
        &:hover {
         font-weight: 600;
        }
    }

    &__icon {
        transform: rotate(180deg);
    }
    &__toggle {
      margin-top: 16px;
    }


    &__wrapper {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-top: 16px;
    }

    &__subtitle {
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 8px;
    }

    &__content {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    &__footer {
      width: 100%;
      display: flex;
   justify-content: center;

    }

    &__button {
      position: fixed;
    bottom: 22px;
} 
}
</style>