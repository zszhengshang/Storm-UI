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
    <s-input placeholder="Please input"></s-input>
    <s-input disabled placeholder="Please input"></s-input>
  </div>
</template>

<script setup lang="ts">
import { TrashOutline, Grid, BluetoothOutline } from '@vicons/ionicons5'
import { ref } from 'vue';
const radio = ref('Option A1')
const radios = ref(3)
const checked1 = ref(false)
const checked2 = ref(true)
const checkList = ref(['selected and disabled', 'Option A'])
</script>