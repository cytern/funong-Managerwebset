import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/manager',
  name: 'manager',
  meta,
  redirect: { name: 'manager-farmerManager' },
  component: layoutHeaderAside,
  children: (pre => [
    { path: 'farmerManager', name: `${pre}farmerManager`, component: _import('pages/manager/farmerManager'), meta: { ...meta, title: '农户管理' } },
    { path: 'GoodManager', name: `${pre}GoodManager`, component: _import('pages/manager/GoodManager'), meta: { ...meta, title: '商品管理' } },
    { path: 'OrderManager', name: `${pre}OrderManager`, component: _import('pages/manager/OrderManager'), meta: { ...meta, title: '订单管理' } },
    { path: 'ManagerManager', name: `${pre}ManagerManager`, component: _import('pages/manager/ManagerManager'), meta: { ...meta, title: '负责人管理' } },
    { path: 'RootManager', name: `${pre}RootManager`, component: _import('pages/manager/RootManager'), meta: { ...meta, title: 'root管理' } },
    { path: 'RepresentManager', name: `${pre}RepresentManager`, component: _import('pages/manager/RepresentManager'), meta: { ...meta, title: '代表管理' } },
    { path: 'DataView', name: `${pre}DataView`, component: _import('pages/manager/DataView'), meta: { ...meta, title: '销量统计' } },
  ])('manager-')
}
