// import AxiosBase from './axios/AxiosBase'
// import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

// const ApiService = {
//     fetchDataWithAxios<Response = unknown, Request = Record<string, unknown>>(
//         param: AxiosRequestConfig<Request>,
//     ) {
     

//         return new Promise<Response>((resolve, reject) => {
//             AxiosBase(param)
//                 .then((response: AxiosResponse<Response>) => {
//                     console.log(param,"param==")
//                     resolve(response.data)
//                 })
//                 .catch((errors: AxiosError) => {
//                     reject(errors)
//                 })
//         })
//     },
// }

// export default ApiService

// ApiService.ts

import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import AxiosBase from './axios/AxiosBase'

const ApiService = {
  fetchDataWithAxios<Response = unknown, Request = Record<string, unknown>>(
    param: AxiosRequestConfig<Request>,
    baseURL?: string 
  ) {
    return new Promise<Response>((resolve, reject) => {
     
      if (baseURL) {
        param.baseURL = baseURL
      }

      AxiosBase(param)
        .then((response: AxiosResponse<Response>) => {
    
          resolve(response.data)
        })
        .catch((errors: AxiosError) => {
          reject(errors)
        })
    })
  },
}

export default ApiService

