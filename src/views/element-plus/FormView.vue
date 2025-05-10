<script setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'

// 表单数据和验证规则
const formSize = ref('default')
const ruleFormRef = ref()
const ruleForm = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

const rules = reactive({
  name: [
    { required: true, message: '请输入活动名称', trigger: 'blur' },
    { min: 3, max: 5, message: '长度应为 3 到 5 个字符', trigger: 'blur' },
  ],
  region: [
    { required: true, message: '请选择活动区域', trigger: 'change' },
  ],
  date1: [
    { type: 'date', required: true, message: '请选择日期', trigger: 'change' },
  ],
  date2: [
    { type: 'date', required: true, message: '请选择时间', trigger: 'change' },
  ],
  type: [
    { type: 'array', required: true, message: '请至少选择一个活动类型', trigger: 'change' },
  ],
  resource: [
    { required: true, message: '请选择活动资源', trigger: 'change' },
  ],
  desc: [
    { required: true, message: '请填写活动形式', trigger: 'blur' },
  ],
})

// 表单操作方法
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('提交成功!')
      ElMessage.success('表单提交成功')
    } else {
      console.log('验证失败', fields)
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<template>
  <div class="demo-container">
    <el-card class="demo-card">
      <template #header>
        <div class="card-header">
          <span>Element Plus 表单组件</span>
          <el-tag type="primary">表单演示</el-tag>
        </div>
      </template>
      
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
      >
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        
        <el-form-item label="活动区域" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        
        <el-form-item label="活动时间" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker
                v-model="ruleForm.date1"
                type="date"
                label="选择日期"
                placeholder="选择日期"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col class="text-center" :span="2">
            <span class="text-gray-500">-</span>
          </el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker
                v-model="ruleForm.date2"
                label="选择时间"
                placeholder="选择时间"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-form-item>
        
        <el-form-item label="即时配送" prop="delivery">
          <el-switch v-model="ruleForm.delivery" />
        </el-form-item>
        
        <el-form-item label="活动类型" prop="type">
          <el-checkbox-group v-model="ruleForm.type">
            <el-checkbox label="线上活动" name="type" />
            <el-checkbox label="促销活动" name="type" />
            <el-checkbox label="线下活动" name="type" />
            <el-checkbox label="品牌曝光" name="type" />
          </el-checkbox-group>
        </el-form-item>
        
        <el-form-item label="特殊资源" prop="resource">
          <el-radio-group v-model="ruleForm.resource">
            <el-radio label="线上品牌商赞助" />
            <el-radio label="线下场地免费" />
          </el-radio-group>
        </el-form-item>
        
        <el-form-item label="活动形式" prop="desc">
          <el-input v-model="ruleForm.desc" type="textarea" />
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            提交
          </el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-alert
      title="表单验证"
      type="info"
      description="这是一个Element Plus表单组件演示，包含各种表单元素和验证规则。请尝试填写表单并提交。"
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

.text-center {
  text-align: center;
}

.text-gray-500 {
  color: #909399;
}
</style> 