<script setup>
import { computed, watch, ref } from 'vue';
import PieChart from '../charts/PieChart.vue';
import Panel from './Panel.vue';
import PanelNotice from './PanelNotice.vue';
import { useCourseStore } from '@/stores/course.js'
import Button from 'primevue/button';
import ToggleButton from 'primevue/togglebutton';
import { XMarkIcon, ArrowRightEndOnRectangleIcon, ArrowLeftStartOnRectangleIcon, CloudArrowDownIcon, ClockIcon } from '@heroicons/vue/24/solid';

import CloudArrowDownIconOutline from '@heroicons/vue/24/outline/CloudArrowDownIcon';
import Meter from '@/components/charts/Meter.vue';

const props = defineProps({
    week: Object,
    index: Number,
});
const course = useCourseStore();


const weekStats = computed(() => course.getActivityTypePercentagesForWeek(props.index));

watch(weekStats, (newStats) => {
    console.log('Week stats updated:', newStats);
});

const show = ref(true)

const ToggleShow = () => {
    show.value = !show.value
}


</script>

<template>


    <div :id="'week-' + (index + 1) + '-sidebar'"
        class="bg-white p-5 border-l flex-initial overflow-y-auto overflow-x-hidden max-w-[26rem] min-w-[26rem] flex flex-col gap-4 transition-all duration-300"
        :class="{ '!max-w-[4.5rem] min-w-[4.5rem]': !show }">
        <div id="sidebar-header">
            <div class="flex justify-between items-start">
                <div class="flex gap-1 mb-5">
                    <!-- Button for the stats bar  -->
                    <Button @click="ToggleShow" label="Toggle Insights"
                        class="bg-slate-100 text-slate-700 !rounded-full hover:bg-slate-200 border-none min-w-8 max-w-8 min-h-8 max-h-8 !p-0">
                        <Transition name="fade">
                            <ArrowRightEndOnRectangleIcon v-if="show" class="h-5 w-5" />
                            <ArrowLeftStartOnRectangleIcon v-else class="h-5 w-5" />
                        </Transition>
                    </Button>
                </div>
                <div v-if="show" class="flex gap-1 items-center">
                    <h3 class="text-xl font-semibold">Insights</h3>
                </div>
                <!-- Download Insights Button  -->
                <Button v-if="show" label="Download Insights" title="Download Insights"
                    class="bg-transparent text-slate-500 hover:text-slate-900 !rounded-full border-none hover:bg-transparent min-w-8 max-w-8 min-h-8 max-h-8 !p-0 ">
                    <CloudArrowDownIconOutline class="h-6 w-6" />
                </Button>
            </div>
        </div>

        <Transition name="slide-fade">
            <div v-if="show" class="flex flex-col gap-10 divide-y">
                <Transition name="fade">
                    <Panel borderless flush sidebar>
                        <Meter title="Activity Duration" :values="course.getActivitiesForWeek(index)"
                            :max="course.totalMinsInWeekActivities(index)">
                            <p class="mb-3">Your total time for this week split by Activity.
                            </p>
                            <template v-slot:meter-badge>
                                <div class="flex gap-2 items-center justify-end rounded w-full">

                                    <p class="text-lg font-medium text-teal-700">{{
                                        course.totalMinsInWeekActivities(index) }} <span
                                            class="text-sm text-slate-600">Total minutes</span>
                                    </p>

                                </div>
                            </template>
                        </Meter>
                    </Panel>
                </Transition>
                <Transition name="fade">
                    <Panel borderless flush sidebar>
                        <PieChart chartWidth="350" legendPosition="left" :dataseries="weekStats"
                            :datalabels="course.activityTypes" :colors="course.activityColors" title="Learning Type Mix"
                            :id="'week-' + (index + 1) + '-learning-types'">
                            <p class="mb-3">An overview of the Learning Types you have used in this week of your course.
                            </p>
                        </PieChart>
                        <PanelNotice enable>
                            A glance at your Learning Type mix for this week. These types will also determine which
                            Moodle
                            activities
                            will be suggested for each Activity you create.
                        </PanelNotice>
                    </Panel>
                </Transition>
            </div>
        </Transition>
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