import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import ReadMe from '../components/read-me/ReadMe.vue'
import rawText from '../../../README.txt?raw'

describe('ReadMe.vue', () => {
  it('renders the README text inside a <pre> tag', () => {
    const wrapper = shallowMount(ReadMe)

    const pre = wrapper.find('pre')
    expect(pre.exists()).toBe(true)
    // Trim to ignore trailing newlines
    expect(pre.text().trim()).toBe(rawText.trim())
  })

  it('has the correct CSS class applied', () => {
    const wrapper = shallowMount(ReadMe)
    const pre = wrapper.find('pre')
    expect(pre.classes()).toContain('text-format')
  })
})
