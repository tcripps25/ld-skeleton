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

// Accessing the 'typeMix' ref
const typeMixItem = course.insightStates.find(item => item.name === 'typeMix');
const teachTimeItem = course.insightStates.find(item => item.name === 'teachingTime');
</script>

<template>


    <div :id="'week-' + (index + 1) + '-sidebar'"
        class="bg-white p-5 border-l flex-initial overflow-y-auto overflow-x-hidden max-w-[35rem] min-w-[35rem] flex flex-col gap-4 transition-all duration-300"
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



            <p v-if="show" class="text-sm text-slate-600">{{ course.title }}: {{ week.name || 'Week ' + (index + 1) }}
            </p>

            <div v-if="show" class="mb-3 mt-5 flex gap-2">
                <div v-for="(item, index) in course.insightStates" :key="index">
                    <ToggleButton v-model="item.ref" :onLabel="item.fullName" :offLabel="item.fullName"
                        :pt:box:class="{ 'text-sky-600 flex font-medium items-center  transition': true, ' text-sky-50': item.ref }"
                        :pt:label:class="{ 'px-2 py-1 bg-transparent transition': true }"
                        :class="{ 'bg-slate-100 hover:!bg-slate-200 rounded transition': true, '!bg-sky-600 hover:!bg-sky-700': item.ref }" />

                </div>
            </div>
        </div>

        <Transition name="slide-fade">
            <div v-if="show" class="flex flex-col gap-10 divide-y">
                <Transition name="fade">
                    <Panel v-if="teachTimeItem.ref" borderless flush sidebar>
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
                    <Panel v-if="typeMixItem.ref" borderless flush sidebar>
                        <PieChart chartWidth="400" legendPosition="left" :dataseries="weekStats"
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
    margin-right: -35rem;
    opacity: 0;
    position: absolute;
}
</style>