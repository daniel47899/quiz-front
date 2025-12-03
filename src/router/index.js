import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },

    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },

    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: { requiresAuth: true }
    },
        {
      path: '/quiz',
      name: 'quiz',
      component: () => import('../views/QuizView.vue'),
      meta: { requiresAuth: true }
    },

    {path: '/results',
     name: 'results',
     component: () => import('../views/ResultsView.vue'),
     meta: { requiresAuth: true }
    },

    {path: '/QuizIntroView',
      name: 'QuizIntroView',
      component: () => import('../views/QuizIntroView.vue'),
      meta: { requiresAuth: true }
    },

    {path: '/FinalResultsView',
      name: 'FinalResultsView',
      component: () => import('../views/FinalResultsView.vue'),
      meta: { requiresAuth: true }
    },
  ],
})



router.beforeEach((to) => {
  const token = localStorage.getItem('token')

  
  if (to.meta.requiresAuth && !token) {
    return { name: 'login' }
  }

  
  if ((to.name === 'login' || to.name === 'register') && token) {
    return { name: 'dashboard' }
  }

  return true
})

export default router
