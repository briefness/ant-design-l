<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import LButton from '@components/LButton/index.vue';
  import { LModal } from '@components/LModal/index';
  import message from '@components/LMessage/index';

  const router = useRouter();

  const visible = ref(false);

  const showModal = () => {
    visible.value = true;
  };

  const showMessage = () => {
    message.info({ content: '你好', duration: 10 });
  };

  const cancelModal = () => {
    visible.value = false;
  };

  const toTestStore = () => {
    router.push({ path: 'testStore' });
  };
</script>

<template>
  <LButton type="primary" @click="showModal">显示对话框</LButton>
  <LButton type="primary" @click="showMessage">显示message</LButton>
  <LButton type="primary" @click="toTestStore">跳转到testStore</LButton>
  <LModal v-model:visible="visible" @ok="cancelModal">
    <template #title>
      <div>你好</div>
    </template>
    <div> 就是这样的吧 </div>
  </LModal>
  <RouterView />
</template>

<style scoped></style>
