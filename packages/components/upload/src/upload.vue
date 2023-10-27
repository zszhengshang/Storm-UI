<template>
  <div>
    <upload-content
      ref="uploadRef"
      v-bind="uploadContentProps"
    >
      <slot v-if="$slots.default" />
    </upload-content>
    <slot name="tip" />
    <upload-list
      :disabled="disabled"
      :files="uploadFiles"
      @remove="handleRemove"
      v-if="showFileList"
    />
  </div>
</template>

<script setup lang="ts">
import { uploadProps, uploadContextKey } from './upload'
import UploadContent from './upload-content.vue'
import UploadList from './upload-list.vue'
import { useHandlers } from './use-handles'
import { shallowRef, computed, onBeforeUnmount, provide } from 'vue';
import { UploadContentProps, UploadContentInstance } from './upload-content'
defineOptions({ name: 'SUpload' })
const props = defineProps(uploadProps)

const uploadRef = shallowRef<UploadContentInstance>()
const uploadContentProps = computed<UploadContentProps>(() => ({
  ...props,
  fileList: uploadFiles.value,
  onStart: handleStart,
  onProgress: handleProgress,
  onSuccess: handleSuccess,
  onError: handleError,
  onRemove: handleRemove
}))

const {
  uploadFiles,
  abort,
  clearFiles,
  handleError,
  handleProgress,
  handleSuccess,
  handleStart,
  handleRemove,
  submit
} = useHandlers(props, uploadRef)

provide(uploadContextKey, {
  accept: props.accept
})

onBeforeUnmount(() => {
  // 卸载组件前释放URL.createObjectURL创建的对象
  uploadFiles.value.forEach(({ url }) => {
    if (url?.startsWith('blob:')) URL.revokeObjectURL(url)
  })
})

defineExpose({
  abort,
  clearFiles,
  submit,
  handleStart,
  handleRemove
})
</script>