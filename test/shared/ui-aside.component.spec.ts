import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import UiAside from '../../src/components/shared/ui-aside.component.vue'
import UiIconButton from '../../src/components/shared/ui-icon-button.component.vue';

vi.mock('../../src/components/shared/ui-icon.component.vue', () => ({
    default: {
      name: 'UiIcon',
      template: '<div class="mock-ui-icon" />'
    }
  }));

  
describe('UiAside.vue', () => {
    const mountComponent = (props = {}) =>
      mount(UiAside, {
        props: {
          isOpen: true,
          position: 'right',
          fixed: true,
          ...props
        },
        slots: {
          default: '<div class="content">Contenido</div>'
        },
        attachTo: document.body // necesario para clicks fuera del componente
      });
  
    it('se renderiza si isOpen es true', () => {
      const wrapper = mountComponent();
      expect(wrapper.find('.ui-aside').exists()).toBe(true);
    });
  
    it('no se renderiza si isOpen es false', () => {
      const wrapper = mountComponent({ isOpen: false });
      expect(wrapper.find('.ui-aside').exists()).toBe(false);
    });
  
    it('muestra el icono si se pasa icon', () => {
      const wrapper = mountComponent({ icon: 'close' });
      expect(wrapper.findComponent(UiIconButton).exists()).toBe(true);
    });
  
    it('emite "click" al hacer click en el icono', async () => {
      const wrapper = mountComponent({ icon: 'close' });
      await wrapper.findComponent(UiIconButton).trigger('click');
      expect(wrapper.emitted('click')).toBeTruthy();
    });
  
    it('emite "click" al hacer click fuera si fixed es true', async () => {
        const wrapper = mountComponent();
      
        const event = new MouseEvent('mousedown', {
          bubbles: true,
          cancelable: true
        });
      
        Object.defineProperty(event, 'target', { value: document.body });
      
        document.dispatchEvent(event);
      
        await wrapper.vm.$nextTick();
      
        expect(wrapper.emitted('click')).toBeTruthy();
    });
      
    it('NO emite "click" al hacer click fuera si fixed es false', async () => {
        const wrapper = mountComponent({ fixed: false });
      
        const event = new MouseEvent('mousedown', {
          bubbles: true,
          cancelable: true
        });
      
        Object.defineProperty(event, 'target', { value: document.body });
      
        document.dispatchEvent(event);
      
        await wrapper.vm.$nextTick();
      
        expect(wrapper.emitted('click')).toBeFalsy();
    });
});

