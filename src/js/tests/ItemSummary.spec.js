// tests/unit/ItemSummary.spec.js
import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import ItemSummary from '../components/item-summary/ItemSummary.vue'

describe('ItemSummary.vue', () => {
  const mockItem = {
    outboundAlternatives: [
      { route: 'Primary Out', cost: 100 },
      { route: 'Alt Out 1', cost: 120 },
      { route: 'Alt Out 2', cost: 150 }
    ],
    inboundAlternatives: [
      { route: 'Primary In', cost: 90 },
      { route: 'Alt In 1', cost: 110 },
      { route: 'Alt In 2', cost: 130 }
    ]
  }

  it('renders outbound alternative routes excluding the first', () => {
    const wrapper = shallowMount(ItemSummary, {
      props: { item: mockItem }
    })

    const outboundListItems = wrapper.findAll('ul')[0].findAll('li')
    expect(outboundListItems.length).toBe(2)
    expect(outboundListItems[0].text()).toBe('Alt Out 1 (£120)')
    expect(outboundListItems[1].text()).toBe('Alt Out 2 (£150)')
  })

  it('renders inbound alternative routes excluding the first', () => {
    const wrapper = shallowMount(ItemSummary, {
      props: { item: mockItem }
    })

    const inboundListItems = wrapper.findAll('ul')[1].findAll('li')
    expect(inboundListItems.length).toBe(2)
    expect(inboundListItems[0].text()).toBe('Alt In 1 (£110)')
    expect(inboundListItems[1].text()).toBe('Alt In 2 (£130)')
  })
})
