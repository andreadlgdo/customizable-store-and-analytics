import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import UiHeader from '../../src/components/shared/ui-header.component.vue'
import UiIconButton from '../../src/components/shared/ui-icon-button.component.vue'
import { useRouter } from 'vue-router'

// Mock router
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn()
  })
}))

// Mock customService
vi.mock('@/services', () => ({
  customService: {
    getCustomTexts: vi.fn(() => Promise.resolve({ name: 'Default Shop' }))
  }
}))

describe('UiHeader.vue', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(async () => {
    wrapper = mount(UiHeader, {
      props: {
        name: 'Test Store'
      },
      global: {
        stubs: {
          UiIconButton: {
            template: '<button class="ui-icon-button" @click="$emit(\'click\')" />'
          }
        }
      },
      attachTo: document.body
    })

    await new Promise(resolve => setTimeout(resolve)) // esperar mounted
  })

  it('renderiza el nombre pasado por props', () => {
    expect(wrapper.text()).toContain('Test Store')
  })

  it('emite "openMenu" al hacer click en el botón de menú', async () => {
    const menuButton = wrapper.findAllComponents(UiIconButton)[0]
    await menuButton.trigger('click')
    expect(wrapper.emitted('openMenu')).toBeTruthy()
  })

  it('emite "openUserMenu", "openWhistList" y "openShoppingCart"', async () => {
    const buttons = wrapper.findAllComponents(UiIconButton)
    await buttons[1].trigger('click')
    await buttons[2].trigger('click')
    await buttons[3].trigger('click')

    expect(wrapper.emitted('openUserMenu')).toBeTruthy()
    expect(wrapper.emitted('openWhistList')).toBeTruthy()
    expect(wrapper.emitted('openShoppingCart')).toBeTruthy()
  })

  it('aplica clase --disabled si disabled es true', async () => {
    await wrapper.setProps({ disabled: true })
    expect(wrapper.find('.ui-header__text').classes()).toContain('ui-header__text--disabled')
  })

  it('aplica clase --transparent si no ha hecho scroll y prop "transparent" es true', async () => {
    await wrapper.setProps({ transparent: true })
    expect(wrapper.classes()).toContain('ui-header--transparent')
  })

  it('aplica clase --scrolled al hacer scroll', async () => {
    window.scrollY = 100
    window.dispatchEvent(new Event('scroll'))
    await new Promise(resolve => setTimeout(resolve))
    expect(wrapper.classes()).toContain('ui-header--scrolled')
  })

  it('aplica clase --fixed si prop "fixed" es true', async () => {
    await wrapper.setProps({ fixed: true })
    expect(wrapper.classes()).toContain('ui-header--fixed')
  })
})