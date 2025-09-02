import request from '@/utils/request'
export const userRegisterService = ({ username, password, repassword }) =>
  request.post('/api/reg', { username, password, repassword })

export const userLoginService = ({ username, password }) =>
  request.post('/api/login', { username, password })

export const userGetInfoService = () => request.get('/my/userinfo')
//更新用户信息
export const userUpdateInfoService = ({ nickname, email, id }) =>
  request.put('/my/userinfo', { nickname, email, id })

//更新用户头像
export const userUpdateAvatarService = (avatar) =>
  request.put('/my/avatar', { avatar })

//更新用户密码
export const userUpdatePasswordService = ({ old_pwd, new_pwd, re_pwd }) =>
  request.patch('/my/updatepwd', { old_pwd, new_pwd, re_pwd })
