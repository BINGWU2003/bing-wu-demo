<template>
  <DemoContainer
    title="请求管理"
    tag-type="success"
    tag-text="请求管理"
    alert-title="请求管理"
    alert-description="这是请求管理示例，演示了使用managedFetch方法处理请求竞态问题。"
  >
    <div class="container">
      <h1>managedFetch 方法示例</h1>

      <div class="comparison">
        <div class="panel managed">
          <h2>使用 managedFetch 方法</h2>
          <div class="subtitle">自动处理请求竞态，确保只显示最后一次请求的结果</div>

          <div class="controls">
            <button @click="fetchData(Math.floor(Math.random() * 100))" class="btn">
              获取新数据
            </button>
            <button @click="simulateMultipleRequests()" class="btn simulate-btn">
              模拟快速多次请求
            </button>
          </div>

          <div v-if="isLoading" class="loading">加载中...</div>
          <div v-else-if="error" class="error">{{ error }}</div>
          <div v-else class="data-list">
            <div v-for="item in dataList" :key="item.id" class="data-item">
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
              <div class="timestamp">
                {{ new Date(item.timestamp).toLocaleString() }}
              </div>
            </div>
          </div>
        </div>

        <div class="panel traditional">
          <h2>传统请求方式</h2>
          <div class="subtitle warning">没有处理请求竞态，可能导致显示错误的数据</div>

          <div class="controls">
            <button @click="fetchDataTraditional(Math.floor(Math.random() * 100))" class="btn">
              获取新数据
            </button>
            <button @click="simulateTraditionalRequests()" class="btn simulate-btn traditional-btn">
              模拟快速多次请求
            </button>
          </div>

          <div v-if="traditionalLoading" class="loading">加载中...</div>
          <div v-else-if="traditionalError" class="error">
            {{ traditionalError }}
          </div>
          <div v-else class="data-list">
            <div
              v-for="item in traditionalDataList"
              :key="item.id"
              class="data-item traditional-item"
            >
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
              <div class="timestamp">
                {{ new Date(item.timestamp).toLocaleString() }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="code-example">
        <h3>managedFetch 使用方法</h3>
        <pre>
// managedFetch方法 (Async/Await方式)
try {
  const result = await requestManager.managedFetch(async (requestId) => {
    console.log(`开始获取数据，请求ID: ${requestId}`)

    // 执行异步请求
    const response = await fetch('/api/data')
    return response.json()
  })

  // 检查这是否是最新请求结果
  if (result.isLatest) {
    console.log('显示数据:', result.data)
    updateUI(result.data)
  } else {
    console.log(`丢弃过期数据，请求ID: ${result.requestId}`)
    // 不更新UI，因为这是过期的请求
  }
} catch (error) {
  console.error('加载数据失败:', error)
}
      </pre
        >
      </div>

      <div class="note">
        <h3>请求竞态问题详解</h3>
        <p>
          <strong>什么是请求竞态问题？</strong>
          当连续发起多个异步请求时，由于网络条件等原因，
          后发出的请求可能先返回，而先发出的请求后返回。如果不加处理，会导致UI显示较旧的数据，
          而不是最新请求的结果。
        </p>
        <p>
          <strong>传统请求的问题：</strong>
          在右侧示例中，点击"模拟快速多次请求"按钮，
          会依次发送三个请求（ID为1、2、3），但它们的响应时间不同。由于没有处理请求竞态，
          界面最终会显示最后一个<em>返回</em>的请求结果，而不是最后一个<em>发送</em>的请求结果。
        </p>
        <p>
          <strong>使用managedFetch的优势：</strong>
          在左侧示例中，相同的操作会确保界面始终显示
          最后一个发送的请求（ID为3）的结果，即使它不是最后返回的。这保证了UI数据的一致性和及时性。
        </p>
      </div>
    </div>
    <template #info>
      <div class="flow-info">
        <p>提示：左边是使用managedFetch方法处理请求竞态问题，右边是传统请求方式，没有处理请求竞态问题。</p>
      </div>
    </template>
  </DemoContainer>
</template>

<script setup>
import DemoContainer from '@/components/layout/DemoContainer.vue'
import { createRequestManager } from 'bingwu-request-manager'
import { onMounted, ref } from 'vue'

// 创建请求管理器实例
const requestManager = createRequestManager()

// 数据状态 - 使用请求管理器的部分
const dataList = ref([])
const isLoading = ref(false)
const error = ref(null)

// 数据状态 - 不使用请求管理器的部分
const traditionalDataList = ref([])
const traditionalLoading = ref(false)
const traditionalError = ref(null)
const lastRequestId = ref(0) // 手动跟踪最新请求ID

// 使用managedFetch方法获取数据
const fetchData = async (id) => {
  try {
    isLoading.value = true
    error.value = null

    // 使用managedFetch方法(Async/Await方式)
    const result = await requestManager.managedFetch(async (requestId) => {
      console.log(`开始获取数据，ID: ${id}，请求ID: ${requestId}`)
      // 模拟API请求，使用不同延迟来突显竞态问题
      // 注意：这里使用id的值来设置延迟
      const delay = id === 3 ? 500 : id === 2 ? 1000 : 1500
      // 模拟API请求
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id,
            items: Array.from({ length: 5 }, (_, i) => ({
              id: i + 1,
              title: `数据项 ${i + 1}`,
              description: `这是使用 managedFetch 方法获取的数据项 ${i + 1} 的描述，请求ID: ${requestId}，数据ID: ${id}`,
              timestamp: new Date().toISOString(),
            })),
          })
        }, delay) // 模拟网络延迟
      })
    })

    // 检查请求是否是最新的
    if (result.isLatest) {
      console.log('显示最新数据:', result.data)
      dataList.value = result.data.items
    } else {
      console.log(`丢弃过期数据，请求ID: ${result.requestId}`)
      // 不更新UI，因为这是一个过期的请求
    }
  } catch (err) {
    if (error.value === null) {
      // 避免多次显示错误
      console.error('获取数据失败:', err)
      error.value = '获取数据失败，请重试'
    }
  } finally {
    isLoading.value = false
  }
}

// 不使用请求管理器直接获取数据（易导致竞态问题）
const fetchDataTraditional = async (id) => {
  // 生成一个简单的请求ID，仅用于日志
  const requestId = ++lastRequestId.value

  try {
    traditionalLoading.value = true
    traditionalError.value = null

    console.log(`[传统方式] 开始获取数据，ID: ${id}，请求ID: ${requestId}`)

    // 模拟API请求，使用不同延迟来突显竞态问题
    // 注意：这里使用id的值来设置延迟
    const delay = id === 3 ? 500 : id === 2 ? 1000 : 1500

    const response = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id,
          items: Array.from({ length: 5 }, (_, i) => ({
            id: i + 1,
            title: `传统数据项 ${i + 1}`,
            description: `这是传统方式加载的数据项 ${i + 1}，请求ID: ${requestId}，数据ID: ${id}`,
            timestamp: new Date().toISOString(),
          })),
        })
      }, delay)
    })

    // 直接更新UI，不管请求是否过期
    console.log(`[传统方式] 显示数据，ID: ${id}，请求ID: ${requestId}`)
    traditionalDataList.value = response.items
  } catch (err) {
    console.error('[传统方式] 获取数据失败:', err)
    traditionalError.value = '获取数据失败，请重试'
  } finally {
    traditionalLoading.value = false
  }
}

// 模拟快速多次请求（使用请求管理器）
const simulateMultipleRequests = () => {
  fetchData(1)
  fetchData(2)
  fetchData(3)
}

// 模拟快速多次请求（使用传统方式）
const simulateTraditionalRequests = () => {
  // 连续发起多个请求
  fetchDataTraditional(1)
  fetchDataTraditional(2)
  fetchDataTraditional(3)
}

onMounted(() => {
  fetchData(1)
  fetchDataTraditional(1)
})
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

.managed {
  border-top: 4px solid #4caf50;
}

.traditional {
  border-top: 4px solid #f44336;
}

.subtitle {
  margin-bottom: 20px;
  color: #666;
  font-size: 14px;
}

.warning {
  color: #f44336;
  font-weight: bold;
}

.controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.btn {
  padding: 8px 16px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn:hover {
  background: #45a049;
}

.simulate-btn {
  background: #2196f3;
}

.simulate-btn:hover {
  background: #0b7dda;
}

.traditional-btn {
  background: #f44336;
}

.traditional-btn:hover {
  background: #d32f2f;
}

.loading {
  color: #0066cc;
  font-weight: bold;
  padding: 20px;
  text-align: center;
}

.error {
  color: #cc0000;
  font-weight: bold;
  padding: 20px;
  text-align: center;
}

.data-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.data-item {
  background: white;
  border-radius: 6px;
  padding: 15px;
  border: 1px solid #ddd;
}

.traditional-item {
  border-left: 3px solid #f44336;
}

.data-item h3 {
  margin-top: 0;
  margin-bottom: 8px;
  color: #333;
}

.timestamp {
  color: #888;
  font-size: 12px;
  text-align: right;
  margin-top: 8px;
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

.note {
  background: #fff9c4;
  border-radius: 8px;
  padding: 20px;
  border-left: 4px solid #fbc02d;
}

.note h3 {
  margin-top: 0;
  color: #333;
}

.note p {
  margin-bottom: 15px;
  line-height: 1.5;
}

.note strong {
  color: #333;
}

.note em {
  font-style: italic;
}
</style>
