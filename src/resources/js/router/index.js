import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';

import Register from '../pages/Register.vue';
import Login from '../pages/Login.vue';
import Home from '../pages/Home.vue';

import Admin from '../Admin.vue';
import AdminLogin from '../pages/admin/Login.vue';
import AdminHome from '../pages/admin/Home.vue';
import AdminUsersIndex from '../pages/admin/users/Index.vue';
import AdminUsersEdit from '../pages/admin/users/Edit.vue';
import AdminTodosIndex from '../pages/admin/todos/Index.vue';
import Admins from '../pages/admin/Admins.vue';

const routes = [
  /**
   * ------------------------------ ユーザー ------------------------------
   */
  {
    path: '/register',
    name: 'register',
    component: Register,
    beforeEnter: (to, from, next) => {
      if (store.getters['auth/isLogged']) {
        next('/');
      } else {
        next();
      }
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (store.getters['auth/isLogged']) {
        next('/');
      } else {
        next();
      }
    },
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if (store.getters['auth/isLogged']) {
        next();
      } else {
        next('/login');
      }
    },
  },

  /**
   * ------------------------------ 管理者 ------------------------------
   */
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    children: [
      /** ログイン */
      {
        path: 'login',
        name: 'admin.login',
        component: AdminLogin,
        beforeEnter: (to, from, next) => {
          if (store.getters['admin/isAdmin']) {
            next('/admin/users');
          } else {
            next();
          }
        },
      },
      /** ホーム */
      {
        path: '',
        name: 'admin.home',
        component: AdminHome,
        beforeEnter: (to, from, next) => {
          if (store.getters['admin/isAdmin']) {
            next('/admin/users');
          } else {
            next('/admin/login');
          }
        },
      },
      /** ユーザー */
      {
        path: 'users',
        name: 'admin.users.index',
        component: AdminUsersIndex,
        beforeEnter: (to, from, next) => {
          if (store.getters['admin/isAdmin']) {
            next();
          } else {
            next('/admin/login');
          }
        },
      },
      {
        path: 'users/:id/edit',
        name: 'admin.users.edit',
        component: AdminUsersEdit,
        beforeEnter: (to, from, next) => {
          if (store.getters['admin/isAdmin']) {
            next();
          } else {
            next('/admin/login');
          }
        },
      },
      /** メモ */
      {
        path: 'todos',
        name: 'admin.todos.index',
        component: AdminTodosIndex,
        beforeEnter: (to, from, next) => {
          if (store.getters['admin/isAdmin']) {
            next();
          } else {
            next('/admin/login');
          }
        },
      },
      /** 管理者 */
      {
        path: 'admins',
        name: 'admin.admins',
        component: Admins,
        beforeEnter: (to, from, next) => {
          if (store.getters['admin/isAdmin']) {
            next();
          } else {
            next('/admin/login');
          }
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
