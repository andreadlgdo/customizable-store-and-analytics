import { mount } from '@vue/test-utils'
import UiLoading from '../../src/components/shared/ui-loading.component.vue'

describe('UiLoading', () => {
  it('renderiza correctamente el componente con clases base', () => {
    const wrapper = mount(UiLoading)

    const container = wrapper.find('.ui-loading')
    const progress = wrapper.find('.ui-loading__progress')

    expect(container.exists()).toBe(true)
    expect(progress.exists()).toBe(true)
  })
})

