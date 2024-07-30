<script setup>
import { ref, computed } from 'vue';
import Textarea from 'primevue/textarea';
import InputText from 'primevue/inputtext';
import Panel from './ui/Panel.vue';
import ActivityLabel from '@/components/forms/ActivityLabel.vue'
import ToggleSwitch from 'primevue/toggleswitch';
import SelectButton from 'primevue/selectbutton';
import Divider from 'primevue/divider';
import { useCourseStore } from '@/stores/course.js'

import Fieldset from 'primevue/fieldset';
import ActivityPlaceholder from './ActivityPlaceholder.vue';
import ManageActivityButton from '@/components/buttons/ManageActivityButton.vue';


const props = defineProps({
    weekIndex: Number,
    activity: Object,
    activityIndex: Number,

})


const course = useCourseStore()

const activityWeek = ref(course.getWeek(props.weekIndex))

const cardCount = computed(() => Math.min((activityWeek.value.activityCount - 1), 4));


const dynamicBgClass = (index) => {
    const baseColor = 100;
    const increment = 100;
    const bg = 'bg-slate-400 bg-slate-500 bg-slate-600 bg-slate-700'
    const colorValue = baseColor + (index * increment);
    // Ensure the color value does not exceed a certain limit if necessary (e.g., 900)
    const clampedColorValue = Math.min(colorValue, 900);
    return `bg-slate-${clampedColorValue}`;
}

const isAligned = (item) => {
    return computed({
        get: () => {
            // Check again within the getter in case of reactivity issues
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
};
function getRandomActivities(array, maxNumberOfItems) {
    // Step 1: Copy the array
    const newArray = array
    // Step 2: Shuffle the array
    const shuffledArray = newArray.sort(() => 0.5 - Math.random());

    // Step 3: Determine a random number of items to select, up to the maximum specified
    const numberOfItems = Math.floor(Math.random() * Math.min(maxNumberOfItems, newArray.length)) + 1;

    // Step 4: Slice the first `numberOfItems` elements
    return shuffledArray.slice(0, numberOfItems);
}

const suggestMoodleActivities = getRandomActivities(course.moodleActivities, 3);

function removeSuggestedActivities(array1, array2) {
    // Step 1: Create a Set from the second array
    const set2 = new Set(array2);

    // Step 2: Filter the first array to exclude elements that are present in the Set
    const filteredArray = array1.filter(item => !set2.has(item));

    return filteredArray;
}

const additionalActivities = ref(removeSuggestedActivities(course.moodleActivities, suggestMoodleActivities));

</script>

<template>

    <div v-if="activity" class="relative w-full max-w-7xl" :style="{ marginTop: `${cardCount * 10}px` }">
        <Panel headerBar :title="(activityIndex + 1) + '. ' + activity.title" removeHeadUnderline
            class=" bg-slate-50 p-5 rounded h-full relative z-20 shadow">
            <template #action>
                <ManageActivityButton :week-index="weekIndex" :activity-index="activityIndex" :activity="activity" />
            </template>
            <div class="grid xs:grid-cols-1 2xl:grid-cols-2 gap-5">
                <div class="grow">
                    <Fieldset legend="Basic Information" pt:legend="!bg-transparent" pt:root="!bg-transparent"
                        pt:content="flex-col flex gap-5">
                        <ActivityLabel label="Title" targetId="activity-name"
                            help="Enter a descriptive title for this Activity.">
                            <InputText id="activity-name" v-model="activity.title" />
                        </ActivityLabel>
                        <ActivityLabel label="Instructions" targetId="activity-instructions"
                            help="Describe the steps involved in this Activity to your students.">
                            <Textarea autoResize rows="5" id="activity-instructions" v-model="activity.instructions" />
                        </ActivityLabel>
                    </Fieldset>
                    <Fieldset legend="Learning Approach" pt:content="flex-col flex gap-5" pt:legend="!bg-transparent"
                        pt:root="!bg-transparent">
                        <ActivityLabel horizontal label="Duration (mins)" targetId="activity-duration"
                            help="How long will this Activity take in total.">
                            <InputText type="number" min="0" :step="1" id="activity-duration"
                                v-model="activity.duration" class="w-20" />
                        </ActivityLabel>
                        <ActivityLabel horizontal label="Group" targetId="activity-group-toggle"
                            help="Is this a group Activity?">
                            <ToggleSwitch v-model="activity.isGroup" inputId="activity-group-toggle" />
                        </ActivityLabel>
                        <ActivityLabel horizontal label="Learning Mode" targetId="activity-mode-select"
                            help="Indicate the learning mode of this Activity.">
                            <SelectButton id="activity-mode-select" :options="['Sync', 'Async']" aria-labelledby="basic"
                                v-model="activity.mode" />
                        </ActivityLabel>
                    </Fieldset>
                </div>
                <Fieldset legend="Alignments" pt:legend="!bg-transparent" pt:root="!bg-transparent">
                    <div class="">
                        <p class="text-sm mb-4">Select which Learning Outcomes or Assessments this
                            Activity
                            is aligned with.</p>
                        <div v-for="(option, index) in course.alignmentOptions" :key="index">
                            <Divider v-if="index != 0" />
                            <div class="flex justify-between items-center ">
                                <label class="w-full" :for="'alignment-group-' + index">
                                    <h3 class="font-medium">{{ option.group }}</h3>
                                </label>
                            </div>
                            <Transition name="fade">
                                <ul class="flex flex-col">
                                    <li v-for="(item, index) in option.items" :key="index"
                                        class=" flex gap-3  hover:bg-slate-100 px-2 py-3 hover:rounded transition">
                                        <span
                                            class="min-w-6 max-h-6 text-sm font-medium flex items-center justify-center bg-cyan-700 text-white rounded-full">{{
                                                (index++ + 1) }}</span>
                                        <label class="w-full mr-2"
                                            :for="'activity-' + activityIndex + item.value + '-switch-' + index">
                                            <span v-if="item.nickname">{{ item.nickname }}</span>
                                            <span v-else>{{ item.label }}</span>
                                        </label>
                                        <div class="w-max">
                                            <ToggleSwitch v-model="isAligned(item).value"
                                                :inputId="'activity-' + activityIndex + item.value + '-switch-' + index" />
                                        </div>
                                    </li>
                                </ul>
                            </Transition>
                        </div>
                    </div>
                </Fieldset>
                <Fieldset legend="Moodle Activities" pt:legend="!bg-transparent" pt:root="!bg-transparent">
                    <ul class="flex flex-wrap gap-2">
                        <li v-for="moodleActivity in suggestMoodleActivities">
                            {{ moodleActivity.name }}
                        </li>
                    </ul>

                    <ul class="flex flex-wrap gap-2">
                        <li v-for="moodleActivity in additionalActivities">
                            {{ moodleActivity.name }}
                        </li>
                    </ul>
                </Fieldset>
            </div>
        </Panel>
        <TransitionGroup name="list">
            <div v-for="index in cardCount" :key="index"
                :class="['rounded shadow-sm', 'h-full', 'w-full', 'absolute', dynamicBgClass(index)]"
                :style="{ top: `-${index * 20}px`, transform: `scale(${1 - index * 0.02})`, zIndex: `${cardCount - index}` }">
            </div>
        </TransitionGroup>
    </div>
    <ActivityPlaceholder :activities="course.weeks[weekIndex].activities" v-else />
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.list-move,
/* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(10px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
    position: absolute;
}
</style>