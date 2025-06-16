import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import UiImage from '../../src/components/shared/ui-image.component.vue'

// Mock del botón de icono
vi.mock('@/components/shared/ui-icon-button.component.vue', () => ({
  default: {
    name: 'IconButton',
    template: '<button class="mock-icon-button" @click="$emit(\'click\')" />'
  }
}))

describe('UiImage', () => {
    it('renderiza con clase base y modificadores', () => {
        const wrapper = mount(UiImage, {
        props: {
            type: 'semi-round',
            size: 'large'
        }
        })

        const root = wrapper.find('span')
        expect(root.classes()).toContain('ui-image')
        expect(root.classes()).toContain('ui-image--semi-round')
        expect(root.classes()).toContain('ui-image--large')
    })

    it('usa imagen personalizada si se proporciona', () => {
        const wrapper = mount(UiImage, {
        props: {
            image: 'https://example.com/avatar.jpg'
        }
        })

        const imageDiv = wrapper.find('.ui-image__image')
        expect(imageDiv.attributes('style')).toContain('https://example.com/avatar.jpg')
    })

    it('usa imagen por defecto si no se proporciona', () => {
        const wrapper = mount(UiImage)
        const imageDiv = wrapper.find('.ui-image__image')

        // Esperamos que tenga la ruta relativa a `empty.png` en el estilo
        expect(imageDiv.attributes('style')).toContain('empty.png')
    })

    it('muestra botón de subida en modo upload', () => {
        const wrapper = mount(UiImage, {
        props: {
            uploadMode: true
        }
        })

        expect(wrapper.find('.mock-icon-button').exists()).toBe(true)
    })

    it('emite evento "upload" al seleccionar una imagen', async () => {
    const wrapper = mount(UiImage, {
        props: {
        uploadMode: true
        }
    })

    const input = wrapper.find('input[type="file"]')

    // Creamos un evento real de tipo 'change'
    const event = new Event('change')
    Object.defineProperty(event, 'target', {
        writable: false,
        value: { files: ['mockFile'] }
    })

    await input.element.dispatchEvent(event)

    expect(wrapper.emitted('upload')).toBeTruthy()
    expect(wrapper.emitted('upload')![0][0]).toBe(event)
    })


    it('activa input de archivo al hacer click en el botón', async () => {
    const clickSpy = vi.fn()
    const wrapper = mount(UiImage, {
        props: { uploadMode: true },
        attachTo: document.body
    })

    // Simula el ref al input con un espía
    const input = wrapper.find('input[type="file"]')
    input.element.click = clickSpy

    await wrapper.find('.mock-icon-button').trigger('click')
    expect(clickSpy).toHaveBeenCalled()
    })
})
