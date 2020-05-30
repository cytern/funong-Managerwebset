<template>
<d2-container>
    <template slot="header">农户管理<el-button type="text" style="margin: 1pc" @click="openAdd">添加农户</el-button>
      <el-upload style="display: inline-block"
        class="upload-demo"
        :action="represents?apiBook.farmer.addFarmerExcelManager:apiBook.farmer.addFarmerExcelRepresent"
        :headers="header"
        :on-preview="handlePreview"
        multiple
        :limit="1">
        <el-button size="small" type="primary" style="display: inline-block">批量导入</el-button>
      </el-upload>
      <el-button @click="getExcelFarms" size="small" type="primary" style="display: inline-block;margin-left: 25px">批量导出</el-button>
      <el-button @click="getExcelFarmsSize" size="small" type="warning" style="display: inline-block;margin-left: 25px">下载模板</el-button>
      <el-dialog
        append-to-body
        title="添加用户"
        :visible.sync="addBlock"
        width="30%"
        :before-close="handleClose">
        <el-input
          disabled
          v-model="tempFarmer.farmerid">
          <template slot="prepend">农户id:</template>
        </el-input>
        <el-select v-if="represents" v-model="tempFarmer.representid" filterable placeholder="请选择代表" style="width: 100%">
          <el-option
            v-for="item in represents"
            :key="item.representid"
            :label="item.representname"
            :value="item.representid">
          </el-option>
        </el-select>
        <el-input v-else-if="!represents" disabled v-model="tempFarmer.representid">
           <template slot="prepend">代表id:</template>
        </el-input>
        <el-input
          v-model="tempFarmer.farmername">
          <template slot="prepend">农户姓名:</template>
        </el-input>
        <el-input
          v-model="tempFarmer.farmeraddress">
          <template slot="prepend">农户地址:</template>
        </el-input>
        <el-input
          v-model="tempFarmer.farmerio">
          <template slot="prepend">收入明细:</template>
        </el-input>
        <el-input
          v-model="tempFarmer.farmerconf">
          <template slot="prepend">农户简介:</template>
        </el-input>
        <el-input
          v-model="tempFarmer.farmerphone">
          <template slot="prepend">农户电话:</template>
        </el-input>
        <span slot="footer" class="dialog-footer">
    <el-button @click="addBlock = false">取 消</el-button>
    <el-button type="primary" @click="sentAdd">确 定</el-button>
  </span>
      </el-dialog>
    </template>
    <d2-container-card>
      <el-table
        :data="farmers"
        border
        style="width: 100%">
        <el-table-column
          fixed
          width="100"
          prop="farmerid"
          label="农户id">
        </el-table-column>
        <el-table-column
          prop="farmername"
          label="农户名">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.farmername }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="farmeraddress"
          label="农户地址">
        </el-table-column>
        <el-table-column
          prop="farmerio"
          label="农户收支">
        </el-table-column>
        <el-table-column
          prop="farmerconf"
          label="农户简介">
        </el-table-column>
        <el-table-column
          prop="farmerphone"
          label="农户号码">
        </el-table-column>
        <el-table-column
          prop="representid"
          label="代表id">
        </el-table-column>
        <el-table-column
          prop="farmergrade"
          label="农户等级">
        </el-table-column>
        <el-table-column
          prop="createtime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="updatetime"
          label="更新时间">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="400">
          <template slot-scope="scope">
            <el-popover style="margin: 1pc"
                        placement="left"
                        width="450"
                        trigger="click">
              <el-form  label-position="left" label-width="80px" :model="farmerDetail">
                <el-form-item label="账号">
                  <el-input disabled v-model="farmerDetail.user.userName"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                  <el-input disabled v-model="farmerDetail.user.userPassword"></el-input>
                </el-form-item>
                <el-form-item label="代表名">
                  <el-input disabled v-model="farmerDetail.represent.representname"></el-input>
                </el-form-item>
                <el-form-item label="代表电话">
                  <el-input disabled v-model="farmerDetail.represent.representphone"></el-input>
                </el-form-item>
              </el-form>
              <el-button type="text" @click="getFarmerDetails(scope.row)" slot="reference">查看农户详情</el-button>
            </el-popover>
            <el-button style="margin: 1pc;font-size: 1pc;color: darkorange" @click="updateOrders(scope.row)" type="text" size="small">修改农户</el-button>
            <el-button style="margin: 1pc;font-size: 1pc;color: tomato" @click="deleteFarmer(scope.row)" type="text" size="small">删除农户</el-button>
            <el-dialog
              append-to-body
              title="修改农户"
              :visible.sync="updateBlock"
              width="30%"
              :before-close="handleClose">
              <el-input
                disabled
                v-model="tempFarmer.farmerid">
                <template slot="prepend">农户id:</template>
              </el-input>
              <el-input
                v-model="tempFarmer.farmername">
                <template slot="prepend">农户姓名:</template>
              </el-input>
              <el-input
                v-model="tempFarmer.farmeraddress">
                <template slot="prepend">农户地址:</template>
              </el-input>
              <el-input
                v-model="tempFarmer.farmerio">
                <template slot="prepend">收入明细:</template>
              </el-input>
              <el-input
                v-model="tempFarmer.farmerconf">
                <template slot="prepend">农户简介:</template>
              </el-input>
              <el-input
                v-model="tempFarmer.farmerphone">
                <template slot="prepend">农户电话:</template>
              </el-input>
              <span slot="footer" class="dialog-footer">
    <el-button @click="updateBlock = false">取 消</el-button>
    <el-button type="primary" @click="sendUpdate">确 定</el-button>
  </span>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
    </d2-container-card>
</d2-container>
</template>

<script>
  import {
    addFarmer,
    deleteFarmer,
    getAllFarmer,
    getFarmerDetail,
    getRepresentFarmer,
    updateFarmer
  } from '../../netWork/FarmerApi'
  import { getAllRepresent } from '../../netWork/RepresentApi'
  import { getSideMenu } from '../../menu/ChooseRealMenu'
  import apiBook from '../../netWork/apiBook'
  export default {
  name: 'farmerManager',
  data () {
    return {
      apiBook,
      farmers: [],
      orders: [],
      users: [],
      goods: [],
      updateBlock: false,
      addBlock: false,
      represents: [],
      header: {
      },
      farmerDetail:{
        success: null,
        farmer: {
          farmerid: null,
          farmername: null,
          useri: null,
          farmeraddress: null,
          farmerio: null,
          farmerconf: null,
          farmerphone:null,
          representid: null,
          farmergrade: null,
          createtime: null,
          updatetime: null
        },
        user: {
          userId: null,
          userName: "孙坚",
          userPassword: "1234",
          userStatus: "live",
          userType: "farmer",
          createTime: "2020-05-05 16:35:07",
          updateTime: "2020-05-05 16:35:09"
        },
        represent: {
          representid: 1,
          userid: 1009,
          representname: "投机者",
          representphone: "2151321321",
          representurl: null,
          representconf: "自守",
          representage: "55",
          representsex: "male",
          representgrade: 0,
          createtime: "2020-05-05 16:50:13",
          updatetime: "2020-05-05 16:50:17"
        }
      },
      tempFarmer: {
        farmerid:	null,
        farmername:	null,
        userid: null,
        farmeraddress: null,
        farmerio: null,
        farmerconf: null,
        farmerphone: null,
        representid: null,
        farmergrade: null,
        createtime: null,
        updatetime: null,
      },

    }
  },
    mounted () {
      this.getFarmers()
      this.getRepresents()

      this.header = {
        'User-Token': this.$store.state.code
      }
    },
    methods: {
      getExcelFarms(){
        let code = this.$store.state.code
        let url1 = this.represents?apiBook.farmer.getAllFarmerManager:apiBook.farmer.getAllFarmerRepresent
        let url = url1 + "/" + code
        window.open(url);
      },
      getExcelFarmsSize(){
        let code = this.$store.state.code
        let url1 = this.represents?apiBook.farmer.getFarmerSizeManager:apiBook.farmer.getFarmerSizeRepresent
        let url = url1 + "/" + code
        window.open(url)
      },
      // download (src, fileName) {a
      //   let x = new XMLHttpRequest();
      //   x.open("GET", src, true);
      //   x.setRequestHeader("User-Token",this.$store.state.code)
      //   x.responseType = 'blob';
      //   x.onload = function(e) {
      //     let url = window.URL.createObjectURL(x.response)
      //     let a = document.createElement('a');
      //     a.href = url
      //     a.download = fileName
      //     a.click()
      //   }
      //   x.send();
      // },
      getFarmerDetails(row){
        getFarmerDetail(row.farmerid).then(res =>{
             this.farmerDetail = res
        }).catch(error => {
          this.$message.error("network error")
        })
      },
      deleteFarmer(row){
        deleteFarmer(row.farmerid).then(res => {
          if (res){
            this.$message.success("删除成功")
          }
          this.getFarmers()
        }).catch(error =>{
          this.$message.error("network error")
        })
      },
      sentAdd () {
         addFarmer(this.tempFarmer).then(res => {
           if (res.success){
             this.$message.success("添加成功")
             this.addBlock = false
             this.tempFarmer =  {
               farmerid:	null,
               farmername:	null,
               userid: null,
               farmeraddress: null,
               farmerio: null,
               farmerconf: null,
               farmerphone: null,
               representid: null,
               farmergrade: null,
               createtime: null,
               updatetime: null,
             }
             this.getRepresents()
             this.getFarmers()
           }
         })
      },
    getRepresents () {
      let type = this.$store.state.type
      if (type === 'represent') {
           this.tempFarmer.representid = this.$store.state.typeId
      } else if (type === 'manager' || type === 'root') {
        getAllRepresent().then(res => {
          this.represents = res.represent
        }).catch(error => {
          console.log(error)
          this.$message.error('network error')
        })
      }
    },
    getFarmers () {
      let type = this.$store.state.type
      if (type === 'represent') {
        getRepresentFarmer(this.$store.state.typeId).then(res => {
          this.farmers = res.farmers
        }).catch(error => {
          console.log(error)
          this.$message.error('network error')
        })
      } else if (type === 'manager' || type === 'root') {
        getAllFarmer().then(res => {
          this.farmers = res.farmers
        }).catch(error => {
          console.log(error)
          this.$message.error('network error')
        })
    }},
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
      openAdd () {
      this.addBlock = true
      },
      updateOrders (row) {
        this.updateBlock = true
        this.tempFarmer = row
      },
      sendUpdate() {
        updateFarmer(this.tempFarmer).then(res => {
          if (res.success){
            this.$message.success("更新成功")
            this.getFarmers()
            this.tempFarmer = {
              farmerid:	null,
              farmername:	null,
              userid: null,
              farmeraddress: null,
              farmerio: null,
              farmerconf: null,
              farmerphone: null,
              representid: null,
              farmergrade: null,
              createtime: null,
              updatetime: null,
            }
            this.updateBlock = false
          }
        })
      }
  }
}
</script>

<style scoped>

</style>
