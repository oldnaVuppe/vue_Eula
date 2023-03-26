<script setup lang="ts">
import { reactive, ref, watch, computed, watchEffect } from 'vue';
import { ElMessage } from 'element-plus';

/*============❌❌   ✔✔✔===========*/
let list: any = reactive([])
let showDialog: any = ref(false)
let form: any = reactive({
    text: '',
    time: null
})
let selected: any = ref(null)
const formRef: any = ref(null)
const rules = {
    text: [
        {
            required: true,
            message: '必填',
            trigger: 'change',
        },
    ],
    time: [
        {
            required: true,
            message: '必填',
            trigger: 'change',
        },
    ]
}
const dilogTitle = computed(() => {
    return selected.value ? '修改' : '新增'
})


// setTimeout(() => {
    for (let i = 1; i <= 100000; i++){
        list.push({text: '第'+i+'条', time: new Date()})
    }
// },5000)

const remove = function (index: any) {
    // 删除
    list.splice(index, 1)
}
const update = function (row: any, index: any) {
    // 修改
    showDialog.value = true
    selected.value = index
    form.text = row.text;
    form.time = row.time;
}
const confirm = function (isAdd: any) {
    // 添加/修改
    formRef.value.validate().then(() => {
        if (isAdd) {
            list.unshift({
                text: form.text,
                time: form.time
            })
        } else {
            console.log(list);
            list[selected.value] = { ...form }
        }
        showDialog.value = false
        formRef.value.resetFields() // 重置表单
    }).catch((err: any) => {
        // 校验失败
        console.log(err);
        ElMessage({ message: '请自觉', type: 'warning' })
    })
}

watchEffect(() => {
    try {
        const data = JSON.parse(localStorage.getItem('list_vue3_vt') as any) || []
        // console.log('读取的缓存', data);
        list = reactive(data.map((el: any) => {
            return ({ ...el, time: new Date(el.time) })
        }))
    } catch (err) {
        console.log(err);
        list = reactive([])
    }
})

watch(list, () => {
    localStorage.setItem('list_vue3_vt', JSON.stringify(list))
})
/*============❌❌ 虚拟列表  ✔✔✔===========*/
// const columns = [
//     // key 用于标识这一列
//     { title:"内容", key:"text" },
//     { title:"日期", key:"time" },
//     { title:"操作", key:"index" }
// ]

/*============❌❌ 拖拉拽  ✔✔✔===========*/
// const dragstart = (e, oldIndex) => {
//     e.dataTransfer.setData('text/plain', oldIndex )
// }
// const dragover = (e, index) => {
//     e.preventDefault();
//     // console.log('dragover', index);
// }
// const drop = (e, newIndex) => {
//     e.preventDefault();
//     let oldIndex = Number(e.dataTransfer.getData('text/plain'))
//     console.log('拖拉拽=> 从', oldIndex,'到', newIndex);
//     if (oldIndex > newIndex) {
//         // 往前拖
//         // let temp = list[oldIndex]
//         // list.splice(oldIndex, 1)
//         // list.splice(newIndex, 0, temp)
//         list.splice(newIndex, 0, list[oldIndex])
//         list.splice(oldIndex + 1, 1)
//     } else {
//         list.splice(newIndex + 1, 0, list[oldIndex])
//         list.splice(oldIndex, 1)
//     }
// }
</script>


<template>
    <el-button @click="showDialog = true">新增</el-button>
    <!-- table列表 -->
    <!-- <div class="container"> -->
    <!-- 虚拟列表 -->
    <!-- <el-table-v2 :columns="columns" :data="list" :width="800" :height="300">
        <template #row="{ columns, rowIndex, rowData }">
            <div 
            style="display: flex;width: 100%;justify-content: space-around;align-items: center;"
            draggable="true"
            @dragstart="dragstart($event, rowIndex)"
            @dragover="dragover($event, rowIndex)"
            @drop="drop($event, rowIndex)"
            >
                <div style="min-width:153px;max-width: 153px;">
                    {{ rowData.text }}
                </div>
                <div style="min-width:100px;max-width: 100px;">
                    <div v-memo="[rowData.time]">{{ rowData.time.toLocaleDateString() }}</div>
                </div>
                <div>
                    <el-button type="danger" @click="remove(rowIndex)">删除</el-button>
                    <el-button type="primary" @click="update(rowData, rowIndex)">修改</el-button>
                </div>
            </div>
        </template>
    </el-table-v2> -->
    <!-- 普通列表 -->
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

    <!-- 弹出框 -->
    <el-dialog :title="dilogTitle" v-model="showDialog">
        <el-form :model="form" :rules="rules" ref="formRef">
            <el-form-item label="内容：" prop="text">
                <el-input v-model="form.text" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="时间：" prop="time">
                <el-date-picker v-model="form.time" placeholder="请选择时间"></el-date-picker>
            </el-form-item>
        </el-form>
        <template #footer>
            <div>
                <el-button @click="confirm(selected === null)">{{ dilogTitle }}</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<style scoped>
::v-deep(.el-table-v2__row){
    display: flex;
    justify-content: space-around;
    text-align: start;
}
::v-deep(.el-table-v2__header-row){
    justify-content: space-around;
    text-align: end;
}
</style>