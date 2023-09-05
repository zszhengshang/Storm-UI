<template>
  <div>
    <upload-content
      ref="uploadRef"
      v-bind="uploadContentProps"
    >
      <slot v-if="$slots.default" />
    </upload-content>
    <div :class="bem.e('tip')">
      <slot name="tip" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { uploadProps } from './upload'
import UploadContent from './upload-content.vue'
import { createNamespace } from '@storm/utils/create';
import { useHandlers } from './use-handles'
import { shallowRef, computed } from 'vue';
import { UploadContentProps, UploadContentInstance } from './upload-content'
defineOptions({ name: 'SUpload' })
const props = defineProps(uploadProps)

const bem = createNamespace('upload')
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
  handleRemove
} = useHandlers(props, uploadRef)

defineExpose({
  abort,
  clearFiles
})
</script>