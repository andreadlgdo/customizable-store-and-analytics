<template>
  <dashboard :selected-item="menuElements[4]">
    <div :class="baseClass">
      <h1 v-if="!action">Personalizacion</h1>
      <section v-if="!action" @click="selectAction('texts')" :class="`${baseClass}__section`">
        <h1>Textos</h1>
      </section>
      <ui-custom-text v-if="action === actions[0]" />
    </div>
  </dashboard>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import Dashboard from './dashboard.view.vue';
  import { useUserMenu } from '@/composables';
  import UiCustomText from '../../components/dashboard/personalization/ui-custom-text.component.vue';

  const baseClass = 'personalization';

  const { menuElements } = useUserMenu();
  const router = useRouter();

  defineProps({
    action: {
      type: String,
      default: undefined
    }
  });

  const actions = ['texts']

  const selectAction = (action: string) => {
    router.push({
      name: 'Personalization',
      params: { action }
    });
  }
</script>

<style lang="scss" scoped>
.personalization {
    margin: 2rem;
    width: 100%;
    overflow-y: scroll;
    height: 85%;

    &__section {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 8rem;
      border: 2px solid var(--color-dark-primary);
      border-radius: 20px;
      width: 12rem;
      cursor: pointer;
      margin: 16px;

      &:hover {
        border: 4px solid var(--color-dark-primary);
      }
    }
}
</style>
