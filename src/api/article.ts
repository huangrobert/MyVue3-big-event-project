import request from '@/utils/request'
export const artGetChannelsService = () => request.get('/mycate/list')
export const artAddChannelsService = (data) => request.post('/my/article/add')
export const artEditChannelsService = (data) => request.put('/my/article/info')
export const artDelChannelsService = (id) =>
  request.delete('my/cate/del', { params: { id } })

export const artGetListService = (params) => {
  request.get('/my/article/list', {
    params
  })
}
