export default {
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
    }
  ])('/manager/')
}
