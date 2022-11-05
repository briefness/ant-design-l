import { defineStore } from 'pinia';
import { store } from '@/store';

interface PermissionState {
  // Permission code list
  permCodeList: string[] | number[];
}
// useTestStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const usePermissionStore = defineStore('permission', {
  state: (): PermissionState => {
    return {
      permCodeList: [],
    };
  },
  getters: {
    getPermCodeList(): string[] | number[] {
      return this.permCodeList;
    },
  },
  // 在外部直接使用pinia的实例调用
  actions: {
    setPermCodeList(codeList: string[]) {
      this.permCodeList = codeList;
    },
  },
});

// 在setup之外使用
export function usePermissionStoreWithOut() {
  return usePermissionStore(store);
}
