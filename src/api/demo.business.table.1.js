import request from '@/plugin/axios'

export function businessTable1List (params) {
  return request({
    url: '/demo/business/table/1/fetch',
    method: 'get',
    params
  })
}
