import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import UiSearch from '../../src/components/shared/ui-search.component.vue'


const UiIconButtonStub = defineComponent({
  name: 'UiIconButton',
  props: ['icon', 'size'],
  emits: ['click'],
  template: '<button class="ui-icon-button" @click="$emit(\'click\')" />'
})

describe('UiSearch.vue', () => {
    const factory = (props = {}) =>
      mount(UiSearch, {
        props: {
        value: '',
        ...props
        },
        global: {
          stubs: {
              UiIcon: true,
              UiIconButton: UiIconButtonStub
          }
        }
    })
      

  it('renderiza correctamente con placeholder por defecto', () => {
    const wrapper = factory()
    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.attributes('placeholder')).toBe('Search')
  })

  it('muestra el valor inicial pasado como prop', () => {
    const wrapper = factory({ value: 'initial search' })
    const input = wrapper.find('input') as any
    expect((input.element as HTMLInputElement).value).toBe('initial search')
  })

  it('emite evento "search" al escribir', async () => {
    const wrapper = factory()
    const input = wrapper.find('input')
    await input.setValue('banana')

    const emitted = wrapper.emitted('search')
    expect(emitted).toBeTruthy()
    expect(emitted?.[0]).toEqual(['banana'])
  })

  it('limpia el input al hacer click en el botón de cerrar', async () => {
    const wrapper = factory({ value: 'clear me' })
    const button = wrapper.findComponent({ name: 'UiIconButton' })

    await button.trigger('click')

    // Debe emitir 'search' con string vacío
    const emitted = wrapper.emitted('search')
    expect(emitted?.some(e => e[0] === '')).toBe(true)

    // Input también debe estar vacío
    const input = wrapper.find('input')
    expect((input.element as HTMLInputElement).value).toBe('')
  })

  it('actualiza el valor local si cambia la prop "value"', async () => {
    const wrapper = factory({ value: 'apple' })
    await wrapper.setProps({ value: 'orange' })

    const input = wrapper.find('input')
    expect((input.element as HTMLInputElement).value).toBe('orange')
  })
})
