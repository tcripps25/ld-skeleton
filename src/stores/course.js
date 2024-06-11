import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { slugify } from '@/utils/utils'
import Week from '@/classes/Week.js'

export const useCourseStore = defineStore('course', () => {
  // Reactive state
  const title = ref('Contemporary Issues In Cyber Security')
  const weeks = ref([])
  const startDate = ref(new Date())

  function updateWeeks(newWeeks) {
    weeks.value = newWeeks
  }

  // Learning outcomes and assessments
  const learningOutcomes = ref([
    {
      label: 'Formulate a plan to synthesise academic sources and relevant cultural texts.',
      value: 'outcome1'
    },
    {
      label: 'Synthesise literature about food and culture from a range of relevant sources.',
      value: 'outcome2'
    },
    {
      label: 'Critically analyse specific examples to evaluate more general arguments about food.',
      value: 'outcome3'
    },
    {
      label:
        'Critically assess the relationship(s) between food and other facets of contemporary society.',
      value: 'outcome4'
    }
  ])

  const assessments = ref([
    { label: 'Assessment 1', value: 'assessment1', nickname: '' },
    { label: 'Assessment 2', value: 'assessment2', nickname: '' },
    { label: 'Assessment 3', value: 'assessment3', nickname: '' }
  ])

  const moodleActivities = ref([
    { name: 'Book', value: 'book', image: '#' },
    { name: 'Quiz', value: 'quiz', image: '#' },
    { name: 'Wiseflow', value: 'wiseflow', image: '#' },
    { name: 'Chat', value: 'chat', image: '#' },
    { name: 'Forum', value: 'forum', image: '#' },
    { name: 'Lesson', value: 'lesson', image: '#' },
    { name: 'Choice', value: 'choice', image: '#' },
    { name: 'Database', value: 'database', image: '#' },
    { name: 'Feedback', value: 'feedback', image: '#' },
    { name: 'Glossary', value: 'glossary', image: '#' },
    { name: 'Wiki', value: 'wiki', image: '#' },
    { name: 'Workshop', value: 'workshop', image: '#' },
    { name: 'Reading List', value: 'reading-list', image: '#' }
  ])

  // Alignment options combining learning outcomes and assessments
  const alignmentOptions = computed(() => [
    { group: 'Learning Outcomes', items: learningOutcomes.value },
    { group: 'Assessments', items: assessments.value }
  ])

  // Activity types with their corresponding colors
  const activityTypesColors = ref([
    { type: 'Acquisition', color: '#da3732' },
    { type: 'Collaboration', color: '#e1903e' },
    { type: 'Discussion', color: '#e3b645' },
    { type: 'Investigation', color: '#b5cb53' },
    { type: 'Practice', color: '#3173b6' },
    { type: 'Production', color: '#2b3a8b' }
  ])

  const getColorByLabel = (type) => {
    const activityType = activityTypesColors.value.find((activity) => activity.type === type)
    return activityType ? activityType.color : null
  }

  const activityTypes = computed(() => activityTypesColors.value.map((activity) => activity.type))

  const activityColors = computed(() => activityTypesColors.value.map((activity) => activity.color))

  // Compute slug dynamically from title
  const slug = computed(() => slugify(title.value))

  // Get the count of weeks as a computed property
  const numberOfWeeks = computed(() => weeks.value.length)

  // Compute the total number of activities in the course
  const totalActivities = computed(() => {
    let count = 0
    for (const week of weeks.value) {
      count += week.activities.length
    }
    return count
  })

  // Get an array of all the names of the weeks
  const weekNames = computed(() => weeks.value.map((week) => week.name))

  // Get the number of activities each week in an array
  const activitiesPerWeek = computed(() => weeks.value.map((week) => week.activities.length))

  // Compute the largest number of students in any activity
  const maxStudentsInActivity = computed(() => {
    let maxStudents = 0
    for (const week of weeks.value) {
      for (const activity of week.activities) {
        if (activity.students > maxStudents) {
          maxStudents = activity.students
        }
      }
    }
    return maxStudents
  })

  // Compute the largest number of minutes in any activity
  const maxMinsInActivity = computed(() => {
    let maxMins = 0
    for (const week of weeks.value) {
      for (const activity of week.activities) {
        if (activity.minutes > maxMins) {
          maxMins = activity.minutes
        }
      }
    }
    return maxMins
  })

  const activityTypeCount = computed(() => {
    const activityTypeCounts = {}

    // Initialize counts for each activity type to 0
    for (const type of activityTypes.value) {
      activityTypeCounts[type] = 0
    }

    // Count the occurrences of each activity type
    for (const week of weeks.value) {
      for (const activity of week.activities) {
        // Check if selectedActivityTypes is defined
        if (activity.selectedActivityTypes) {
          for (const type of activity.selectedActivityTypes) {
            if (activityTypeCounts[type] !== undefined) {
              activityTypeCounts[type]++
            }
          }
        }
      }
    }

    // Return the counts of each activity type as an array
    const countsArray = activityTypes.value.map((type) => {
      return activityTypeCounts[type] || 0
    })

    return countsArray
  })

  const activityTypePercentages = computed(() => {
    const activityTypeCounts = {}

    // Initialize counts for each activity type to 0
    for (const type of activityTypes.value) {
      activityTypeCounts[type] = 0
    }

    // Count the occurrences of each activity type
    for (const week of weeks.value) {
      for (const activity of week.activities) {
        // Check if selectedActivityTypes is defined
        if (activity.selectedActivityTypes) {
          for (const type of activity.selectedActivityTypes) {
            if (activityTypeCounts[type] !== undefined) {
              activityTypeCounts[type]++
            }
          }
        }
      }
    }

    // Calculate the total number of activities considering multiple types per activity
    const totalTypeOccurrences = Object.values(activityTypeCounts).reduce(
      (sum, count) => sum + count,
      0
    )

    // Calculate the percentage of each activity type
    const percentages = activityTypes.value.map((type) => {
      const count = activityTypeCounts[type] || 0
      const percentage = (count / totalTypeOccurrences) * 100 || 0
      return Number(percentage.toFixed(2))
    })

    return percentages
  })

  const activityTypePercentagesPerWeek = computed(() => {
    const percentagesPerWeek = weeks.value.map((week) => {
      const activityTypeCounts = {}
      // Initialize counts for each activity type to 0
      for (const type of activityTypes.value) {
        activityTypeCounts[type] = 0
      }
      // Count the occurrences of each activity type in the current week
      for (const activity of week.activities) {
        // Check if selectedActivityTypes is defined
        if (activity.selectedActivityTypes) {
          for (const type of activityTypes.value) {
            if (activity.selectedActivityTypes.includes(type)) {
              activityTypeCounts[type]++
            }
          }
        }
      }
      // Calculate the total number of activities considering multiple types per activity
      const totalTypeOccurrences = Object.values(activityTypeCounts).reduce(
        (sum, count) => sum + count,
        0
      )
      // Calculate the percentage of each activity type for the current week
      const percentages = activityTypes.value.map((type) => {
        const count = activityTypeCounts[type] || 0
        const percentage = (count / totalTypeOccurrences) * 100 || 0
        return Number(percentage.toFixed(2))
      })
      return percentages
    })
    return percentagesPerWeek
  })

  const getActivityTypePercentagesForWeek = (weekIndex) => {
    if (weekIndex >= 0 && weekIndex < weeks.value.length) {
      const week = weeks.value[weekIndex]
      const activityTypeCounts = {}

      // Initialize counts for each activity type to 0
      for (const type of activityTypes.value) {
        activityTypeCounts[type] = 0
      }

      // Count the occurrences of each activity type in the specified week
      for (const activity of week.activities) {
        // Check if selectedActivityTypes is defined
        if (activity.selectedActivityTypes) {
          for (const type of activityTypes.value) {
            if (activity.selectedActivityTypes.includes(type)) {
              activityTypeCounts[type]++
            }
          }
        }
      }

      // Calculate the total number of activities considering multiple types per activity
      const totalTypeOccurrences = Object.values(activityTypeCounts).reduce(
        (sum, count) => sum + count,
        0
      )

      // Calculate the percentage of each activity type for the specified week
      const percentages = activityTypes.value.map((type) => {
        const count = activityTypeCounts[type] || 0
        const percentage = (count / totalTypeOccurrences) * 100 || 0
        return Number(percentage.toFixed(2))
      })
      return percentages
    } else {
      return []
    }
  }

  // Store actions
  const incrementWeek = (name, description, activities) => {
    const tempName = 'New Week'
    const tempDescription = 'Describe this week.'
    const tempActivities = []

    const newWeek = new Week(tempName, tempDescription, startDate, tempActivities)
    weeks.value.push(newWeek)
  }

  const addWeek = (week) => {
    weeks.value.push(week)
  }

  return {
    title,
    startDate,
    slug,
    weeks,
    alignmentOptions,
    learningOutcomes,
    assessments,
    activityTypes,
    activityColors,
    activityTypesColors,
    numberOfWeeks,
    totalActivities,
    weekNames,
    activitiesPerWeek,
    activityTypePercentagesPerWeek,
    activityTypePercentages,
    maxStudentsInActivity,
    maxMinsInActivity,
    getActivityTypePercentagesForWeek,
    getColorByLabel,
    activityTypeCount,
    incrementWeek,
    addWeek,
    moodleActivities,
    updateWeeks
  }
})
