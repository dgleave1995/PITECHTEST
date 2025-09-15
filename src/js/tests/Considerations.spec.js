// tests/unit/Considerations.spec.js
import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Considerations from '../components/considerations/Considerations.vue'
import rawText from '../../../Considerations.txt?raw'

describe('Considerations.vue', () => {
  it('renders the raw text inside a <pre> tag', () => {
    const wrapper = shallowMount(Considerations)
    
    const pre = wrapper.find('pre')
    expect(pre.exists()).toBe(true)
    expect(pre.text()).toBe(rawText)
  })
})
