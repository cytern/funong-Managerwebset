import axios from 'axios'
import qs from 'qs'
import store from '@/store/index'
// 返回一个Promise(发送post请求)
// axios.defaults.withCredentials = true
export function axiosPost (url, params) {
  return new Promise((resolve, reject) => {
    let conf = hasToken2()
    axios.post(url, qs.stringify(params), conf)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export function axiosPostJson (url, params) {
  return new Promise((resolve, reject) => {
    let conf = hasToken3()
    axios.post(url, params, conf)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
/// /返回一个Promise(发送get请求)
export function axiosGet (url, param) {
  return new Promise((resolve, reject) => {
    let conf = hasToken()
    axios.get(url, {
      params: param,
      headers: conf.headers,
      withCredentials: true
    })
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
// 返回promise（put）
export function axiosPut (url, params) {
  axios.defaults.withCredentials = true
  return new Promise((resolve, reject) => {
    let conf = hasToken2()
    axios.put(url, qs.stringify(params), conf)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
// 返回promise （delete）

export function axiosDelete (url, param) {
  return new Promise((resolve, reject) => {
    let conf = hasToken()
    axios.delete(url, {
      params: param,
      headers: conf.headers,
      withCredentials: true
    })
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
function hasToken () {
  if (store.state.code != null) {
    let conf = {
      headers: {
        'Content-Type': 'application/json',
        'User-Token': store.state.code
      },
      withCredentials: true
    }
    return conf
  } else {
    let conf = {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    }
    return conf
  }
}
function hasToken2 () {
  if (store.state.code != null) {
    let conf = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Token': store.state.code
      },
      withCredentials: true
    }
    return conf
  } else {
    let conf = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      withCredentials: true
    }
    return conf
  }
}
function hasToken3 () {
  if (store.state.code != null) {
    let conf = {
      headers: {
        'Content-Type': 'application/json',
        'User-Token': store.state.code
      },
      withCredentials: true
    }
    return conf
  } else {
    let conf = {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    }
    return conf
  }
}
