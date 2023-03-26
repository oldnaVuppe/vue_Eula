<script setup lang="ts">
import { reactive, ref, watch, computed, watchEffect, inject } from 'vue';

const rules = {
    text: [
        {
            required: true,
            message: '必填',
            trigger: 'blur',
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
// 接受注入
const list = inject('list') as any
const selected = inject('selected') as any
const showDialog = inject('showDialog') as any
const from = inject('from') as any
const formRef = ref(null) as any

const emit = defineEmits(['update:showDialog'])
// 用一个变量来接收props的showDialog，这样v-model才能生效
// const isShow = computed(() => {
//     return props.showDialog
// })


const dilogTitle = computed(() => {
    return selected.value ? '新增' : '修改'
})

// 点击取消按钮
const cancel = () => {
    showDialog.value = false
}
// 点击确定按钮
const confirm = (isAdd: number) => {
    showDialog.value = false
    formRef.value.validate().then(() => {
        if (selected.value === -1) {
            console.log('新增');
            // 新增
            list.value.unshift({
                text: from.text,
                time: from.time
            })
        }
        else {
            // 修改
            console.log('修改');
            list.value.splice(selected.value, 1, {
                text: from.text,
                time: from.time
            })
        } 
    })
}
</script>
    
<template>
    <el-dialog :title="dilogTitle" v-model="showDialog">
        <el-form :model="from" :rules="rules" ref="formRef" :validate-on-rule-change="false">
            <el-form-item label="内容：" prop="text">
                <el-input v-model="from.text" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="时间：" prop="time">
                <el-date-picker v-model="from.time" placeholder="请选择时间"></el-date-picker>
            </el-form-item>
        </el-form>
        <template #footer>
            <div>
                <el-button @click="cancel()">取消</el-button>
                <el-button @click="confirm(selected)">确定</el-button>
                <!-- <el-button @click="confirm(selected === null)">{{ dilogTitle }}</el-button> -->
            </div>
        </template>
    </el-dialog>
</template>

<style lang="scss" scoped></style>