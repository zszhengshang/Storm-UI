import { NOOP } from "@storm/utils";
import { UploadFile, UploadHooks, UploadProgressEvent, UploadRawFile, uploadBaseProps } from "./upload";
import UploadContent from './upload-content.vue'
import { ExtractPropTypes, PropType } from "vue";
import { UploadAjaxError } from "./ajax";

export const uploadContentProps = {
  ...uploadBaseProps,
  beforeUpload: {
    type: Function as PropType<UploadHooks['beforeUpload']>,
    default: NOOP,
  },
  onRemove: {
    type: Function as PropType<(file: UploadFile | UploadRawFile, rawFile?: UploadRawFile) => void>,
    default: NOOP,
  },
  onStart: {
    type: Function as PropType<(rawFile: UploadRawFile) => void>,
    default: NOOP,
  },
  onSuccess: {
    type: Function as PropType<(response: any, rawFile: UploadRawFile) => unknown>,
    default: NOOP,
  },
  onProgress: {
    type: Function as PropType<(e: UploadProgressEvent, rawFile: UploadRawFile) => void>,
    default: NOOP,
  },
  onError: {
    type: Function as PropType<(err: UploadAjaxError, rawFile: UploadRawFile) => void>,
    default: NOOP,
  },
  onExceed: {
    type: Function as PropType<UploadHooks['onExceed']>,
    default: NOOP,
  }
}

export type UploadContentProps = ExtractPropTypes<typeof uploadContentProps>
export type UploadContentInstance = InstanceType<typeof UploadContent>