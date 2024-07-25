import { createRouter, createWebHistory } from 'vue-router'
import VisualiseView from '@/views/VisualiseView.vue'
import DesignView from '@/views/DesignView.vue'
import SetupView from '@/views/SetUpView.vue'
import SingleWeek from '@/components/SingleWeek.vue'
import SingleActivity from '@/components/SingleActivity.vue'
import { useCourseStore } from '@/stores/course.js'
import PublishView from '@/views/PublishView.vue'
import ActivityPlaceholder from '@/components/ActivityPlaceholder.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'setup',
      component: SetupView
    },
    {
      path: '/design',
      component: DesignView,
      children: [
        {
          path: 'overview',
          name: 'design-overview',
          component: DesignView
        },
        {
          path: ':index',
          name: 'week-detail',
          component: SingleWeek,
          props: (route) => {
            const course = useCourseStore()
            const index = parseInt(route.params.index)
            const week = course.weeks[index]
            return { index, week }
          },
          children: [
            {
              path: ':activityIndex',
              name: 'activity-detail',
              component: SingleActivity,
              props: (route) => {
                const course = useCourseStore()
                const activityIndex = parseInt(route.params.activityIndex)
                const weekIndex = parseInt(route.params.index) // get index from parent route params
                const activity = course.weeks[weekIndex].activities[activityIndex]
                return { weekIndex, activityIndex, activity }
              }
            },
            { path: '', component: ActivityPlaceholder,
              props: (route) => {
                const course = useCourseStore()
                const weekIndex = parseInt(route.params.index) // get index from parent route params
                const activities = course.weeks[weekIndex].activities
                return { activities }
              }
             },
          ]
        }
      ]
    },
    {
      path: '/visualise',
      name: 'visualise',
      component: VisualiseView
    },
    {
      path: '/publish',
      name: 'publish',
      component: PublishView
    }
  ]
})

export default router
