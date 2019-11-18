<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="参数名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button v-if="isAuth('zhyj:evmonitormicroclimatesite:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-if="isAuth('zhyj:evmonitormicroclimatesite:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="evid"
        header-align="center"
        align="center"
        label="唯一ID">
      </el-table-column>
      <el-table-column
        prop="evsiteid"
        header-align="center"
        align="center"
        label="站点编号">
      </el-table-column>
      <el-table-column
        prop="evlongtitude"
        header-align="center"
        align="center"
        label="经度">
      </el-table-column>
      <el-table-column
        prop="evlatitude"
        header-align="center"
        align="center"
        label="纬度">
      </el-table-column>
      <el-table-column
        prop="evvoltagelevel"
        header-align="center"
        align="center"
        label="电压等级">
      </el-table-column>
      <el-table-column
        prop="evpowerlinename"
        header-align="center"
        align="center"
        label="线路名称">
      </el-table-column>
      <el-table-column
        prop="evtowernumber"
        header-align="center"
        align="center"
        label="杆塔号">
      </el-table-column>
      <el-table-column
        prop="evdevicescode"
        header-align="center"
        align="center"
        label="装置编码">
      </el-table-column>
      <el-table-column
        prop="evmonitortype"
        header-align="center"
        align="center"
        label="监测装置类型">
      </el-table-column>
      <el-table-column
        prop="evmonitorname"
        header-align="center"
        align="center"
        label="监测装置名称">
      </el-table-column>
      <el-table-column
        prop="evcompany"
        header-align="center"
        align="center"
        label="生产厂家">
      </el-table-column>
      <el-table-column
        prop="evstarttime"
        header-align="center"
        align="center"
        label="投运时间">
      </el-table-column>
      <el-table-column
        prop="evlastmonitortime"
        header-align="center"
        align="center"
        label="最后监测时间">
      </el-table-column>
      <el-table-column
        prop="xzq"
        header-align="center"
        align="center"
        label="所属区">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.evid)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.evid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
  import AddOrUpdate from './evmonitormicroclimatesite-add-or-update'
  export default {
    data () {
      return {
        dataForm: {
          key: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false
      }
    },
    components: {
      AddOrUpdate
    },
    activated () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/zhyj/evmonitormicroclimatesite/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'key': this.dataForm.key
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      // 删除
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.evid
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/zhyj/evmonitormicroclimatesite/delete'),
            method: 'post',
            data: this.$http.adornData(ids, false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      }
    }
  }
</script>
