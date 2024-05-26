import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { slugify } from '@/utils/utils';

export const useCourseStore = defineStore('course', () => {
  const title = ref('');
  const weeks = ref([]);
  

// Define the learning outcomes and assessments
const learningOutcomes = ref([
  { label: "Outcome 1", value: "outcome1" },
  { label: "Outcome 2", value: "outcome2" },
  { label: "Outcome 3", value: "outcome3" }
]);

const assessments = ref([
  { label: "Assessment 1", value: "assessment1" },
  { label: "Assessment 2", value: "assessment2" },
  { label: "Assessment 3", value: "assessment3" }
]);

// Combine the arrays into alignmentOptions with correct structure
const alignmentOptions = computed(() => [
  { group: 'Learning Outcomes', items: learningOutcomes.value },
  { group: 'Assessments', items: assessments.value }
]);




  // set Activity Types here
  const activityTypes = ref(["Acquisition", "Collaboration", "Discussion", "Investigation", "Practice", "Production"]);
  const activityColors = ref(["#da3732", "#e1903e", "#e3b645", "#b5cb53", "#3173b6", "#2b3a8b"])
  
  
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
        // Assuming activity.selectedActivityTypes is an array of types
        for (const type of activity.selectedActivityTypes) {
          if (activityTypeCounts[type] !== undefined) {
            activityTypeCounts[type]++;
          }
        }
      }
    }
  
    // Calculate the total number of activities considering multiple types per activity
    const totalTypeOccurrences = Object.values(activityTypeCounts).reduce((sum, count) => sum + count, 0);
  
    // Calculate the percentage of each activity type
    const percentages = activityTypes.value.map(type => {
      const count = activityTypeCounts[type] || 0;
      const percentage = (count / totalTypeOccurrences) * 100;
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

// Calculate the percentage of each type of activity for each week
const activityTypePercentagesPerWeek = computed(() => {
  // Check if activityTypes and weeks have valid data
  if (!activityTypes.value || !weeks.value || activityTypes.value.length === 0 || weeks.value.length === 0) {
    return [];
  }

  return weeks.value.map(week => {
    const activityTypeCounts = {};

    // Initialize counts for each activity type to 0
    for (const type of activityTypes.value) {
      activityTypeCounts[type] = 0;
    }

    // Count the occurrences of each activity type in the current week
    for (const activity of week.activities) {
      // Check if selectedActivityTypes array is defined and not empty
      if (activity.selectedActivityTypes && Array.isArray(activity.selectedActivityTypes) && activity.selectedActivityTypes.length > 0) {
        for (const type of activity.selectedActivityTypes) {
          if (activityTypeCounts[type] !== undefined) {
            activityTypeCounts[type]++;
          }
        }
      }
    }

    // Calculate the total number of type occurrences in the current week
    const totalWeekTypeOccurrences = Object.values(activityTypeCounts).reduce((sum, count) => sum + count, 0);

    // Calculate the percentage of each activity type for the current week
    const percentages = activityTypes.value.map(type => {
      const count = activityTypeCounts[type] || 0;
      const percentage = totalWeekTypeOccurrences > 0 ? (count / totalWeekTypeOccurrences) * 100 : 0;
      return Number(percentage.toFixed(2));
    });

    return {
      weekTitle: week.title,
      percentages: percentages
    };
  });
});



const getWeekTypeByIndex = (index) => {
  const week = weeks.value[index] || null;
  if (week) {
    const activityTypeCounts = {};

    // Initialize counts for each activity type to 0
    for (const type of activityTypes.value) {
      activityTypeCounts[type] = 0;
    }

    // Count the occurrences of each activity type in the current week
    for (const activity of week.activities) {
      // Check if selectedActivityTypes array is defined and not empty
      if (activity.selectedActivityTypes && Array.isArray(activity.selectedActivityTypes) && activity.selectedActivityTypes.length > 0) {
        for (const type of activity.selectedActivityTypes) {
          if (activityTypeCounts[type] !== undefined) {
            activityTypeCounts[type]++;
          }
        }
      }
    }

    // Calculate the total number of type occurrences in the current week
    const totalWeekTypeOccurrences = Object.values(activityTypeCounts).reduce((sum, count) => sum + count, 0);

    // Calculate the percentage of each activity type for the current week
    const percentages = activityTypes.value.map(type => {
      const count = activityTypeCounts[type] || 0;
      const percentage = totalWeekTypeOccurrences > 0 ? (count / totalWeekTypeOccurrences) * 100 : 0;
      return Number(percentage.toFixed(2));
    });

    return {
      ...week,
      activityTypePercentages: percentages
    };
  }
  return null;
};

  
  return {
    title,
    slug,
    weeks,
    alignmentOptions,
    learningOutcomes,
    assessments,
    activityTypes,
    activityColors,
    numberOfWeeks,
    totalActivities,
    weekNames,
    activitiesPerWeek,
    activityTypePercentagesPerWeek,
    activityTypePercentages,
    maxStudentsInActivity,
    maxMinsInActivity,
    getWeekTypeByIndex
  };
});
