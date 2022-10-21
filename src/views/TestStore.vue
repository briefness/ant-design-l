<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useTestStore } from '@/store/modules/testStore';
  const store = useTestStore();

  console.log('===store===', store);

  // 通过将其 $state 属性设置为新对象来替换 Store 的整个状态
  store.$state = { counter: 666, name: 'Paimon', isAdmin: true };

  // 使用$patch直接修改store中的数据
  store.$patch((state) => {
    state.name = 'mory';
  });

  // 通过 store 的 $subscribe() 方法查看状态及其变化
  // 与常规的 watch() 相比，使用 $subscribe() 的优点是 subscriptions 只会在 patches 之后触发一次
  store.$subscribe((mutation, state) => {
    // import { MutationType } from 'pinia'
    mutation.type; // 'direct' | 'patch object' | 'patch function'
    // 与 cartStore.$id 相同
    mutation.storeId; // 'cart'
    // 仅适用于 mutation.type === 'patch object'

    // 每当它发生变化时，将整个状态持久化到本地存储
    localStorage.setItem('cart', JSON.stringify(state));
  });
  store.$onAction(() => {
    // 在 action 的时候执行
  });

  onMounted(() => {
    store.doubleCounterBelongParamsActions();
  });
</script>

<template>
  <p>{{ store.doubleCounterPlusOne }}</p>
  <p>{{ store.doubleCounter }}</p>
  <p>{{ store.doubleCounterBelongParams(20) }}</p>
</template>

<style scoped></style>
