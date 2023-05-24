<template>
  <el-cascader @change="onchange" :options="options" size="small" style="width: 100%">
    <template #default="{ node, data }">
      <span>{{ data.label }}</span>
      <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
    </template>
  </el-cascader>
</template>

<script setup lang="ts">
import {ref, defineExpose} from 'vue'
import {getDict} from '@/api/common/index.ts'
import {findJsonTemplateById, getAllJsonTemplate} from "../../../api/jsonProduce";

const options = ref([])
options.value.push({
  label: '自定义模型',
  children: []
})
getAllJsonTemplate().then(e => {
  options.value[0].children = e.data.map(item => {
    return {
      label: item.key,
      value: item.id,
    }
  })
})
getDict("randomType").then(e => {
  options.value.push(...e.data['randomType'].map(e => {
    return {
      label: e.name,
      value: e.value
    }
  }))
})
const model = ref()
const onchange = (e) => {
  if (e.length === 2) {
    findJsonTemplateById(e[1]).then(res => {
      model.value = res.data
    })
  }
}
defineExpose({
  model
})
</script>

<style scoped>

</style>