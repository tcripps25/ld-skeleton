<script setup>
const props = defineProps({
    title: String,
    borderless: Boolean,
    flush: Boolean,
    sidebar: Boolean,
});
</script>

<template>
    <div class=" grow" :class="sidebar ? 'bg-transparent -mx-5 px-5 pt-5 rounded-none' : 'mb-5'">
        <div class="flex justify-between items-center py-1 bg-white  mb-5 border-b-2 border-slate-100"
            v-if="$slots.title || title || $slots.action">
            <!-- for usage without using props -->
            <slot v-if="$slots.title || title" name="title">
                <h2 v-if="title" class="text-lg font-semibold text-slate-500 ">{{ title }}</h2>
            </slot>
            <div class="ml-auto flex items-center" v-if="$slots.action">
                <slot v-if="$slots.action" name="action" />
            </div>
        </div>
        <div v-if="$slots.subtitle" class="mb-5 text-sm">
            <slot name="subtitle" />
        </div>
        <slot></slot>
    </div>
</template>