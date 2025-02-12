<template>
  <old-dashboard index="0">
    <template v-slot:custom>
      <base-wrapper :class="baseClass">
        <div :class="`${baseClass}__header`">
          <base-text tag="h3">{{ t('dashboard.personalData.personal.title') }}</base-text>
          <base-button
            :text="t('dashboard.personalData.personal.action')"
            icon="delete"
            size="small"
            color="primary"
            type="outline-solid"
          />
        </div>
        <div :class="`${baseClass}__content`">
          <div
            :class="`${baseClass}__image`"
            :style="{ backgroundImage: `url(${user.imageUrl})` }"
          ></div>
          <div :class="`${baseClass}__data`">
            <base-text-input
              icon="email"
              :label="t('dashboard.personalData.personal.label.email')"
              form="semi-round"
              :value="user.email"
              disabled
            />
            <base-text-input
              icon="password"
              :label="t('dashboard.personalData.personal.label.password')"
              form="semi-round"
              tag="password"
              :value="user.password"
              disabled
            />
          </div>
        </div>
      </base-wrapper>
    </template>
  </old-dashboard>
</template>

<script lang="ts" setup>
  import OldDashboard from '../old-dashboard.view.vue';
  import { useI18n } from 'vue-i18n';

  import { useCurrentUser } from '../../composables';

  import { BaseButton, BaseText, BaseTextInput, BaseWrapper } from '../../components';

  const baseClass = 'personal-data';

  const { user } = useCurrentUser();
  const { t } = useI18n();
</script>

<style lang="scss" scoped>
  .personal-data {
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 0.5rem 2rem 0.5rem;
    }

    &__content {
      display: flex;
      justify-content: space-evenly;
      gap: 1rem;
    }

    &__image {
      height: 12rem;
      width: 12rem;
      border-radius: 50%;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }

    &__data {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 70%;
    }
  }
</style>
