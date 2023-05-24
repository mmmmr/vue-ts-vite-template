import axios, { Method, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse}  from "axios";
import vSession from './vSession'

export interface RequestResponse<T = unknown> {
  data: T,
  code: number,
  msg: string
}

const TIME_OUT = 5000

export class VRequest {
  private r: AxiosInstance
  constructor() {
    this.r = axios.create({
      baseURL: '/api/admin',
      timeout: TIME_OUT
    })

    this.r.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = vSession.get('token')
        if (token) {
          config.headers['Authorization'] = token
        }
        return config
      },
      (e) => {
        return Promise.reject(e)
      }
    )

    this.r.interceptors.response.use(
      (response: AxiosResponse) => {
        if (response.data.code !== 200) {
          const msg:string = response.data.message || '接口报错!'
          throw new Error(msg)
        }
        return response.data
      },
      (e) => {
        return Promise.reject(e)
      }     
    )
  }

  public get<T>(url: string, config?: InternalAxiosRequestConfig): Promise<T> {
    return this.r.get<T>(url, config)
      .then((response: AxiosResponse<T>) => response.data);
  }

  public post<T>(url: string, data?: any, config?: InternalAxiosRequestConfig): Promise<T> {
    return this.r.post<T>(url, data, config)
      .then((response: AxiosResponse<T>) => response.data);
  }
}


export default new VRequest()