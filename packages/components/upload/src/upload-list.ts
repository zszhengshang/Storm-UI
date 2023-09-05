import { ExtractPropTypes, PropType } from "vue";
import { UploadFile, UploadFiles, UploadHooks } from "./upload";
import { NOOP } from "@storm/utils";

export const uploadListProps = {
  files: {
    type: Array as PropType<UploadFiles>,
    default: () => []
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  handlePreview: {
    type: Function as PropType<UploadHooks['onPreview']>,
    default: NOOP,
  },
} as const

export const uploadListEmits = {
  remove: (file: UploadFile) => !!file,
}

export type UploadListProps = ExtractPropTypes<typeof uploadListProps>
export type UploadListEmits = typeof uploadListEmits