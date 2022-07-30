import { mount } from '@vue/test-utils';
import { test, expect } from 'vitest'

import LButton from '@components/LButton/index.vue'

test('buttun type', () => {
  const wrapper = mount(LButton, {
    props: {
      type: 'primary'
    }
  })
  console.log(wrapper)
  expect(wrapper.attributes('class')).toContain('ant-btn-primary')
})
