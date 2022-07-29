<script setup lang="ts">
  import { ref } from 'vue'

  interface ButtonProps {
    block: boolean
    danger: boolean
    disabled: boolean
    ghost: boolean
    href: string
    htmlType: string
    loading: boolean | { delay: number }
    shape: 'default' | 'circle' | 'round'
    size: 'large' | 'middle' | 'small'
    target: string
    type: 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default'
  }

  const emit = defineEmits(['click']);
  
  const buttonProps = withDefaults(defineProps<ButtonProps>(), {
    block: false,
    danger: false,
    disabled: false,
    ghost: false,
    htmlType: 'button',
    loading: false,
    shape: 'default',
    size: 'middle',
    type: 'default'
  })

  const clickHandle = (e?: Event) => {
    emit('click', e)
  }
  console.log(buttonProps)

</script>

<template>
  <a-button v-bind="buttonProps" @click="clickHandle">
    <slot></slot>
    <slot name="icon"></slot>
  </a-button>
</template>

<style scoped>
</style>
