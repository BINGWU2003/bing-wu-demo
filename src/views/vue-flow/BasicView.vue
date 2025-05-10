<script setup>
import { ref, onMounted } from 'vue'
import { VueFlow, useVueFlow, Panel } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import '@vue-flow/controls/dist/style.css'
import '@vue-flow/minimap/dist/style.css'

// 使用Vue Flow的hooks
const { nodes, edges, onConnect, addEdges, setNodes, setEdges } = useVueFlow()

// 定义初始节点
const initialNodes = [
  { id: '1', label: '开始节点', position: { x: 250, y: 5 }, class: 'start-node' },
  { id: '2', label: '处理节点', position: { x: 100, y: 100 }, class: 'process-node' },
  { id: '3', label: '判断节点', position: { x: 400, y: 100 }, class: 'decision-node' },
  { id: '4', label: '结束节点', position: { x: 250, y: 200 }, class: 'end-node' },
]

// 定义初始连线
const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', label: '流程1' },
  { id: 'e1-3', source: '1', target: '3', label: '流程2' },
  { id: 'e2-4', source: '2', target: '4', label: '完成' },
  { id: 'e3-4', source: '3', target: '4', label: '完成' },
]

// 初始化图表
onMounted(() => {
  setNodes(initialNodes)
  setEdges(initialEdges)
})

// 连线回调
const handleConnect = (params) => {
  onConnect(params)
}
</script>

<template>
  <div class="demo-container">
    <el-card class="demo-card">
      <template #header>
        <div class="card-header">
          <span>Vue Flow 基础流程图</span>
          <el-tag type="success">流程图演示</el-tag>
        </div>
      </template>

      <div class="flow-container">
        <VueFlow 
          @connect="handleConnect"
          class="flow-viewport"
          :default-zoom="1"
          :min-zoom="0.2"
          :max-zoom="4"
        >
          <Background pattern-color="#aaa" gap="8" />
          <MiniMap />
          <Controls />
          <Panel position="top-right">
            <div class="panel-content">
              <h4>流程图操作</h4>
              <div class="panel-btns">
                <el-button size="small" type="primary">保存</el-button>
                <el-button size="small" type="danger">重置</el-button>
              </div>
            </div>
          </Panel>
        </VueFlow>
      </div>
      
      <div class="flow-info">
        <p>提示：可以拖动节点、缩放画布、连接节点、添加/删除边等。</p>
      </div>
    </el-card>
    
    <el-alert
      title="Vue Flow 基础演示"
      type="success"
      description="这是Vue Flow基础流程图示例，演示了如何创建简单的流程图及其基本操作。尝试拖动节点和使用控制面板功能。"
      show-icon
      :closable="false"
    />
  </div>
</template>

<style>
/* 全局样式，因为Vue Flow需要一些特定的样式 */
.vue-flow__node {
  padding: 10px;
  border-radius: 3px;
  width: 150px;
  text-align: center;
  font-size: 14px;
}

.vue-flow__node.start-node {
  background-color: #67C23A;
  color: white;
}

.vue-flow__node.process-node {
  background-color: #409EFF;
  color: white;
}

.vue-flow__node.decision-node {
  background-color: #E6A23C;
  color: white;
}

.vue-flow__node.end-node {
  background-color: #F56C6C;
  color: white;
}

.vue-flow__edge-path {
  stroke: #b1b1b7;
  stroke-width: 2;
}

.vue-flow__edge-label {
  background-color: white;
  padding: 2px 4px;
  border-radius: 4px;
  font-size: 12px;
}
</style>

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

.flow-container {
  height: 500px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  margin-bottom: 20px;
}

.flow-viewport {
  height: 100%;
}

.flow-info {
  margin-top: 10px;
  color: #606266;
  font-size: 14px;
}

.panel-content {
  background-color: white;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.panel-btns {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}
</style> 