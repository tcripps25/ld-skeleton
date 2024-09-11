<script setup>
import { useCourseStore } from '@/stores/course.js'
import { ref, computed } from 'vue';
import Draggable from 'vuedraggable'

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

const items = ref([
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
  { id: 4, name: 'Item 4' },
])

// Additional activities excluding the suggested ones
const additionalActivities = computed(() => removeSuggestedActivities(course.moodleActivities, suggestMoodleActivities.value));

</script>

<template>
  <div class="flex flex-col">
    <Draggable v-model="course.moodleActivities" :animation="200" item-key="id">
        <template #item="{element}">
            <div>{{ element.name }}</div>
        </template>
    </Draggable>
</div>
</template>
