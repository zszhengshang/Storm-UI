# Upload 上传

通过点击或者拖拽上传文件。

## 基础用法

通过 `slot` 你可以传入自定义的上传按钮类型和文字提示。 可通过设置 `limit` 和 `on-exceed` 来限制上传文件的个数和定义超出限制时的行为。 可通过设置 `before-remove` 来阻止文件移除操作。

```vue preview
<template>
	<s-upload
		v-model:file-list="fileList"
		action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
		multiple
		:on-preview="handlePreview"
		:on-remove="handleRemove"
		:before-remove="beforeRemove"
		:limit="3"
		:on-exceed="handleExceed"
	>
		<s-button type="primary">Click to upload</s-button>
		<template #tip>
			<div class="s-upload__tip">jpg/png files with a size less than 500KB.</div>
		</template>
	</s-upload>
</template>
<script setup>
import { ref } from "vue"

const fileList = ref([
	{
		name: "storm-ui-logo.svg",
		url: "https://xxx"
	},
	{
		name: "storm-ui-logo2.svg",
		url: "https://xxx"
	}
])

const handleRemove = (file, uploadFiles) => {
	console.log(file, uploadFiles)
}

const handlePreview = uploadFile => {
	console.log(uploadFile)
}

const handleExceed = (files, uploadFiles) => {
	console.log("handleExceed")
}

const beforeRemove = (uploadFile, uploadFiles) => {
	console.log("beforeRemove")
}
</script>
```

## 覆盖前一个文件

设置 `limit` 和 `on-exceed` 可以在选中时自动替换上一个文件。

```vue preview
<template>
	<s-upload
		ref="upload"
		action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
		:limit="1"
		:on-exceed="handleExceed"
	>
		<s-button type="primary">Click to upload</s-button>
		<template #tip>
			<div class="s-upload__tip">limit 1 file, new file will cover the old file</div>
		</template>
	</s-upload>
</template>
<script setup>
import { ref } from "vue"

const upload = ref()

const handleExceed = files => {
	upload.value.clearFiles()
	const file = files[0]
	upload.value.handleStart(file)
}

const submitUpload = () => {
	upload.value.submit()
}
</script>
```

## 上传限制

在 `before-upload` 钩子中限制用户上传文件的格式和大小。

```vue preview
<template>
	<s-upload
		ref="upload"
		class="avatar-uploader"
		action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
		:show-file-list="false"
		:on-success="handleAvatarSuccess"
		:before-upload="beforeAvatarUpload"
	>
		<img :src="imageUrl" class="avatar" v-if="imageUrl" />
		<s-icon class="avatar-uploader-icon" v-else>
			<AddOutline />
		</s-icon>
	</s-upload>
</template>
<script setup>
import { AddOutline } from "@vicons/ionicons5"
import { ref } from "vue"

const imageUrl = ref("")
const handleAvatarSuccess = (response, uploadFile) => {
	imageUrl.value = URL.createObjectURL(uploadFile.raw)
}

const beforeAvatarUpload = rawFile => {
	if (rawFile.type !== "image/jpeg") {
		console.log("格式错误")
		return false
	} else if (rawFile.size / 1024 / 1024 > 2) {
		console.log("超出大小限制")
		return false
	}
	return true
}
</script>
<style scoped>
.avatar-uploader .avatar {
	width: 178px;
	height: 178px;
	display: block;
}
</style>

<style>
.avatar-uploader .s-upload {
	border: 1px dashed #999;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
}

.s-icon.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 178px;
	height: 178px;
	text-align: center;
}
</style>
```

## 拖拽上传

你可以将文件拖拽到特定区域以进行上传。

```vue preview
<template>
	<s-upload drag multiple action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15">
		<s-icon class="s-icon--upload">
			<CloudUpload />
		</s-icon>
		<div class="s-upload__text">Drop file here or click to upload</div>
		<template #tip>
			<div class="s-upload__tip">jpg/png files with a size less than 500kb</div>
		</template>
	</s-upload>
</template>
<script setup>
import { CloudUpload } from "@vicons/ionicons5"
</script>
```

## 手动上传

```vue preview
<template>
	<s-upload ref="uploadRef" :auto-upload="false" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15">
		<s-button type="primary">select file</s-button>
		<template #tip>
			<div class="s-upload__tip">jpg/png files with a size less than 500kb</div>
		</template>
	</s-upload>
	<s-button type="success" @click="submitUpload">upload to server</s-button>
</template>
<script setup>
import { ref } from "vue"

const uploadRef = ref()

const submitUpload = () => {
	uploadRef.value.submit()
}
</script>
```

## Upload API

### Attributes

| 属性名                        | 说明                                                                                                     | 类型                                                                                   | 默认值 |
| :---------------------------- | :------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------- | :----- |
| action                        | 请求 URL                                                                                                 | `string`                                                                               | ''     |
| headers                       | 设置上传的请求头部                                                                                       | `Headers / `object`                                                                    | --     |
| method                        | 设置上传请求方法                                                                                         | 设置上传请求方法                                                                       | post   |
| multiple                      | 是否支持多选文件                                                                                         | `boolean`                                                                              | false  |
| data                          | 上传时附带的额外参数                                                                                     | `object`                                                                               | {}     |
| name                          | 上传的文件字段名                                                                                         | `string`                                                                               | file   |
| show-file-list                | 是否显示已上传文件列表                                                                                   | `boolean`                                                                              | true   |
| drag                          | 是否启用拖拽上传                                                                                         | `boolean`                                                                              | false  |
| accept                        | 接受上传的文件类型                                                                                       | `string`                                                                               | ''     |
| on-preview                    | 点击文件列表中已上传的文件时的钩子                                                                       | `(uploadFile: UploadFile) => void`                                                     | --     |
| on-remove                     | 文件列表移除文件时的钩子                                                                                 | `(uploadFile: UploadFile, uploadFiles: UploadFiles) => void`                           | --     |
| on-success                    | 文件上传成功时的钩子                                                                                     | `(response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => void`            | --     |
| on-progress                   | 文件上传时的钩子                                                                                         | `(evt: UploadProgressEvent, uploadFile: UploadFile, uploadFiles: UploadFiles) => void` | --     |
| on-change                     | 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用                                           | `(uploadFile: UploadFile, uploadFiles: UploadFiles) => void`                           | --     |
| on-exceed                     | 当超出限制时，执行的钩子函数                                                                             | `(files: File[], uploadFiles: UploadUserFile[]) => void`                               | --     |
| before-upload                 | 上传文件之前的钩子，参数为上传的文件， 若返回 false 或者返回 Promise 且被 reject，则停止上传。           | `(rawFile: UploadRawFile) =>void`                                                      | --     |
| before-remove                 | 删除文件之前的钩子，参数为上传的文件和文件列表， 若返回 false 或者返回 Promise 且被 reject，则停止删除。 | `(uploadFile: UploadFile, uploadFiles: UploadFiles) =>boolean`                         | --     |
| file-list / v-model:file-list | 默认上传文件                                                                                             | `1`                                                                                    | []     |
| auto-upload                   | 是否自动上传文件                                                                                         | `boolean`                                                                              | true   |
| http-request                  | 覆盖默认的 Xhr 行为，允许自行实现上传文件的请求                                                          | `(options: UploadRequestOptions) => XMLHttpRequest / Promise<unknown>`                 | --     |
| disabled                      | 是否禁用上传                                                                                             | `boolean`                                                                              | false  |
| limit                         | 允许上传文件的最大数量                                                                                   | `number`                                                                               | --     |

### Slots

| 属性名  | 说明           |
| :------ | :------------- |
| default | 自定义默认内容 |
| tip     | 提示说明文字   |

### Exposes

| 属性名       | 说明                                                        |
| :----------- | :---------------------------------------------------------- |
| abort        | 取消上传请求                                                |
| submit       | 手动上传文件列表                                            |
| clearFiles   | 清空已上传的文件列表（该方法不支持在 before-upload 中调用） |
| handleStart  | 手动选择文件                                                |
| handleRemove | 手动移除文件                                                |
