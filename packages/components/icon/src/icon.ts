import { ExtractPropTypes, PropType } from "vue";

export const iconProps = {
  color: String,
  size: [Number, String] as PropType<number | string>
}
// ExtractPropTypes可以将props类型抽取出来给外部使用
export type IconProps = ExtractPropTypes<typeof iconProps>