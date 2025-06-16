import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import UiColorPicker from '../../src/components/shared/ui-color-picker.component.vue'

// Mock del componente UiTextbox
vi.mock('@/components/shared/ui-textbox.component.vue', () => ({
  default: {
    name: 'UiTextbox',
    template: '<input class="mock-ui-textbox" @input="$emit(\'input\', $event.target.value)" :value="value" />',
    props: ['value', 'label', 'info']
  }
}))

describe('UiColorPicker.vue', () => {
  it('renderiza el input de tipo color con el valor por defecto', () => {
    const wrapper = mount(UiColorPicker)
    const input = wrapper.find('input[type="color"]')
    expect(input.exists()).toBe(true)
    expect((input.element as HTMLInputElement).value).toBe('#000000')
  })

  it('renderiza el input de tipo color con el valor proporcionado', () => {
    const wrapper = mount(UiColorPicker, {
      props: { modelValue: '#ff0000' }
    })
    const input = wrapper.find('input[type="color"]')
    expect((input.element as HTMLInputElement).value).toBe('#ff0000')
  })

  it('emite "update:modelValue" al cambiar el color', async () => {
    const wrapper = mount(UiColorPicker, {
      props: { modelValue: '#000000' }
    })

    const input = wrapper.find('input[type="color"]')
    await input.setValue('#00ff00')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['#00ff00'])
  })

  it('emite "update:modelValue" al cambiar el valor en el textbox', async () => {
    const wrapper = mount(UiColorPicker, {
      props: { modelValue: '#123456' }
    })

    const textbox = wrapper.find('.mock-ui-textbox')
    await textbox.setValue('#abcdef')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['#abcdef'])
  })

  it('aplica estilo de alineación según props', () => {
    const wrapper1 = mount(UiColorPicker)
    expect(wrapper1.find('input[type="color"]').attributes('style')).toContain('flex-start')

    const wrapper2 = mount(UiColorPicker, {
      props: { label: 'Color', info: 'Información' }
    })
    expect(wrapper2.find('input[type="color"]').attributes('style')).toContain('center')

    const wrapper3 = mount(UiColorPicker, {
      props: { label: 'Color' }
    })
    expect(wrapper3.find('input[type="color"]').attributes('style')).toContain('flex-end')
  })
})
