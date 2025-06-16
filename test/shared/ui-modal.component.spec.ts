import { mount } from '@vue/test-utils'
import { vi } from 'vitest'
import UiModal from '../../src/components/shared/ui-modal.component.vue'

vi.mock('@/components/shared/ui-icon.component.vue', () => ({
    default: {
      name: 'UiIcon',
      template: '<svg class="mock-ui-icon"></svg>'
    }
  }))

  
describe('UiModal.vue', () => {
  it('no se renderiza si isOpen es false', () => {
    const wrapper = mount(UiModal, {
      props: { isOpen: false }
    })

    expect(wrapper.find('.ui-modal').exists()).toBe(false)
  })

  it('se renderiza si isOpen es true', () => {
    const wrapper = mount(UiModal, {
      props: { isOpen: true }
    })

    expect(wrapper.find('.ui-modal').exists()).toBe(true)
    expect(wrapper.find('.ui-modal__overlay').exists()).toBe(true)
  })

  it('emite "close" al hacer click en el overlay', async () => {
    const wrapper = mount(UiModal, {
      props: { isOpen: true }
    })

    await wrapper.find('.ui-modal__overlay').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('emite "close" al hacer click en el botón de cerrar', async () => {
    const wrapper = mount(UiModal, {
      props: { isOpen: true }
    })

    await wrapper.find('.ui-modal__icon').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('renderiza contenido dentro del slot', () => {
    const wrapper = mount(UiModal, {
      props: { isOpen: true },
      slots: {
        default: '<p class="slot-content">Contenido de prueba</p>'
      }
    })

    expect(wrapper.find('.slot-content').exists()).toBe(true)
    expect(wrapper.find('.slot-content').text()).toBe('Contenido de prueba')
  })
})
