import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import TileSelectWrapper from '../components/tile-select-wrapper/TileSelectWrapper.vue'
import TileSelect from '../components/tile-select/TileSelect.vue'


describe('TileSelectWrapper.vue', () => {
  const mockMenus = [
    { title: 'Menu 1', component: 'ReadMe' },
    { title: 'Menu 2', component: 'Considerations' },
    { title: 'Menu 3', component: 'OutputSummaryList' }
  ]

  it('renders the correct number of TileSelect components', () => {
    const wrapper = shallowMount(TileSelectWrapper, {
      props: { menus: mockMenus }
    })

    const tiles = wrapper.findAllComponents(TileSelect)
    expect(tiles.length).toBe(mockMenus.length)
  })

  it('passes the correct props to TileSelect', () => {
    const wrapper = shallowMount(TileSelectWrapper, {
      props: { menus: mockMenus }
    })

    const tiles = wrapper.findAllComponents(TileSelect)
    tiles.forEach((tile, index) => {
      expect(tile.props('title')).toBe(mockMenus[index].title)
      expect(tile.props('component')).toBe(mockMenus[index].component)
    })
  })

  it('renders container div with class "tile-container"', () => {
    const wrapper = shallowMount(TileSelectWrapper, {
      props: { menus: mockMenus }
    })

    expect(wrapper.classes()).toContain('tile-container')
  })
})
