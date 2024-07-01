<script setup>
// Define props
const props = defineProps({
  title: String,
  message: String
})
</script>
<template>
  <div class="z-50 px-5 py-4 bg-white flex sticky top-0 border-b justify-between items-center min-h-14">
    <h1 class="text-xl mb-0 font-semibold flex gap-2 items-center">{{ title }}</h1>
    <div class="flex flex-col items-center">
      <p class="text-sm">{{ message }}</p>
    </div>

    <div class="flex gap-2">
      <slot></slot>
    </div>
  </div>
</template>
