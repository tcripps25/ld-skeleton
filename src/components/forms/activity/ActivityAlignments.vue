<script setup>
import { useCourseStore } from '@/stores/course.js'
import ToggleSwitch from 'primevue/toggleswitch';
import Fieldset from 'primevue/fieldset';
import Divider from 'primevue/divider';
import { computed } from 'vue';
const course = useCourseStore();

const props = defineProps({
    weekIndex: Number,
    activity: Object,
    activityIndex: Number,
});


const isAligned = (item) => computed({
    get: () => {
        if (!props.activity.alignments) {
            props.activity.alignments = [];
        }
        return props.activity.selectedAlignments.some(alignment => alignment.value === item.value);
    },
    set: (newValue) => {
        if (!props.activity.selectedAlignments) {
            props.activity.selectedAlignments = [];
        }

        if (newValue) {
            if (!props.activity.selectedAlignments.some(alignment => alignment.value === item.value)) {
                props.activity.selectedAlignments.push(item);
            }
        } else {
            const index = props.activity.selectedAlignments.findIndex(alignment => alignment.value === item.value);
            if (index > -1) {
                props.activity.selectedAlignments.splice(index, 1);
            }
        }
    }
});
</script>

<template>
    <Fieldset legend="Alignments">
        <div>
            <p class="text-sm mb-4">Select which Learning Outcomes or Assessments this Activity is
                aligned
                with.</p>
            <div v-for="(option, optionIndex) in course.alignmentOptions" :key="optionIndex">
                <Divider v-if="optionIndex !== 0" />
                <div class="flex justify-between items-center">
                    <label class="w-full" :for="'alignment-group-' + optionIndex">
                        <h3 class="font-medium">{{ option.group }}</h3>
                    </label>
                </div>
                <Transition name="fade">
                    <ul class="flex flex-col">
                        <li v-for="(item, itemIndex) in option.items" :key="itemIndex"
                            class=" flex gap-3 hover:bg-slate-100 px-2 py-3 hover:rounded transition">
                            <span
                                class="min-w-6 max-h-6 text-sm font-medium flex items-center justify-center bg-cyan-700 text-white rounded-full">{{
                                    itemIndex + 1 }}</span>
                            <label class="w-full mr-2"
                                :for="'activity-' + activityIndex + item.value + '-switch-' + itemIndex">
                                <span v-if="item.nickname">{{ item.nickname }}</span>
                                <span v-else>{{ item.label }}</span>
                            </label>
                            <div class="w-max">
                                <ToggleSwitch v-model="isAligned(item).value"
                                    :inputId="'activity-' + activityIndex + item.value + '-switch-' + itemIndex" />
                            </div>
                        </li>
                    </ul>
                </Transition>
            </div>
        </div>
    </Fieldset>
</template>