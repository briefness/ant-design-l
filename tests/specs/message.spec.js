import { describe, it, expect, vi } from 'vitest'

import message from '@components/LMessage/index.ts'

describe('message', () => {
  it('message class', () => {
    message.info('你好')
    expect(document.querySelectorAll('._l-message_164u7_1').length).toBe(1)
  })
  it('message content', () => {
    message.info('你好吗')
    expect(document.querySelectorAll('._l-message-notice-content_164u7_18')[0].textContent).toBe('你好吗')
  })

  it('message duration', () => {
    vi.useFakeTimers()
    message.info({content: 'hello', duration: 2})
    vi.advanceTimersByTime(1000)
    expect(document.querySelectorAll('._l-message_164u7_1').length).toBe(1)
    vi.advanceTimersByTime(3000)
    expect(document.querySelectorAll('._l-message_164u7_1').length).toBe(0)
  })
})
