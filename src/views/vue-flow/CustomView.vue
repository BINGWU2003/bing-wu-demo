<script setup>
import { ref, onMounted, h } from 'vue'
import { VueFlow, useVueFlow, Panel, Handle, Position } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import '@vue-flow/controls/dist/style.css'
import '@vue-flow/minimap/dist/style.css'

// 自定义节点组件 - 任务节点
const TaskNode = {
  props: ['data', 'id'],
  setup(props) {
    const progress = ref(props.data?.progress || 0)
    
    return () => h('div', { class: 'task-node' }, [
      h(Handle, { 
        type: 'target', 
        position: Position.Top 
      }),
      h('div', { class: 'task-header' }, [
        h('div', { class: 'task-title' }, props.data?.label || '任务'),
        h('div', { class: 'task-badge' }, props.data?.status || '未开始'),
      ]),
      h('div', { class: 'task-body' }, [
        h('el-progress', { 
          percentage: progress.value,
          'stroke-width': 10,
          'text-inside': true,
          status: props.data?.progressStatus || 'primary'
        }),
        h('div', { class: 'task-meta' }, [
          h('span', null, `优先级: ${props.data?.priority || '中'}`),
          h('span', null, `负责人: ${props.data?.owner || '未分配'}`),
        ]),
      ]),
      h(Handle, { 
        type: 'source', 
        position: Position.Bottom 
      }),
    ])
  }
}

// 自定义节点组件 - 条件节点
const ConditionNode = {
  props: ['data', 'id'],
  setup(props) {
    return () => h('div', { class: 'condition-node' }, [
      h(Handle, { 
        type: 'target', 
        position: Position.Top 
      }),
      h('div', { class: 'condition-content' }, [
        h('i', { class: 'el-icon-warning' }),
        h('div', null, props.data?.label || '条件判断'),
      ]),
      h('div', { class: 'condition-options' }, [
        h('div', null, [
          h('span', { class: 'option-label' }, '是'),
          h(Handle, { 
            type: 'source', 
            position: Position.Bottom,
            id: 'yes',
            style: { left: '25%' }
          }),
        ]),
        h('div', null, [
          h('span', { class: 'option-label' }, '否'),
          h(Handle, { 
            type: 'source', 
            position: Position.Bottom,
            id: 'no',
            style: { left: '75%' }
          }),
        ]),
      ]),
    ])
  }
}

// 使用Vue Flow的hooks
const { nodes, edges, onConnect, addEdges, setNodes, setEdges } = useVueFlow({
  defaultEdgeOptions: {
    animated: true,
  },
})

// 注册自定义节点类型
const nodeTypes = {
  task: TaskNode,
  condition: ConditionNode,
}

// 定义初始节点
const initialNodes = [
  { 
    id: '1', 
    type: 'task', 
    position: { x: 250, y: 5 }, 
    data: { 
      label: '需求分析', 
      status: '已完成', 
      progress: 100,
      progressStatus: 'success',
      priority: '高',
      owner: '张三'
    }
  },
  { 
    id: '2', 
    type: 'task', 
    position: { x: 250, y: 120 }, 
    data: { 
      label: '设计方案', 
      status: '进行中', 
      progress: 60,
      progressStatus: '',
      priority: '中',
      owner: '李四'
    }
  },
  { 
    id: '3', 
    type: 'condition', 
    position: { x: 250, y: 250 }, 
    data: { label: '方案是否通过?' }
  },
  { 
    id: '4', 
    type: 'task', 
    position: { x: 100, y: 350 }, 
    data: { 
      label: '修改设计', 
      status: '未开始', 
      progress: 0,
      progressStatus: 'exception',
      priority: '高',
      owner: '李四'
    }
  },
  { 
    id: '5', 
    type: 'task', 
    position: { x: 400, y: 350 }, 
    data: { 
      label: '开始实施', 
      status: '未开始', 
      progress: 0,
      progressStatus: 'warning',
      priority: '中',
      owner: '王五'
    }
  },
]

// 定义初始连线
const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', label: '下一步' },
  { id: 'e2-3', source: '2', target: '3', label: '评审' },
  { id: 'e3-4', source: '3', target: '4', label: '需修改', sourceHandle: 'no' },
  { id: 'e3-5', source: '3', target: '5', label: '已通过', sourceHandle: 'yes' },
  { id: 'e4-2', source: '4', target: '2', label: '重新设计', type: 'step' },
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
          <span>Vue Flow 自定义节点</span>
          <el-tag type="primary">高级流程图</el-tag>
        </div>
      </template>

      <div class="flow-container">
        <VueFlow 
          @connect="handleConnect"
          class="flow-viewport"
          :default-zoom="1"
          :min-zoom="0.2"
          :max-zoom="4"
          :node-types="nodeTypes"
        >
          <Background pattern-color="#aaa" gap="8" />
          <MiniMap />
          <Controls />
          <Panel position="top-right">
            <div class="panel-content">
              <h4>项目流程图</h4>
              <p>这是一个使用自定义节点的项目流程示例</p>
              <div class="panel-btns">
                <el-button size="small" type="primary">导出流程</el-button>
                <el-button size="small" type="success">保存</el-button>
              </div>
            </div>
          </Panel>
        </VueFlow>
      </div>
      
      <div class="flow-info">
        <p><strong>节点说明：</strong></p>
        <el-descriptions :column="2" border>
          <el-descriptions-item label="任务节点">显示任务详情和进度</el-descriptions-item>
          <el-descriptions-item label="条件节点">决策点，有"是"和"否"两个出口</el-descriptions-item>
        </el-descriptions>
      </div>
    </el-card>
    
    <el-alert
      title="Vue Flow 自定义节点演示"
      type="primary"
      description="这是Vue Flow自定义节点示例，展示了如何创建和使用自定义节点来构建更复杂的流程图。"
      show-icon
      :closable="false"
    />
  </div>
</template>

<style>
/* 自定义节点样式 */
.task-node {
  width: 200px;
  background-color: white;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 0;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.task-header {
  background-color: #f5f7fa;
  padding: 8px 12px;
  border-bottom: 1px solid #e4e7ed;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-title {
  font-weight: bold;
  color: #303133;
}

.task-badge {
  font-size: 12px;
  padding: 2px 6px;
  background-color: #409EFF;
  color: white;
  border-radius: 10px;
}

.task-body {
  padding: 12px;
}

.task-meta {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 12px;
  color: #606266;
}

.condition-node {
  width: 160px;
  background-color: #fdf6ec;
  border: 1px solid #faecd8;
  border-radius: 4px;
  padding: 10px;
  text-align: center;
}

.condition-content {
  margin-bottom: 10px;
  font-weight: bold;
  color: #e6a23c;
}

.condition-options {
  display: flex;
  justify-content: space-around;
  position: relative;
}

.option-label {
  font-size: 12px;
  background-color: #e6a23c;
  color: white;
  padding: 1px 8px;
  border-radius: 10px;
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
  height: 600px;
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