<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  tagType: {
    type: String,
    default: 'success'
  },
  tagText: {
    type: String,
    default: '演示'
  },
  alertTitle: {
    type: String,
    default: ''
  },
  alertDescription: {
    type: String,
    default: ''
  },
  alertType: {
    type: String,
    default: 'success'
  },
  showAlert: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <div class="demo-container">
    <el-card class="demo-card">
      <template #header>
        <div class="card-header">
          <span>{{ title }}</span>
          <el-tag :type="tagType">{{ tagText }}</el-tag>
        </div>
      </template>

      <!-- 主要内容区域 -->
      <slot></slot>
      
      <!-- 页面底部提示信息区 -->
      <slot name="info"></slot>
    </el-card>
    
    <!-- 页面底部警告提示 -->
    <el-alert
      v-if="showAlert && alertTitle"
      :title="alertTitle"
      :type="alertType"
      :description="alertDescription"
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
</style> 