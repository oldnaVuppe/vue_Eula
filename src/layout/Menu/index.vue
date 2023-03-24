<script lang="ts" setup >
import { ref, defineProps, onMounted ,nextTick} from 'vue'
import {
    // Document,
    // Menu as IconMenu,
    // Location,
    // Setting,
    // circleplus
} from '@element-plus/icons-vue';
import { getMenuList } from './../../api/menu'
import { Menu } from './../../types/menu'

const menuList = ref([])
const menuListFn = async () => {
    const res = await getMenuList()
    console.log(res.data.data);
    menuList.value = res.data.data
}
menuListFn();

const props = defineProps({
    isCollapse: {
        type: Boolean,
        default: true
    }
})
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}

const log = (item: any) => {
    console.log(item.icon);
}
</script>

<template>
    <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen" @close="handleClose">
        <el-sub-menu index="1">
            <template #title>
                <el-icon><Folder /></el-icon>
                <span>第一个</span>
            </template>
            <el-menu-item-group>
                <template #title><span>Group One</span></template>
                <el-menu-item index="1-1">item one</el-menu-item>
                <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
                <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
                <template #title>
                    <el-icon><Folder /></el-icon>
                    <span>item four</span>
                </template>
                <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu>
        </el-sub-menu>
        <el-menu-item :index="item.id" v-for="(item, index) in menuList" :key="index">
            <el-icon v-html="item.icon"></el-icon>
            <template #title>{{ item.authName }}</template>
        </el-menu-item>
    </el-menu>
</template>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 183px;
}
</style>