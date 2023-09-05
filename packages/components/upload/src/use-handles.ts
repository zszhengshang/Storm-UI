import { ShallowRef } from "vue";
import { UploadFile, UploadProps, UploadRawFile, UploadStatus } from "./upload";
import { UploadContentInstance, UploadContentProps } from "./upload-content";
import { useVModel } from "@vueuse/core";

const revokeFileObjectURL = (file: UploadFile) => {
  if (file.url?.startsWith('blob:')) {
    URL.revokeObjectURL(file.url)
  }
}

export const useHandlers = (props: UploadProps, uploadRef: ShallowRef<UploadContentInstance | undefined>) => {
  const uploadFiles = useVModel(
    props,
    'fileList',
    undefined,
    { passive: true }
  )

  const getFile = (rawFile: UploadRawFile) => uploadFiles.value.find(file => file.uid === rawFile.uid)

  const abort = (file: UploadFile) => {
    uploadRef.value.abort(file)
  }
  const clearFiles = (states: UploadStatus[] = ['ready', 'uploading', 'success', 'fail']) => {
    uploadFiles.value = uploadFiles.value.filter((item: any) => !states.includes(item.status))
  }
  const handleError: UploadContentProps['onError'] = (err, rawFile) => {
    const file = getFile(rawFile)
    if (!file) return

    console.error(err)
    file.status = 'fail'
    uploadFiles.value.splice(uploadFiles.value.indexOf(file), 1)
    props.onError(err, file, uploadFiles.value)
    props.onChange(file, uploadFiles.value)
  }
  const handleProgress: UploadContentProps['onProgress'] = (e, rawFile) => {
    const file = getFile(rawFile)
    if (!file) return

    props.onProgress(e, file, uploadFiles.value)
    file.status = 'uploading'
    file.percentage = Math.round(e.percent)
  }
  const handleSuccess: UploadContentProps['onSuccess'] = (response, rawFile) => {
    const file = getFile(rawFile)
    if (!file) return

    file.status = 'success'
    file.response = response
    props.onSuccess(response, file, uploadFiles.value)
    props.onChange(file, uploadFiles.value)
  }
  const handleStart: UploadContentProps['onStart'] = (rawFile) => {
    // 将上传的原始文件组装成一个新文件对象
    const uploadFile: UploadFile = {
      uid: rawFile.uid,
      name: rawFile.name,
      percentage: 0,
      status: 'ready',
      size: rawFile.size,
      raw: rawFile
    }
    uploadFiles.value = [...uploadFiles.value, uploadFile]
    props.onChange(uploadFile, uploadFiles.value)
  }
  const handleRemove: UploadContentProps['onRemove'] = async (rawFile) => {
    const uploadFile = rawFile instanceof File ? getFile(rawFile) : rawFile
    if (!uploadFile) throw new Error('[upload] file to be removed not found')

    const doRemove = (file: UploadFile) => {
      abort(file)
      const fileList = uploadFiles.value
      fileList.splice(fileList.indexOf(file), 1)
      props.onRemove(file, fileList)
      // 释放URL.createObjectURL创建的对象
      revokeFileObjectURL(file)
    }

    if (props.beforeRemove) {
      const before = await props.beforeRemove(uploadFile, uploadFiles.value)
      if (before !== false) doRemove(uploadFile)
    } else {
      doRemove(uploadFile)
    }

  }

  const submit = () => {
    const readyFile = uploadFiles.value.filter(({ status }) => status === 'ready')
    readyFile.forEach(({ raw }) => raw && uploadRef.value?.upload(raw))
  }

  return {
    uploadFiles,
    abort,
    clearFiles,
    handleError,
    handleProgress,
    handleSuccess,
    handleStart,
    handleRemove,
    submit,
    revokeFileObjectURL
  }
}