import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)

export default pinia

// export { useUserStore, type userStore } from './modules/user'
// export { useCounterStore, type counterStore } from './modules/counter'
export * from './modules/user'
export * from './modules/counter'
