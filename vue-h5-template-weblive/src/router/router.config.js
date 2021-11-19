/**
 * 基础路由
 * @type { *[] }
 */
 
 //import login from '@/views/login'
export const constantRouterMap = [
  {
    // path: '/',
    // component: () => import('@/views/layouts/index'),
    // redirect: '/home',
    // meta: {
    //   title: '首页',
    //   keepAlive: false
    // },
    // children: [
    //   {
    //     path: '/home',
    //     name: 'Home',
    //     component: () => import('@/views/home/index'),
    //     meta: { title: '首页', keepAlive: false }
     // },
      // {
      //   path: '/about',
      //   name: 'About',
      //   component: () => import('@/views/home/about'),
      //   meta: { title: '关于我', keepAlive: false }
      // }
  //   ]
  path: '/',
  //name: 'login',
  component: () => import('@/views/login'),
  meta: { title: '登录', keepAlive: false }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register/register'),
    meta: { title: '选择注册', keepAlive: false }
  },
  {
    path: '/comRegister',
    name: 'comRegister',
    component: () => import('@/views/register/comRegister'),
    meta: { title: '注册', keepAlive: false }
  },
  {
    path: '/personReg',
    name: 'personReg',
    component: () => import('@/views/register/personReg'),
    meta: { title: '个人注册', keepAlive: false }
  },
  {
    path: '/companyReg',
    name: 'companyReg',
    component: () => import('@/views/register/companyReg'),
    meta: { title: '企业注册', keepAlive: false }
  },
  {
    path: '/userCompany',
    name: 'userCompany',
    component: () => import('@/views/user/userCompany'),
    meta: { title: '我的企业', keepAlive: false }
  },
  {
    path: '/postPosition',
    name: 'postPosition',
    component: () => import('@/views/user/postPosition'),
    meta: { title: '职位发布', keepAlive: false }
  },
]
