// tests/unit/OutputSummaryItem.spec.js
import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import OutputSummaryItem from '../components/output-summary-item/OutputSummaryItem.vue'
import ItemSummary from '../components/item-summary/ItemSummary.vue'

describe('OutputSummaryItem.vue', () => {
  const mockItem = {
    vehicle: 'Truck A',
    vehicleReturnCost: 100,
    outboundRoute: 'Route 1',
    outboundCost: 50,
    inboundRoute: 'Route 2',
    inboundCost: 60,
    totalCost: 210
  }

  it('renders the item data correctly', () => {
    const wrapper = shallowMount(OutputSummaryItem, {
      props: { item: mockItem }
    })

    const texts = wrapper.findAll('.text-item').map(t => t.text())
    expect(texts).toContain('Truck A')
    expect(texts).toContain('£100')
    expect(texts).toContain('Route 1 (£50)')
    expect(texts).toContain('Route 2 (£60)')
    expect(texts).toContain('£210')
  })

  it('does not render ItemSummary by default', () => {
    const wrapper = shallowMount(OutputSummaryItem, {
      props: { item: mockItem }
    })

    expect(wrapper.findComponent(ItemSummary).exists()).toBe(false)
  })

  it('toggles displayData when row is clicked', async () => {
    const wrapper = shallowMount(OutputSummaryItem, {
      props: { item: mockItem }
    })

    // Click to expand
    await wrapper.find('.row-item').trigger('click')
    expect(wrapper.vm.displayData).toBe(true)
    expect(wrapper.findComponent(ItemSummary).exists()).toBe(true)

    // Click again to collapse
    await wrapper.find('.row-item').trigger('click')
    expect(wrapper.vm.displayData).toBe(false)
    expect(wrapper.findComponent(ItemSummary).exists()).toBe(false)
  })
})
