<template>
  <el-button size="small" type="primary" text @click="regularDialogShow=true">常用正则添加</el-button>
  <el-dialog append-to-body destroy-on-close @closed="addRegularCancel" v-model="regularDialogShow"
             title="常用正则添加">
    <el-form :label-width="80" ref="regularForm" :model="regular" :rules="{
        name:[{required:true,message:'名称不能为空',trigger:'blur'}],
        value:[
          {required:true,message:'名称不能为空',trigger:'blur'},
          {validator:isRegular,trigger:'blur'}
      ]}">
      <el-form-item label="名称" prop="name">
        <el-input v-model="regular.name" style="width:100%" placeholder="输入名称"/>
      </el-form-item>
      <el-form-item label="表达式" prop="value">
        <el-input v-model="regular.value" style="width:100%" placeholder="输入表达式"/>
      </el-form-item>
    </el-form>
    <span style="display: flex;justify-content: flex-end">
<!--        <el-button @click="addRegularCancel">Cancel</el-button>-->
        <el-button type="primary" @click="addReg">
          添加
        </el-button>
      </span>
  </el-dialog>
</template>

<script setup lang="ts">
import {ElMessage} from "element-plus";
import {addRegular} from '@/api/jsonProduce'
import {ref} from 'vue'

const regularDialogShow = ref(false)
const regularForm = ref()
const regular = ref({
  name: '',
  value: '',
})
const addReg = () => {
  regularForm.value.validate((valid, fields) => {
    if (valid) {
      addRegular(regular.value).then(e => {
        ElMessage.success("添加成功")
        regularDialogShow.value = false
      })
    }
  })
}
const addRegularCancel = () => {
  regularForm.value.resetFields()
}
const isRegular = (rule: any, value: any, callback: any) => {
  if (value) {
    try {
      new RegExp(value);
      callback()
    } catch (e) {
      callback(new Error("正则不合法"))
    }
  } else {
    callback()
  }
}
</script>

<style scoped>

</style>