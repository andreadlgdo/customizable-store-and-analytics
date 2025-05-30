<template>
  <dashboard :selected-item="menuElements[4]">
    <div :class="[baseClass, { [`${baseClass}--edit`]: action === actions[2]}]">
      <h1 v-if="!action">Personalizacion</h1>
      <section v-if="!action" @click="selectAction('texts')" :class="`${baseClass}__section`">
        <h1>Textos</h1>
      </section>
      <section v-if="!action" @click="selectAction('products-visuals')" :class="`${baseClass}__section`">
        <h1>Visualización de productos</h1>
      </section>
      <section v-if="!action" @click="selectAction('contact-us')" :class="`${baseClass}__section`">
        <h1>Contact us Page</h1>
      </section>
      <ui-custom-text v-if="action === actions[0]" />
      <ui-products-visuals v-else-if="action === actions[1]" />
      <ui-contact-us v-else-if="action === actions[2]" />
    </div>
  </dashboard>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import Dashboard from './base-dashboard.view.vue';
  import { useUserMenu } from '../../composables';
  import UiCustomText from '../../components/dashboard/personalization/ui-custom-text.component.vue';
  import UiProductsVisuals from '../../components/dashboard/personalization/ui-products-visuals.component.vue';
  import UiContactUs from '../../components/dashboard/personalization/contact-us/ui-contact-us.component.vue';
  const baseClass = 'personalization';

  const { menuElements } = useUserMenu();
  const router = useRouter();

  defineProps({
    action: {
      type: String,
      default: undefined
    }
  });

  const actions = ['texts', 'products-visuals', 'contact-us'];

  const selectAction = (action: string) => {
    router.push({
      name: 'Personalization',
      params: { action }
    });
  }
</script>

<style lang="scss" scoped>
.personalization {
    padding: 2rem 2rem 0rem 2rem;
    width: 100%;

    &--edit {
      background-color: white;
    }
    
    &__section {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 8rem;
      border: 2px solid var(--color-dark-primary);
      border-radius: 20px;
      width: 14rem;
      cursor: pointer;
      margin: 16px;
      text-align: center;

      &:hover {
        border: 4px solid var(--color-dark-primary);
      }
    }
}
</style>
