<script setup lang="ts">
import { artGetChannelsService, artDelChannelsService } from '@/api/article'
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelEdit from './components/ChannelEdit.vue'
import { ElMessageBox } from 'element-plus'

const channelList = ref([])
const loading = ref(false)
const dialog = ref()

const getChannelList = async () => {
  loading.value = true
  const res = await artGetChannelsService()
  channelList.value = res.data.data
  channelList.value = []
  loading.value = false
}
getChannelList()
const onEditChannel = (row) => {
  // eslint-disable-next-line no-undef
  console.log(row)
  dialog.value.open({ row })
}
const onDelChannel = async (row) => {
  await ElMessageBox.confirm('你确认要删除该分类吗', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await artDelChannelsService(row.id)
  // @ts-expect-error for test
  // eslint-disable-next-line no-undef
  ElMessage.success('删除成功')
  getChannelList()
}
const onAddChannel = () => {
  dialog.value.open({})
}
const onSuccess = () => {
  getChannelList()
}
</script>
<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button @click="onAddChannel">添加分类</el-button>
    </template>
    <el-table v-loading="loading" :data="channelList" style="width: 100%">
      <el-table-column label="序号" width:100></el-table-column>
      <el-table-column prop="cate_name" label="分类名称"></el-table-column>
      <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
      <el-table-column label="操作" width:100>
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            type="primary"
            plain
            @click="onEditChannel(row)"
          >
          </el-button>
          <el-button
            :icon="Delete"
            type="danger"
            plain
            circle
            @click="onDelChannel(row)"
          >
          </el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据"></el-empty>
      </template>
    </el-table>
    <channel-edit ref="dialog" @success="onSuccess"></channel-edit>
  </page-container>
</template>
<style lang="scss" scoped></style>
