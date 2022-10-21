import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest'

// import Modal from '@components/LModal/index.tsx'

// 这段测试用例需要修改，现在一直报错
describe('modal', () => {
  it('modal show', () => {
    const wrapper = mount({
      render() {
        return <div class="l-modal"> nihao </div>
      }
    })
    const lModalClass = wrapper.find('l-modal')
    console.log(lModalClass)
    expect(lModalClass.exists()).toBeTruthy()
  })
})
