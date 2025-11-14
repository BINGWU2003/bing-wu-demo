<template>
  <div class="vxe-table-demo">
    <h2>VXE Grid 完整示例（包含编辑模式）</h2>
    <div class="demo-tips">
      <p><strong>编辑功能说明：</strong></p>
      <ul>
        <li>点击单元格即可编辑（姓名、角色、性别、年龄、地址列支持编辑）</li>
        <li>使用方向键、Tab键、Enter键可在单元格间切换</li>
        <li>点击"插入行"按钮可快速插入一行并进入编辑状态</li>
        <li>点击操作列的"编辑行"按钮可激活整行编辑</li>
        <li>编辑后点击"保存修改"按钮统一保存所有更改</li>
        <li>支持获取新增、修改、删除的数据记录</li>
      </ul>
    </div>
    <vxe-grid ref="gridRef" v-bind="gridOptions" v-on="gridEvents">
      <!-- 自定义工具栏按钮 -->
      <template #toolbar_buttons>
        <vxe-button status="primary" icon="vxe-icon-square-plus" @click="insertEvent"
          >新增</vxe-button
        >
        <vxe-button status="success" @click="insertRowEvent">插入行</vxe-button>
        <vxe-button status="info" @click="saveEvent">保存修改</vxe-button>
        <vxe-button icon="vxe-icon-delete" @click="removeSelectEvent">删除选中</vxe-button>
        <vxe-button @click="getSelectEvent">获取选中</vxe-button>
        <vxe-button @click="getInsertEvent">获取新增</vxe-button>
        <vxe-button @click="getRemoveEvent">获取删除</vxe-button>
        <vxe-button @click="getUpdateEvent">获取修改</vxe-button>
      </template>

      <!-- 自定义操作列插槽 -->
      <template #operate="{ row }">
        <vxe-button mode="text" status="primary" @click="editEvent(row)">编辑表单</vxe-button>
        <vxe-button mode="text" status="success" @click="editRowEvent(row)">编辑行</vxe-button>
        <vxe-button mode="text" status="danger" @click="removeEvent(row)">删除</vxe-button>
      </template>

      <!-- 自定义状态列插槽 -->
      <template #status="{ row }">
        <vxe-tag :status="row.status === 1 ? 'success' : 'error'">
          {{ row.status === 1 ? '启用' : '禁用' }}
        </vxe-tag>
      </template>
    </vxe-grid>

    <!-- 编辑弹窗 -->
    <vxe-modal
      v-model="showEdit"
      title="编辑数据"
      width="600"
      :loading="submitLoading"
      resize
      show-footer
      show-confirm-button
      show-cancel-button
      show-maximize
      @confirm="submitEvent"
    >
      <template #default>
        <vxe-form ref="formRef" :data="formData" :rules="formRules">
          <vxe-form-item field="name" title="姓名" span="24" :item-render="{}">
            <template #default="{ data }">
              <vxe-input v-model="data.name" placeholder="请输入姓名"></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item field="role" title="角色" span="24" :item-render="{}">
            <template #default="{ data }">
              <vxe-select v-model="data.role" placeholder="请选择角色">
                <vxe-option value="Develop" label="开发"></vxe-option>
                <vxe-option value="Test" label="测试"></vxe-option>
                <vxe-option value="PM" label="产品"></vxe-option>
                <vxe-option value="Designer" label="设计"></vxe-option>
              </vxe-select>
            </template>
          </vxe-form-item>
          <vxe-form-item field="sex" title="性别" span="24" :item-render="{}">
            <template #default="{ data }">
              <vxe-radio-group v-model="data.sex">
                <vxe-radio label="Man" content="男"></vxe-radio>
                <vxe-radio label="Women" content="女"></vxe-radio>
              </vxe-radio-group>
            </template>
          </vxe-form-item>
          <vxe-form-item field="age" title="年龄" span="24" :item-render="{}">
            <template #default="{ data }">
              <vxe-input v-model="data.age" type="number" placeholder="请输入年龄"></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item field="address" title="地址" span="24" :item-render="{}">
            <template #default="{ data }">
              <vxe-input v-model="data.address" placeholder="请输入地址"></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item field="status" title="状态" span="24" :item-render="{}">
            <template #default="{ data }">
              <vxe-switch v-model="data.status" :open-value="1" :close-value="0"></vxe-switch>
            </template>
          </vxe-form-item>
        </vxe-form>
      </template>
    </vxe-modal>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick } from 'vue'
import { VxeUI } from 'vxe-pc-ui'

const gridRef = ref()
const formRef = ref()
const showEdit = ref(false)
const submitLoading = ref(false)

// 表单数据
const formData = reactive({
  id: null,
  name: '',
  role: '',
  sex: '',
  age: null,
  address: '',
  status: 1,
})

// 表单验证规则
const formRules = {
  name: [{ required: true, message: '请输入姓名' }],
  role: [{ required: true, message: '请选择角色' }],
  sex: [{ required: true, message: '请选择性别' }],
  age: [{ required: true, message: '请输入年龄' }],
}

// 模拟数据
const mockData = [
  {
    id: 10001,
    name: '张三',
    role: 'Develop',
    sex: 'Man',
    age: 28,
    address: '广州天河区',
    status: 1,
  },
  {
    id: 10002,
    name: '李四',
    role: 'Test',
    sex: 'Women',
    age: 22,
    address: '深圳南山区',
    status: 1,
  },
  { id: 10003, name: '王五', role: 'PM', sex: 'Man', age: 32, address: '上海浦东新区', status: 0 },
  {
    id: 10004,
    name: '赵六',
    role: 'Designer',
    sex: 'Women',
    age: 23,
    address: '北京朝阳区',
    status: 1,
  },
  {
    id: 10005,
    name: '钱七',
    role: 'Develop',
    sex: 'Women',
    age: 30,
    address: '杭州西湖区',
    status: 1,
  },
  {
    id: 10006,
    name: '孙八',
    role: 'Designer',
    sex: 'Women',
    age: 21,
    address: '成都武侯区',
    status: 0,
  },
  { id: 10007, name: '周九', role: 'Test', sex: 'Man', age: 29, address: '南京鼓楼区', status: 1 },
  {
    id: 10008,
    name: '吴十',
    role: 'Develop',
    sex: 'Man',
    age: 35,
    address: '武汉江汉区',
    status: 1,
  },
  {
    id: 10009,
    name: '郑十一',
    role: 'PM',
    sex: 'Women',
    age: 27,
    address: '西安雁塔区',
    status: 1,
  },
  {
    id: 10010,
    name: '陈十二',
    role: 'Test',
    sex: 'Man',
    age: 26,
    address: '重庆渝中区',
    status: 0,
  },
]

// 表格配置
const gridOptions = reactive({
  border: true, // 边框
  stripe: true, // 斑马纹
  resizable: true, // 列宽拖动
  showOverflow: true, // 超出隐藏
  height: 600, // 表格高度
  loading: false, // 加载状态
  align: 'center', // 对齐方式

  // 行配置
  rowConfig: {
    isCurrent: true, // 高亮当前行
    isHover: true, // 悬停高亮
    keyField: 'id', // 行唯一键
  },

  // 列配置
  columnConfig: {
    resizable: true, // 列宽拖动
  },

  // 复选框配置
  checkboxConfig: {
    labelField: 'name',
    highlight: true,
    range: true, // 范围选择
  },

  // 排序配置
  sortConfig: {
    trigger: 'cell', // 点击表头排序
    multiple: true, // 多字段排序
    defaultSort: { field: 'id', order: 'asc' },
  },

  // 筛选配置
  filterConfig: {
    remote: false, // 本地筛选
  },

  // 编辑配置
  editConfig: {
    trigger: 'click', // 触发方式：click-点击激活编辑，dblclick-双击激活编辑，manual-手动激活编辑
    mode: 'cell', // 编辑模式：cell-单元格编辑，row-行编辑
    showStatus: true, // 显示编辑状态
    showUpdateStatus: true, // 显示更新状态
    showInsertStatus: true, // 显示新增状态
    autoClear: true, // 自动清除编辑状态
  },

  // 键盘配置
  keyboardConfig: {
    isArrow: true, // 方向键移动
    isDel: true, // 删除键删除
    isEnter: true, // 回车键换行
    isTab: true, // Tab键换行
    isEdit: true, // 编辑
    isClip: true, // 复制粘贴
  },

  // 工具栏配置
  toolbarConfig: {
    slots: {
      buttons: 'toolbar_buttons',
    },
    refresh: true, // 刷新按钮
    export: true, // 导出按钮
    print: true, // 打印按钮
    zoom: true, // 最大化按钮
    custom: true, // 自定义列按钮
  },

  // 导出配置
  exportConfig: {
    type: 'csv',
    types: ['csv', 'html', 'xml', 'txt'],
  },

  // 打印配置
  printConfig: {},

  // 分页配置
  pagerConfig: {
    enabled: true,
    pageSize: 10,
    pageSizes: [5, 10, 20, 50, 100],
    layouts: [
      'PrevJump',
      'PrevPage',
      'Number',
      'NextPage',
      'NextJump',
      'Sizes',
      'FullJump',
      'Total',
    ],
  },

  // 列定义
  columns: [
    { type: 'checkbox', width: 60, fixed: 'left' },
    { type: 'seq', width: 70, title: '序号' },
    {
      field: 'name',
      title: '姓名',
      width: 120,
      sortable: true,
      filters: [{ data: '' }],
      filterMethod: ({ option, row }) => {
        return row.name.includes(option.data)
      },
      editRender: {
        name: 'VxeInput',
        props: { placeholder: '请输入姓名' },
      },
    },
    {
      field: 'role',
      title: '角色',
      width: 120,
      sortable: true,
      filters: [
        { label: '开发', value: 'Develop' },
        { label: '测试', value: 'Test' },
        { label: '产品', value: 'PM' },
        { label: '设计', value: 'Designer' },
      ],
      filterMultiple: true,
      editRender: {
        name: 'VxeSelect',
        options: [
          { label: '开发', value: 'Develop' },
          { label: '测试', value: 'Test' },
          { label: '产品', value: 'PM' },
          { label: '设计', value: 'Designer' },
        ],
        props: { placeholder: '请选择角色' },
      },
    },
    {
      field: 'sex',
      title: '性别',
      width: 120,
      filters: [
        { label: '男', value: 'Man' },
        { label: '女', value: 'Women' },
      ],
      formatter: ({ cellValue }) => {
        return cellValue === 'Man' ? '男' : '女'
      },
      editRender: {
        name: 'VxeSelect',
        options: [
          { label: '男', value: 'Man' },
          { label: '女', value: 'Women' },
        ],
        props: { placeholder: '请选择性别' },
      },
    },
    {
      field: 'age',
      title: '年龄',
      width: 100,
      sortable: true,
      editRender: {
        name: 'VxeInput',
        props: { type: 'number', placeholder: '请输入年龄' },
      },
    },
    {
      field: 'address',
      title: '地址',
      minWidth: 200,
      showOverflow: true,
      editRender: {
        name: 'VxeInput',
        props: { placeholder: '请输入地址' },
      },
    },
    {
      field: 'status',
      title: '状态',
      width: 100,
      slots: { default: 'status' },
      filters: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 },
      ],
    },
    {
      title: '操作',
      width: 150,
      fixed: 'right',
      slots: { default: 'operate' },
    },
  ],

  // 数据
  data: [...mockData],

  // 代理配置（用于服务端数据加载）
  // proxyConfig: {
  //   ajax: {
  //     query: ({ page, sorts, filters, form }) => {
  //       // 这里可以调用后端接口
  //       return Promise.resolve({
  //         result: mockData,
  //         page: { total: mockData.length }
  //       })
  //     }
  //   }
  // }
})

// 表格事件
const gridEvents = {
  // 页码改变
  pageChange({ currentPage, pageSize }) {
    console.log('页码改变', currentPage, pageSize)
  },

  // 复选框改变
  checkboxChange({ records }) {
    console.log('复选框改变', records)
  },

  // 当前行改变
  currentChange({ row }) {
    console.log('当前行改变', row)
  },

  // 单元格点击
  cellClick({ row, column }) {
    console.log('单元格点击', row, column)
  },

  // 排序改变
  sortChange({ sortList }) {
    console.log('排序改变', sortList)
  },

  // 筛选改变
  filterChange({ filterList }) {
    console.log('筛选改变', filterList)
  },

  // 工具栏按钮点击
  toolbarButtonClick({ code }) {
    console.log('工具栏按钮点击', code)
  },

  // 自定义列改变
  toolbarCustomChange({ columns }) {
    console.log('自定义列改变', columns)
  },

  // 编辑激活事件
  editActived({ row, column }) {
    console.log('编辑激活', row, column)
  },

  // 编辑关闭事件
  editClosed({ row, column }) {
    console.log('编辑关闭', row, column)
  },

  // 编辑完成事件
  editDisabled({ row, column }) {
    console.log('编辑完成', row, column)
  },
}

// 新增事件
const insertEvent = async () => {
  Object.assign(formData, {
    id: null,
    name: '',
    role: '',
    sex: '',
    age: null,
    address: '',
    status: 1,
  })
  showEdit.value = true
  await nextTick()
  formRef.value.clearValidate()
}

// 编辑事件
const editEvent = async (row) => {
  Object.assign(formData, { ...row })
  showEdit.value = true
  await nextTick()
  formRef.value.clearValidate()
}

// 删除事件
const removeEvent = async (row) => {
  const type = await VxeUI.modal.confirm('确定要删除该数据吗？')
  if (type === 'confirm') {
    const $grid = gridRef.value
    await $grid.remove(row)
    VxeUI.modal.message({ content: '删除成功', status: 'success' })
  }
}

// 删除选中
const removeSelectEvent = async () => {
  const $grid = gridRef.value
  const selectRecords = $grid.getCheckboxRecords()
  if (selectRecords.length === 0) {
    VxeUI.modal.message({ content: '请选择要删除的数据', status: 'warning' })
    return
  }
  const type = await VxeUI.modal.confirm(`确定要删除选中的 ${selectRecords.length} 条数据吗？`)
  if (type === 'confirm') {
    await $grid.remove(selectRecords)
    VxeUI.modal.message({ content: '删除成功', status: 'success' })
  }
}

// 获取选中
const getSelectEvent = () => {
  const $grid = gridRef.value
  const selectRecords = $grid.getCheckboxRecords()
  VxeUI.modal.alert(`已选中 ${selectRecords.length} 条数据`)
  console.log('选中的数据：', selectRecords)
}

// 提交表单
const submitEvent = async () => {
  const $form = formRef.value
  const errMap = await $form.validate()
  if (errMap) {
    return
  }

  submitLoading.value = true
  // 模拟请求
  setTimeout(async () => {
    const $grid = gridRef.value
    if (formData.id) {
      // 编辑
      const row = $grid.getData().find((item) => item.id === formData.id)
      if (row) {
        Object.assign(row, formData)
        await $grid.updateData()
      }
      VxeUI.modal.message({ content: '编辑成功', status: 'success' })
    } else {
      // 新增
      const newRow = {
        ...formData,
        id: Date.now(), // 生成临时ID
      }
      await $grid.insert(newRow)
      VxeUI.modal.message({ content: '新增成功', status: 'success' })
    }

    submitLoading.value = false
    showEdit.value = false
  }, 500)
}

// 插入一行（可编辑）
const insertRowEvent = async () => {
  const $grid = gridRef.value
  const { row: newRow } = await $grid.insert({
    name: '',
    role: '',
    sex: '',
    age: null,
    address: '',
    status: 1,
  })
  // 插入后激活第一个单元格编辑
  await $grid.setEditCell(newRow, 'name')
}

// 编辑行
const editRowEvent = async (row) => {
  const $grid = gridRef.value
  // 激活行编辑
  await $grid.setEditRow(row)
}

// 保存修改
const saveEvent = async () => {
  const $grid = gridRef.value
  const { insertRecords, removeRecords, updateRecords } = $grid.getRecordset()

  if (insertRecords.length === 0 && removeRecords.length === 0 && updateRecords.length === 0) {
    VxeUI.modal.message({ content: '没有需要保存的数据', status: 'info' })
    return
  }

  const type = await VxeUI.modal.confirm(
    `新增: ${insertRecords.length} 条, 修改: ${updateRecords.length} 条, 删除: ${removeRecords.length} 条，确定要保存吗？`,
  )
  if (type === 'confirm') {
    gridOptions.loading = true
    // 模拟请求
    setTimeout(() => {
      gridOptions.loading = false
      // 清空编辑状态
      $grid.clearEdit()
      VxeUI.modal.message({ content: '保存成功！', status: 'success' })
      console.log('保存的数据：', { insertRecords, removeRecords, updateRecords })
    }, 500)
  }
}

// 获取新增的数据
const getInsertEvent = () => {
  const $grid = gridRef.value
  const insertRecords = $grid.getInsertRecords()
  VxeUI.modal.alert(`获取到 ${insertRecords.length} 条新增数据`)
  console.log('新增的数据：', insertRecords)
}

// 获取删除的数据
const getRemoveEvent = () => {
  const $grid = gridRef.value
  const removeRecords = $grid.getRemoveRecords()
  VxeUI.modal.alert(`获取到 ${removeRecords.length} 条删除数据`)
  console.log('删除的数据：', removeRecords)
}

// 获取修改的数据
const getUpdateEvent = () => {
  const $grid = gridRef.value
  const updateRecords = $grid.getUpdateRecords()
  VxeUI.modal.alert(`获取到 ${updateRecords.length} 条修改数据`)
  console.log('修改的数据：', updateRecords)
}
</script>

<style scoped>
.vxe-table-demo {
  padding: 20px;
}

.vxe-table-demo h2 {
  margin-bottom: 15px;
  color: #333;
}

.demo-tips {
  background: #f5f7fa;
  border-left: 4px solid #409eff;
  padding: 15px 20px;
  margin-bottom: 20px;
  border-radius: 4px;
}

.demo-tips p {
  margin: 0 0 10px 0;
  color: #303133;
  font-size: 14px;
}

.demo-tips ul {
  margin: 0;
  padding-left: 20px;
}

.demo-tips li {
  color: #606266;
  font-size: 13px;
  line-height: 1.8;
  margin: 5px 0;
}
</style>
