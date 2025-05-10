<script setup>
import { ref, onMounted } from 'vue'

// 表格数据
const tableData = ref([
  {
    date: '2023-05-03',
    name: '张三',
    address: '上海市浦东新区张江高科技园区',
    status: 'success',
    tag: '优秀'
  },
  {
    date: '2023-05-02',
    name: '李四',
    address: '北京市海淀区中关村软件园',
    status: 'warning',
    tag: '良好'
  },
  {
    date: '2023-05-01',
    name: '王五',
    address: '广州市天河区科技园',
    status: 'danger',
    tag: '一般'
  },
  {
    date: '2023-04-30',
    name: '赵六',
    address: '深圳市南山区粤海街道',
    status: 'info',
    tag: '合格'
  }
])

// 分页数据
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)
const handleSizeChange = (val) => {
  console.log(`每页 ${val} 条`)
}
const handleCurrentChange = (val) => {
  console.log(`当前页: ${val}`)
}

// 图表数据
const chartOptions = ref({
  title: {
    text: '销售数据统计',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['销售额', '利润'],
    bottom: '0'
  },
  xAxis: {
    type: 'category',
    data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '销售额',
      type: 'bar',
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: '利润',
      type: 'line',
      data: [120, 132, 101, 134, 90, 230, 210]
    }
  ]
})
</script>

<template>
  <div class="demo-container">
    <el-card class="demo-card">
      <template #header>
        <div class="card-header">
          <span>Element Plus 数据展示</span>
          <el-tag type="warning">数据组件</el-tag>
        </div>
      </template>
      
      <h3>表格组件</h3>
      <el-table :data="tableData" style="width: 100%" border stripe>
        <el-table-column prop="date" label="日期" width="180" />
        <el-table-column prop="name" label="姓名" width="180" />
        <el-table-column prop="address" label="地址" />
        <el-table-column label="状态" width="120">
          <template #default="scope">
            <el-tag :type="scope.row.status">{{ scope.row.tag }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template #default>
            <el-button size="small" type="primary">编辑</el-button>
            <el-button size="small" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>

      <el-divider content-position="center">卡片展示</el-divider>
      
      <el-row :gutter="20">
        <el-col :span="6" v-for="(o, index) in 4" :key="index">
          <el-card :body-style="{ padding: '0px' }">
            <img
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              class="image"
            />
            <div style="padding: 14px">
              <span>美食展示</span>
              <div class="bottom">
                <el-button text class="button">查看详情</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>

    <el-alert
      title="数据展示组件"
      type="warning"
      description="这是一个Element Plus数据展示组件示例，展示了表格、分页、卡片等数据展示组件的用法。"
      show-icon
      :closable="false"
      style="margin-bottom: 20px"
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

h3 {
  margin: 20px 0;
  color: #409EFF;
  font-weight: 500;
}

.pagination-container {
  margin: 20px 0;
  display: flex;
  justify-content: center;
}

.image {
  width: 100%;
  display: block;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style> 