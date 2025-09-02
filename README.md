# MyVue3-big-event-project

基于 **Vue 3 + TypeScript + Vite + Pinia + Vue Router + Element Plus** 开发的前端项目，主要实现了文章管理、用户管理等功能。

---

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

---

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking.  
In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

---

## 📂 Project Structure
├── api/ # 接口请求封装
├── assets/ # 静态资源
├── components/ # 公共组件
├── router/ # 路由配置
├── stores/ # Pinia 状态管理
├── types/ # TypeScript 类型定义
├── utils/ # 工具函数
├── views/ # 页面视图
├── App.vue # 根组件
└── main.ts # 项目入口  
---

## ✨ Features

- 用户注册 / 登录 / 注销
- 文章的增删改查
- 分类管理
- Token 本地持久化存储
- Axios 请求拦截 / 响应拦截
- 路由守卫（未登录禁止进入后台）

---

## ⚡ Project Setup

### Install dependencies
```sh
pnpm install

Compile and Hot-Reload for Development
pnpm dev

Type-Check, Compile and Minify for Production
pnpm build
