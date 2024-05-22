import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCourseStore = defineStore('course', () => {
  const title = ref('');
  const weeks = ref([]);

  // Get the count of weeks as a computed property
  const numberOfWeeks = computed(() => weeks.value.length);

  // Compute the total number of activities in the course
  const totalActivities = computed(() => {
    let count = 0;
    for (const week of weeks.value) {
      count += week.activities.length;
    }
    return count;
  });

  // Get an array of all the names of the weeks
  const weekNames = computed(() => {
    return weeks.value.map(week => week.title);
  });

  // Get the number of activities each week in an array
  const activitiesPerWeek = computed(() => {
    return weeks.value.map(week => week.activities.length);
  });

  return { weeks, totalActivities, numberOfWeeks, weekNames, activitiesPerWeek }
});
