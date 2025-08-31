import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('big-count', () => {
  const count = ref(100)
  const add = (n: number) => {
    count.value += n
  }

  return { count, add }
})
export type counterStore = ReturnType<typeof useCounterStore>
