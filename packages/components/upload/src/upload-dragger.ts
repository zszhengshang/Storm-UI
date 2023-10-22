import { isArray } from "@storm/utils"
import { ExtractPropTypes } from "vue"

export const uploadDraggerProps = {
  disabled: {
    type: Boolean,
    default: false
  }
} as const
export const uploadDraggerEmits = {
  change: (files: File[]) => isArray(files)
}

export type UploadDraggerProps = ExtractPropTypes<typeof uploadDraggerProps>
export type UploadDraggerEmits = typeof uploadDraggerEmits