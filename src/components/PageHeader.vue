<script setup>
import { ref } from 'vue';
// Define props
const props = defineProps({
  title: String,
  subtitle: String,
  message: String
})

const menu = ref(['Set Up', 'Schedule'])
</script>
<template>

  <div
    class="py-3 bg-gradient-to-b from-slate-200 via-slate-200 to-slate-300 -mt-5 -mx-5 px-5 z-10 dark:bg-zinc-800 border-slate-200 dark:border-zinc-800 flex justify-between mb-3 flex-col">
    <div class="pb-3">
      <div class="flex justify-between">
        <h1 class="text-2xl font-semibold text-sky-900">Design</h1>
        <div class="flex">
          <div v-for="item in menu" class="bg-slate-300 -skew-x-12 p-5 -my-5 shadow">
            <p class="skew-x-12">{{ item }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white p-5 -mb-5 -mx-5 relative">
      <div class="flex justify-between items-center">
        <div class="flex gap-2 items-center">
          <h1 class="text-xl mb-0 font-semibold flex gap-2 items-center">{{ title }}</h1>
          <p v-if="subtitle" class="font-semibold text-xl text-slate-400">/</p>
          <h2 v-if="subtitle" class="font-semibold text-xl ">{{ subtitle }}</h2>
        </div>
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
  </div>
</template>
