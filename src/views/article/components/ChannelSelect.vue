<script setup lang="ts">
import { artGetChannelsService } from '@/api/article'
import { ref } from 'vue'
defineProps({
  modelValue: {
    type: [Number, String]
  }
})
const emit = defineEmits(['update:modelValue'])

const channelList = ref([])
const getChannelList = async () => {
  const res = await artGetChannelsService()
  channelList.value = res.data.data
}
getChannelList()
</script>
<template>
  <el-select
    style="width: 240px"
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
  >
    <el-option
      v-for="item in channelList"
      :label="item.cate_name"
      :value="item.id"
      :key="item.id"
    ></el-option>
    <el-option label="新闻" value="111"></el-option>
    <el-option label="体育" value="222"></el-option>
  </el-select>
</template>
