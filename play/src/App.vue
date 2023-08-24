<template>
  <s-icon
    color="red"
    size="40"
  >
    <AddCircle />
  </s-icon>
  <s-icon
    color="yellow"
    size="30"
  >
    <AddCircle />
  </s-icon>
  <div>
    <s-button>default</s-button>
    <s-button type="primary">primary</s-button>
    <s-button type="success">success</s-button>
    <s-button type="info">info</s-button>
    <s-button type="warning">warning</s-button>
    <s-button type="danger">danger</s-button>
  </div>
  <div style="margin-top: 10px;">
    <s-button round>default</s-button>
    <s-button
      type="primary"
      round
    >primary</s-button>
    <s-button
      type="success"
      round
    >success</s-button>
    <s-button
      type="info"
      round
    >info</s-button>
    <s-button
      type="warning"
      round
    >warning</s-button>
    <s-button
      type="danger"
      round
    >danger</s-button>
  </div>
  <div style="margin-top: 10px;">
    <s-button :icon="AddCircle"></s-button>
    <s-button
      type="primary"
      :icon="AddCircle"
    ></s-button>
    <s-button
      type="success"
      :icon="AddCircle"
    ></s-button>
    <s-button
      type="info"
      :icon="AddCircle"
    ></s-button>
    <s-button
      type="warning"
      :icon="AddCircle"
    ></s-button>
    <s-button
      type="danger"
      :icon="AddCircle"
    ></s-button>
  </div>
  <div style="margin-top: 10px;">
    <s-button disabled>default</s-button>
    <s-button
      type="primary"
      :icon="AddCircle"
    >primary</s-button>
    <s-button
      type="success"
      loading
    >success</s-button>
    <s-button type="info" size="large">info</s-button>
    <s-button type="warning" size="small">warning</s-button>
    <s-button type="danger">danger</s-button>
  </div>
</template>

<script setup lang="ts">
import { AddCircle } from '@vicons/ionicons5'
</script>