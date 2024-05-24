<script setup>
import { watch } from 'vue';
import { PaintBrushIcon } from '@heroicons/vue/24/solid';


// Define props
const props = defineProps({
    title: String,
  message: String
});


</script>
<template>
    <div class="z-10 p-5 bg-slate-50 -mt-5 -mx-5 flex sticky -top-5 shadow-sm border-b border-slate-300 justify-between items-center min-h-16">
    <h1 class="text-xl mb-0 font-semibold flex gap-2 items-center">{{ title }}</h1>
    <div class="flex flex-col items-center">
      <p class="text-sm">{{ message }}</p>
    </div>
    
    <div class="flex gap-2">
        <slot></slot>
    </div>
  </div>
</template>