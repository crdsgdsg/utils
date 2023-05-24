<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>模板设置</span>
        <div>
          <el-button size="small" type="primary" text @click="fetchTemplate">生成数据</el-button>
          <regular-button/>
          <el-button size="small" type="primary" text @click="saveJsonTemplate">添加为模型</el-button>
        </div>
      </div>
    </template>
    <node-tree ref="node"></node-tree>
    <el-dialog width="70%" append-to-body destroy-on-close v-model="jsonDataShow"
               title="生成数据">
      <json-editor-vue v-model="jsonData" style="width: 100%;height: 65vh"></json-editor-vue>
    </el-dialog>
  </el-card>
</template>

<script setup lang="ts">
// import {} from '@/api/jsonProduce'
import NodeTree from './components/NodeTree.vue'
import JsonEditorVue from 'json-editor-vue3'
import RegularButton from './components/RegularButton.vue'
import * as RandExp from 'randexp'

import {ref} from 'vue'
import {ElMessage} from "element-plus";
import {addJsonTemplate} from "../../api/jsonProduce";

const node = ref()
const jsonData = ref()
const jsonDataShow = ref(false)
const randomString = (min: number, max: number, chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') => {
  let result = '';
  let size = randomNumber(min, max);
  for (let i = size; i > 0; --i) result += chars[Math.round(Math.random() * chars.length)];
  return result;
}
const randomNumber = (min: number, max: number) => {
  return Math.round(Math.random() * (max - min)) + min;
}
const randomBoolean = () => {
  return Math.round(Math.random()) === 1;
}
const randomRegular = (reg) => {
  return new RandExp(reg).gen();
}
const saveJsonTemplate = (reg) => {
  addJsonTemplate(node.value.getTemplate("根节点")).then(res => {
    ElMessage.success("保存成功")
  })
}

const generateData = (template) => {
  if (template.type === 'string') {
    let split = template.condition.split(',');
    return randomString(Number(split[0]), Number(split[1]))
  }
  if (template.type === 'number') {
    let split = template.condition.split(',');
    return randomNumber(Number(split[0]), Number(split[1]))
  }
  if (template.type === 'boolean') {
    return randomBoolean();
  }
  if (template.type === 'empty') {
    return null;
  }
  if (template.type === 'regular') {
    return randomRegular(template.condition);
  }
  if (template.type === 'object') {
    let child = template.child;
    let result = {}
    if (child)
      child.forEach(item => {
        result[item.key] = generateData(item)
      })
    return result;
  }
  if (template.type === 'array') {
    let child = template.child[0];
    let result = []
    if (child)
      for (let i = 0; i < template.condition; i++) {
        result.push(generateData(child))
      }
    return result;
  }
}
const fetchTemplate = () => {
  try {
    const template = node.value.getTemplate("根节点");
    console.log(template)
    console.log(generateData(template));
    jsonData.value = generateData(template)
    // navigator.clipboard.writeText(JSON.stringify(generateData(template)))
    jsonDataShow.value = true
  } catch (e) {
    ElMessage.error(e.message)
  }

}

</script>

<style lang="less" scoped>
.box-card {
  width: 100%;
  height: 100%;
  overflow-y: auto;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

</style>