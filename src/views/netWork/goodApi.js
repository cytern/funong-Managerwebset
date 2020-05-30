import apiBook from '@/views/netWork/apiBook'
import { axiosGet, axiosPostJson } from '@/views/netWork/axiosAll'

export function getGoodList (page) {
  let url = apiBook.baseUrl + apiBook.good.goodListPage + page
  return axiosGet(url)
}

export function getMaxGoodPage () {
  let url = apiBook.baseUrl + apiBook.good.goodMaxPage
  return axiosGet(url)
}

export function getAdviceGoodList () {
  let url = apiBook.baseUrl + apiBook.good.adviceGoodList
  return axiosGet(url)
}

export function addGood (good) {
  let url = apiBook.baseUrl + apiBook.good.addGood
  return axiosPostJson(url, good)
}

export function getGoodType () {
  let url = apiBook.baseUrl + apiBook.good.goodTypeList
  return axiosGet(url)
}

export function getGoodListForType (page, type) {
  let url = apiBook.baseUrl + apiBook.good.goodListForType + page + '/' + type
  return axiosGet(url)
}

export function updateGood (good) {
  let url = apiBook.baseUrl + apiBook.good.updateGood
  return axiosPostJson(url, good)
}

export function deleteGood (goodId) {
  let url = apiBook.baseUrl + apiBook.good.deleteGood + goodId
  return axiosGet(url)
}
