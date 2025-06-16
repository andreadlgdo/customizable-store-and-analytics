import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import UiIcon from '../../src/components/shared/ui-icon.component.vue';
import UiIconButton from '../../src/components/shared/ui-icon-button.component.vue';
import BaseTooltip from '../../src/components/inputs/base-tooltip.component.vue'

vi.mock('@/components/shared/ui-icon.component.vue', () => ({
  default: {
    name: 'UiIcon',
    template: '<div class="mock-icon"></div>'
  }
}));

vi.mock('@/components/inputs', () => ({
  BaseTooltip: {
    name: 'BaseTooltip',
    props: ['text'],
    template: '<div class="mock-tooltip">{{ text }}</div>'
  }
}));

describe('UiIconButton.vue', () => {
  const mountComponent = (props = {}) => {
    return mount(UiIconButton, {
      props: {
        icon: 'close',
        ...props
      }
    });
  };

  it('renderiza el componente con el icono', () => {
    const wrapper = mountComponent();
    expect(wrapper.find('.ui-icon-button__icon').exists()).toBe(true);
  });

  it('emite evento click al pulsar el botón', async () => {
    const wrapper = mountComponent();
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });

  it('no muestra el tooltip si no hay tooltipText', async () => {
    const wrapper = mountComponent();

    const icon = wrapper.findComponent(UiIcon);
    await icon.trigger('mouseenter');
    expect(wrapper.findComponent(BaseTooltip).exists()).toBe(false);
  });
});
