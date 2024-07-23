<script setup>
const props = defineProps({
    label: String,
    targetId: String,
    help: String,
    horizontal: Boolean,
})
</script>
<template>
    <div class="flex flex-col gap-2">
        <div class="flex gap-1" :class="horizontal ? 'flex-row justify-between items-center' : 'flex-col'">
            <label class="font-medium" :for="targetId" :aria-describedby="help ? targetId + '-help' : undefined">
                {{ label }}
            </label>
            <slot></slot>
        </div>
        <small v-if="help" :id="targetId + '-help'">{{ help }}</small>
    </div>
</template>