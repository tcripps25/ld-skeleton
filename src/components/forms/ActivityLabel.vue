<script setup>
import InfoPanel from '@/components/ui/InfoPanel.vue'
const props = defineProps({
    label: String,
    targetId: String,
    help: String,
    horizontal: Boolean,
})
</script>
<template>
    <div class="flex gap-5 items-center">
        <div class="flex grow flex-col gap-2">
            <div class="flex gap-1" :class="horizontal ? 'flex-row justify-between items-center' : 'flex-col'">
                <div class="flex gap-2">
                    <label class="font-medium" :for="targetId"
                        :aria-describedby="help ? targetId + '-help' : undefined">
                        {{ label }}
                    </label>
                    <InfoPanel v-if="$.slots.info">
                        <h4>{{ slots.info.title }}</h4>
                        <slot name="info"></slot>
                    </InfoPanel>
                </div>
                <slot></slot>
            </div>
            <small v-if="help" :id="targetId + '-help'">{{ help }}</small>
        </div>

    </div>
</template>