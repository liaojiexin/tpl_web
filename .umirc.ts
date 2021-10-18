import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',

      routes: [
        { path: '/login', component: '@/pages/user/login' },
        // {

        //   path: '/user',
        //   exact:false,
        //   component: '@/layout/blankLayout',
        //   routes: [
        //     { path: '/user/login',  component: '@/pages/user/login' },
        //     { path: '/user/index', component: '@/pages/home' },

        //   ],
        // },
        {
          path: '/',
          component: '@/layout/basicLayout',
          routes: [
            { path: '/', redirect: '/index' },
            { path: '/index', component: '@/pages/index' },
            { path: '/test', component: '@/pages/test' },
          ],
        },
      ],
    },

    // {
    //   component: '@/pages/404',
    // },
  ],
  fastRefresh: {},
});
