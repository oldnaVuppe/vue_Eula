<script lang="ts" setup >
import { ref, defineProps, onMounted, nextTick } from 'vue'
import { getMenuList } from './../../api/menu'
import { Menu } from './../../types/menu'
import router from './../../router'
interface MenuProps {
    id: number;
    authName: string;
    path: string;
    order: number;
    icon: string;
    children: MenuProps[];
}
const menu = ref([]) as any
const menuListFn = async () => {
    const res = await getMenuList()
    console.log(res.data.data);
    menu.value = res.data.data
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

// const log = (item: any) => {
//     console.log(item);
// }
// 得到路由
console.log(router.currentRoute.value);
const getRouter = ref(router.currentRoute.value.path)
</script>

<template>
    <el-menu :default-active="getRouter" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen"
        @close="handleClose" router>
        <el-menu-item-group>
                <el-menu-item index="/index">
                    <template #title>
                        <el-icon><SwitchFilled /></el-icon>
                        <span>ELDEN RING</span>
                    </template>
                </el-menu-item>
            </el-menu-item-group>
        <el-sub-menu :index="item.id" v-for="item in menu" :key="item.id">
            <template #title>
                <el-icon v-html="item.icon"></el-icon>
                <span>{{ item.authName }}</span>
            </template>
            <el-menu-item-group>
                <el-menu-item :index="'/' + item.path + '/' + item0.path" v-for="item0 in item.children">
                    <el-icon v-html="item0.icon"></el-icon>
                    <span>{{ item0.authName }}</span>
                </el-menu-item>
            </el-menu-item-group>
        </el-sub-menu>
    </el-menu>
</template>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 183px;
}

.el-menu-item {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    // 溢出用省略号显示
    
}
</style>