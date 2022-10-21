<script setup lang="ts">
  import { computed, useSlots, watch, ref } from 'vue'
  import { isNumber } from 'lodash-es'
  import LButton from '@components/LButton/index.vue'
  import { onClickOutside, onKeyDown } from '@vueuse/core'

  interface ModalProps {
    appendToBody?: boolean
    visible: boolean
    width?: string | number
    title?: string
    closable?: boolean
    mask?: boolean
    cancelText?: string
    okText?: string
  }
  const props = withDefaults(defineProps<ModalProps>(), {
    appendToBody: false,
    visible: false,
    width: 520,
    title: '',
    closable: true,
    mask: true,
    cancelText: '取消',
    okText: '确定'
  })

  const modalStyle = computed(() => ({width: isNumber(props.width) ? `${props.width}px` : props.width}))

  const slots = useSlots()
  const emit = defineEmits(['update:visible', 'ok'])

  const cancel = () => {
    emit('update:visible', false)
  }

  const confirm = () => {
    emit('ok')
  }

  const modal = ref(null)

  watch(() => props.visible, (val: boolean) => {
    if (val) {
      onClickOutside(modal, cancel)
      onKeyDown('Escape', cancel)
    }
  })

</script>

<template>
  <teleport to="body" :disabled="appendToBody">
    <div v-if="visible" class="l-modal">
      <div v-if="mask" class="l-modal-mask"></div>
      <div class="l-modal-wrap" :style="modalStyle" ref="modal">
        <div class="l-modal-header">
          <div class="l-modal-title">
            <slot v-if="slots.title" name="title"></slot>
            <p v-else>{{title}}</p>
          </div>
          <div v-if="closable" class="l-modal-close" @click="cancel">X</div>
        </div>
        <div class="l-modal-body">
          <slot></slot>
        </div>
        <div class="l-modal-footer">
          <slot v-if="slots.footer" name="footer"></slot>
          <l-button @click="cancel">{{ props.cancelText }}</l-button>
          <l-button type="primary" @click="confirm">{{ props.okText }}</l-button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<style scoped lang="less">
  @index: 1000;
  .fixed {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  .l-modal {
    .fixed();
    overflow: auto;
    &-mask{
      .fixed();
      z-index: @index;
      height: 100%;
      background-color: #00000073;
    }
    &-wrap {
      position: relative;
      top: 100px;
      z-index: @index;
      max-width: calc(100vw - 32px);
      margin: 0 auto;
      background-color: #fff;
      background-clip: padding-box;
      border: 0;
      border-radius: 2px;
      box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014, 0 9px 28px 8px #0000000d;
      pointer-events: auto;
    }
    &-header {
      padding: 16px 24px;
      background: #fff;
      border-bottom: 1px solid #f0f0f0;
    }
    &-title {
      font-weight: 500;
      color: #000000d9;
      font-size: 16px;
      line-height: 22px;
      word-wrap: break-word;
    }
    &-close {
      position: absolute;
      top: 0;
      right: 0;
      width: 56px;
      height: 56px;
      line-height: 56px;
      text-align: center;
      font-size: 20px;
      color: #00000073;
      cursor: pointer;
    }
    &-body {
      padding: 24px;
      font-size: 14px;
      line-height: 1.5715;
      word-wrap: break-word;
    }
    &-footer {
      padding: 10px 16px;
      text-align: right;
      border-top: 1px solid #f0f0f0;
      border-radius: 0 0 2px 2px;
      .ant-btn+.ant-btn:not(.ant-dropdown-trigger) {
        margin-left: 8px;
      }
    }
  }
</style>
