import type { UserInfo } from '@/types/user'
import type { AxiosResponse } from 'axios'
declare module '@/api/user' {
  interface RegisterData {
    username: string
    password: string
    repassword: string
  }

  interface LoginData {
    username: string
    password: string
  }

  interface ApiResponse<T> {
    data: T
    status: number
    message: string
  }

  export function userRegisterService(data: RegisterData): Promise<unknown>
  export function userLoginService(data: LoginData): Promise<unknown>
  export function userGetInfoService(): Promise<
    AxiosResponse<ApiResponse<UserInfo>>
  >
}
