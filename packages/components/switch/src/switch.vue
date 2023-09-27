<template>
  <label :class="[
    bem.b(),
    bem.is('disabled', disabled || loading),
    bem.is('checked', isChecked)
  ]">
    <input
      type="checkbox"
      :class="bem.e('input')"
      v-model="model"
      :name="name"
      :disabled="disabled || loading"
      @change="handleChange"
    >
    <div :class="bem.e('core')">
      <span :class="bem.e('action')">
        <s-icon
          :class="bem.is('loading', loading)"
          v-if="loading"
        >
          <LoadingComponent />
        </s-icon>
      </span>
    </div>
  </label>
</template>

<script setup lang="ts">
import { createNamespace } from '@storm/utils';
import { switchEmits, switchProps } from './switch';
import { computed } from 'vue';
import { UPDATE_MODEL_EVENT } from '@storm/constants';
import SIcon from '@storm/components/icon'
import LoadingComponent from '@storm/components/internal-icon/loading'
defineOptions({ name: 'SSwitch' })
const props = defineProps(switchProps)
const emit = defineEmits(switchEmits)

const bem = createNamespace('switch')
const model = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit(UPDATE_MODEL_EVENT, val)
  }
})
const isChecked = computed(() => model.value)

const handleChange = () => {
  emit(UPDATE_MODEL_EVENT, model.value)
  emit('change', model.value)
}
</script>