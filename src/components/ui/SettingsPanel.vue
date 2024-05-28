<script setup>
import Button from 'primevue/button';
import { ArrowUturnLeftIcon } from '@heroicons/vue/16/solid';

const props = defineProps({
    title: String,
    desc: String
});
</script>

<template>
    <div class="w-full rounded-lg absolute top-0 h-full overflow-y-auto border p-4 pt-0 bg-slate-200 shadow-sm">
        <div class="py-5 flex w-full items-center">
        <Button @click="$emit('closePanel')" title="Back to Activity summary" class="!p-0 bg-transparent border-transparent border-slate-300 hover:bg-slate-300 hover:border-slate-300 focus:!ring-blue-400 focus:ring-2">
          <ArrowUturnLeftIcon class="w-5 h-5 text-slate-700" />
        </Button>
        <div v-if="title" class="flex justify-center w-full">
            <h3 class="text-xl w-max font-semibold">{{ title }}</h3>
        </div>
    </div>
    <p class="mb-5" v-if="desc">{{ desc }}</p>
        <slot></slot>
  </div>
</template>