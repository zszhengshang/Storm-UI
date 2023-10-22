import { ExtractPropTypes } from "vue"

export const colProps = {
  span: {
    type: Number,
    default: 24
  },
  offset: {
    type: Number,
    default: 0
  },
  tag: {
    type: String,
    default: 'div'
  }
}

export type ColProps = ExtractPropTypes<typeof colProps>