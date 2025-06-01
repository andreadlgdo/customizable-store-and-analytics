<template>
  <dashboard :selected-item="menuElements[4]">
    <div :class="[baseClass, { [`${baseClass}--edit`]: action }]">
      <div v-if="!action" :class="`${baseClass}__header`">
        <h1 :class="`${baseClass}__title`">Personalización</h1>
        <p :class="`${baseClass}__subtitle`">Selecciona la sección que deseas personalizar</p>
      </div>
      <div v-if="!action" :class="`${baseClass}__wrapper`">
        <section 
          v-for="(section, index) in sections" 
          :key="index"
          @click="selectAction(section.action)" 
          :class="`${baseClass}__section`"
        >
          <div :class="`${baseClass}__section-content`">
            <h2 :class="`${baseClass}__section-title`">{{ section.title }}</h2>
            <p :class="`${baseClass}__section-description`">{{ section.description }}</p>
          </div>
        </section>
      </div>

      <UiHomePagePersonalization v-else-if="action === actions[0]" />
      <UiUserRegisterPersonalization v-else-if="action === actions[1]" />
      <UiContactUsPersonalization v-else-if="action === actions[2]" />
    </div>
  </dashboard>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import Dashboard from './base-dashboard.view.vue';
  import { useUserMenu } from '../../composables';
  
  import UiUserRegisterPersonalization from '../../components/dashboard/personalization/user-register/ui-user-register-personalization.component.vue';
  import UiHomePagePersonalization from '../../components/dashboard/personalization/home-page/ui-home-page-personalization.component.vue';
  import UiContactUsPersonalization from '../../components/dashboard/personalization/contact-us/ui-contact-us-personalization.component.vue';
  
  const baseClass = 'personalization';

  const { menuElements } = useUserMenu();
  const router = useRouter();

  defineProps({
    action: {
      type: String,
      default: undefined
    }
  });

  const actions = ['home-page','user-register','contact-us'];

  const sections = [
    {
      title: 'Home Page',
      description: 'Personaliza la página principal de tu tienda',
      action: 'home-page'
    },
    {
      title: 'Registro de Usuario',
      description: 'Configura el formulario de inicio de sesión y registro de usuarios',
      action: 'user-register'
    },
    {
      title: 'Contacto',
      description: 'Personaliza la página de contacto',
      action: 'contact-us'
    }
  ];

  const selectAction = (action: string) => {
    router.push({
      name: 'Personalization',
      params: { action }
    });
  }
</script>

<style lang="scss" scoped>
.personalization {
    padding: 2rem;
    width: 100%;
    min-height: calc(100vh - 64px);
    background-color: var(--color-background-light, #f8f9fa);

    &--edit {
      background-color: white;
    }

    &__header {
      text-align: center;
      margin-bottom: 3rem;
    }

    &__title {
      font-size: 2.5rem;
      color: var(--color-dark-primary);
      margin-bottom: 0.5rem;
      font-weight: 700;
    }

    &__subtitle {
      font-size: 1.1rem;
      color: var(--color-text-secondary, #6c757d);
    }

    &__wrapper {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    &__section {
      background: white;
      border-radius: 16px;
      padding: 2rem;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      border: 2px solid transparent;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
        border-color: var(--color-dark-primary);
      }
    }

    &__section-content {
      text-align: center;
    }

    &__section-title {
      font-size: 1.5rem;
      color: var(--color-dark-primary);
      margin-bottom: 0.75rem;
      font-weight: 600;
    }

    &__section-description {
      color: var(--color-text-secondary, #6c757d);
      font-size: 1rem;
      line-height: 1.5;
    }
}
</style>
