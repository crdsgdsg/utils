<template>
  <el-select size="small" style="width: 100%">
    <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.name"
        :value="item.value"
    />
  </el-select>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {getDict} from '@/api/common/index.ts'

const options = ref([])
getDict("randomType").then(e => {
  options.value = e.data['randomType']
})
</script>

<style scoped>

</style>