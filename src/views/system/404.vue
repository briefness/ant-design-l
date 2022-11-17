<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  const router = useRouter();
  const goBackHome = () => {
    router.push({ path: '/' });
  };
</script>
<template>
  <a-empty
    image="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fe85895874d8862917e0a60ec0fc30369120425904f02b-Nux0r7_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671260729&t=50a5310b8cfabced2a416e2ce3b9df08"
    :image-style="{
      height: '200px',
    }"
  >
    <template #description>
      <span> ~你进入了网页黑洞，它吞噬一切，请迅速逃离~ </span>
    </template>
    <a-button type="primary" @click="goBackHome">逃离黑洞</a-button>
  </a-empty>
</template>
