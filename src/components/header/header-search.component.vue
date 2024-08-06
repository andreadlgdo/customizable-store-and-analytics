<template>
  <transition :name="baseClass">
    <div :class="baseClass">
      <div :class="`${baseClass}__search-box`">
        <svg-icon
          :class="`${baseClass}__icon ${baseClass}__icon--search`"
          :src="require('../../assets/media/icons/search.svg')"
          color-attribute="fill"
        />
        <input v-model="query" :class="`${baseClass}__input`" type="text" placeholder="BUSCAR..." />
      </div>
      <icon-button
        @click="query = ''"
        :class="`${baseClass}__icon ${baseClass}__icon--close`"
        icon="close"
        color-attribute="fill"
      />
    </div>
  </transition>
</template>

<script lang="ts" setup>
  import IconButton from '../icons/icon-button.component.vue';
  import SvgIcon from '../icons/svg-icon.component.vue';
  import { ref } from 'vue';

  const baseClass = 'header-search';

  const query = ref('');
</script>

<style lang="scss" scoped>
  .header-search {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 5rem;
    padding: 0 2rem;
    box-shadow: var(--shadow-header);

    &__search-box {
      display: flex;
      gap: 1rem;
      width: 100%;
      height: 3rem;
    }

    &__input {
      font-size: 16px;
      width: 100%;
      padding-top: 2px;
      border: none;
      outline: none;
      background: var(--bg-main);
      color: var(--color-main);
    }

    &__icon {
      display: flex;
      align-items: center;
    }
  }
</style>
