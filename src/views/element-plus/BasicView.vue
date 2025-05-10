<script setup>
import { ref } from 'vue'
import { Search, Edit, Check, Message, Star, Delete } from '@element-plus/icons-vue'

const input = ref('')
const value = ref(true)
const options = [
  {
    value: '选项1',
    label: '黄金糕'
  },
  {
    value: '选项2',
    label: '双皮奶'
  },
  {
    value: '选项3',
    label: '蚵仔煎'
  },
  {
    value: '选项4',
    label: '龙须面'
  },
  {
    value: '选项5',
    label: '北京烤鸭'
  }
]
const value1 = ref('')
</script>

<template>
  <div class="demo-container">
    <el-card class="demo-card">
      <template #header>
        <div class="card-header">
          <span>Element Plus 基础组件</span>
          <el-tag type="success">基础演示</el-tag>
        </div>
      </template>
      
      <div class="component-section">
        <h3>按钮</h3>
        <div class="component-demo">
          <el-row class="mb-4">
            <el-button>默认按钮</el-button>
            <el-button type="primary">主要按钮</el-button>
            <el-button type="success">成功按钮</el-button>
            <el-button type="danger">危险按钮</el-button>
            <el-button type="warning">警告按钮</el-button>
          </el-row>
        </div>
      </div>

      <div class="component-section">
        <h3>图标</h3>
        <div class="component-demo">
          <el-icon :size="20"><Edit /></el-icon>
          <el-icon :size="20"><Search /></el-icon>
          <el-icon :size="20"><Check /></el-icon>
          <el-icon :size="20"><Message /></el-icon>
          <el-icon :size="20"><Star /></el-icon>
          <el-icon :size="20"><Delete /></el-icon>
        </div>
      </div>

      <div class="component-section">
        <h3>输入框</h3>
        <div class="component-demo">
          <el-input v-model="input" placeholder="请输入内容" />
        </div>
      </div>

      <div class="component-section">
        <h3>选择器</h3>
        <div class="component-demo">
          <el-select v-model="value1" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>

      <div class="component-section">
        <h3>开关</h3>
        <div class="component-demo">
          <el-switch
            v-model="value"
            class="ml-2"
            inline-prompt
            active-text="是"
            inactive-text="否"
          />
        </div>
      </div>
    </el-card>

    <el-divider content-position="center">
      <el-tag type="info" size="small">演示内容</el-tag>
    </el-divider>
    
    <el-alert
      title="组件库演示"
      type="success"
      description="这是一个Element Plus基础组件演示页面，用于展示Element Plus的基础组件用法。"
      show-icon
      :closable="false"
    />
  </div>
</template>

<style scoped>
.demo-container {
  max-width: 1200px;
  margin: 0 auto;
}

.demo-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.component-section {
  margin-bottom: 30px;
}

.component-demo {
  display: flex;
  gap: 10px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 4px;
  align-items: center;
}

h3 {
  margin-bottom: 10px;
  color: #409EFF;
  font-weight: 500;
}
</style> 