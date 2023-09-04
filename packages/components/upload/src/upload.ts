import { NOOP } from "@storm/utils"
import { ExtractPropTypes, PropType } from "vue"

let fileId = 0
export const genFileId = () => Date.now() + fileId++

type UploadStatus = 'ready' | 'uploading' | 'success' | 'fail'
interface UploadRawFile extends File {
  uid: number
}
interface UploadProgressEvent extends ProgressEvent {
  percent: number
}
interface UploadFile {
  name: string
  percentage?: number
  status: UploadStatus
  size?: number
  response?: unknown
  uid: number
  url?: string
  raw?: UploadRawFile
}
type UploadFiles = UploadFile[]

interface UploadHooks {
  beforeUpload: (rawFile: UploadFiles) => boolean | Promise<boolean>,
  beforeRemove: (uploadFile: UploadFile, uploadFiles: UploadFiles) => boolean | Promise<boolean>,
  onRemove: (uploadFile: UploadFile, uploadFiles: UploadFiles) => void,
  onChange: (uploadFile: UploadFile, uploadFiles: UploadFiles) => void
  onPreview: (uploadFile: UploadFile) => void,
  onSuccess: (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => void
  onProgress: (evt: UploadProgressEvent, uploadFile: UploadFile, uploadFiles: UploadFiles) => void
  onError: (error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => void
  onExceed: (files: File[]) => void
}

export const uploadBaseProps = {
  action: {
    type: String,
    default: ''
  },
  headers: {
    type: Object as PropType<Headers | Record<string, any>>,
    default: () => ({})
  },
  method: {
    type: String,
    default: 'post',
  },
  multiple: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object,
    default: () => ({})
  },
  name: {
    type: String,
    default: 'file'
  },
  showFileList: {
    type: Boolean,
    default: true
  },
  drag: {
    type: Boolean,
    default: false
  },
  accept: {
    type: String,
    default: '',
  },
  autoUpload: {
    type: Boolean,
    default: true,
  },
  disabled: Boolean,
  limit: Number
} as const

export const uploadProps = {
  ...uploadBaseProps,
  beforeUpload: {
    type: Function as PropType<UploadHooks['beforeUpload']>,
    default: NOOP
  },
  beforeRemove: {
    type: Function as PropType<UploadHooks['beforeRemove']>,
    default: NOOP
  },
  onRemove: {
    type: Function as PropType<UploadHooks['onRemove']>,
    default: NOOP
  },
  onChange: {
    type: Function as PropType<UploadHooks['onChange']>,
    default: NOOP
  },
  onPreview: {
    type: Function as PropType<UploadHooks['onPreview']>,
    default: NOOP
  },
  onSuccess: {
    type: Function as PropType<UploadHooks['onSuccess']>,
    default: NOOP
  },
  onProgress: {
    type: Function as PropType<UploadHooks['onProgress']>,
    default: NOOP
  },
  onError: {
    type: Function as PropType<UploadHooks['onError']>,
    default: NOOP
  },
  onExceed: {
    type: Function as PropType<UploadHooks['onExceed']>,
    default: NOOP
  }
} as const

export type UploadProps = ExtractPropTypes<typeof uploadProps>