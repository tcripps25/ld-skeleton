<script setup>
import { computed, watch, ref } from 'vue';

import { useCourseStore } from '@/stores/course.js'
import Button from 'primevue/button';
import ToggleButton from 'primevue/togglebutton';
import { XMarkIcon, ChevronRightIcon, ChevronLeftIcon, CloudArrowDownIcon, ClockIcon } from '@heroicons/vue/24/solid';
import GptPanel from '@/ai/GptPanel.vue'

import CloudArrowDownIconOutline from '@heroicons/vue/24/outline/CloudArrowDownIcon';


const props = defineProps({
    title: String,
});


const show = ref(true)

const ToggleShow = () => {
    show.value = !show.value
}


</script>

<template>


    <div class="bg-slate-50 p-5 border-l flex-initial overflow-y-auto overflow-x-hidden max-w-[26rem] min-w-[26rem] flex flex-col gap-4 transition-all duration-300"
        :class="{ '!max-w-[4.5rem] min-w-[4.5rem]': !show }">

        <div id="sidebar-header">
            <div class="flex justify-between items-start">
                <div class="flex gap-1 mb-5">
                    <!-- Button for the stats bar  -->
                    <Button @click="ToggleShow" label="Toggle Insights"
                        class="bg-slate-100 text-slate-700 !rounded-full hover:bg-slate-200 border-none min-w-8 max-w-8 min-h-8 max-h-8 !p-0 flex justify-center items-center">
                        <Transition name="fade">
                            <ChevronRightIcon v-if="show" class="h-5 w-5" />
                            <ChevronLeftIcon v-else class="h-5 w-5" />
                        </Transition>
                    </Button>
                </div>
                <div v-if="show" class="flex gap-1 items-center">
                    <h3 class="text-xl font-semibold">{{ title }}</h3>
                </div>
                <!-- Download Insights Button  -->
                <Button v-if="show" label="Download Insights" title="Download Insights"
                    class="bg-transparent text-slate-500 hover:text-slate-900 !rounded-full border-none hover:bg-transparent min-w-8 max-w-8 min-h-8 max-h-8 !p-0 ">
                    <CloudArrowDownIconOutline class="h-6 w-6" />
                </Button>
            </div>
        </div>
        <div v-if="show" id="sidebar-internal-container">
            <slot></slot>
        </div>
    </div>


</template>

<style scoped>
.fade-leave-active,
.fade-enter-active {
    transition: all 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    position: absolute;
}

.slide-fade-leave-active,
.slide-fade-enter-active {
    transition: all 0.2s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    margin-right: -26rem;
    opacity: 0;
    position: absolute;
}
</style>