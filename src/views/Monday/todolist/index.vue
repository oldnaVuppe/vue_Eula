<script setup lang="ts">
import { reactive, ref, watch, computed, watchEffect } from 'vue';
import Test from './todolist_v.vue'
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    width: 150,
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const data = ref([...Array(10)].map((_, i) => ({
  key: i,
  name: `Edward King ${i}`,
  age: 32,
  address: `London, Park Lane no. ${i}`,
})))
const del = () => {
    console.log('删除');
    console.log(data.value.splice(data.value.length - 1, 1))
    console.log(data.value);
}
</script>
<template>
    <div style="margin-bottom: 50px;">
        <Test></Test>
    </div>
    <a-button type="primary" @click="showDialog = true">新增</a-button>
    <a-table :columns="columns" :data-source="data" :pagination="{ pageSize: 50 }" :scroll="{ y: 240 }" />
    <a-button type="primary" @click="del">删除</a-button>

</template>

