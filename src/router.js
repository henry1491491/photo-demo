import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('./views/TheHome.vue'),
      children: [
        {
          path: '',
          name: 'TheAlbum',
          component: () => import('./views/TheAlbum.vue')
        },
        {
          path: 'list',
          name: 'TheAlbumList',
          component: () => import('./views/TheAlbumList.vue')
        },
        {
          path: 'set/:setId',
          name: 'TheAlbumSet',
          component: () => import('./views/TheAlbumSet.vue')
        },
        {
          path: 'photo/:photoId',
          name: 'TheAlbumPhoto',
          component: () => import('./views/TheAlbumPhoto.vue')
        }
      ]
    }
  ]
})
