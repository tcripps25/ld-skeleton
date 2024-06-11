import { createRouter, createWebHistory } from 'vue-router'
import VisualiseView from '@/views/VisualiseView.vue'
import DesignView from '@/views/DesignView.vue'
import SetupView from '@/views/SetUpView.vue'
import SingleWeek from '@/components/SingleWeek.vue'
import { useCourseStore } from '@/stores/course.js'
import PublishView from '@/views/PublishView.vue'

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
          }
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
