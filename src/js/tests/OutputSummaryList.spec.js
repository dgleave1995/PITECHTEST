import { describe, it, expect, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import OutputSummaryList from '../components/output-summary-list/OutputSummaryList.vue'
import OutputSummaryItem from '../components/output-summary-item/OutputSummaryItem.vue'
import journeyCalculator from '../../js/services/journey-calculator.js'
import journeysJson from '../../configs/journeys.json'

describe('OutputSummaryList.vue', () => {
  let wrapper
  let calculatedJourneys

  beforeEach(() => {
    // Calculate journeys using the real service
    calculatedJourneys = journeyCalculator.calculateJourneySuggestions(journeysJson)

    wrapper = shallowMount(OutputSummaryList)
  })

  it('renders the heading', () => {
    expect(wrapper.find('h3').text()).toBe('Output Summary List')
  })

  it('renders the table headers', () => {
    const headers = wrapper.findAll('.text-heading, .text-item').map(h => h.text())
    expect(headers).toContain('Vehicle')
    expect(headers).toContain('Vehicle Cost')
    expect(headers).toContain('Outbound Route')
    expect(headers).toContain('Inbound Route')
    expect(headers).toContain('Total Cost')
  })

  it('renders the correct number of OutputSummaryItem components', () => {
    const items = wrapper.findAllComponents(OutputSummaryItem)
    expect(items.length).toBe(calculatedJourneys.length)
  })

  it('passes the correct item prop to each OutputSummaryItem', () => {
    const items = wrapper.findAllComponents(OutputSummaryItem)
    items.forEach((itemWrapper, index) => {
      expect(itemWrapper.props('item')).toEqual(calculatedJourneys[index])
    })
  })
})
