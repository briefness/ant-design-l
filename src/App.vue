<script setup lang="ts">
  import { ref } from 'vue'
  import LButton from '@components/LButton/index.vue'
  // @ts-ignore
  import LModal from '@components/LModal/index.tsx'
  // @ts-ignore
  import message from '@components/LMessage/index.ts'
  import TestStore from '@/TestStore.vue'

  const visible = ref(false)

  const showModal = () => {
    visible.value = true
  }
  const showMessage = () => {
    message.info({content: '你好', duration: 10})
  }
  const cancelModal = () => {
    visible.value = false
  }
</script>

<template>
  <LButton type="primary" @click="showModal">显示对话框</LButton>
  <LButton type="primary" @click="showMessage">显示message</LButton>
  <LModal v-model:visible="visible" @ok="cancelModal">
    <template #title>
      <div>你好</div>
    </template>
    <div>
      就是这样的吧
    </div>
  </LModal>
  <TestStore />
</template>

<style scoped>
</style>
