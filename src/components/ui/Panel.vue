<script setup>
import { ref } from 'vue';
import InfoPanel from './InfoPanel.vue';
const props = defineProps({
    title: String,
    borderless: Boolean,
    flush: Boolean,
    sidebar: Boolean,
    stickyHeader: Boolean,
    removeHeadUnderline: Boolean,
    headerBar: Boolean,
});

const helpVisible = ref(true)

const toggleHelpVisible = () => {
    helpVisible.value = !helpVisible.value
}
</script>

<template>
    <div class="grow w-full mx-auto max-w-7xl"
        :class="sidebar ? 'bg-transparent !w-auto -mx-10 px-10 pt-5 rounded-none' : 'mb-5'">
        <div :class="{ 'sticky top-0 bg-white': stickyHeader }, removeHeadUnderline ? 'border-none mb-0' : 'border-b mb-5', headerBar ? 'bg-slate-100 mb-3 -m-5 px-5 py-3 ' : 'py-1'"
            class="flex justify-between items-center rounded-t" v-if="$slots.title || title || $slots.action">
            <div class="flex gap-2">
                <slot v-if="$slots.title || title" name="title">
                    <h2 v-if="title" class="text-lg font-semibold text-slate-600 ">{{ title }}</h2>
                </slot>
                <InfoPanel v-if="$slots.info">
                    <slot name="info"></slot>
                </InfoPanel>
            </div>
            <!-- for usage without using props -->


            <div class="ml-auto flex gap-1 items-center" v-if="$slots.action">
                <slot v-if="$slots.action" name="action" />
            </div>
        </div>
        <div v-if="$slots.subtitle" class="mb-5">
            <slot name="subtitle" />
        </div>

        <div class="flex grow gap-10 relative">
            <div v-if="$slots.lhcontent" class="max-w-72 block">

                <slot name="lhcontent" />
            </div>
            <div class="grow">
                <slot></slot>
            </div>
            <div v-if="$slots.rhcontent" class="max-w-72  block">
                <slot name="rhcontent" />
            </div>
        </div>
    </div>
</template>