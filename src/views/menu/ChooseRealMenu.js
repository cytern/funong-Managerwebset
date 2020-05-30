const farmerManager = {
  path: `/manager/farmerManager`,
  title: '农户管理',
  icon: 'leaf'
}

const GoodManager = {
  path: `/manager/GoodManager`,
  title: '商品管理',
  icon: 'shopping-basket'
}

const OrderManager = {
  path: `/manager/OrderManager`,
  title: '订单管理',
  icon: 'handshake-o'
}

const RepresentManager = {
  path: `/manager/RepresentManager`,
  title: '代表管理',
  icon: 'android'
}

const RootManager = {
  path: `/manager/RootManager`,
  title: 'root管理',
  icon: 'user-secret'
}

const ManagerManager = {
  path: `/manager/ManagerManager`,
  title: '负责人管理',
  icon: 'gears'
}

const DataView = {
  path: `/manager/DataView`,
  title: '销量统计',
  icon: 'support'
}
import store from '@/store/index'
function getRealMenu () {
  let root = [{
  path: '/manager',
  title: 'root菜单',
  icon: 'star',
  children: [
    farmerManager,
    GoodManager,
    ManagerManager,
    RootManager,
    RepresentManager,
    OrderManager,
    DataView
  ]
}]
  let represent = [{
    path: '/manager',
    title: '代表菜单',
    icon: 'star',
    children: [
      farmerManager,
      GoodManager,
      OrderManager,
      DataView
    ]
  }]
  let manager = [{
    path: '/manager',
    title: '负责人菜单',
    icon: 'star',
    children: [
      farmerManager,
      GoodManager,
      OrderManager,
      RepresentManager,
      DataView
    ]
  }]
  if (store.state.type === "root") {
    return root
  } else if (store.state.type === "represent") {
    return represent
  } else if (store.state.type == "manager") {
    return manager
  }

}
export function getSideMenu () {
return getRealMenu()
}
