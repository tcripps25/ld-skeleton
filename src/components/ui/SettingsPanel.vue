<script setup>
import Button from 'primevue/button';
import { ArrowUturnLeftIcon } from '@heroicons/vue/16/solid';

const props = defineProps({
    title: String,
    desc: String
});
</script>

<template>
    <div class="w-full rounded-lg absolute top-0 h-full overflow-y-auto p-4 pt-0 bg-slate-100 shadow-sm border border-slate-300">
        <div class="py-3 text-slate-900 flex items-center sticky top-0 bg-slate-200 shadow-sm border-b border-slate-300 -mx-4 px-4 z-10 mb-5">
        <Button @click="$emit('closePanel')" title="Back to Activity summary" class="!absolute !p-0 bg-transparent border-transparent border-slate-300 hover:bg-slate-100 hover:border-slate-200 focus:!ring-blue-400 focus:ring-2">
          <div class="flex gap-1 text-slate-900 px-1 py-1">
            <ArrowUturnLeftIcon class="w-5 h-5" />
          <span class="text-sm whitespace-nowrap">Back</span>
        </div>
        </Button>
        <div v-if="title" class="flex justify-center w-full">
            <h3 class="text-md w-max font-semibold">{{ title }}</h3>
        </div>
    </div>
    <div v-if="$slots.description" class="mb-5 p-3 rounded bg-slate-100">
        <slot name="description"></slot>
    </div>
        <slot></slot>
  </div>
</template>