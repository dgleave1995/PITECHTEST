// tests/unit/Heading.spec.js
import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Heading from '../components/heading/heading.vue'

describe('Heading.vue', () => {
  it('renders the text prop', () => {
    const wrapper = shallowMount(Heading, {
      props: { text: 'Hello World' }
    })

    expect(wrapper.text()).toBe('Hello World')
  })
})
