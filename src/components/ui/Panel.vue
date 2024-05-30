<script setup>
const props = defineProps({
    title: String
});
</script>

<template>
    <div class="bg-slate-50 rounded-lg p-5 shadow grow border">
        <h2 class="text-2xl font-semibold mb-5">{{ title }}</h2>
        <slot></slot>
    </div>
</template>