<template>
  <div
    :class="[
      bem.b('dragger'),
      bem.is('dragover', dragover)
    ]"
    @dragover.prevent="onDragover"
    @dragleave.prevent="dragover = false"
    @drop.prevent="onDrop"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { createNamespace } from '@storm/utils';
import { uploadDraggerEmits, uploadDraggerProps } from './upload-dragger';
import { inject, ref } from 'vue';
import { uploadContextKey } from './upload';
defineOptions({ name: 'SUploadDragger' })
const props = defineProps(uploadDraggerProps)
const emit = defineEmits(uploadDraggerEmits)

const bem = createNamespace('upload')
// 记录是否拖拽在目标范围内
const dragover = ref(false)
const uploadContext = inject(uploadContextKey, undefined)

const onDragover = () => {
  if (!props.disabled) dragover.value = true
}

const onDrop = (e: DragEvent) => {
  if (props.disabled) return
  // 拖拽有效放置后 取消标记
  dragover.value = false
  e.stopPropagation()

  const files = Array.from(e.dataTransfer!.files)
  const accept = uploadContext?.accept
  // 如果没有限制文件类型直接调用外部的方法去上传
  if (!accept) {
    emit('change', files)
    return
  }
  // 根据accept传入的限制过滤文件
  const filesFiltered = files.filter(file => {
    const { type, name } = file
    // 从名字截取出扩展名
    const extension = name.includes('.') ? `.${name.split('.').pop()}` : ''
    // 把基础类型取出来
    const [baseType] = type.split('/')
    // 把限制文件类型空处理一下
    const acceptFiltered = accept.split(',').map(type => type.trim()).filter(type => type)
    // accept的几种写法
    return acceptFiltered.some(acceptType => {
      // .png
      if (acceptType.startsWith('.')) {
        return acceptType === extension
      }
      // images/*
      if (/\/\*$/.test(acceptType)) {
        return acceptType.replace(/\/\*$/, '') === baseType
      }
      // image/png
      if (/^[^/]+\/[^/]+$/.test(acceptType)) {
        return acceptType === type
      }
      return false
    })
  })
  emit('change', filesFiltered)
}
</script>