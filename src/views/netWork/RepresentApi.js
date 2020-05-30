import apiBook from '@/views/netWork/apiBook'
import { axiosGet } from '@/views/netWork/axiosAll'

export function getAllRepresent () {
  let url = apiBook.baseUrl + apiBook.represent.getAllRepresent
  return axiosGet(url)
}

export function getDataViewByRepresent (representId) {
 let url = apiBook.baseUrl + apiBook.dataView.representSold + representId
  return axiosGet(url)
}

export function getDataViewByGood (goodId) {
  let url = apiBook.baseUrl + apiBook.dataView.goodSold + goodId
  return axiosGet(url)
}
