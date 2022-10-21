import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';

import { createRouter, createWebHistory } from 'vue-router';

// 白名单应该包含基本静态路由
const WHITE_NAME_LIST: string[] = [];
const routes = [{
  path: '/testStore',
  name: 'testStore',
  component: () => import('@/views/TestStore.vue'),
  meta: {
    title: '测试store',
  },
}]
export const router = createRouter({
  // 创建一个 HTML5 历史， 如果想创建hash历史记录，使用createWebHashHistory创建
  history: createWebHistory('/'),
  routes: routes as unknown as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

// reset router
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

// config router
export function setupRouter(app: App<Element>) {
  app.use(router);
}
