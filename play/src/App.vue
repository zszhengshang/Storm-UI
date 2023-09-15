<template>
  <div>
    <s-button>default</s-button>
    <s-button type="primary">primary</s-button>
    <s-button type="success">success</s-button>
    <s-button type="info">info</s-button>
    <s-button type="warning">warning</s-button>
    <s-button type="danger">danger</s-button>
  </div>
  <div style="margin-top: 10px">
    <s-button round>default</s-button>
    <s-button round type="primary">primary</s-button>
    <s-button round type="success">success</s-button>
    <s-button round type="info">info</s-button>
    <s-button round type="warning">warning</s-button>
    <s-button round type="danger">danger</s-button>
  </div>
  <div style="margin-top: 10px">
    <s-button disabled>default</s-button>
    <s-button type="primary" disabled>primary</s-button>
    <s-button type="success" disabled>success</s-button>
    <s-button type="info" disabled>info</s-button>
    <s-button type="warning" disabled>warning</s-button>
    <s-button type="danger" disabled>danger</s-button>
  </div>
  <div style="margin-top: 10px">
    <s-button round loading>default</s-button>
    <s-button round type="primary" loading>primary</s-button>
    <s-button round type="success" loading>success</s-button>
    <s-button round type="info" loading>info</s-button>
    <s-button round type="warning" loading>warning</s-button>
    <s-button round type="danger" loading>danger</s-button>
  </div>
  <div style="margin-top: 10px">
    <s-button type="primary" :icon="TrashOutline"></s-button>
    <s-button type="primary" :icon="Grid">Grid</s-button>
    <s-button type="primary">
      Bluetooth
      <s-icon>
        <BluetoothOutline />
      </s-icon>
    </s-button>
  </div>
  <div style="margin-top: 10px">
    <s-button type="primary" size="small">small</s-button>
    <s-button type="primary">default</s-button>
    <s-button type="primary" size="large">large</s-button>
  </div>
  <div style="margin-top: 10px">
    <s-radio v-model="radio" label="Option A1">Option A</s-radio>
    <s-radio v-model="radio" label="Option B">Option B</s-radio>
  </div>
  <div style="margin-top: 10px">
    <s-radio-group v-model="radios">
      <s-radio :label="1">Option A</s-radio>
      <s-radio :label="2">Option B</s-radio>
      <s-radio :label="3" disabled>Option C</s-radio>
    </s-radio-group>
  </div>
  <div style="margin-top: 10px">
    <s-checkbox v-model="checked1" disabled>Disabled</s-checkbox>
    <s-checkbox v-model="checked2">Not disabled</s-checkbox>
    <s-checkbox indeterminate>indeterminate</s-checkbox>
  </div>
  <div style="margin-top: 10px">
    <s-checkbox-group v-model="checkList">
      <s-checkbox label="Option A" />
      <s-checkbox label="Option B" />
      <s-checkbox label="Option C" />
      <s-checkbox label="disabled" disabled />
      <s-checkbox label="selected and disabled" disabled />
    </s-checkbox-group>
  </div>
  <div style="margin-top: 10px">
    <s-input placeholder="Please input" v-model="input"></s-input>
    <s-input disabled placeholder="Please input" v-model="input"></s-input>
    <s-input placeholder="Please input" :prefix-icon="Grid"></s-input>
    <s-input placeholder="Please input" :suffix-icon="Grid"></s-input>
    <s-input v-model="input2" placeholder="Please input" maxLength="10" clearable></s-input>
  </div>
  <div style="margin-top: 10px;">
    <s-input type="textarea" v-model="textarea"></s-input>
  </div>
  <div style="margin-top: 10px;">
    <s-switch v-model="switchValue"></s-switch>
    <s-switch :modelValue="true" disabled></s-switch>
    <s-switch :modelValue="false" disabled></s-switch>
    <s-switch :modelValue="true" loading></s-switch>
    <s-switch :modelValue="false" loading></s-switch>
  </div>
  <div style="margin: 10px;">
    <s-input-number v-model="inputNumber1" :min="1" :max="10"></s-input-number>
    <s-input-number v-model="inputNumber1" disabled></s-input-number>
    <s-input-number v-model="inputNumber2" :step="2"></s-input-number>
    <s-input-number v-model="inputNumber3" :precision="2" :step="0.1" :max="5"></s-input-number>
    <s-input-number v-model="inputNumber2" :controls="false"></s-input-number>
  </div>
  <div style="margin: 10px;">
    <s-upload :data="{a: [1,2],b:2}" :headers="{contentType: 'applicaiton/json'}">
      <s-button type="primary">点击上传</s-button>
      <template #tip>
        <div>123</div>
      </template>
    </s-upload>
    <s-upload 
      v-model:file-list="fileList" 
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    >
      <s-button type="primary">点击上传</s-button>
    </s-upload>
    <s-upload 
      drag
      accept=".png"
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    >
      <s-icon class="s-icon--upload">
        <CloudUpload />
      </s-icon>
      <div class="s-upload__text">Drop file here or click to upload</div>
    </s-upload>
  </div>
  <div style="margin: 10px;">
    <s-progress :percentage="50"></s-progress>
    <s-progress :percentage="100" :format="format"></s-progress>
    <s-progress :percentage="100" status="success"></s-progress>
    <s-progress :percentage="100" status="warning"></s-progress>
    <s-progress :percentage="50" status="fail"></s-progress>
  </div>
  <div style="margin: 10px;">
    <s-progress :text-inside="true" :height="26" :percentage="70"></s-progress>
    <s-progress :text-inside="true" :height="24" :percentage="100" status="success"></s-progress>
    <s-progress :text-inside="true" :height="22" :percentage="80" status="warning"></s-progress>
    <s-progress :text-inside="true" :height="20" :percentage="50" status="fail"></s-progress>
    <s-progress :percentage="50" indeterminate></s-progress>
    <s-progress :percentage="70" color="#f60" indeterminate :duration="10"></s-progress>
    <s-progress :percentage="70" :text-inside="true" :height="20">123</s-progress>
    <s-progress :percentage="percentage" color="#f60" status="success"></s-progress>
    <s-button @click="increase">+</s-button>
  </div>
  <div style="margin: 10px 0 200px;">
    <s-tree ref="treeRef" :data="data" show-checkbox :defaultExpandedKeys="['1']" :props="{ value: 'label'}" :filter-method="filterMethod">
      <template #default="node">
        {{ node.label }}
      </template>
    </s-tree>
    <s-button type="primary" @click="handleFilter">过滤</s-button>
  </div>
</template>

<script setup lang="ts">
import { TrashOutline, Grid, BluetoothOutline, CloudUpload } from '@vicons/ionicons5'
import { ref } from 'vue';
import { UploadUserFile } from '@storm/components/upload'
import { TreeNodeData } from '@storm/components/tree';
const radio = ref('Option A1')
const radios = ref(3)
const checked1 = ref(false)
const checked2 = ref(true)
const checkList = ref(['selected and disabled', 'Option A'])
const input = ref(123)
const input2 = ref(1)
const textarea = ref()
const switchValue = ref(true)
const inputNumber1 = ref(1)
const inputNumber2 = ref(1)
const inputNumber3 = ref(1)

const fileList = ref<UploadUserFile[]>([
  {
    name: 'element-plus-logo.svg',
    url: 'https://element-plus.org/images/element-plus-logo.svg',
  },
  {
    name: 'element-plus-logo2.svg',
    url: 'https://element-plus.org/images/element-plus-logo.svg',
  },
])
const format = (percentage: number) => percentage === 100 ? 'Full' : `${percentage}%`

const percentage = ref(10)
const increase = () => {
  percentage.value += 10
  if (percentage.value > 100) {
    percentage.value = 100
  }
}

interface Tree {
  disabled?: boolean,
  label: string
  children?: Tree[]
}
const data: Tree[] = [
  {
    disabled: true,
    label: '1',
    children: [
      {
        label: '11',
        children: [
          {
            label: '111',
          },
        ],
      },
    ],
  },
  {
    label: '2',
    children: [
      {
        label: '21',
        children: [
          {
            label: '211',
          },
        ],
      },
      {
        label: '22',
        children: [
          {
            label: '221',
          },
        ],
      },
    ],
  },
  {
    label: '3',
    children: [
      {
        label: '31',
        children: [
          {
            label: '311',
          },
        ],
      },
      {
        label: '32',
        children: [
          {
            label: '321',
          },
        ],
      },
    ],
  },
]
const filterMethod = (query: string, node: TreeNodeData) => {
  return node.label === query
}
const treeRef = ref()
const handleFilter = () => {
  const nodes = treeRef.value.getCheckedNodes()
  console.log(nodes)
  treeRef.value.setCheckedKeys(['3'])
}
</script>