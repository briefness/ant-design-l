import { mount } from '@vue/test-utils';
import { test, expect } from 'vitest'

import LButton from '@components/LButton/index.vue'

test('buttun type', async () => {
  const wrapper = mount(LButton, {
    props: {
      type: 'primary'
    }
  })
  expect(wrapper.attributes('class')).toContain('ant-btn-primary')
})

test('buttun click emit', async () => {
  const wrapper = mount(LButton, {
    props: {
      type: 'primary'
    }
  })
  await wrapper.trigger('click')
  expect(wrapper.emitted('click')).toBeTruthy()
})
