import { Component, PropType } from 'vue'
export { isArray, isString } from '@vue/shared'

export const isUndefined = (val: any): val is undefined => val === undefined
export const isBoolean = (val: any): val is boolean => typeof val === 'boolean'
export const isNumber = (val: any): val is number => typeof val === 'number'
export const isNil = (val: any): val is undefined | null => val == null

export const iconPropType = [String, Object, Function] as PropType<string | Component>