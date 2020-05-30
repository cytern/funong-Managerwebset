import apiBook from '@/views/netWork/apiBook'
import { axiosGet, axiosPostJson } from '@/views/netWork/axiosAll'

export function getAllFarmer () {
  let url = apiBook.baseUrl + apiBook.farmer.getAllFarmer + '0'
  return axiosGet(url)
}

export function getRepresentFarmer (representId) {
  let url = apiBook.baseUrl + apiBook.farmer.getAllFarmer + representId
  return axiosGet(url)
}

export function addFarmer (farmer) {
  let url = apiBook.baseUrl + apiBook.user.addFarmer
  return axiosPostJson(url,farmer)
}

export function  getFarmerDetail (farmerId) {
  let url = apiBook.baseUrl + apiBook.user.getFarmerDetail + farmerId
  return axiosGet(url)
}

export function updateFarmer (farmer) {
  let url = apiBook.baseUrl + apiBook.user.updateFarmer
  return axiosPostJson(url,farmer)
}

export function getAllManager () {
  let url = apiBook.baseUrl + apiBook.manager.getAllManager
  return axiosGet(url)
}

export function getAllRoot () {
  let url = apiBook.baseUrl + apiBook.root.getAllRoot
  return axiosGet(url)

}

export function deleteFarmer (farmerId) {
let url = apiBook.baseUrl + apiBook.farmer.deleteFarmer + farmerId
  return axiosGet(url)
}
