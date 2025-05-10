<template>
  <div class="about-container">
    <el-card class="about-card">
      <template #header>
        <div class="card-header">
          <span>关于本项目</span>
          <el-tag type="info">Demo库</el-tag>
        </div>
      </template>
      
      <div class="content">
        <h2>前端组件库演示平台</h2>
        <p class="description">
          这是一个前端组件库演示平台，用于展示各种前端库的使用方法和效果。
          通过这个平台，你可以快速了解和学习各种前端库的使用，帮助你更高效地开发前端应用。
        </p>
        
        <h3>特色功能</h3>
        <ul class="feature-list">
          <li>
            <el-icon><Check /></el-icon>
            <span>现代化的UI界面设计</span>
          </li>
          <li>
            <el-icon><Check /></el-icon>
            <span>按库分类的路由结构</span>
          </li>
          <li>
            <el-icon><Check /></el-icon>
            <span>丰富的演示示例</span>
          </li>
          <li>
            <el-icon><Check /></el-icon>
            <span>便捷的导航和使用体验</span>
          </li>
        </ul>
        
        <h3>已集成的库</h3>
        <el-descriptions :column="1" border>
          <el-descriptions-item label="Element Plus">
            <el-link href="https://element-plus.org" target="_blank" type="primary">
              Element Plus是一套基于Vue 3的组件库，提供了丰富的基础组件和业务组件
            </el-link>
          </el-descriptions-item>
          <el-descriptions-item label="Vue Flow">
            <el-link href="https://vueflow.dev" target="_blank" type="success">
              Vue Flow是一个用于构建交互式流程图的库，支持拖拽、连接等丰富功能
            </el-link>
          </el-descriptions-item>
        </el-descriptions>
        
        <div class="footer">
          <p>版本: v1.0.0</p>
          <p>© 2023 Demo库平台. 保留所有权利.</p>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { Check } from '@element-plus/icons-vue'
</script>

<style scoped>
.about-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px 0;
}

.about-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.content {
  padding: 10px;
}

h2 {
  color: #409EFF;
  margin-bottom: 20px;
  text-align: center;
}

.description {
  line-height: 1.8;
  color: #606266;
  margin-bottom: 30px;
  text-indent: 2em;
}

h3 {
  color: #303133;
  margin: 20px 0 15px;
  border-left: 4px solid #409EFF;
  padding-left: 10px;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin-bottom: 30px;
}

.feature-list li {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  color: #606266;
}

.feature-list li .el-icon {
  color: #67C23A;
  margin-right: 10px;
}

.footer {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #ebeef5;
  text-align: center;
  color: #909399;
  font-size: 14px;
}
</style>
