<script setup>
const props = defineProps({
    title: String
});
</script>

<template>
    <div class="bg-slate-50 rounded-lg p-5 shadow grow border">
        <div class="flex justify-between">
            <h2 class="text-2xl font-semibold text-slate-700 mb-5">{{ title }}</h2>
            <slot name="action">

            </slot>
        </div>
        <slot></slot>
    </div>
</template>