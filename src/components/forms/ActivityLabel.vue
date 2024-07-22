<script setup>
const props = defineProps({
    label: String,
    targetId: String,
    help: String,
})
</script>
<template>
    <div class="flex flex-col gap-2">
        <label class="ml-1 font-medium" :for="targetId" :aria-describedby="help ? targetId + '-help' : undefined">{{
            label
        }}</label>
        <slot></slot>
        <small v-if="help" :id="targetId + '-help'">{{ help }}</small>
    </div>
</template>