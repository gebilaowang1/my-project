import axios from 'axios'

export function request (config) {
  // 创建axios的实例
  const instance = axios.create({
    baseURL: 'http://172.16.10.16:8089/api/'
  })

  // axios拦截器
  // 请求拦截的作用
  instance.interceptors.request.use(
    config => {
      config.headers.token = window.sessionStorage.getItem('token')
      return config
    }
  )
 
  return instance(config)
}
