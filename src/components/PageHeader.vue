<script setup>
// Define props
const props = defineProps({
  title: String,
  message: String
})
</script>
<template>
  <div class="flex flex-col bg-white border-b sticky top-0 z-50 px-5 py-3">
    <div class="flex justify-between items-center">
      <div v-if="$slots.title">
        <slot name="title"></slot>
      </div>
      <h1 v-else class="text-xl mb-0 font-semibold flex gap-2 items-center">{{ title }}</h1>
      <div class="flex flex-col items-center">
        <p class="text-sm">{{ message }}</p>
      </div>

      <div class="flex gap-2">
        <slot></slot>
      </div>
    </div>
    <div v-if="$slots.toolbar" class="">
      <slot name="toolbar"></slot>
    </div>
  </div>
</template>
