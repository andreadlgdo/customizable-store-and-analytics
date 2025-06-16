import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import UiPassword from '../../src/components/shared/ui-password.component.vue'

// Stubs
const UiTextboxStub = defineComponent({
  name: 'UiTextbox',
  props: ['modelValue', 'label', 'placeholder', 'disabled', 'error', 'type'],
  emits: ['input'],
  template: `<input :type="type" @input="$emit('input', $event.target.value)" />`
})

const UiPillStub = defineComponent({
  name: 'UiPill',
  props: ['text', 'status'],
  template: `<div class="ui-pill">{{ text }} - {{ status }}</div>`
})

describe('UiPassword.vue', () => {
  const factory = (props = {}) => {
    return mount(UiPassword, {
      props: {
        value: '',
        ...props
      },
      global: {
        components: {
          UiTextbox: UiTextboxStub,
          UiPill: UiPillStub
        }
      }
    })
  }

  it('renderiza UiTextbox con tipo "password"', () => {
    const wrapper = factory()
    const textbox = wrapper.find('input')
    expect(textbox.exists()).toBe(true)
    expect(textbox.attributes('type')).toBe('password')
  })

  it('no muestra condiciones si haveConditions es false', () => {
    const wrapper = factory({ haveConditions: false })
    expect(wrapper.find('.ui-password__conditions').exists()).toBe(false)
  })

  it('muestra condiciones si haveConditions es true', () => {
    const wrapper = factory({ haveConditions: true })
    const pills = wrapper.findAll('.ui-pill')
    expect(pills.length).toBe(4)
    expect(wrapper.find('.ui-password__conditions').exists()).toBe(true)
  })

  it('emite evento "input" directamente si no hay condiciones', async () => {
    const wrapper = factory({ haveConditions: false })
    await wrapper.find('input').setValue('test123')
    const events = wrapper.emitted('input')
    expect(events).toBeTruthy()
    expect(events?.[0]).toEqual(['test123'])
  })

  it('valida condiciones y emite "input" con validez cuando haveConditions es true', async () => {
    const wrapper = factory({ haveConditions: true })
    await wrapper.find('input').setValue('Test123!')
    const events = wrapper.emitted('input')
    expect(events).toBeTruthy()
    expect(events?.[0][0]).toBe('Test123!')
    expect(events?.[0][1]).toBe(true) // todas las condiciones cumplidas
  })

  it('valida condiciones parcialmente y emite "input" con false', async () => {
    const wrapper = factory({ haveConditions: true })
    await wrapper.find('input').setValue('123')
    const events = wrapper.emitted('input')
    expect(events).toBeTruthy()
    expect(events?.[0][0]).toBe('123')
    expect(events?.[0][1]).toBe(false) // no todas las condiciones cumplidas
  })
})
