<script setup lang="ts">
import { useAppStore } from '@/store'

const appStore = useAppStore()
const options = [
  {
    label: 'Türkçe',
    value: 'trTR',
  },
  {
    label: 'English',
    value: 'enUS',
  },
]
</script>

<template>
  <n-popselect :value="appStore.lang" :options="options" trigger="click" @update:value="appStore.setAppLang">
    <CommonWrapper>
      <icon-park-outline-translate />
    </CommonWrapper>
  </n-popselect>
</template>

<style scoped></style>
