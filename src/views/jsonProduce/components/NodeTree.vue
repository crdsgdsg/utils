<template>
  <div style="margin-top: 10px">
    <el-row>
      <div :style="{width: 15*(level-1)+'px'}">
      </div>
      <el-row style="flex:1" :gutter="20">
        <el-col :span="1">
          <div class="center fullScreen">
            <template v-if="data.type[0]==='array'||data.type[0]==='object'">
              <el-icon @click="data.show=false" v-if="data.show">
                <ArrowDownBold/>
              </el-icon>
              <el-icon @click="data.show=true" v-else>
                <ArrowRightBold/>
              </el-icon>
            </template>
          </div>
        </el-col>
        <el-col :span="5">
          <el-input size="small" style="width:100%" v-model="data.key" :disabled="level===1||defaultKey!==null"
                    :placeholder="level===1?'根节点':'录入key'"/>
        </el-col>
        <el-col :span="5">
          <json-template-select ref="jsonRef" v-model="data.type"></json-template-select>
        </el-col>
        <el-col v-if="data.type[0]==='number'||data.type[0]==='string'" :span="5">
          <el-input-number :min="1" :max="data.max" size="small" style="width:100%" v-model.number="data.min"
                           :placeholder="data.type[0]==='number'?'最小值':'最小长度'"/>
        </el-col>
        <el-col v-if="data.type[0]==='number'||data.type[0]==='string'" :span="5">
          <el-input-number :min="data.min" :max="data.type[0]==='number'?5000:Number.MAX_SAFE_INTEGER" size="small"
                           style="width:100%" v-model.number="data.max"
                           :placeholder="data.type[0]==='number'?'最大值':'最大长度'"/>
        </el-col>
        <el-col v-if="data.type[0]==='array'" :span="5">
          <el-input-number size="small" style="width:100%" v-model.number="data.length" placeholder="生成数量"/>
        </el-col>
        <el-col v-if="data.type[0]==='regular'" :span="5">
          <regular-input v-model="data.regular"/>
        </el-col>
        <el-col v-if="showRemove" :span="1">
          <div class="center fullScreen">
            <el-icon>
              <el-icon @click="emit('remove')" color="#fa5c81">
                <RemoveFilled/>
              </el-icon>
            </el-icon>
          </div>
        </el-col>
        <el-col :span="1">
          <div class="center fullScreen">
            <template v-if="data.type[0]==='object'">
              <el-icon @click="nextKeyList.push(_.uniqueId('nodeTree'))">
                <el-icon color="#1890ff">
                  <CirclePlusFilled/>
                </el-icon>
              </el-icon>
            </template>
          </div>
        </el-col>
      </el-row>
    </el-row>
    <template v-if="data.type[0]==='object'||data.type[0]==='array'">
      <template v-if="data.type[0]==='object'">
        <node-tree ref="node" @remove="_.pull(nextKeyList,key)" :show-remove="true" v-show="data.show" :key="key"
                   v-for="key in nextKeyList"
                   :level="level+1"></node-tree>
      </template>
      <template v-if="data.type[0]==='array'">
        <node-tree ref="node" default-key="list" v-show="data.show" :level="level+1"></node-tree>
      </template>
    </template>
  </div>
</template>

<script lang="ts" setup>
import JsonTemplateSelect from './JsonTemplateSelect.vue'
import RegularInput from './RegularInput.vue'
import * as _ from 'lodash'
import {ArrowRightBold, ArrowDownBold, RemoveFilled, CirclePlusFilled} from '@element-plus/icons-vue'
import {ref, defineProps, defineEmits, defineExpose, Ref, UnwrapRef} from 'vue'

const {level, defaultKey, showRemove} = defineProps({
  level: {
    type: Number,
    default: 1
  },
  showRemove: {
    type: Boolean,
    default: false
  },
  defaultKey: {
    type: String,
    default: null
  }
})
const emit = defineEmits(['remove'])
type templateData = {
  show: boolean,
  min: number,
  max: number,
  key: string,
  regular: string,
  length: number,
  type: any,
  condition?: number | string,
  child?: Array<templateData>
};
const data: Ref<UnwrapRef<templateData>> = ref({
  show: true,
  key: defaultKey || "",
  min: 6,
  max: 12,
  regular: '',
  length: 4,
  type: ['string'],
});
const node = ref();
const jsonRef = ref();
const nextKeyList = ref([]);
const getTemplate = (key: string | null = null) => {
  let cloneDeep = _.cloneDeep(data.value);
  if (key) {
    cloneDeep.key = key
  }
  if (cloneDeep.key) {

    if (cloneDeep.type.length === 1) {
      let type = cloneDeep.type[0];
      cloneDeep.type = type;
      if (type === 'array') {
        cloneDeep.condition = cloneDeep.length
        cloneDeep.child = [node.value.getTemplate()]
      } else if (type === 'object') {
        cloneDeep.condition = cloneDeep.length
        cloneDeep.child = node.value?.map(node => node.getTemplate())
      } else if (type === 'string' || type === 'number') {
        cloneDeep.condition = String(cloneDeep.min) + ',' + String(cloneDeep.max);
      } else if (type === 'regular')
        cloneDeep.condition = cloneDeep.regular
      delete cloneDeep.show
      delete cloneDeep.min
      delete cloneDeep.max
      delete cloneDeep.regular
      delete cloneDeep.length
    } else {
      cloneDeep = jsonRef.value.model
    }
    return cloneDeep;
  } else {
    throw new Error("key不能为空")
  }

}
defineExpose({
  getTemplate
})
</script>

<style scoped>

</style>