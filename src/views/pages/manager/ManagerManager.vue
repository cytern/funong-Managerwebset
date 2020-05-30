<template>
  <d2-container>
    <template slot="header">管理员管理<el-button type="text" style="margin: 1pc" @click="openAdd">添加管理员</el-button>
      <el-dialog
        append-to-body
        title="添加管理员"
        :visible.sync="addBlock"
        width="30%"
        :before-close="handleClose">
        <el-input
          disabled
          v-model="tempManager.managerid">
          <template slot="prepend">id:</template>
        </el-input>
        <el-input
          v-model="tempManager.managername">
          <template slot="prepend">姓名:</template>
        </el-input>
        <el-input
          v-model="tempManager.managerage">
          <template slot="prepend">年龄:</template>
        </el-input>
        <el-input
          v-model="tempManager.managerconf">
          <template slot="prepend">简介:</template>
        </el-input>
        <el-input
          v-model="tempManager.managersex">
          <template slot="prepend">性别:</template>
        </el-input>
        <span slot="footer" class="dialog-footer">
    <el-button @click="addBlock = false">取 消</el-button>
    <el-button type="primary" @click="sentAdd">确 定</el-button>
  </span>
      </el-dialog>
    </template>
    <d2-container-card>
      <el-table
        :data="managers"
        border
        style="width: 100%">
        <el-table-column
          fixed
          width="100"
          prop="managerid"
          label="id">
        </el-table-column>
        <el-table-column
          prop="managername"
          label="姓名">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.managername }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="managersex"
          label="性别">
        </el-table-column>
        <el-table-column
          prop="managerconf"
          label="简介">
        </el-table-column>
        <el-table-column
          prop="managerage"
          label="年龄">
        </el-table-column>
        <el-table-column
          prop="userid"
          label="用户id">
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
              <el-form  label-position="left" label-width="80px" :model="managerDetail">
                <el-form-item label="账号">
                  <el-input disabled v-model="managerDetail.user.userName"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                  <el-input disabled v-model="managerDetail.user.userPassword"></el-input>
                </el-form-item>
              </el-form>
              <el-button type="text" @click="getManagerDetails(scope.row)" slot="reference">查看详情</el-button>
            </el-popover>
            <el-button style="margin: 1pc;font-size: 1pc;color: darkorange" @click="updateManager(scope.row)" type="text" size="small">修改</el-button>
            <el-dialog
              append-to-body
              title="修改"
              :visible.sync="updateBlock"
              width="30%"
              :before-close="handleClose">
              <el-input
                disabled
                v-model="tempManager.managerid">
                <template slot="prepend">id:</template>
              </el-input>
              <el-input
                v-model="tempManager.managername">
                <template slot="prepend">姓名:</template>
              </el-input>
              <el-input
                v-model="tempManager.managersex">
                <template slot="prepend">性别:</template>
              </el-input>
              <el-input
                v-model="tempManager.managerconf">
                <template slot="prepend">简介:</template>
              </el-input>
              <el-input
                v-model="tempManager.managerage">
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
  import { getAllManager } from '../../netWork/FarmerApi'

  export default {
    name: 'ManagerManager',
    data () {
      return{
        addBlock: null,
        updateBlock: null,
        managers: [],
        tempManager: {
          managerid: null,
          managername: null,
          managersex: null,
          managerconf: null,
          managerage: null,
          managerurl: null,
          createtime: null,
          updatetime: null,
          userid: null,
        },
        managerDetail: {
          user: {
            userId: null,
            userName: null,
            userPassword: null,
            userStatus: null,
            userType: null,
            createTime: null,
            updateTime: null
          },
          manager: {
            managerid: null,
            managername: null,
            managersex: null,
            managerconf: null,
            managerage: null,
            managerurl: null,
            createtime: null,
            updatetime: null,
            userid: null,
          }
        }
      }
    },
    mounted () {
      this.getAllManagers()
    },
    methods: {
        getAllManagers () {
          getAllManager().then(res => {
            this.managers = res.manager
          })
        },
      openAdd () {
           this.addBlock = true
        this.tempManager = {
          managerid: null,
          managername: null,
          managersex: null,
          managerconf: null,
          managerage: null,
          managerurl: null,
          createtime: null,
          updatetime: null,
          userid: null,
        }
      },
    }
  }
</script>

<style scoped>

</style>
