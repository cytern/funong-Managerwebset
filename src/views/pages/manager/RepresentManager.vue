<template>
  <d2-container>
    <template slot="header">代表管理<el-button type="text" style="margin: 1pc" @click="openAdd">添加代表</el-button>
      <el-upload style="display: inline-block"
                 class="upload-demo"
                 :action="apiBook.represent.addRepresentExcel"
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
        title="添加代表"
        :visible.sync="addBlock"
        width="30%"
        :before-close="handleClose">
        <el-input
          disabled
          v-model="tempRepresent.representid">
          <template slot="prepend">id:</template>
        </el-input>
        <el-input
          v-model="tempRepresent.representname">
          <template slot="prepend">姓名:</template>
        </el-input>
        <el-input
          v-model="tempRepresent.representconf">
          <template slot="prepend">简介:</template>
        </el-input>
        <el-input
          v-model="tempRepresent.representphone">
          <template slot="prepend">电话:</template>
        </el-input>
        <el-input
          v-model="tempRepresent.representsex">
          <template slot="prepend">性别:</template>
        </el-input>
        <el-input
          v-model="tempRepresent.representage">
          <template slot="prepend">年龄:</template>
        </el-input>
        <span slot="footer" class="dialog-footer">
    <el-button @click="addBlock = false">取 消</el-button>
    <el-button type="primary" @click="sentAdd">确 定</el-button>
  </span>
      </el-dialog>
    </template>
    <d2-container-card>
      <el-table
        :data="represents"
        border
        style="width: 100%">
        <el-table-column
          fixed
          width="100"
          prop="representid"
          label="id">
        </el-table-column>
        <el-table-column
          prop="representname"
          label="姓名">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.representname }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="userid"
          label="用戶id">
        </el-table-column>
        <el-table-column
          prop="representconf"
          label="简介">
        </el-table-column>
        <el-table-column
          prop="representphone"
          label="电话号码">
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
          prop="representsex"
          label="性别">
        </el-table-column>
        <el-table-column
          prop="representage"
          label="年龄">
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
              <el-form  label-position="left" label-width="80px" :model="rootDetail">
                <el-form-item label="账号">
                  <el-input disabled v-model="representDetail.user.userName"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                  <el-input disabled v-model="representDetail.user.userPassword"></el-input>
                </el-form-item>
              </el-form>
              <el-button type="text" @click="getRootDetail(scope.row)" slot="reference">查看详情</el-button>
            </el-popover>
            <el-button style="margin: 1pc;font-size: 1pc;color: darkorange" @click="updateRoot(scope.row)" type="text" size="small">修改</el-button>
            <el-dialog
              append-to-body
              title="修改"
              :visible.sync="updateBlock"
              width="30%"
              :before-close="handleClose">
              <el-input
                disabled
                v-model="tempRepresent.representid">
                <template slot="prepend">id:</template>
              </el-input>
              <el-input
                v-model="tempRepresent.representname">
                <template slot="prepend">姓名:</template>
              </el-input>
              <el-input
                v-model="tempRepresent.representconf">
                <template slot="prepend">简介:</template>
              </el-input>
              <el-input
                v-model="tempRepresent.representphone">
                <template slot="prepend">电话:</template>
              </el-input>
              <el-input
                v-model="tempRepresent.representsex">
                <template slot="prepend">性别:</template>
              </el-input>
              <el-input
                v-model="tempRepresent.representage">
                <template slot="prepend">年龄:</template>
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
  import { getAllRepresent } from '../../netWork/RepresentApi'
  import apiBook from '../../netWork/apiBook'

  export default {
    name: 'RepresentManager',
  data () {
      return {
        apiBook,
        represents: [],
        tempRepresent: {
          representid: null,
          userid: null,
          representname: null,
          representphone: null,
          representurl: null,
          representconf: null,
          representage: null,
          representsex: null,
          representgrade: null,
          createtime: null,
          updatetime: null,
        },
        header: {
        },
        addBlock: false,
        updateBlock: false,
        representDetail: {
          user: {
            userId: null,
            userName: null,
            userPassword: null,
            userStatus: null,
            userType: null,
            createTime: null,
            updateTime: null
          },
          represent: {
            representid: null,
            userid: null,
            representname: null,
            representphone: null,
            representurl: null,
            representconf: null,
            representage: null,
            representsex: null,
            representgrade: null,
            createtime: null,
            updatetime: null,
          }
        },
      }
  },
    mounted () {
      this.getAllRepresents()
      this.header = {
        'User-Token': this.$store.state.code
      }
    },
    methods: {
      getAllRepresents() {
        getAllRepresent().then(res => {
          this.represents = res.represent
        })
      },
      getExcelFarms(){
        let code = this.$store.state.code
        let url1 = apiBook.represent.getRepresentExcel
        let url = url1  + code
        window.open(url);
      },
      getExcelFarmsSize(){
        let code = this.$store.state.code
        let url1 =apiBook.represent.getRepresentExcelSize
        let url = url1  + code
        window.open(url)
      },
    }
  }
</script>

<style scoped>

</style>
