import apiBook from '@/views/netWork/apiBook'
import { axiosPost, axiosPostJson } from '@/views/netWork/axiosAll'

export function Login (user) {
  let url = apiBook.baseUrl + apiBook.login
  let arg = {
    userName: user.userName,
    password: user.password
  }
  return axiosPostJson(url, arg)
}
