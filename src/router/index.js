import { createRouter, createWebHistory } from 'vue-router'
import VisualiseView from '@/views/VisualiseView.vue'
import DesignView from '@/views/DesignView.vue'
import SetupView from '@/views/SetUpView.vue'
import SingleWeek from '@/components/SingleWeek.vue'

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
      name: 'design',
      component: DesignView,
      children: [
        {
          path: ':week', 
          component: SingleWeek
        }
      ]
    },
    {
      path: '/visualise',
      name: 'visualise',
      component: VisualiseView
    }
  ]
})

export default router
