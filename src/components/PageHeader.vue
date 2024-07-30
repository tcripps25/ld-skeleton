<script setup>
// Define props
const props = defineProps({
  title: String,
  message: String
})
</script>
<template>
  <div
    class="py-3 bg-white -mt-5 z-10 dark:bg-zinc-800 border-slate-200 dark:border-zinc-800 flex justify-between border-b mb-3">
    <div class="flex justify-between items-center ">

      <h1 class="text-xl mb-0 font-semibold flex gap-2 items-center">{{ title }}</h1>
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
