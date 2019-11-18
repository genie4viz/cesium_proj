<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="站点编号" prop="evsiteid">
      <el-input v-model="dataForm.evsiteid" placeholder="站点编号"></el-input>
    </el-form-item>
    <el-form-item label="经度" prop="evlongtitude">
      <el-input v-model="dataForm.evlongtitude" placeholder="经度"></el-input>
    </el-form-item>
    <el-form-item label="纬度" prop="evlatitude">
      <el-input v-model="dataForm.evlatitude" placeholder="纬度"></el-input>
    </el-form-item>
    <el-form-item label="电压等级" prop="evvoltagelevel">
      <el-input v-model="dataForm.evvoltagelevel" placeholder="电压等级"></el-input>
    </el-form-item>
    <el-form-item label="线路名称" prop="evpowerlinename">
      <el-input v-model="dataForm.evpowerlinename" placeholder="线路名称"></el-input>
    </el-form-item>
    <el-form-item label="杆塔号" prop="evtowernumber">
      <el-input v-model="dataForm.evtowernumber" placeholder="杆塔号"></el-input>
    </el-form-item>
    <el-form-item label="装置编码" prop="evdevicescode">
      <el-input v-model="dataForm.evdevicescode" placeholder="装置编码"></el-input>
    </el-form-item>
    <el-form-item label="监测装置类型" prop="evmonitortype">
      <el-input v-model="dataForm.evmonitortype" placeholder="监测装置类型"></el-input>
    </el-form-item>
    <el-form-item label="监测装置名称" prop="evmonitorname">
      <el-input v-model="dataForm.evmonitorname" placeholder="监测装置名称"></el-input>
    </el-form-item>
    <el-form-item label="生产厂家" prop="evcompany">
      <el-input v-model="dataForm.evcompany" placeholder="生产厂家"></el-input>
    </el-form-item>
    <el-form-item label="投运时间" prop="evstarttime">
      <el-input v-model="dataForm.evstarttime" placeholder="投运时间"></el-input>
    </el-form-item>
    <el-form-item label="最后监测时间" prop="evlastmonitortime">
      <el-input v-model="dataForm.evlastmonitortime" placeholder="最后监测时间"></el-input>
    </el-form-item>
    <el-form-item label="所属区" prop="xzq">
      <el-input v-model="dataForm.xzq" placeholder="所属区"></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          evid: 0,
          evsiteid: '',
          evlongtitude: '',
          evlatitude: '',
          evvoltagelevel: '',
          evpowerlinename: '',
          evtowernumber: '',
          evdevicescode: '',
          evmonitortype: '',
          evmonitorname: '',
          evcompany: '',
          evstarttime: '',
          evlastmonitortime: '',
          xzq: ''
        },
        dataRule: {
          evsiteid: [
            { required: true, message: '站点编号不能为空', trigger: 'blur' }
          ],
          evlongtitude: [
            { required: true, message: '经度不能为空', trigger: 'blur' }
          ],
          evlatitude: [
            { required: true, message: '纬度不能为空', trigger: 'blur' }
          ],
          evvoltagelevel: [
            { required: true, message: '电压等级不能为空', trigger: 'blur' }
          ],
          evpowerlinename: [
            { required: true, message: '线路名称不能为空', trigger: 'blur' }
          ],
          evtowernumber: [
            { required: true, message: '杆塔号不能为空', trigger: 'blur' }
          ],
          evdevicescode: [
            { required: true, message: '装置编码不能为空', trigger: 'blur' }
          ],
          evmonitortype: [
            { required: true, message: '监测装置类型不能为空', trigger: 'blur' }
          ],
          evmonitorname: [
            { required: true, message: '监测装置名称不能为空', trigger: 'blur' }
          ],
          evcompany: [
            { required: true, message: '生产厂家不能为空', trigger: 'blur' }
          ],
          evstarttime: [
            { required: true, message: '投运时间不能为空', trigger: 'blur' }
          ],
          evlastmonitortime: [
            { required: true, message: '最后监测时间不能为空', trigger: 'blur' }
          ],
          xzq: [
            { required: true, message: '所属区不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.evid = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.evid) {
            this.$http({
              url: this.$http.adornUrl(`/zhyj/evmonitormicroclimatesite/info/${this.dataForm.evid}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.evsiteid = data.evmonitormicroclimatesite.evsiteid
                this.dataForm.evlongtitude = data.evmonitormicroclimatesite.evlongtitude
                this.dataForm.evlatitude = data.evmonitormicroclimatesite.evlatitude
                this.dataForm.evvoltagelevel = data.evmonitormicroclimatesite.evvoltagelevel
                this.dataForm.evpowerlinename = data.evmonitormicroclimatesite.evpowerlinename
                this.dataForm.evtowernumber = data.evmonitormicroclimatesite.evtowernumber
                this.dataForm.evdevicescode = data.evmonitormicroclimatesite.evdevicescode
                this.dataForm.evmonitortype = data.evmonitormicroclimatesite.evmonitortype
                this.dataForm.evmonitorname = data.evmonitormicroclimatesite.evmonitorname
                this.dataForm.evcompany = data.evmonitormicroclimatesite.evcompany
                this.dataForm.evstarttime = data.evmonitormicroclimatesite.evstarttime
                this.dataForm.evlastmonitortime = data.evmonitormicroclimatesite.evlastmonitortime
                this.dataForm.xzq = data.evmonitormicroclimatesite.xzq
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/zhyj/evmonitormicroclimatesite/${!this.dataForm.evid ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'evid': this.dataForm.evid || undefined,
                'evsiteid': this.dataForm.evsiteid,
                'evlongtitude': this.dataForm.evlongtitude,
                'evlatitude': this.dataForm.evlatitude,
                'evvoltagelevel': this.dataForm.evvoltagelevel,
                'evpowerlinename': this.dataForm.evpowerlinename,
                'evtowernumber': this.dataForm.evtowernumber,
                'evdevicescode': this.dataForm.evdevicescode,
                'evmonitortype': this.dataForm.evmonitortype,
                'evmonitorname': this.dataForm.evmonitorname,
                'evcompany': this.dataForm.evcompany,
                'evstarttime': this.dataForm.evstarttime,
                'evlastmonitortime': this.dataForm.evlastmonitortime,
                'xzq': this.dataForm.xzq
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>
