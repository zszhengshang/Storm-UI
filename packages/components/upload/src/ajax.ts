import { isArray, isNil } from "@storm/utils";
import { UploadProgressEvent, UploadRequestHandler, UploadRequestOptions } from "./upload";

export class UploadAjaxError extends Error {
  name = 'UploadAjaxError'
  status: number
  method: string
  url: string

  constructor(message: string, status: number, method: string, url: string) {
    super(message)
    this.status = status
    this.method = method
    this.url = url
  }
}

const getError = (action: string, options: UploadRequestOptions, xhr: XMLHttpRequest) => {
  let msg: string
  if (xhr.response) {
    msg = `${xhr.response.error || xhr.response}`
  } else if (xhr.responseText) {
    msg = `${xhr.responseText}`
  } else {
    msg = `fail to ${options.method} ${action} ${xhr.status}`
  }
  return new UploadAjaxError(msg, xhr.status, options.method, action)
}

const getBody = (xhr: XMLHttpRequest): XMLHttpRequestResponseType => {
  const text = xhr.responseText || xhr.response
  if (!text) {
    return text
  }
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

export const ajaxUpload: UploadRequestHandler = (options) => {
  const xhr = new XMLHttpRequest()
  const action = options.action
  const headers = options.headers

  // 进度条计算
  if (xhr.upload) {
    xhr.upload.addEventListener('progress', (e) => {
      const progressEvent = e as UploadProgressEvent
      progressEvent.percent = e.total > 0 ? e.loaded / e.total * 100 : 0
      options.onProgress(progressEvent)
    })
  }
  const formData = new FormData()
  // 非blob的参数形式
  if (options.data) {
    for (const [key, value] of Object.entries(options.data)) {
      if (isArray(value) && value.length) {
        // formData形式处理数组
        const len = value.length
        for (let i = 0; i < len; i++) {
          formData.append(`${key}[]`, value[i])
        }
      } else {
        formData.append(key, value)
      }
    }
  }
  // blob的参数形式
  formData.append(options.filename, options.file, options.file.name)

  xhr.addEventListener('error', () => {
    options.onError(getError(action, options, xhr))
  })

  xhr.addEventListener('load', () => {
    if (xhr.status < 200 || xhr.status >= 300) {
      return options.onError(getError(action, options, xhr))
    }
    options.onSuccess(getBody(xhr))
  })
  // 异步调用
  xhr.open(options.method, action, true)
  // 设置请求头
  for (const [key, value] of Object.entries(headers)) {
    if (isNil(value)) continue
    xhr.setRequestHeader(key, String(value))
  }

  xhr.send(formData)

  return xhr
}