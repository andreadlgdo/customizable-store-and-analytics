import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import UiHierarchicalList from '../../src/components/shared/ui-hierarchical-list.component.vue'

vi.mock('@/components/shared/ui-icon-button.component.vue', () => ({
    default: {
      name: 'UiIconButton',
      template: '<button class="mock-icon-button" @click="$emit(\'click\')" />'
    }
  }))
  
  vi.mock('@/composables', () => ({
    useTextTransform: () => ({
      capitalizeSentence: (text: string) => text.charAt(0).toUpperCase() + text.slice(1)
    })
  }))
  
  const mockItems = [
    {
      id: 1,
      label: 'item 1',
      image: 'https://example.com/image.jpg'
    },
    {
      id: 2,
      label: 'item 2',
      subItem: [
        { id: 21, label: 'subitem 1' },
        { id: 22, label: 'subitem 2' }
      ]
    }
  ]
  
  describe('UiHierarchicalList', () => {
    it('renderiza los items correctamente', () => {
      const wrapper = mount(UiHierarchicalList, {
        props: { items: mockItems }
      })
  
      const texts = wrapper.findAll('.list-items__text--item')
      expect(texts).toHaveLength(2)
      expect(texts[0].text()).toBe('Item 1')
      expect(texts[1].text()).toBe('Item 2')
    })
  
    it('renderiza imagen si existe', () => {
      const wrapper = mount(UiHierarchicalList, {
        props: { items: mockItems }
      })
  
      const image = wrapper.find('.list-items__image')
      expect(image.exists()).toBe(true)
      expect(image.attributes('style')).toContain('https://example.com/image.jpg')
    })
  
    it('emite "clickItem" al hacer click en el item', async () => {
      const wrapper = mount(UiHierarchicalList, {
        props: { items: mockItems }
      })
  
      await wrapper.find('.list-items__text--item').trigger('click')
      expect(wrapper.emitted('clickItem')).toBeTruthy()
    })
  
    it('renderiza icono de expandir si tiene subitems y expansible es true', () => {
      const wrapper = mount(UiHierarchicalList, {
        props: { items: mockItems, expansible: true }
      })
  
      expect(wrapper.find('.mock-icon-button').exists()).toBe(true)
    })
  
    it('emite "clickSubItem" si expansible es false y hay subitems', async () => {
      const wrapper = mount(UiHierarchicalList, {
        props: { items: mockItems, expansible: false }
      })
  
      await wrapper.find('.mock-icon-button').trigger('click')
      expect(wrapper.emitted('clickSubItem')).toBeTruthy()
    })
  })