import { ComputedRef, ExtractPropTypes, InjectionKey } from "vue"

interface RowContext {
  gutter: ComputedRef<number>
}
export const rowProps = {
  gutter: {
    type: Number,
    default: 0
  },
  tag: {
    type: String,
    default: 'div'
  }
}
export const rowContextKey: InjectionKey<RowContext> = Symbol('rowContextKey')
export type RowProps = ExtractPropTypes<typeof rowProps>