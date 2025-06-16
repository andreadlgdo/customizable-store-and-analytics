import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import UiCheckbox from '../../src/components/shared/ui-checkbox.component.vue'

describe('UiCheckbox.vue', () => {
  it('renderiza el texto si se proporciona', () => {
    const wrapper = mount(UiCheckbox, {
      props: { value: false, text: 'Aceptar términos' }
    })
    expect(wrapper.text()).toContain('Aceptar términos')
  })

  it('emite "change" al cambiar el estado del checkbox', async () => {
    const wrapper = mount(UiCheckbox, {
      props: { value: false }
    })

    const checkbox = wrapper.find('input[type="checkbox"]')
    await checkbox.setValue(true)

    expect(wrapper.emitted('change')).toBeTruthy()
  })

  it('está marcado si el prop value es true', () => {
    const wrapper = mount(UiCheckbox, {
      props: { value: true }
    })

    const checkbox = wrapper.find('input[type="checkbox"]')
    expect((checkbox.element as HTMLInputElement).checked).toBe(true)
  })

  it('muestra mensaje de error si se proporciona', () => {
    const wrapper = mount(UiCheckbox, {
      props: { value: false, error: 'Campo obligatorio' }
    })

    expect(wrapper.text()).toContain('Campo obligatorio')
    expect(wrapper.find('.ui-checkbox__text').exists()).toBe(true)
  })

  it('aplica clase "--disabled" si está deshabilitado', () => {
    const wrapper = mount(UiCheckbox, {
      props: { value: false, disabled: true }
    })

    const label = wrapper.find('label')
    expect(label.classes()).toContain('ui-checkbox--disabled')

    const checkbox = wrapper.find('input')
    expect(checkbox.attributes('disabled')).toBeDefined()
  })
})
