import request from '@/utils/request'
export const artGetChannelsService = () => request.get('/mycate/list')
export const artAddChannelsService = (data) => request.post('/my/cate/add')
export const artEditChannelsService = (data) => request.put('/my/cate/info')
export const artDelChannelsService = (id) =>
  request.delete('my/cate/del', { params: { id } })

export const artGetListService = (params) => {
  request.get('/my/article/list', {
    params
  })
}
export const artPublishService = (data) => {
  request.post('/my/article/add', data)
}
export const artGetDetailService = (id) => {
  request.get('/my/article/info', { params: { id } })
}
export const artEditService = (data) => {
  request.put('/my/article/info', data)
}
