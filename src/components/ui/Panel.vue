<script setup>
const props = defineProps({
    title: String
});
</script>

<template>
    <div class="bg-slate-50 rounded p-5 shadow grow">
        <h2 class="text-2xl font-semibold mb-5">{{ title }}</h2>
        <slot></slot>
    </div>
</template>