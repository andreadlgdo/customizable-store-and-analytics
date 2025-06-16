import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import UiButton from '../../src/components/shared/ui-button.component.vue'

vi.mock('../../src/components/shared/ui-icon.component.vue', () => ({
    default: {
      name: 'UiIcon',
      template: '<div class="mock-ui-icon" />'
    }
}))

describe('UiButton.vue', () => {
    it('renderiza texto si se proporciona', () => {
      const wrapper = mount(UiButton, {
        props: { text: 'Click me' }
      })
  
      expect(wrapper.text()).toBe('Click me')
    })
  
    it('emite "click" al hacer click', async () => {
      const wrapper = mount(UiButton)
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeTruthy()
    })
  
    it('aplica clase --transparent si prop "transparent" es true', () => {
      const wrapper = mount(UiButton, {
        props: { transparent: true }
      })
      expect(wrapper.classes()).toContain('ui-button--transparent')
    })
  
    it('aplica clase --soft si prop "colorSoft" es true', () => {
      const wrapper = mount(UiButton, {
        props: { colorSoft: true }
      })
      expect(wrapper.classes()).toContain('ui-button--soft')
    })
  
    it('aplica clase --disabled si prop "disabled" es true', () => {
      const wrapper = mount(UiButton, {
        props: { disabled: true }
      })
      expect(wrapper.classes()).toContain('ui-button--disabled')
    })
})