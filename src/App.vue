<script setup>
import { RouterView } from 'vue-router'
import { ref } from 'vue'
import { 
  Document, 
  Menu as IconMenu, 
  Location, 
  Setting,
  House,
  Help,
  ElementPlus,
  Share
} from '@element-plus/icons-vue'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'

const isCollapse = ref(false)
</script>

<template>
  <div class="common-layout">
    <el-container class="layout-container">
      <!-- 侧边栏导航 -->
      <el-aside :width="isCollapse ? '64px' : '220px'" class="aside">
        <div class="logo-container">
          <img v-if="!isCollapse" alt="Vue logo" class="logo" src="@/assets/logo.svg" />
          <h1 v-if="!isCollapse" class="logo-title">Demo库</h1>
        </div>
        
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical"
          :collapse="isCollapse"
          router
          background-color="#001529"
          text-color="#fff"
          active-text-color="#409EFF"
        >
          <el-sub-menu index="/element-plus">
            <template #title>
              <el-icon><ElementPlus /></el-icon>
              <span>Element Plus</span>
            </template>
            <el-menu-item index="/">基础组件</el-menu-item>
            <el-menu-item index="/element-plus/form">表单组件</el-menu-item>
            <el-menu-item index="/element-plus/data">数据展示</el-menu-item>
          </el-sub-menu>
          
          <el-sub-menu index="/vue-flow">
            <template #title>
              <el-icon><Share /></el-icon>
              <span>Vue Flow</span>
            </template>
            <el-menu-item index="/vue-flow/basic">基础流程图</el-menu-item>
            <el-menu-item index="/vue-flow/custom">自定义节点</el-menu-item>
            <el-menu-item index="/vue-flow/advanced">高级示例</el-menu-item>
          </el-sub-menu>
          
          <el-menu-item index="/about">
            <el-icon><Help /></el-icon>
            <span>关于</span>
          </el-menu-item>
        </el-menu>
        
        <div class="collapse-btn" @click="isCollapse = !isCollapse">
          <el-icon v-if="isCollapse"><arrow-right /></el-icon>
          <el-icon v-else><arrow-left /></el-icon>
        </div>
      </el-aside>
      
      <!-- 主内容区域 -->
      <el-container>
        <el-header class="header">
          <div class="breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item v-if="$route.meta.parent">{{ $route.meta.parent }}</el-breadcrumb-item>
              <el-breadcrumb-item v-if="$route.meta.title">{{ $route.meta.title }}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </el-header>
        
        <el-main class="main-content">
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
/* 全局样式 */
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif;
}

#app {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

/* 布局样式 */
.layout-container {
  height: 100vh;
}

.aside {
  background-color: #001529;
  transition: width 0.3s;
  overflow: hidden;
  height: 100%;
  position: relative;
}

.logo-container {
  height: 60px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  color: white;
  margin-bottom: 20px;
}

.logo {
  height: 34px;
  width: 34px;
  margin-right: 10px;
}

.logo-title {
  color: white;
  font-size: 18px;
  margin: 0;
  white-space: nowrap;
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 220px;
  border-right: none;
}

.header {
  background-color: white;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.breadcrumb {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
}

.username {
  margin-left: 10px;
  margin-right: 5px;
}

.main-content {
  padding: 20px;
  background-color: #f5f7fa;
  overflow-y: auto;
  height: calc(100vh - 60px);
}

.collapse-btn {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 30px;
  background-color: #1e293b;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
}

.collapse-btn:hover {
  background-color: #409EFF;
}
</style>
