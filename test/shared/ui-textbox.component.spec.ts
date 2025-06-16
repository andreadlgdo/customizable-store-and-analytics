import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import UiTextbox from '../../src/components/shared/ui-textbox.component.vue'

vi.mock('@/composables', () => ({
  useTextTransform: () => ({
    capitalizeSentence: (text: string) => text.toUpperCase()
  })
}))

vi.mock('@/components/shared/ui-icon.component.vue', () => ({
  default: {
    name: 'UiIcon',
    template: '<div class="mock-ui-icon" />'
  }
}))

describe('UiTextbox.vue', () => {
  it('renderiza el valor inicial', () => {
    const wrapper = mount(UiTextbox, {
      props: { value: 'hola' }
    })
    const input = wrapper.find('input')
    expect((input.element as HTMLInputElement).value).toBe('hola')
  })

  it('emite input al cambiar el texto', async () => {
    const wrapper = mount(UiTextbox, {
      props: { value: '' }
    })

    const input = wrapper.find('input')
    await input.setValue('nuevo valor')
    expect(wrapper.emitted('input')).toBeTruthy()
    expect(wrapper.emitted('input')![0]).toEqual(['nuevo valor'])
  })

  it('renderiza textarea si multiline es true', () => {
    const wrapper = mount(UiTextbox, {
      props: { value: '', multiline: true }
    })
    expect(wrapper.find('textarea').exists()).toBe(true)
    expect(wrapper.find('input').exists()).toBe(false)
  })

  it('muestra el label capitalizado si se proporciona', () => {
    const wrapper = mount(UiTextbox, {
      props: { value: '', label: 'nombre' }
    })
    expect(wrapper.text()).toContain('NOMBRE')
  })

  it('muestra el mensaje de error si se proporciona', () => {
    const wrapper = mount(UiTextbox, {
      props: { value: '', error: 'Campo requerido' }
    })
    expect(wrapper.text()).toContain('Campo requerido')
    expect(wrapper.classes()).toContain('ui-textbox--error')
  })

  it('aplica clase --disabled si disabled es true', () => {
    const wrapper = mount(UiTextbox, {
      props: { value: '', disabled: true }
    })
    expect(wrapper.classes()).toContain('ui-textbox--disabled')
  })
})
