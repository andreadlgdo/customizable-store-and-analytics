<template>
  <div :class="baseClass">
    <section :style="{ display: 'grid', gridTemplateColumns: '0.4fr 1fr' }">
      <div :class="`${baseClass}__wrapper`">
        <ui-image :image="userImage" type="semi-round" size="large" />
      </div>
      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--header`">
        <ui-textbox
          v-if="itemToEdit"
          :value="itemToEdit._id"
          :label="t('dashboard.users.form.id')"
          disabled
        />
        <ui-textbox
          @input="value => (item.name = value)"
          :value="item.name"
          :label="t('dashboard.users.form.name')"
          :disabled="!!itemToEdit"
        />
        <ui-textbox
          @input="value => (item.surname = value)"
          :value="item.surname"
          :label="t('dashboard.users.form.surname')"
          :disabled="!!itemToEdit"
        />
      </div>
    </section>
    <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--content`">
      <ui-textbox
        @input="value => (item.email = value)"
        :value="item.email"
        :label="t('dashboard.users.form.email')"
        :disabled="!!itemToEdit"
      />
      <ui-textbox
        @input="value => (item.type = value)"
        :value="item.type"
        :label="t('dashboard.users.form.type')"
        :style="{ width: '50%' }"
      />
    </div>
    <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--button`">
      <ui-button
        @click="save"
        :text="itemToEdit ? t('dashboard.action.edit') : t('dashboard.action.save')"
        icon="edit"
        :disabled="!itemToEdit && (!item.email || !item.password)"
      />
      <ui-button @click="cancel" :text="t('dashboard.action.cancel')" icon="close" transparent />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, PropType, ref, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import { useI18n } from 'vue-i18n';

  import UiButton from '../shared/ui-button.component.vue';
  import UiImage from '../shared/ui-image.component.vue';
  import UiTextbox from '../shared/ui-textbox.component.vue';

  import { User } from '../../interfaces';

  const router = useRouter();
  const { t } = useI18n();

  const baseClass = 'ui-user-form';

  const props = defineProps({
    itemToEdit: {
      type: Object as PropType<User>,
      default: undefined
    }
  });

  const emit = defineEmits(['action']);

  const item = ref<User>(
    props.itemToEdit ?? {
      name: '',
      surname: '',
      email: '',
      password: '',
      type: '',
      imageUrl: ''
    }
  );

  const userImage = computed(() =>
    item.value?.imageUrl !== '' ? item.value?.imageUrl : undefined
  );

  const goToList = () => {
    router.push({
      name: 'UsersManagement'
    });
  };

  const cancel = () => {
    emit('action');
    goToList();
  };

  const save = () => {
    emit('action');
    goToList();
  };

  watch(
    () => props.itemToEdit,
    () => (item.value = props.itemToEdit ?? item.value),
    { immediate: true }
  );
</script>

<style lang="scss" scoped>
  .ui-user-form {
    position: relative;
    margin: 2rem;
    height: 100%;

    &__wrapper {
      display: flex;
      gap: 1rem;
      overflow: visible !important;

      &--header,
      &--content {
        flex-direction: column;
        justify-content: center;
      }

      &--content {
        margin-top: 1rem;
      }

      &--button {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
      }
    }
  }
</style>
