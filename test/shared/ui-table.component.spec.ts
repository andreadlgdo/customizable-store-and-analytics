import { mount } from '@vue/test-utils'
import UiTable from '../../src/components/shared/ui-table.component.vue'

const columns = [
  { id: 'name', label: 'Name', sortable: true },
  { id: 'age', label: 'Age', sortable: true }
]

const data = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'Bob', age: 25 },
  { id: 3, name: 'Charlie', age: 35 }
]

describe('UiTable.vue', () => {
  const factory = (props = {}) =>
    mount(UiTable, {
      props: {
        columns,
        data,
        ...props
      },
      global: {
        stubs: {
          UiIconButton: true
        }
      }
    })

  it('renderiza correctamente los encabezados', () => {
    const wrapper = factory()
    columns.forEach(col => {
      expect(wrapper.html()).toContain(col.label)
    })
  })

  it('renderiza las filas correctamente', () => {
    const wrapper = factory()
    expect(wrapper.findAll('tbody tr').length).toBe(data.length)
  })

  it('emite evento edit al hacer clic en el botón de editar', async () => {
    const wrapper = factory({ editable: true })
    await wrapper.findAllComponents({ name: 'UiIconButton' })[0].vm.$emit('click')
    expect(wrapper.emitted('edit')).toBeTruthy()
  })

  it('emite evento delete al hacer clic en el botón de eliminar', async () => {
    const wrapper = factory({ removable: true })
    await wrapper.findAllComponents({ name: 'UiIconButton' })[0].vm.$emit('click')
    expect(wrapper.emitted('delete')).toBeTruthy()
  })

  it('emite evento seeDetails al hacer clic en el botón de ver detalles', async () => {
    const wrapper = factory({ details: true })
    await wrapper.findAllComponents({ name: 'UiIconButton' })[0].vm.$emit('click')
    expect(wrapper.emitted('seeDetails')).toBeTruthy()
  })

  it('realiza ordenación ascendente y descendente', async () => {
    const wrapper = factory()
    const th = wrapper.find('th')
    await th.trigger('click')
    expect(wrapper.html()).toContain('▲')
    await th.trigger('click')
    expect(wrapper.html()).toContain('▼')
  })

  it('no renderiza tabla si no hay datos', () => {
    const wrapper = factory({ data: [] })
    expect(wrapper.find('table').exists()).toBe(false)
  })
})
