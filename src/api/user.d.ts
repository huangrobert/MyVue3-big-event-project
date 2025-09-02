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
  export function userUpdateInfoService(data: {
    nickname: string
    email: string
    id: number
  }): Promise<unknown>

  export function userUpdateAvatarService(avatar: string): Promise<unknown>
  export function userUpdatePasswordService(data: {
    old_pwd: string
    new_pwd: string
    re_pwd: string
  }): Promise<unknown>
}
