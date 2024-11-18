<template>
  <section :class="baseClass">
    <div :class="`${baseClass}__content`">
      <div :class="`${baseClass}__wrapper`">
        <svg-icon :src="require('../assets/media/icons/logo.svg')" size="large" />
        <div>
          <base-text tag="h1">{{ t('footer.company.name') }}</base-text>
          <base-text tag="small" :class="`${baseClass}__text ${baseClass}__text--description `">
            {{ t('footer.company.description') }}
          </base-text>
        </div>
      </div>
      <div v-for="(info, index) in information" :key="index" :class="`${baseClass}__links`">
        <base-text
          v-for="(item, i) in info"
          :key="i"
          :tag="i === 0 ? 'h4' : 'default'"
          :class="{
            [`${baseClass}__text ${baseClass}__text--link `]:
              i !== 0 && index !== information.length - 1
          }"
        >
          {{ item.toUpperCase() }}
        </base-text>
      </div>
    </div>
    <div :class="`${baseClass}__caption`">
      <div>
        <base-text tag="small" :class="`${baseClass}__text ${baseClass}__text--caption `">
          {{ '@' + t('footer.caption.description') }}
        </base-text>
        <language-toggle />
      </div>
      <div :class="`${baseClass}__wrapper`">
        <base-text tag="h4">{{ t('footer.caption.payment.paypal') }}</base-text>
        <base-text tag="h4">{{ t('footer.caption.payment.visa') }}</base-text>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';

  import BaseText from './base-text.component.vue';
  import { SvgIcon } from './icons';
  import { LanguageToggle } from './toggles';

  const baseClass = 'footer';

  const { t } = useI18n();

  const information = computed(() => [
    [
      t('footer.policies.title'),
      t('footer.policies.shipping'),
      t('footer.policies.return'),
      t('footer.policies.privacy'),
      t('footer.policies.termsAndConditions')
    ],
    [
      t('footer.knowUs.title'),
      t('footer.knowUs.about'),
      t('footer.knowUs.contact'),
      t('footer.knowUs.faqs')
    ],
    [
      t('footer.contactUs.title'),
      t('footer.contactUs.email.label') + '@' + t('footer.contactUs.email.domain'),
      t('footer.contactUs.phone')
    ]
  ]);
</script>

<style lang="scss" scoped>
  .footer {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;
    background-color: var(--color-primary);
    overflow-x: hidden;

    &__content {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 1rem 2rem;
      border-bottom: 1px var(--color-submain) solid;
    }

    &__wrapper {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    &__links {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    &__caption {
      display: flex;
      justify-content: space-between;
    }

    &__text {
      &--description {
        width: 15rem;
      }

      &--caption {
        padding: 0 8px;
      }

      &--link {
        cursor: pointer;

        &:hover {
          font-weight: bold;
        }
      }
    }
  }

  @media only screen and (max-width: 1042px) {
    .footer {
      &__content {
        display: grid;
        grid-template-columns: 1fr 1fr;
      }

      &__links {
        margin: 16px;
      }
    }
  }

  @media only screen and (max-width: 500px) {
    .footer {
      &__content {
        display: flex;
        gap: 16px;
      }
    }
  }
</style>
