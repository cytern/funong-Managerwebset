<template>
  <d2-container>
    <template slot="header">root管理<el-button type="text" style="margin: 1pc" @click="openAdd">添加root</el-button>
      <el-dialog
        append-to-body
        title="添加管理员"
        :visible.sync="addBlock"
        width="30%"
        :before-close="handleClose">
        <el-input
          disabled
          v-model="tempRoot.rootid">
          <template slot="prepend">id:</template>
        </el-input>
        <el-input
          v-model="tempRoot.rootname">
          <template slot="prepend">姓名:</template>
        </el-input>
        <el-input
          v-model="tempRoot.rootconf">
          <template slot="prepend">简介:</template>
        </el-input>
        <el-input
          v-model="tempRoot.rootphone">
          <template slot="prepend">电话:</template>
        </el-input>
        <span slot="footer" class="dialog-footer">
    <el-button @click="addBlock = false">取 消</el-button>
    <el-button type="primary" @click="sentAdd">确 定</el-button>
  </span>
      </el-dialog>
    </template>
    <d2-container-card>
      <el-table
        :data="roots"
        border
        style="width: 100%">
        <el-table-column
          fixed
          width="100"
          prop="rootid"
          label="id">
        </el-table-column>
        <el-table-column
          prop="rootname"
          label="姓名">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.rootname }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="userid"
          label="用戶id">
        </el-table-column>
        <el-table-column
          prop="rootconf"
          label="简介">
        </el-table-column>
        <el-table-column
          prop="rootphone"
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
                  <el-input disabled v-model="rootDetail.user.userName"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                  <el-input disabled v-model="rootDetail.user.userPassword"></el-input>
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
                v-model="tempRoot.rootid">
                <template slot="prepend">id:</template>
              </el-input>
              <el-input
                v-model="tempRoot.rootname">
                <template slot="prepend">姓名:</template>
              </el-input>
              <el-input
                v-model="tempRoot.rootphone">
                <template slot="prepend">电话号码:</template>
              </el-input>
              <el-input
                v-model="tempRoot.rootconf">
                <template slot="prepend">简介:</template>
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
  import { getAllRoot } from '../../netWork/FarmerApi'

  export default {
    name: 'RootManager',
    data () {
      return {
        roots:[],
        addBlock: null,
        updateBlock: null,
        tempRoot: {
          rootid: null,
          rootname: null,
          rooturl: null,
          rootconf: null,
          userid: null,
          rootphone: null,
          createtime: null,
          updatetime: null
        },
        rootDetail: {
          user: {
            userId: null,
            userName: null,
            userPassword: null,
            userStatus: null,
            userType: null,
            createTime: null,
            updateTime: null
          },
          root: {
            rootid: null,
            rootname: null,
            rooturl: null,
            rootconf: null,
            userid: null,
            rootphone: null,
            createtime: null,
            updatetime: null
          }
        }
      }
    },
    mounted () {
      this.getAllRoots()
    },
    methods: {
      getAllRoots () {
        getAllRoot().then(res => {
          this.roots = res.root
        })
      },
      openAdd () {
        this.addBlock = true
        this.tempRoot = {
          rootid: null,
          rootname: null,
          rooturl: null,
          rootconf: null,
          userid: null,
          rootphone: null,
          createtime: null,
          updatetime: null
        }
      },
    }
  }
</script>

<style scoped>

</style>
