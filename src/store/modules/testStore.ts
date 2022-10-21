import { defineStore } from 'pinia'
import { store } from '@/store';
interface StoreProp {
  counter: number;
  name: string;
  isAdmin: boolean;
}
// useTestStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useTestStore = defineStore('main', {
  state: (): StoreProp => {
    return {
      // 所有这些属性都将自动推断其类型
      counter: 1,
      name: 'Eduardo',
      isAdmin: true,
    }
  },
  getters: {
    doubleCounter: (state) => state.counter * 2,
    doubleCounterPlusOne(): number {
      return this.doubleCounter + 1
    },
    doubleCounterBelongParams(state) {
      return (params: number): number => state.counter + params
    }
  },
  // 在外部直接使用pinia的实例调用
  actions: {
    doubleCounterBelongParamsActions() {
      this.counter = this.counter + 100
      console.log('使用pinia的actions方法输出的数据是：', this.counter + 100)
    }
  },
  persist: true, // 保持数据持久化，支持配置项方式配置
})

// 在setup之外使用
export function useAppStoreWithOut() {
  return useTestStore(store);
}