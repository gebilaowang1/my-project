import { request } from './request.js'

export function axiosApiList (url, data, method) {
    return request({
      url: url,
      data: data,
      method: method
    })
}
