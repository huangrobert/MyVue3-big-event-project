<script setup lang="ts">
import { ref } from 'vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import ChannelSelect from './components/ChannelSelect.vue'
// import { artGetListService } from '@/api/article'
import { formatTime } from '@/utils/format'
//原数据
const articleList = ref([
  {
    Id: 5961,
    title: '新的文章啊',
    pub_date: '2022-07-10 14:53:52.604',
    state: '已发布',
    cate_name: '体育'
  },
  {
    Id: 5962,
    title: '新的文章啊',
    pub_date: '2022-07-10 14:54:30.904',
    state: '草稿',
    cate_name: '新闻'
  },
  {
    Id: 5963,
    title: '新的文章啊',
    pub_date: '2022-07-10 14:53:52.604',
    state: '已发布',
    cate_name: '音乐'
  },
  {
    Id: 5964,
    title: '新的文章啊',
    pub_date: '2022-07-10 14:54:30.904',
    state: '草稿',
    cate_name: 'it'
  },
  {
    Id: 5965,
    title: '新的文章啊',
    pub_date: '2022-07-10 14:53:52.604',
    state: '已发布',
    cate_name: '电竞'
  },
  {
    Id: 5966,
    title: '新的文章啊',
    pub_date: '2022-07-10 14:54:30.904',
    state: '草稿',
    cate_name: '美女'
  },
  {
    Id: 5967,
    title: '新的文章啊',
    pub_date: '2022-07-10 14:53:52.604',
    state: '已发布',
    cate_name: '帅哥'
  },
  {
    Id: 5968,
    title: '新的文章啊',
    pub_date: '2022-07-10 14:54:30.904',
    state: '草稿',
    cate_name: '二次元'
  }
])
//模拟数据
const articleListAll = ref([...articleList.value])
const total = ref(8)
const onEditArticle = (row) => {
  // eslint-disable-next-line no-undef
  console.log(row)
}
const onDelArticle = (row) => {
  // eslint-disable-next-line no-undef
  console.log(row)
}
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})
const getArticleList = async () => {
  //原动态写法
  // const res = await artGetListService(params.value)
  // // @ts-expect-error for test
  // articleList.value = res.data.data
  // // @ts-expect-error for test
  // total.value = res.data.total
  //静态写法
  const start = (params.value.pagenum - 1) * params.value.pagesize
  const end = start + params.value.pagesize
  articleList.value = articleListAll.value.slice(start, end)
  total.value = articleListAll.value.length
}
getArticleList()
const onSizeChange = (size) => {
  // eslint-disable-next-line no-undef
  console.log('当前每页条数', size)
  params.value.pagenum = 1
  params.value.pagesize = size
  getArticleList()
}
const onCurrentChange = (page) => {
  // eslint-disable-next-line no-undef
  console.log('页面变化了', page)
  params.value.pagenum = page
  getArticleList()
}
</script>

<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button>添加文章</el-button>
    </template>
    <el-form inline>
      <el-form-item label="文章分类：">
        <channel-select v-model="params.cate_id"></channel-select>
      </el-form-item>
      <el-form-item label="发布状态：">
        <el-select style="width: 240px" v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="articleList" style="width: 100%">
      <el-table-column label="文章标题" prop="title" width="400">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发布时间" prop="pub_date">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button
            circle
            plain
            type="primary"
            :icon="Edit"
            @click="onEditArticle(row)"
          ></el-button>
          <el-button
            circle
            plain
            type="danger"
            :icon="Delete"
            @click="onDelArticle(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 4, 5, 10]"
      layout="jumper, total, sizes, prev, pager, next"
      background
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />
  </page-container>
</template>
<style lang="scss" scoped></style>
