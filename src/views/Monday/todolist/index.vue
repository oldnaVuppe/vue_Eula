<script setup lang="ts">
import { reactive, ref, watch, computed, watchEffect } from 'vue';
import Test from './todolist_v.vue'
import CRUDDialog from '@/components/Todolist/CRUD_Dialog.vue';
import { provide } from 'vue';

const list: any = ref([]);
// 定义表单数据
const from = reactive({
  text: '',
  time: null,
});
// 定义一个变量，用来控制弹窗的显示和隐藏
const showDialog = ref(false);
// 定义一个变量，来显示弹出框是新增还是修改
const selected = ref(-1);

// 删除
const remove = (index: number) => {
  list.splice(index, 1);
};
// 修改
const update = (row: any, index: number) => {
  selected.value = index;
  showDialog.value = true;
  // 传递给子组件的数据
  from.text = row.text;
  from.time = row.time;
};
// 新增
const newADD = () => {
  selected.value = -1;
  showDialog.value = true;
  from.text = '';
  from.time = null;
};
provide('list', list)
provide('selected', selected)
provide('showDialog', showDialog)
provide('from', from)

watchEffect(() => {
    try {
        const data = JSON.parse(localStorage.getItem('list') as any) || []
        // console.log('读取的缓存', data);
        list.value = reactive(data.map((el: any) => {
            return ({ ...el, time: new Date(el.time) })
        }))
    } catch (err) {
        console.log(err);
        list.value = reactive([])
    }
})
watch(list.value, (newVal, oldVal) => {
  localStorage.setItem('list', JSON.stringify(newVal));
})


</script>
<template>
  <div style="margin-bottom: 50px;">
    <Test></Test>
  </div>
  <el-button type="success" @click="newADD" style="margin-bottom: 10px;">新增</el-button>
  <el-table :data="list">
    <el-table-column label="内容" prop="text"></el-table-column>
    <el-table-column label="时间">
      <template #default="{ row }">
        {{ row.time.toLocaleDateString() }}
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="{ row, $index }">
        <el-button type="danger" @click="remove($index)">删除</el-button>
        <el-button type="primary" @click="update(row, $index)">修改</el-button>
      </template>
    </el-table-column>
  </el-table>
  <CRUDDialog />
</template>

