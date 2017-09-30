import Vue from 'vue'
import Router from 'vue-router'
import Pos from '@/components/page/Pos'
import Hello from '@/components/Hello'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Pos',
      component: Pos
    },
    {
      path: '/Hello',
      name: 'Hello',
      component: Hello
    }
  ]
})
