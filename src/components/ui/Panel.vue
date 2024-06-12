<script setup>
const props = defineProps({
    title: String
});
</script>

<template>
    <div class="bg-slate-50 rounded-lg p-5 shadow grow border">
        <div class="flex justify-between">
            <slot name="title">
                <h2 v-if="title" class="text-2xl font-semibold text-slate-700 mb-5">{{ title }}</h2>
            </slot>
            <div class="ml-auto">
                <slot name="action" />
            </div>
        </div>
        <slot></slot>
    </div>
</template>