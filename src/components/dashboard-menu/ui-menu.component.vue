<template>
  <ui-aside @click="isCollapsed = !isCollapsed" icon="menu" :is-collapsed="isCollapsed" is-open>
    <p :class="baseClass">test</p>
  </ui-aside>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  import UiAside from '../shared/ui-aside.component.vue';

  const baseClass = 'ui-menu';

  const isCollapsed = ref(false);
</script>

<style lang="scss" scoped></style>
