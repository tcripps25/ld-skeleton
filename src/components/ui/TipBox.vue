<script setup>
import { LightBulbIcon } from '@heroicons/vue/16/solid';

const props = defineProps({
  rightCol: Boolean,
});
</script>

<template>
    <div class="sticky top-0 bg-gradient-to-br from-slate-700 to-slate-800 p-3 rounded text-white shadow-sm before:content-[''] before:h-3 before:w-3  before:absolute  before:top-4 before:rotate-45  before:-z-10 z-10" :class="rightCol ? 'before:-left-1 before:bg-slate-700' : 'before:-right-1 before:bg-slate-800'">
        <div class="flex gap-1">
            <LightBulbIcon class="w-5 h-5" />
            <h4 class="font-semibold text-sm mb-2">Tip</h4>
        </div>
    <div class="text-sm text-white">
        <slot></slot>
    </div>
    </div>
</template>