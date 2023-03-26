<script setup lang="ts">
import Menu from './Menu/index.vue'
import { ref } from 'vue'
const isCollapse = ref(false)
const menuWidth = ref(0)
const isCollapseFn = () => {
    isCollapse.value = !isCollapse.value
}
</script>

<template>
    <div class="common-layout">
        <el-container class="container">
            <el-aside id="aside">
                <img src="./../assets/logo_steam.svg" alt="" style="position: fixed;left: 10px;top: 0;width: 183px;height: 50px;padding: 0 0 0 0;  background-color: #fff;">
                <Menu class="menu" :isCollapse="isCollapse"></Menu>
            </el-aside>
            <el-container class="container-right" :class="isCollapse ? 'moveleft' : 'moveright'">
                <el-header id="header">
                    <el-page-header>
                        <template #icon>
                            <div class="isCollapse" @click="isCollapseFn"
                                style="width: 51px; height: 51px;display: flex;justify-content: center;align-items: center;">
                                <svg class="is-active hamburger" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
                                    width="24" height="24" data-v-4e7211d9="">
                                    <path
                                        d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"
                                        data-v-4e7211d9=""></path>
                                </svg>
                            </div>
                        </template>
                        <template #title>
                            <a href="https://github.com/naVuppe/vue_Eula" target="_blank">my github</a>
                        </template>
                        <template #content>
                            <el-breadcrumb separator="/">
                                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                                <el-breadcrumb-item><a href="/">这页</a></el-breadcrumb-item>
                                <el-breadcrumb-item>
                                    那页
                                </el-breadcrumb-item>
                            </el-breadcrumb>
                        </template>
                        <template #extra>
                            <div class="flex items-center">
                                <fullscreen-outlined />
                                <el-button>Print</el-button>
                                <el-button type="primary" class="ml-2">Edit</el-button>
                                <el-avatar :size="32" class="mr-3"
                                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                                    <step-forward-outlined />
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
        // background-color: #ffc0cb;
        background-color: #fff;
        height: 100%;
        max-width: 183px !important;
        width: v-bind(menuWidth + 'px');
        overflow: hidden;
        padding-top: 50px;
    }

    #header {
        background-color: #f2f5f6;
        max-height: 51px;
        min-width: 570px;
        padding-left: 0px;
        overflow: hidden;
        z-index: 1000;
    }

    #main {
        background-color: rgba(14 + 7, 4 + 4, 20 + 8, 0.03);
        min-width: 570px;
        z-index: 1001;
        padding: 12px;
    }
}

.el-menu-vertical-demo {
    height: 100%;
}
.isCollapse:hover {
    background-color: rgba(123, 123, 123, 0.25);
}
.el-menu-vertical-demo{
    border: 0;
}

</style>