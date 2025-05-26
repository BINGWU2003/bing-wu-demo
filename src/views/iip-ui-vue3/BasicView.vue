<template>
  <DemoContainer title="IIP-UI 组件示例" tag-type="primary" tag-text="组件演示" alert-title="组件库演示"
    alert-description="这是IIP-UI组件库的示例，演示了Button和Select组件的基本用法。">
    <div class="container">
      <h1>IIP-UI 组件库使用示例</h1>

      <div class="comparison">
        <div class="panel button-panel">
          <h2>IipButton 组件</h2>
          <div class="subtitle">扩展了Element Plus的Button组件，增加了确认功能</div>

          <div class="component-showcase">
            <div class="component-row">
              <h3>基本用法</h3>
              <IipButton>默认按钮</IipButton>
              <IipButton type="primary">主要按钮</IipButton>
              <IipButton type="success">成功按钮</IipButton>
              <IipButton type="warning">警告按钮</IipButton>
              <IipButton type="danger">危险按钮</IipButton>
              <IipButton type="info">信息按钮</IipButton>
            </div>

            <div class="component-row">
              <h3>带图标的按钮</h3>
              <IipButton icon="Search">搜索</IipButton>
              <IipButton icon="Edit" type="primary">编辑</IipButton>
              <IipButton icon="Check" type="success">确认</IipButton>
              <IipButton icon="Delete" type="danger">删除</IipButton>
            </div>

            <div class="component-row">
              <h3>确认功能</h3>
              <IipButton type="danger" confirm confirm-type="warning" confirm-title="确认删除"
                confirm-content="此操作将永久删除该数据, 是否继续?" @confirm="handleConfirm">
                删除（带确认）
              </IipButton>

              <IipButton type="warning" confirm @confirm="handleConfirm">
                默认确认
              </IipButton>
            </div>

            <div class="component-row">
              <h3>加载状态</h3>
              <IipButton :loading="loading" @click="toggleLoading">
                {{ loading ? '加载中' : '点击加载' }}
              </IipButton>

              <IipButton type="primary" :loading="submitLoading" @click="handleSubmit">
                提交
              </IipButton>
            </div>
          </div>
        </div>

        <div class="panel select-panel">
          <h2>IipSelect 组件</h2>
          <div class="subtitle">扩展了Element Plus的Select组件，增加了更多便捷特性</div>

          <div class="component-showcase">
            <div class="component-row">
              <h3>基本用法</h3>
              <IipSelect v-model="selected" placeholder="请选择" :options-source="options" />
              <div class="result">选中值: {{ selected }}</div>
            </div>

            <div class="component-row">
              <h3>多选用法</h3>
              <IipSelect v-model="multiSelected" multiple placeholder="请选择多个选项" style="width: 100%;"
                :options-source="options" />
              <div class="result">选中值: {{ multiSelected }}</div>
            </div>

            <div class="component-row">
              <h3>可过滤选项</h3>
              <IipSelect v-model="filteredSelected" filterable placeholder="请输入关键词" style="width: 100%;"
                :options-source="moreOptions" />
              <div class="result">选中值: {{ filteredSelected }}</div>
            </div>

            <div class="component-row">
              <h3>远程搜索</h3>
              <IipSelect v-model="remoteSelected" filterable remote :remote-method="remoteMethod"
                :loading="remoteLoading" placeholder="请输入关键词进行搜索" style="width: 100%;"
                :options-source="remoteOptions" />
              <div class="result">选中值: {{ remoteSelected }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="code-example">
        <h3>代码示例</h3>
        <pre>
          // IipButton 示例代码
          &lt;IipButton type="primary"&gt;主要按钮&lt;/IipButton&gt;

          &lt;IipButton
          type="danger"
          confirm
          confirm-type="warning"
          confirm-title="确认删除"
          confirm-content="此操作将永久删除该数据, 是否继续?"
          @confirm="handleConfirm"
          &gt;
          删除（带确认）
          &lt;/IipButton&gt;

          // IipSelect 示例代码
          &lt;IipSelect v-model="selected" placeholder="请选择"&gt;
          &lt;IipOption
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          /&gt;
          &lt;/IipSelect&gt;
        </pre>
      </div>
    </div>
    <template #info>
      <div class="flow-info">
        <p>提示：本页面展示了IIP-UI组件库中Button和Select组件的基本用法和特性。</p>
      </div>
    </template>
  </DemoContainer>
</template>

<script setup>
import DemoContainer from '@/components/layout/DemoContainer.vue'
import { ref } from 'vue'

// Button 相关状态
const loading = ref(false)
const submitLoading = ref(false)

// Select 相关状态
const selected = ref('')
const multiSelected = ref([])
const filteredSelected = ref('')
const remoteSelected = ref('')
const remoteLoading = ref(false)
const remoteOptions = ref([])

// 基础选项数据
const options = ref([
  { value: 'option1', label: '选项1' },
  { value: 'option2', label: '选项2' },
  { value: 'option3', label: '选项3' },
  { value: 'option4', label: '选项4' },
  { value: 'option5', label: '选项5' }
])

// 更多选项数据（用于过滤示例）
const moreOptions = ref([
  { value: 'beijing', label: '北京' },
  { value: 'shanghai', label: '上海' },
  { value: 'guangzhou', label: '广州' },
  { value: 'shenzhen', label: '深圳' },
  { value: 'hangzhou', label: '杭州' },
  { value: 'nanjing', label: '南京' },
  { value: 'chengdu', label: '成都' },
  { value: 'wuhan', label: '武汉' },
  { value: 'xiamen', label: '厦门' },
  { value: 'suzhou', label: '苏州' }
])

// 全部城市数据（用于远程搜索示例）
const allCities = [
  { value: 'beijing', label: '北京' },
  { value: 'shanghai', label: '上海' },
  { value: 'guangzhou', label: '广州' },
  { value: 'shenzhen', label: '深圳' },
  { value: 'hangzhou', label: '杭州' },
  { value: 'nanjing', label: '南京' },
  { value: 'chengdu', label: '成都' },
  { value: 'wuhan', label: '武汉' },
  { value: 'xiamen', label: '厦门' },
  { value: 'suzhou', label: '苏州' },
  { value: 'tianjin', label: '天津' },
  { value: 'chongqing', label: '重庆' },
  { value: 'qingdao', label: '青岛' },
  { value: 'dalian', label: '大连' },
  { value: 'ningbo', label: '宁波' },
  { value: 'zhengzhou', label: '郑州' },
  { value: 'dongguan', label: '东莞' },
  { value: 'kunming', label: '昆明' },
  { value: 'changsha', label: '长沙' },
  { value: 'hefei', label: '合肥' }
]

// Button 相关方法
const toggleLoading = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}

const handleSubmit = () => {
  submitLoading.value = true
  setTimeout(() => {
    submitLoading.value = false
  }, 2000)
}

const handleConfirm = () => {
  console.log('用户确认了操作')
  // 执行相应的操作
}

// Select 相关方法
const remoteMethod = (query) => {
  if (query === '') {
    remoteOptions.value = []
    return
  }

  remoteLoading.value = true

  // 模拟远程搜索
  setTimeout(() => {
    remoteLoading.value = false
    remoteOptions.value = allCities.filter(item => {
      return item.label.toLowerCase().includes(query.toLowerCase())
    })
  }, 1000)
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.comparison {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

@media (max-width: 900px) {
  .comparison {
    flex-direction: column;
  }
}

.panel {
  flex: 1;
  background: #f8f8f8;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.button-panel {
  border-top: 4px solid #409eff;
}

.select-panel {
  border-top: 4px solid #67c23a;
}

.subtitle {
  margin-bottom: 20px;
  color: #666;
  font-size: 14px;
}

.component-showcase {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.component-row {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: white;
  padding: 15px;
  border-radius: 6px;
  border: 1px solid #ddd;
}

.component-row h3 {
  margin: 0 0 10px 0;
  font-size: 16px;
  color: #333;
}

.component-row> :deep(.iip-button) {
  margin-right: 10px;
  margin-bottom: 10px;
}

.result {
  margin-top: 10px;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 14px;
  color: #666;
}

.code-example {
  background: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 30px;
}

.code-example h3 {
  margin: 0;
  padding: 10px 15px;
  background: #333;
  color: white;
  font-size: 16px;
}

.code-example pre {
  margin: 0;
  padding: 15px;
  overflow-x: auto;
  font-family: monospace;
  font-size: 14px;
  line-height: 1.5;
  background: #f8f8f8;
}

.flow-info {
  font-size: 14px;
  color: #666;
}
</style>