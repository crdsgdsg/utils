<template>
  <el-autocomplete
      size="small"
      :fetch-suggestions="querySearch"
      style="width: 100%"
      placeholder="输入正则"
  >
    <template #suffix>
      <el-icon>
        <Edit/>
      </el-icon>
    </template>
    <template #default="{ item }">
      <span style="float: left;max-width: 150px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis">{{ item.value }}</span>
      <span
          style="
          float: right;
          color: var(--el-text-color-secondary);
          font-size: 13px;
        "
      >{{ item.name }}</span
      >
    </template>
  </el-autocomplete>
</template>

<script lang="ts" setup>
import {Edit} from '@element-plus/icons-vue'
import {ref} from "vue";
import {getDict} from '@/api/common/index.ts'

const options = ref([])
getDict("regular").then(e => {
  options.value = e.data['regular']
})
const querySearch = (queryString: string, cb) => {
  cb(options.value.filter(option => option.name.includes(queryString)))
}
</script>

<style scoped>

</style>