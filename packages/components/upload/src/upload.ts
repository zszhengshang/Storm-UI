import { NOOP } from "@storm/utils"
import { ExtractPropTypes, PropType } from "vue"
import { UploadAjaxError, ajaxUpload } from "./ajax"

let fileId = 0
export const genFileId = () => Date.now() + fileId++

export type UploadStatus = 'ready' | 'uploading' | 'success' | 'fail'
export interface UploadRawFile extends File {
  uid: number
}
export interface UploadProgressEvent extends ProgressEvent {
  percent: number
}
export interface UploadFile {
  name: string
  percentage?: number
  status: UploadStatus
  size?: number
  response?: unknown
  uid: number
  url?: string
  raw?: UploadRawFile
}
export type UploadFiles = UploadFile[]
// 把status和uid变成可选
export type UploadUserFile = Omit<UploadFile, 'status' | 'uid'> &
  Partial<Pick<UploadFile, 'status' | 'uid'>>
export interface UploadRequestOptions {
  action: string
  method: string
  data: Record<string, any>
  filename: string
  file: UploadRawFile
  headers: Headers | Record<string, any>
  onError: (e: any) => void,
  onProgress: (e: UploadProgressEvent) => void
  onSuccess: (response: any) => void
}
export type UploadRequestHandler = (options: UploadRequestOptions) => XMLHttpRequest | Promise<unknown>
export interface UploadHooks {
  beforeUpload: (rawFile: UploadRawFile) => boolean | Promise<boolean>,
  beforeRemove: (uploadFile: UploadFile, uploadFiles: UploadFiles) => boolean | Promise<boolean>,
  onRemove: (uploadFile: UploadFile, uploadFiles: UploadFiles) => void,
  onChange: (uploadFile: UploadFile, uploadFiles: UploadFiles) => void
  onPreview: (uploadFile: UploadFile) => void,
  onSuccess: (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => void
  onProgress: (evt: UploadProgressEvent, uploadFile: UploadFile, uploadFiles: UploadFiles) => void
  onError: (error: UploadAjaxError, uploadFile: UploadFile, uploadFiles: UploadFiles) => void
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
  // drag: {
  //   type: Boolean,
  //   default: false
  // },
  accept: {
    type: String,
    default: '',
  },
  fileList: {
    type: Array as PropType<UploadUserFile[]>,
    default: () => []
  },
  autoUpload: {
    type: Boolean,
    default: true,
  },
  httpRequest: {
    type: Function as PropType<UploadRequestHandler>,
    default: ajaxUpload
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