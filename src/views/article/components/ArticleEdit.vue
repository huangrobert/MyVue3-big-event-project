<script setup lang="ts">
import { nextTick, ref } from 'vue'
import ChannelSelect from './ChannelSelect.vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import {
  artGetDetailService,
  artPublishService,
  artEditService
} from '@/api/article'
import { baseURL } from '@/utils/request'
import axios from 'axios'
const defaultData = {
  title: '',
  cate_id: '',
  cover_img: '',
  content: '',
  state: ''
}
const formModel = ref({ ...defaultData })
const imgUrl = ref('')
const onSelectFile = (uploadFile) => {
  // eslint-disable-next-line no-undef
  imgUrl.value = URL.createObjectURL(uploadFile.raw)
}

const visibleDrawer = ref(false)
const editorRef = ref()
const open = async (row) => {
  // eslint-disable-next-line no-undef
  console.log(row)
  if (row.id) {
    // eslint-disable-next-line no-undef
    console.log('编辑回显')
    const res = await artGetDetailService(row.id)
    // @ts-expect-error for test
    formModel.value = res.data.data
    imgUrl.value = baseURL + formModel.value.cover_img
    const file = await imageUrlToFile(imgUrl.value, formModel.value.cover_img)
    // @ts-expect-error for test
    formModel.value.cover_img = file
  } else {
    formModel.value = { ...defaultData }
    imgUrl.value = ''
    nextTick(() => {
      // console.log(editorRef.value)
      editorRef.value.setHTML('') // 清空编辑器内容
    })
  }
  visibleDrawer.value = true
}
const emit = defineEmits(['success'])
const onPublish = async (state) => {
  formModel.value.state = state
  // eslint-disable-next-line no-undef
  const fd = new FormData()
  // eslint-disable-next-line prefer-const
  for (let key in formModel.value) {
    fd.append(key, formModel.value[key])
  }
  // @ts-expect-error for test
  if (formModel.value.id) {
    // eslint-disable-next-line no-undef
    console.log('编辑')
    await artEditService(fd)
    // @ts-expect-error for test
    // eslint-disable-next-line no-undef
    ElMessage.success('编辑成功')
    visibleDrawer.value = false
    emit('success', 'edit')
  } else {
    // eslint-disable-next-line no-undef
    console.log('添加')
    await artPublishService(fd)
    // @ts-expect-error for test
    // eslint-disable-next-line no-undef
    ElMessage.success('添加成功')
    visibleDrawer.value = false
    emit('success', 'add')
  }
}
defineExpose({
  open
})

// 将网络图片地址转换为File对象
async function imageUrlToFile(url, fileName) {
  try {
    // 第一步：使用axios获取网络图片数据
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    const imageData = response.data

    // 第二步：将图片数据转换为Blob对象
    // eslint-disable-next-line no-undef
    const blob = new Blob([imageData], {
      type: response.headers['content-type']
    })

    // 第三步：创建一个新的File对象
    // eslint-disable-next-line no-undef
    const file = new File([blob], fileName, { type: blob.type })

    return file
  } catch (error) {
    // eslint-disable-next-line no-undef
    console.error('将图片转换为File对象时发生错误:', error)
    throw error
  }
}
</script>
<template>
  <el-drawer
    v-model="visibleDrawer"
    :title="formModel.id ? '编辑文章' : '添加文章'"
    direction="rtl"
    size="50%"
  >
    <!-- 发表文章表单 -->
    <el-form :model="formModel" ref="formRef" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <channel-select
          v-model="formModel.cate_id"
          width="100%"
        ></channel-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="onSelectFile"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <quill-editor
            ref="editorRef"
            v-model:content="formModel.content"
            theme="snow"
            content-type="html"
          ></quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onPublish('已发布')">发布</el-button>
        <el-button type="info" @click="onPublish('草稿')">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
<style lang="scss" scoped>
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
</style>
