<script setup>
import InfoPanel from '@/components/ui/InfoPanel.vue'
const props = defineProps({
    label: String,
    sublabel: String,
    targetId: String,
    help: String,
    horizontal: Boolean,
    unseparated: Boolean
})
</script>
<template>
    <div class="flex gap-5 items-center py-2 mr-[-1.2rem] pr-5 dark:border-slate-700"
        :class="unseparated ? 'border-none' : 'border-b last-of-type:border-none'">
        <div class="flex grow flex-col gap-1">
            <div class="flex gap-3" :class="horizontal ? 'flex-row justify-between items-center' : 'flex-col'">
                <div class="flex gap-2 max-w-xl">
                    <label class="font-medium flex flex-col" :for="targetId"
                        :aria-describedby="help ? targetId + '-help' : undefined">
                        {{ label }}
                        <p class="text-xs text-slate-600 dark:text-zinc-700" v-if="sublabel">{{ sublabel }}</p>
                    </label>
                    <InfoPanel v-if="$.slots.info">
                        <h4>{{ slots.info.title }}</h4>
                        <slot name="info"></slot>
                    </InfoPanel>
                </div>
                <slot></slot>
            </div>
            <small class="text-slate-500 mb-2" v-if="help" :id="targetId + '-help'">{{ help }}</small>
        </div>

    </div>
</template>