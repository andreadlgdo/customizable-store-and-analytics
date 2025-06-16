// test/shared/ui-pill.component.spec.ts
import { mount } from '@vue/test-utils'
import UiPill from '../../src/components/shared/ui-pill.component.vue'

describe('UiPill.vue', () => {
  it('muestra el texto pasado como prop', () => {
    const wrapper = mount(UiPill, {
      props: {
        text: 'Hola mundo'
      }
    })

    expect(wrapper.text()).toBe('Hola mundo')
  })

  it('usa las clases por defecto si no se pasan props opcionales', () => {
    const wrapper = mount(UiPill, {
      props: {
        text: 'Texto'
      }
    })

    expect(wrapper.classes()).toContain('ui-pill')
    expect(wrapper.classes()).toContain('ui-pill--normal')
    expect(wrapper.classes()).toContain('ui-pill--default')
  })

  it('aplica la clase correspondiente al tamaño', () => {
    const wrapper = mount(UiPill, {
      props: {
        text: 'Grande',
        size: 'large'
      }
    })

    expect(wrapper.classes()).toContain('ui-pill--large')
  })

  it('aplica la clase correspondiente al estado', () => {
    const wrapper = mount(UiPill, {
      props: {
        text: 'Error',
        status: 'error'
      }
    })

    expect(wrapper.classes()).toContain('ui-pill--error')
  })

  it('acepta el estado "success"', () => {
    const wrapper = mount(UiPill, {
      props: {
        text: 'Correcto',
        status: 'success'
      }
    })

    expect(wrapper.classes()).toContain('ui-pill--success')
  })
})
