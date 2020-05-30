<template>
  <d2-container>
    <template slot="header">农户管理
<!--      <el-button type="text" style="margin: 1pc" @click="openAdd">添加农户</el-button>-->
      <el-button @click="testAdd">测试添加</el-button>
      <el-select v-if="represents" v-model="backTypeIndex.id" @change="getOrders" filterable placeholder="请选择代表" style="width: 30%">
        <el-option
          v-for="item in represents"
          :key="item.representid"
          :label="item.representname"
          :value="item.userid">
        </el-option>
      </el-select>
      <el-select v-if="types" v-model="backTypeIndex.type" @change="getOrders" filterable placeholder="请选择类型" style="width: 30%">
        <el-option
          v-for="item in types"
          :key="item.name"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>
    </template>
        <el-table
          :data="orders"
          border
          style="width: 100%">
          <el-table-column
            prop="orderid"
            label="订单id"
            width="100">
          </el-table-column>
          <el-table-column
            prop="totalprice"
            label="总价"
            width="100">
          </el-table-column>
          <el-table-column
            prop="customerid"
            label="顾客id">
          </el-table-column>
          <el-table-column
            prop="orderstatus"
            label="订单状态">
          </el-table-column>
          <el-table-column
            prop="orderconf"
            label="订单备注">
          </el-table-column>
          <el-table-column
            prop="ordertype"
            label="订单类型">
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
          width="100"
          prop="representid"
          label="代表id">
        </el-table-column>
          <el-table-column
            prop="orderaddress"
            label="地址">
          </el-table-column>
          <el-table-column
            prop="orderphone"
            label="联系电话">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="400">
            <template slot-scope="scope">
              <el-button type="text" style="color: #E6A23C" @click="openUpdate(scope.row)">更新订单</el-button>
              <el-dialog
                append-to-body
                title="更新订单"
                :visible.sync="updateBlock"
                width="30%"
                :before-close="handleClose">
                <el-input
                  prefix-icon="el-icon-document"
                  disabled
                  v-model="tampOrder.order.orderid">
                  <template slot="prepend">ID:</template>
                </el-input>
                <el-input
                  v-model="tampOrder.order.orderconf">
                  <template slot="prepend">订单备注:</template>
                </el-input>
                <span slot="footer" class="dialog-footer">
    <el-button @click="updateBlock = false">取 消</el-button>
    <el-button type="primary" @click="sentUpdate">确 定</el-button>
  </span>
              </el-dialog>
              <el-button style="margin: 1pc;font-size: 1pc;color: red" @click="deleteOrder(scope.row)" type="text" size="small">删除订单</el-button>
              <el-button style="margin: 1pc;font-size: 1pc;color: blueviolet" @click="sendOrder(scope.row)" type="text" size="small">发货</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="changePage"
          :page-size="1"
          :total="orderMaxPage">
        </el-pagination>
  </d2-container>
</template>

<script>
  import { addOrder, deleteOrder, getAllOrder, updateOrder } from '../../netWork/OrderApi'
import { getAllRepresent } from '../../netWork/RepresentApi'
  import {getMenu} from '../../menu/selectMenu'

  export default {
  name: 'goodManager',
  data () {
    return {
      tampOrder: {
        order: {
          orederid: null,
          totalprice: null,
          customerid: null,
          customerid: null,
          createtime: null,
          updatetime: null,
          orderstatus: null,
          orderconf: null,
          ordertype: null,
          representid: null,
          orderaddress: null,
          orderphone: null,
        },
        goodOrders: [],
        customer: null,
        represent: null,


      },
      orders: [],
      updateBlock: null,
      addBlock: null,
      chooseRepresent: null,
      mangerUserId: null,
      representUserId: null,
      represents: [],
      orderMaxPage: null,
      chooseType: null,
      backTypeIndex:{
        type: null,
        id: null,
        page: null
      },
      types: [
        {
          name: '普通订单',
          value: 'shop'
        },
        {
          name: '定制订单',
          value: 'order'
        },
        {
          name: '全部订单',
          value: null
        }
      ],
      tempBackOrder: {
        customerid: 1001,
        goodorders: [
          {
            goodid: 23,
            goodnum: 2
          },
          {
            goodid: 10,
            goodnum: 1
          },
          {
            goodid: 9,
            goodnum: 2
          },
          {
            goodid: 5,
            goodnum: 5
          }
        ]
      }
    }
  },
  mounted () {
    this.getFirstOne()
    this.getMenu1()
  },
  methods: {
    getMenu1 () {
      getMenu()
    },
    openUpdate(row) {
      this.tampOrder.order = row
      this.updateBlock = true

    },
   getFirstOne() {
     let type = this.$store.state.type
     if (type == 'represent'){
        this.representUserId = this.$store.state.userId
       this.backTypeIndex.id = this.representUserId
     }else if (type == 'root' || type == 'manager'){
        this.mangerUserId = this.$store.state.userId
       this.backTypeIndex.id = this.mangerUserId
       getAllRepresent().then(res =>{
         this.represents = res.represent
       }).catch(error => {
         this.$message.error("net work error")
       })
     }
     this.backTypeIndex.page = 1;
     this.getOrders()
   },
    getOrders() {
     getAllOrder(this.backTypeIndex).then(res =>{
       this.orders = res.order
       this.orderMaxPage = res.pageMax
     }).catch(error => {
       this.$message.error('net work error')
     })
    },
    testAdd () {
      addOrder(this.tempBackOrder).then(res =>{
        console.log(res)
      }).catch(error => {
        console.log(error)
        this.$message.error('网络错误')
      })
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    changePage (val) {
       this.backTypeIndex.page =val
      this.getOrders()
    },
    deleteOrder(row) {
      this.$alert('确定删除？', '警告', {
        confirmButtonText: '确定',
        callback: action => {
            deleteOrder(row).then(res => {
              if (res.success){
                this.$message.success("成功")
              }
              this.getOrders()
            }).catch(error => {

            })

        }
      })
    },
    sendOrder (row) {
      this.$alert('确定发货？', '警告', {
        confirmButtonText: '确定',
        callback: action => {
          let order =row
          order.orderstatus = 'posting'
          updateOrder(order).then(res => {
            if (res.success){
              this.$message.success("成功")
            }
            this.getOrders()
          })
        }
      })
    },
    sentUpdate (row) {
      updateOrder(row).then(res => {
        if (res.success){
          this.$message.success("成功")
        }
        this.getOrders()
      })
    },
  }
}
</script>

<style scoped>

</style>
