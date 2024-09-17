<script setup lang="ts">
import { useAuthStore } from '@/store'
import Chart from './components/chart.vue'

const { userInfo } = useAuthStore()
</script>

<template>
  <n-flex>
    <NFlex>
      ABE ANA SAYFA
    </NFlex>
  </n-flex>
</template>

<style scoped></style>
