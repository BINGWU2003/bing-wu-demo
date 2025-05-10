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
        <h2>前端demo演示平台</h2>
        <p class="description">
          这是一个前端demo演示平台，用于展示各种前端库的使用方法和效果。（本人个人项目，仅供学习交流）
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
