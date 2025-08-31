// 单篇文章类型
export interface Article {
  Id: number // 注意大小写要和后端保持一致
  title: string
  pub_date: string
  state: '已发布' | '草稿' | null
  cate_name: string
}

// 接口返回类型
export interface ArticleListRes {
  status: number
  message: string
  data: Article[]
  total: number
}
