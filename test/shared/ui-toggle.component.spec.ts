// test/shared/ui-toggle.component.spec.ts

import { mount } from '@vue/test-utils'
import UiToggle from '../../src/components/shared/ui-toggle.component.vue'

describe('UiToggle.vue', () => {
  const options = [
    { label: 'Opción A', selected: true },
    { label: 'Opción B', selected: false }
  ]

  const factory = (props = {}) =>
    mount(UiToggle, {
      props: {
        options,
        ...props
      }
    })

  it('renderiza todas las opciones', () => {
    const wrapper = factory()
    const sections = wrapper.findAll('.ui-toggle__section')
    expect(sections.length).toBe(2)
    expect(wrapper.text()).toContain('Opción A')
    expect(wrapper.text()).toContain('Opción B')
  })

  it('añade clase "--selected" a la opción seleccionada', () => {
    const wrapper = factory()
    const selected = wrapper.find('.ui-toggle__section--selected')
    expect(selected.exists()).toBe(true)
    expect(selected.text()).toBe('Opción A')
  })

  it('añade clase "--border" si la prop border es true', () => {
    const wrapper = factory({ border: true })
    expect(wrapper.classes()).toContain('ui-toggle--border')
  })

  it('emite evento "click" al pulsar una opción', async () => {
    const wrapper = factory()
    const sections = wrapper.findAll('.ui-toggle__section')
    await sections[1].trigger('click')

    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')?.[0]).toEqual([options[1]])
  })
})
