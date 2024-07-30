<template>
  <transition name="aside">
    <div v-if="isOpen" :class="baseClass">
      <div :class="`${baseClass}__header`">
        <icon-button
          @click="$emit('close')"
          :class="`${baseClass}__icon ${baseClass}__icon--close`"
          icon="close"
          colorAttribute="fill"
        />
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
  import IconButton from './icons/icon-button.component.vue';

  const baseClass = 'aside';

  defineProps({
    isOpen: Boolean
  });

  defineEmits(['close']);
</script>

<style lang="scss" scoped>
  .aside {
    position: absolute;
    top: 0;
    right: 0;
    height: 100vh;
    width: 400px;
    background: var(--bg-main);
    box-shadow: var(--shadow-header);

    &-enter-active {
      animation: slide-in-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    }

    &-leave-active {
      animation: slide-out-right 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
    }

    &__header {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      height: 5rem;
      padding-right: 24px;
    }
  }
</style>
