<script setup>
import { ref, onMounted, computed } from 'vue'
import { VueFlow, useVueFlow, Panel, isNode, getBezierPath } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import '@vue-flow/controls/dist/style.css'
import '@vue-flow/minimap/dist/style.css'

// 使用Vue Flow的hooks
const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNodes, addEdges, setNodes, setEdges } = useVueFlow({
  defaultEdgeOptions: {
    animated: true,
    style: { strokeWidth: 2 }
  },
})

// 节点数据
const initialNodes = [
  {
    id: '1',
    type: 'input',
    label: '开始',
    position: { x: 250, y: 0 },
    class: 'light',
  },
  {
    id: '2',
    label: '处理',
    position: { x: 100, y: 100 },
    class: 'light',
  },
  {
    id: '3',
    label: '判断',
    position: { x: 400, y: 100 },
    class: 'light',
  },
  {
    id: '4',
    type: 'output',
    label: '结束',
    position: { x: 250, y: 200 },
    class: 'light',
  },
]

// 连线数据
const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e3-4', source: '3', target: '4' },
]

// 主题模式
const isDarkMode = ref(false)
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  
  // 更新节点样式
  setNodes(
    nodes.value.map(node => ({
      ...node,
      class: isDarkMode.value ? 'dark' : 'light',
    }))
  )
}

// 工具栏配置
const isToolbarVisible = ref(true)
const selectedNode = ref(null)

// 处理节点点击
const onNodeClick = (_, node) => {
  selectedNode.value = node
}

// 布局类型
const layoutType = ref('default')
const applyLayout = (type) => {
  layoutType.value = type
  
  // 自动布局示例
  if (type === 'horizontal') {
    const newNodes = [...initialNodes]
    newNodes[0].position = { x: 0, y: 100 }
    newNodes[1].position = { x: 200, y: 0 }
    newNodes[2].position = { x: 200, y: 200 }
    newNodes[3].position = { x: 400, y: 100 }
    setNodes(newNodes)
  } else if (type === 'vertical') {
    const newNodes = [...initialNodes]
    newNodes[0].position = { x: 200, y: 0 }
    newNodes[1].position = { x: 100, y: 150 }
    newNodes[2].position = { x: 300, y: 150 }
    newNodes[3].position = { x: 200, y: 300 }
    setNodes(newNodes)
  } else {
    setNodes(initialNodes)
  }
}

// 添加新节点
const addNewNode = () => {
  const newNode = {
    id: `node-${Date.now()}`,
    label: '新节点',
    position: {
      x: Math.random() * 300 + 50,
      y: Math.random() * 300 + 50,
    },
    class: isDarkMode.value ? 'dark' : 'light',
  }
  addNodes([newNode])
}

// 导出为图片
const exportAsImage = () => {
  const el = document.querySelector('.vue-flow')
  if (el) {
    console.log('导出流程图为图片')
    alert('图片导出功能在实际项目中需要使用html2canvas等库实现')
  }
}

// 设置样式
const graphStyles = computed(() => {
  return {
    background: isDarkMode.value ? '#1a1a1a' : '#f5f7fa',
  }
})

// 初始化
onMounted(() => {
  setNodes(initialNodes)
  setEdges(initialEdges)
})
</script>

<template>
  <div class="demo-container">
    <el-card class="demo-card">
      <template #header>
        <div class="card-header">
          <span>Vue Flow 高级功能</span>
          <el-tag type="danger">高级演示</el-tag>
        </div>
      </template>

      <div class="toolbar">
        <el-button-group>
          <el-button :type="layoutType === 'default' ? 'primary' : ''" @click="applyLayout('default')">默认布局</el-button>
          <el-button :type="layoutType === 'horizontal' ? 'primary' : ''" @click="applyLayout('horizontal')">水平布局</el-button>
          <el-button :type="layoutType === 'vertical' ? 'primary' : ''" @click="applyLayout('vertical')">垂直布局</el-button>
        </el-button-group>
        
        <div>
          <el-button type="success" @click="addNewNode">添加节点</el-button>
          <el-button type="warning" @click="exportAsImage">导出图片</el-button>
          <el-switch
            v-model="isDarkMode"
            active-text="暗色主题"
            inactive-text="亮色主题"
            @change="toggleTheme"
          />
        </div>
      </div>

      <div class="flow-container" :style="graphStyles">
        <VueFlow 
          @node-click="onNodeClick"
          @connect="onConnect"
          @nodes-change="onNodesChange"
          @edges-change="onEdgesChange"
          class="flow-viewport"
          :default-zoom="1.5"
          :min-zoom="0.2"
          :max-zoom="4"
          fit-view-on-init
        >
          <Background :pattern-color="isDarkMode ? '#444' : '#aaa'" gap="8" />
          <MiniMap />
          <Controls />
          <NodeToolbar v-if="isToolbarVisible && selectedNode">
            <div class="node-toolbar">
              <el-button size="small" type="danger">删除</el-button>
              <el-button size="small" type="primary">编辑</el-button>
              <el-button size="small">复制</el-button>
            </div>
          </NodeToolbar>
          <Panel position="top-right">
            <div class="panel-content">
              <h4>高级流程图</h4>
              <p>演示各种布局和主题</p>
              <el-checkbox v-model="isToolbarVisible">显示工具栏</el-checkbox>
            </div>
          </Panel>
        </VueFlow>
      </div>
      
      <el-alert
        title="特性演示"
        type="info"
        style="margin-top: 20px"
      >
        <template #default>
          <p>本示例演示了Vue Flow的以下高级特性：</p>
          <ol>
            <li>自动布局 - 切换不同布局模式</li>
            <li>主题切换 - 亮色和暗色主题</li>
            <li>节点工具栏 - 点击节点时显示</li>
            <li>动态添加节点</li>
            <li>导出图片功能</li>
          </ol>
        </template>
      </el-alert>
    </el-card>
  </div>
</template>

<style>
/* 全局样式 */
.vue-flow__node {
  padding: 10px 20px;
  border-radius: 5px;
  text-align: center;
  width: auto;
  min-width: 150px;
  font-size: 14px;
  font-weight: 500;
}

.vue-flow__node.light {
  background-color: white;
  color: #303133;
  border: 1px solid #dcdfe6;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.vue-flow__node.dark {
  background-color: #363636;
  color: #e1e1e1;
  border: 1px solid #4a4a4a;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
}

.vue-flow__node-input.light {
  background-color: #67C23A;
  border-color: #67C23A;
  color: white;
}

.vue-flow__node-output.light {
  background-color: #F56C6C;
  border-color: #F56C6C;
  color: white;
}

.vue-flow__node-input.dark {
  background-color: #447d2d;
  border-color: #447d2d;
  color: white;
}

.vue-flow__node-output.dark {
  background-color: #a24545;
  border-color: #a24545;
  color: white;
}

.node-toolbar {
  padding: 5px;
  border-radius: 4px;
  display: flex;
  gap: 5px;
  background-color: white;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
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

.toolbar {
  margin-bottom: 15px;
  padding: 10px 0;
  border-bottom: 1px solid #ebeef5;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.flow-container {
  height: 600px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  margin-bottom: 20px;
  transition: all 0.3s;
}

.flow-viewport {
  height: 100%;
}

.panel-content {
  background-color: white;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style> 