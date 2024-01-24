import Layout from '@/layout/index.vue';

// 固定路由
const constantRoute = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
      hidden: true,
    },
  },
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/home',
    meta: {
      title: '布局',
      icon: 'House',
    },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('../views/home/index.vue'),
        meta: {
          title: '主页1',
          icon: 'Service',
        },
      },
    ],
  },
  {
    path: '/screen',
    name: 'Screen',
    component: () => import('@/views/screen/index.vue'),
    meta: {
      title: '数据大屏',
      icon: 'Platform',
    },
  },
  {
    path: '/acl',
    name: 'Acl',
    component: Layout,
    meta: {
      title: '权限管理',
      icon: 'Lock',
    },
    children: [
      {
        path: 'user',
        name: 'AclUser',
        component: () => import('@/views/acl/user/index.vue'),
        meta: {
          title: '用户管理',
          icon: 'User',
        },
      },
      {
        path: 'role',
        name: 'AclRole',
        component: () => import('@/views/acl/role/index.vue'),
        meta: {
          title: '角色管理',
          icon: 'UserFilled',
        },
      },
      {
        path: 'permission',
        name: 'AclPermission',
        component: () => import('@/views/acl/permission/index.vue'),
        meta: {
          title: '菜单管理',
          icon: 'Monitor',
        },
      },
    ],
  },
  {
    path: '/product',
    name: 'Product',
    component: Layout,
    meta: {
      title: '商品管理',
      icon: 'Goods',
    },
    children: [
      {
        path: 'trademark',
        name: 'ProductTrademark',
        component: () => import('@/views/product/trademark/index.vue'),
        meta: {
          title: '品牌管理',
          icon: 'ShoppingCartFull',
        },
      },
      {
        path: 'attr',
        name: 'ProductAttr',
        component: () => import('@/views/product/attr/index.vue'),
        meta: {
          title: '属性管理',
          icon: 'ChromeFilled',
        },
      },
      {
        path: 'sku',
        name: 'ProductSku',
        component: () => import('@/views/product/sku/index.vue'),
        meta: {
          title: 'SKU管理',
          icon: 'Calendar',
        },
      },
      {
        path: 'spu',
        name: 'ProductSpu',
        component: () => import('@/views/product/spu/index.vue'),
        meta: {
          title: 'SPU管理',
          icon: 'Orange',
        },
      },
    ],
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: '404',
      hidden: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Any',
    redirect: '/404',
    meta: {
      title: 'any',
      hidden: true,
    },
  },
];

export { constantRoute };
