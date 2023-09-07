<template>
  <transition-group
    tag="ul"
    :class="[
      bem.b('list'),
      bem.is('disabled', disabled)
    ]"
    name="s-list"
  >
    <li
      v-for="file in files"
      :key="file.uid || file.name"
      :class="[
        bem.be('list', 'item'),
        bem.is(file.status)
      ]"
    >
      <div :class="bem.be('list', 'item-info')">
        <div :class="bem.be('list', 'item-name')">
          <s-icon>
            <Document />
          </s-icon>
          <span :class="bem.be('list', 'item-file-name')">{{ file.name }}</span>
        </div>
        <!-- 进度条 -->
        <s-progress
          :height="2"
          :percentage="Number(file.percentage)"
          v-if="file.status === 'uploading'"
        />
      </div>
      <span :class="bem.be('list', 'item-status')">
        <s-icon
          :class="bem.bm('list', 'icon-success')"
          :size="16"
        >
          <CircleCheck />
        </s-icon>
        <s-icon
          :class="bem.bm('list', 'close')"
          :size="16"
          @click="handleRemove(file)"
          v-if="!disabled"
        >
          <circleClose />
        </s-icon>
      </span>
    </li>
  </transition-group>
</template>

<script setup lang="ts">
import { createNamespace } from '@storm/utils/create';
import { uploadListEmits, uploadListProps } from './upload-list';
import SIcon from '@storm/components/icon'
import SProgress from '@storm/components/progress'
import Document from '@storm/components/internal-icon/document'
import CircleCheck from '@storm/components/internal-icon/circle-check'
import circleClose from '@storm/components/internal-icon/circle-close'
import { UploadFile } from './upload';
defineOptions({ name: 'SUploadList' })
defineProps(uploadListProps)
const emit = defineEmits(uploadListEmits)

const bem = createNamespace('upload')

const handleRemove = (file: UploadFile) => emit('remove', file)
</script>