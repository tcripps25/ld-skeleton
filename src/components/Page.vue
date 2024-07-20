<script setup>
import DetailSidebar from './ui/DetailSidebar.vue';
const props = defineProps({
    sidebarTitle: String,
})
import ScrollPanel from 'primevue/scrollpanel';
</script>

<template>
    <div class="flex my-5 grow overflow-hidden rounded-s-lg relative">
        <div class="bg-slate-200 dark:bg-black flex-col flex grow ">
            <div class="flex grow h-full">
                <div class="p-5 flex-col flex grow overflow-y-auto overflow-x-hidden ">
                    <slot name="page-header">
                    </slot>
                    <div class="mt-5">
                        <slot></slot>
                    </div>
                </div>
                <DetailSidebar v-if="$slots.sidebar" :title="sidebarTitle">
                    <slot name="sidebar">

                    </slot>
                </DetailSidebar>
            </div>

        </div>
    </div>
</template>