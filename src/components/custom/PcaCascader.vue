<script setup lang="ts">
import type { CascaderOption } from 'naive-ui'

defineOptions({
  name: 'PcaCascader',
})

// Get the original data, data source warehouse https://github.com/modood/administrative-divisions-5 china
const pcaCode = shallowRef<CascaderOption[]>()
async function fetchPcaCode() {
  return await fetch('https://cdn.jsdelivr.net/gh/modood/Administrative-divisions-of-China/dist/pca-code.json').then(res => res.json())
}
onMounted(async () => {
  pcaCode.value = await fetchPcaCode()
})
</script>

<template>
  <n-cascader
    :options="pcaCode"
    value-field="code"
    label-field="name"
    check-strategy="all"
    filterable
    clearable
  />
</template>
