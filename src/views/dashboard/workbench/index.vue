<script setup lang="ts">
import { useAuthStore } from '@/store'

const { userInfo } = useAuthStore()
</script>

<template>
  <n-flex>
    <NFlex>
      ABE ANA SAYFA
    </NFlex>
    {{ $route.params }}
  </n-flex>
</template>

<style scoped></style>
