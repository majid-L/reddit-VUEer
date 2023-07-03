import { createRouter, createWebHistory } from 'vue-router';
import UserView from '@/views/UserView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/search/:username?',
      name: 'user',
      component: UserView
    },
    {
      path: '/:sortBy?',
      name: 'popular',
      component: () => import('../views/PopularThreadsView.vue')
    },
    {
      path: '/r/:subreddit',
      name: 'subreddit',
      component: () => import('../views/SubredditView.vue')
    },
    {
      path: '/r/:subreddit/comments/:threadId/:threadTitle',
      name: 'thread',
      component: () => import('../views/SingleThreadView.vue')
    }
  ]
})

export default router
