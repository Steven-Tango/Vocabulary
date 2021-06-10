import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import HelloWorld from '@/components/HelloWorld'
import Words from '@/components/Words'
import AddWord from '@/components/AddWord'
import UpdWord from '@/components/UpdWord'

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  routes: [{
    path: '/helloword',
    name: 'HelloWorld',
    component: HelloWorld
  }, {
    path: '/',
    name: 'Words',
    component: Words
  }, {
    path: '/addword',
    name: 'AddWord',
    component: AddWord
  },{
    path: '/updWord',
    name: 'UpdWord',
    component: UpdWord
  }]
})
