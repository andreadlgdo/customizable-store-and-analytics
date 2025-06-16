import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import UiExpandSection from '../../src/components/shared/ui-expand-section.component.vue'

describe('UiExpandSection.vue', () => {
  it('renderiza el título correctamente', () => {
    const wrapper = mount(UiExpandSection, {
      props: { title: 'Mi título' }
    })
    expect(wrapper.find('.ui-expand-section__title').text()).toBe('Mi título')
  })

  it('no muestra el contenido por defecto si initialExpanded es false', () => {
    const wrapper = mount(UiExpandSection, {
      props: { title: 'Sección' }
    })
    expect(wrapper.find('.ui-expand-section__content').exists()).toBe(false)
  })

  it('muestra el contenido si initialExpanded es true', () => {
    const wrapper = mount(UiExpandSection, {
      props: { title: 'Sección', initialExpanded: true },
      slots: {
        default: '<div class="contenido-slot">Contenido visible</div>'
      }
    })
    expect(wrapper.find('.contenido-slot').exists()).toBe(true)
  })

  it('togglea el estado expandido al hacer click en el header', async () => {
    const wrapper = mount(UiExpandSection, {
      props: { title: 'Sección' },
      slots: {
        default: '<p>Contenido oculto</p>'
      }
    })

    const header = wrapper.find('.ui-expand-section__header')
    expect(wrapper.find('.ui-expand-section__content').exists()).toBe(false)

    await header.trigger('click')
    expect(wrapper.find('.ui-expand-section__content').exists()).toBe(true)

    await header.trigger('click')
    expect(wrapper.find('.ui-expand-section__content').exists()).toBe(false)
  })

  it('añade la clase "expanded" al icono si está expandido', async () => {
    const wrapper = mount(UiExpandSection, {
      props: { title: 'Icono' }
    })

    const icon = wrapper.find('.ui-expand-section__icon')
    expect(icon.classes()).not.toContain('expanded')

    await wrapper.find('.ui-expand-section__header').trigger('click')
    expect(icon.classes()).toContain('expanded')
  })
})
