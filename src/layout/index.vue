<script setup lang="ts">
import { ref } from 'vue'
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'

const isCollapse = ref(true)
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
</script>

<template>
    <div class="common-layout">
        <el-container class="container">
            <el-aside width="314px" id="aside">
                <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
                    <el-radio-button :label="false">expand</el-radio-button>
                    <el-radio-button :label="true">collapse</el-radio-button>
                </el-radio-group>
                <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen"
                    @close="handleClose">
                    <el-sub-menu index="1">
                        <template #title>
                            <el-icon>
                                <location />
                            </el-icon>
                            <span>Navigator One</span>
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
                            <template #title><span>item four</span></template>
                            <el-menu-item index="1-4-1">item one</el-menu-item>
                        </el-sub-menu>
                    </el-sub-menu>
                    <el-menu-item index="2">
                        <el-icon><icon-menu /></el-icon>
                        <template #title>Navigator Two</template>
                    </el-menu-item>
                    <el-menu-item index="3" disabled>
                        <el-icon>
                            <document />
                        </el-icon>
                        <template #title>Navigator Three</template>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <el-icon>
                            <setting />
                        </el-icon>
                        <template #title>Navigator Four</template>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header id="header">
                    <el-page-header :icon="null">
                        <template #content>
                            <div class="flex items-center">
                                <el-avatar :size="32" class="mr-3"
                                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                                <span class="text-large font-600 mr-3"> Title </span>
                                <span class="text-sm mr-2" style="color: var(--el-text-color-regular)">
                                    Sub title
                                </span>
                                <el-tag>Default</el-tag>
                            </div>
                        </template>
                        <template #extra>
                            <div class="flex items-center">
                                <el-button>Print</el-button>
                                <el-button type="primary" class="ml-2">Edit</el-button>
                            </div>
                        </template>
                    </el-page-header>
                </el-header>
                <el-main id="main">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
  
<style lang="scss" scoped>
.common-layout {
    height: 100%;

    .container {
        height: 100%;
    }

    #aside {
        background-color: #ffc0cb;
        height: 100%;
    }

    #header {
        background-color: #f2f5f6;
        max-height: 51px;
    }

    #main {
        background-color: #00bfff;
    }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    height: 90%;
    width: 100%;
}
</style>