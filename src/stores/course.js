import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { slugify } from '@/utils/utils';

export const useCourseStore = defineStore('course', () => {
  const title = ref('');
  const weeks = ref([]);
  const activityTypes = ref(["Read Watch Listen", "Collaborate", "Investigate", "Discuss", "Practice", "Produce"]);
// Compute slug dynamically from title
const slug = computed(() => slugify(title.value));


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
  const weekNames = computed(() => weeks.value.map(week => week.title));

  // Get the number of activities each week in an array
  const activitiesPerWeek = computed(() => weeks.value.map(week => week.activities.length));

  // Calculate the percentage of each type of activity for the whole course
  const activityTypePercentages = computed(() => {
    const activityTypeCounts = {};

    // Initialize counts for each activity type to 0
    for (const type of activityTypes.value) {
      activityTypeCounts[type] = 0;
    }

    // Count the occurrences of each activity type
    for (const week of weeks.value) {
      for (const activity of week.activities) {
        const type = activity.activityType;
        if (activityTypeCounts[type] !== undefined) {
          activityTypeCounts[type]++;
        }
      }
    }

    // Calculate the percentage of each activity type
    const percentages = activityTypes.value.map(type => {
      const count = activityTypeCounts[type] || 0;
      const percentage = (count / totalActivities.value) * 100;
      return Number(percentage.toFixed(2));
    });

    return percentages;
  });

  // Compute the largest number of students in any activity
  const maxStudentsInActivity = computed(() => {
    let maxStudents = 0;

    for (const week of weeks.value) {
      for (const activity of week.activities) {
        if (activity.students > maxStudents) {
          maxStudents = activity.students;
        }
      }
    }

    return maxStudents;
  });

  // Compute the largest number of mins in any activity
  const maxMinsInActivity = computed(() => {
    let maxMins = 0;

    for (const week of weeks.value) {
      for (const activity of week.activities) {
        if (activity.minutes > maxMins) {
          maxMins = activity.minutes;
        }
      }
    }

    return maxMins;
  });

  return {
    title,
    slug,
    weeks,
    activityTypes,
    numberOfWeeks,
    totalActivities,
    weekNames,
    activitiesPerWeek,
    activityTypePercentages,
    maxStudentsInActivity,
    maxMinsInActivity
  };
});
