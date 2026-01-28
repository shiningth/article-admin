import Axios, {
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from 'axios'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth-store.ts'

const axios: AxiosInstance = Axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 60000,
})

axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { auth } = useAuthStore.getState()
    const accessToken = auth.accessToken
    if (accessToken) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: AxiosError) => {
    toast.error('服务器异常')
    return Promise.reject(error)
  }
)

export default axios
