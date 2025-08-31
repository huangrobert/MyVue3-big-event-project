import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService } from '@/api/user'
import type { UserInfo } from '@/types/user'
export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('')
    const setToken = (newValue: string) => {
      token.value = newValue
    }
    const removeToken = () => {
      token.value = ''
    }
    const user = ref<UserInfo>({
      id: 0,
      username: '',
      nickname: '',
      email: '',
      user_pic: null
    })
    const setUser = (obj) => {
      user.value = obj
    }
    const getUser = async () => {
      const res = await userGetInfoService()
      user.value = res.data.data
    }
    return {
      token,
      setToken,
      removeToken,
      user,
      getUser,
      setUser
    }
  },
  {
    persist: true
  }
)
export type userStore = ReturnType<typeof useUserStore>
