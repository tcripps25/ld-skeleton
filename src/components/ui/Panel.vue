<script setup>
const props = defineProps({
    title: String,
    borderless: Boolean,
    flush: Boolean,
    sidebar: Boolean,
});
</script>

<template>
    <div class="bg-white rounded-lg grow"
        :class="{ 'border shadow': !borderless }, { 'p-5': !flush }, { 'bg-transparent -mx-5 px-5 pt-5 rounded-none': sidebar }">
        <div class="flex justify-between mb-3" v-if="$slots.title || title || $slots.action">
            <!-- for usage without using props -->
            <slot v-if="$slots.title || title" name="title">
                <h2 v-if="title" class="text-2xl font-semibold text-slate-700 ">{{ title }}</h2>
            </slot>
            <div class="ml-auto" v-if="$slots.action">
                <slot v-if="$slots.action" name="action" />
            </div>
        </div>
        <div v-if="$slots.subtitle" class="mb-10 text-sm">
            <slot name="subtitle" />
        </div>
        <slot></slot>
    </div>
</template>