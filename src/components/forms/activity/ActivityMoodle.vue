<script setup>
import { useCourseStore } from '@/stores/course.js'
import { ref, computed } from 'vue';
import Draggable from 'vuedraggable'
import MultiSelect from 'primevue/multiselect';
import ActivityLabel from '../ActivityLabel.vue';
import MoodleActivity from '@/components/ui/MoodleActivity.vue';
// Accessing course store
const course = useCourseStore();

// Defining props for the component
const props = defineProps({
    weekIndex: Number,
    activity: Object,
    activityIndex: Number,
});

// Function to get random activities
function getRandomActivities(array, maxNumberOfItems) {
    const newArray = [...array];
    const shuffledArray = newArray.sort(() => 0.5 - Math.random());
    const numberOfItems = Math.floor(Math.random() * Math.min(maxNumberOfItems, newArray.length)) + 1;
    return shuffledArray.slice(0, numberOfItems);
}

// Suggest 3 random Moodle activities
const suggestMoodleActivities = ref(getRandomActivities(course.moodleActivities, 3));

// Function to remove suggested activities from the list of all activities
function removeSuggestedActivities(array1, array2) {
    const set2 = new Set(array2);
    return array1.filter(item => !set2.has(item));
}

// Reactive activities array
const activities = course.moodleActivities;


// Additional activities excluding the suggested ones
const additionalActivities = computed(() => removeSuggestedActivities(course.moodleActivities, suggestMoodleActivities.value));

</script>

<template>
    <div class="flex flex-col">
        <ActivityLabel label="Moodle Activities" targetId="select-moodle-activities">
            <MultiSelect v-model="activity.selectedMoodle" :options="course.moodleActivities" optionLabel="name" filter
                placeholder="Select Moodle Activities" :maxSelectedLabels="3" inputId="select-moodle-activities" />
        </ActivityLabel>
        <div class="py-5 w-max flex flex-col gap-2">
            <Draggable v-model="activity.selectedMoodle" :animation="200" item-key="name">
                <template #item="{ element }">
                    <MoodleActivity :activity="activity" :moodle-activity="element" />
                </template>
            </Draggable>
        </div>
    </div>
</template>
