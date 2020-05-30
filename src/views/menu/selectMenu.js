
import store from '@/store/index'

export  function getMenu() {
  let manager = {
    path: '/manager',
    title: '管理',
    icon: 'star',
    children: (pre => [
      {
        path: `${pre}farmerManager`,
        title: '农户管理',
        icon: 'leaf'
      },
      {
        path: `${pre}GoodManager`,
        title: '商品管理',
        icon: 'shopping-basket'
      },
      {
        path: `${pre}OrderManager`,
        title: '订单管理',
        icon: 'handshake-o'
      },
      {
        path: `${pre}RepresentManager`,
        title: '代表管理',
        icon: 'android'
      },
      {
        path: `/manager/DataView`,
        title: '销量统计',
        icon: 'support'
      }

    ])('/manager/')
  }
  let root = {
    path: '/manager',
    title: '管理',
    icon: 'star',
    children: (pre => [
      {
        path: `${pre}farmerManager`,
        title: '农户管理',
        icon: 'leaf'
      },
      {
        path: `${pre}GoodManager`,
        title: '商品管理',
        icon: 'shopping-basket'
      },
      {
        path: `${pre}OrderManager`,
        title: '订单管理',
        icon: 'handshake-o'
      },
      {
        path: `${pre}ManagerManager`,
        title: '负责人管理',
        icon: 'gears'
      },
      {
        path: `${pre}RootManager`,
        title: 'root管理',
        icon: 'user-secret'
      },
      {
        path: `${pre}RepresentManager`,
        title: '代表管理',
        icon: 'android'
      },
      {
        path: `/manager/DataView`,
        title: '销量统计',
        icon: 'support'
      }
    ])('/manager/')
  }

  let represent = {
    path: '/manager',
    title: '管理',
    icon: 'star',
    children: (pre => [
      {
        path: `${pre}farmerManager`,
        title: '农户管理',
        icon: 'leaf'
      },
      {
        path: `${pre}GoodManager`,
        title: '商品管理',
        icon: 'shopping-basket'
      },
      {
        path: `${pre}OrderManager`,
        title: '订单管理',
        icon: 'handshake-o'
      },
      {
        path: `/manager/DataView`,
        title: '销量统计',
        icon: 'support'
      }
    ])('/manager/')
  }
  if (store.state.type === "root") {
    return root
  } else if (store.state.type === "represent") {
    return represent
  } else if (store.state.type == "manager") {
    return manager
  }
}
