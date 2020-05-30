import apiBook from '@/views/netWork/apiBook'
import { axiosPostJson } from '@/views/netWork/axiosAll'

export function addOrder (backOrder) {
  let url = apiBook.baseUrl + apiBook.order.addOrder
  return axiosPostJson(url, backOrder)
}

export function getAllOrder (backTypeIndex) {
  let url = apiBook.baseUrl + apiBook.order.getOrderList
  return axiosPostJson(url,backTypeIndex)
}

export function deleteOrder (order) {
  let url =apiBook.baseUrl + apiBook.order.deleteOrder
  return axiosPostJson(url,order)
}

export function updateOrder (order) {
  let url = apiBook.baseUrl + apiBook.order.updateOrder
  return axiosPostJson(url,order)

}
