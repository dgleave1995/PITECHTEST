import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import TileSelect from '../components/tile-select/TileSelect.vue'
import OutputSummaryList from '../components/output-summary-list/OutputSummaryList.vue'
import ReadMe from '../components/read-me/ReadMe.vue'
import Considerations from '../components/considerations/Considerations.vue'

describe('TileSelect.vue', () => {
  const componentsMap = {
    OutputSummaryList,
    ReadMe,
    Considerations
  }

  it('renders the title prop when collapsed', () => {
    const wrapper = shallowMount(TileSelect, {
      props: { title: 'Test Title', component: 'ReadMe' }
    })

    expect(wrapper.text()).toContain('Test Title')
    expect(wrapper.classes()).toContain('menuBox')
  })

  it('does not render content initially', () => {
    const wrapper = shallowMount(TileSelect, {
      props: { title: 'Test Title', component: 'ReadMe' }
    })

    expect(wrapper.find('.content').exists()).toBe(false)
  })

  it('expands when clicked', async () => {
    const wrapper = shallowMount(TileSelect, {
      props: { title: 'Test Title', component: 'ReadMe' }
    })

    await wrapper.trigger('click')

    expect(wrapper.classes()).toContain('expanded')
    expect(wrapper.find('.content').exists()).toBe(true)
    expect(wrapper.find('h2').text()).toBe('Test Title')
  })

  it('closes when close button is clicked', async () => {
    const wrapper = shallowMount(TileSelect, {
      props: { title: 'Test Title', component: 'ReadMe' }
    })

    await wrapper.trigger('click') // expand first
    await wrapper.find('.close-btn').trigger('click')

    expect(wrapper.classes()).not.toContain('expanded')
    expect(wrapper.find('.content').exists()).toBe(false)
  })

  it('renders the correct child component', async () => {
    const wrapper = shallowMount(TileSelect, {
      props: { title: 'Test Title', component: 'ReadMe' }
    })

    await wrapper.trigger('click')

    const resolved = wrapper.vm.resolvedComponent
    expect(resolved).toBe(componentsMap['ReadMe'])
    expect(wrapper.findComponent(resolved).exists()).toBe(true)
  })
})
