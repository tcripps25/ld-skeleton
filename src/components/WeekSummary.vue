<script setup>
import { TransitionGroup, computed, onMounted } from 'vue';
import { useCourseStore } from '@/stores/course.js'
import { PlusCircleIcon, XMarkIcon } from '@heroicons/vue/24/solid';
import Panel from './ui/Panel.vue';
import Timeline from 'primevue/timeline';
import Pbutton from './buttons/Pbutton.vue';

const course = useCourseStore()

// Define props
const props = defineProps({
    week: Object,
    weekIndex: Number,
});

const removeWeek = (weekIndex) => {
    course.weeks.splice(weekIndex, 1);
};

</script>

<template>
    <Panel :title="week.name" header-bar collapse v-if="week" class="p-5 rounded-lg shadow">
        <template v-slot:action>
            <Pbutton aria-label="Delete week" @click="removeWeek(weekIndex)" >
                <template #icon>    
                    <XMarkIcon class="w-5 h-5 text-red-500" />
                </template>
            </Pbutton>
        </template>
   

        <div class="flex">
            <div class="text-sm">Teaching Week {{ weekIndex + 1 }} Commencing: {{ week.formattedDate }}</div>
            <Timeline v-if="week.activities.length > 0" :value="week.activities" align="right"
                class="shrink bg-slate-100 py-5 -ml-5 rounded">
                <template #content="slotProps">
                    <div class="text-sm font-semibold">{{ slotProps.item.name || 'Untitled Activity ' + (slotProps.index
                        + 1) }}</div>
                </template>
                <template #opposite="slotProps">
                    <ul class="text-sm">
                        <li v-for="(type, typeIndex) in slotProps.item.selectedTypes">
                            {{ type }}
                        </li>
                    </ul>
                </template>
            </Timeline>

        </div>
    </Panel>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

.list-leave-active {
    position: absolute;
}
</style>
