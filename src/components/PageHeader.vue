<script setup>
import { watch } from 'vue';
import { PaintBrushIcon } from '@heroicons/vue/24/solid';
import AddWeekButton from '@/components/buttons/AddWeekButton.vue'

// Define props
const props = defineProps({
    title: String,
  message: String
});


</script>
<template>
    <div class="p-2 px-5 bg-slate-200 -mt-5 -mx-5 flex sticky -top-5 shadow-sm border-b border-slate-300 justify-between items-center">
    <h1 class="text-2xl mb-0 font-semibold flex gap-2 items-center">{{ title }}</h1>
    <div class="flex flex-col items-center">
      <p class="text-sm">{{ message }}</p>
    </div>
    
    <div class="flex gap-2">
        <AddWeekButton />
    </div>
  </div>
</template>