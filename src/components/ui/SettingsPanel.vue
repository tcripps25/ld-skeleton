<script setup>
import Button from 'primevue/button';
import { ArrowUturnLeftIcon } from '@heroicons/vue/16/solid';

const props = defineProps({
  title: String,
  desc: String
});
</script>

<template>
  <div
    class="w-full rounded-lg absolute top-0 h-full overflow-y-auto p-4 pt-0 bg-slate-100 shadow-sm border border-slate-300">
    <div class="flex flex-col h-full relative justify-between">
      <div
        class="py-3 text-slate-900 flex items-center sticky top-0 bg-slate-200 shadow-sm border-b border-slate-300 -mx-4 px-4 z-10 mb-5">

        <div v-if="title" class="flex justify-center w-full">
          <h3 class="text-md w-max font-semibold">{{ title }}</h3>
        </div>
      </div>
      <div class="content flex flex-col grow">
        <div v-if="$slots.description" class="mb-5 py-3 rounded bg-slate-100">
          <slot name="description"></slot>
        </div>
        <slot></slot>
      </div>
      <div class="flex sticky -bottom-4 shadow-sm -mb-4 flex mt-5 border-t border-slate-300 p-2 -mx-4 bg-slate-200">

        <Button @click="$emit('closePanel')" title="Save and back to Activity"
          pt:root:class="transition bg-blue-600 hover:bg-blue-500 text-blue-50 p-2 rounded-md w-full flex justify-center">
          <div class="flex gap-1">
            <ArrowUturnLeftIcon class="w-5 h-5" />
            <span class="text-sm whitespace-nowrap font-semibold">Done & Back to Activity</span>
          </div>
        </Button>

      </div>
    </div>
  </div>
</template>