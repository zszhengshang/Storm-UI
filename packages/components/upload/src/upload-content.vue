<template>
  <div
    :class="[
      bem.b()
    ]"
    @click="handleClick"
  >
    <template v-if="false"></template>
    <template v-else>
      <slot />
    </template>
    <input
      type="file"
      ref="inputRef"
      :class="bem.e('input')"
      :name="name"
      :multiple="multiple"
      :accept="accept"
      @click.stop
      @change="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import { createNamespace } from '@storm/utils/create';
import { uploadContentProps } from './upload-content';
import { shallowRef } from 'vue'
import { UploadRawFile, genFileId, UploadRequestOptions } from './upload';
defineOptions({
  name: 'SUploadContent',
  inheritAttrs: false
})
const props = defineProps(uploadContentProps)

const bem = createNamespace('upload')
const inputRef = shallowRef<HTMLInputElement>()
const requests = shallowRef<Record<string, XMLHttpRequest | Promise<unknown>>>({})

const doUpload = (rawFile: UploadRawFile) => {
  const {
    headers,
    data,
    method,
    name: filename,
    action,
    onProgress,
    onSuccess,
    onError,
    httpRequest
  } = props
  const { uid } = rawFile
  const options: UploadRequestOptions = {
    headers,
    file: rawFile,
    data,
    method,
    filename,
    action,
    onProgress: (e) => {
      onProgress(e, rawFile)
    },
    onSuccess: (res) => {
      onSuccess(res, rawFile)
      delete requests.value[uid]
    },
    onError: (e) => {
      onError(e, rawFile)
      delete requests.value[uid]
    }
  }
  // 用户没传httpRequest就默认调用ajaxUpload方法
  const request = httpRequest(options)
  requests.value[uid] = request
  // 用户可能传了一个promise
  if (request instanceof Promise) {
    request.then(options.onSuccess, options.onError)
  }
}

const upload = async (rawFile: UploadRawFile) => {
  inputRef.value!.value = ''

  if (!props.beforeUpload) {
    return doUpload(rawFile)
  }
  let hookResult
  try {
    const beforeUploadPromise = props.beforeUpload(rawFile)
    hookResult = await beforeUploadPromise
  } catch {
    hookResult = false
  }
  if (hookResult === false) {
    props.onRemove(rawFile)
    return
  }
  doUpload(rawFile)
}

const handleUpload = (files: File[]) => {
  const { limit, fileList, onExceed, multiple, onStart, autoUpload } = props
  const length = fileList.length + files.length

  if (limit && length > limit) {
    onExceed(files)
  }
  if (!multiple) {
    // 如果不是多选文件 就是用files的第一个
    files = files.slice(0, 1)
  }
  for (const file of files) {
    const rawFile = file as UploadRawFile
    rawFile.uid = genFileId()
    onStart(rawFile)
    autoUpload && upload(rawFile)
  }
}

const handleClick = () => {
  if (!props.disabled) {
    inputRef.value!.value = ''
    inputRef.value!.click()
  }
}
const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (!target.files) return
  handleUpload(Array.from(target.files))
}
</script>