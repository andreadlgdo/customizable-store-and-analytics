import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import UiIcon from '../../src/components/shared/ui-icon.component.vue';

describe('UiIcon', () => {
  const mockSvg = '<svg><circle cx="50" cy="50" r="40"></circle></svg>';

  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        text: () => Promise.resolve(mockSvg)
      } as Response)
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renderiza el contenido SVG desde el src', async () => {
    const wrapper = mount(UiIcon, {
      props: {
        src: '/icon.svg'
      }
    });

    await new Promise(resolve => setTimeout(resolve));

    expect(global.fetch).toHaveBeenCalledWith('/icon.svg');
    expect(wrapper.html()).toContain('circle cx="50" cy="50" r="40">');
  });

  it('aplica clases base y de tamaño', () => {
    const wrapper = mount(UiIcon, {
      props: {
        src: '/icon.svg',
        size: 'small'
      }
    });

    expect(wrapper.classes()).toContain('ui-icon');
    expect(wrapper.classes()).toContain('ui-icon--small');
  });
});
