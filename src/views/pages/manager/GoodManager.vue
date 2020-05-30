<template>
  <d2-container>
    <template slot="header">商品管理<el-button type="text" style="margin: 1pc" @click="openAdd">添加商品</el-button><el-dialog
      append-to-body
      title="添加商品"
      :visible.sync="addBlock"
      width="30%"
      :before-close="handleClose">
      <el-input
        disabled
        v-model="tampGood.goodid">
        <template slot="prepend">ID:</template>
      </el-input>
      <el-input
        @focus="clearTag"
        @blur="isNameSame"
        v-model="tampGood.goodname">
        <template slot="prepend">商品名:</template>
      </el-input>
      <el-tag v-if="nameSame" type="danger">商品名重复</el-tag>
      <el-input
        v-model="tampGood.goodprice">
        <template slot="prepend">价格:</template>
      </el-input>
      <el-input
        v-model="tampGood.goodstatus">
        <template slot="prepend">状态:</template>
      </el-input>
      <el-input v-if="!represents"
        v-model="tampGood.representid">
        <template slot="prepend">代表id:</template>
      </el-input>
      <el-select v-else-if="represents" v-model="tampGood.representid" filterable placeholder="请选择代表" style="width: 100%">
        <el-option
          v-for="item in represents"
          :key="item.representid"
          :label="item.representname"
          :value="item.representid">
        </el-option>
      </el-select><br>
      <el-select v-model="tampGood.farmerid" filterable placeholder="请选择农户" style="width: 100%">
        <el-option
          v-for="item in farmers"
          :key="item.farmerid"
          :label="item.farmername"
          :value="item.farmerid">
        </el-option>
      </el-select>
      <el-input
        v-model="tampGood.goodnum">
        <template slot="prepend">库存:</template>
      </el-input>
      <el-input
        prefix-icon="el-icon-date"
        v-model="tampGood.goodsize">
        <template slot="prepend">商品规格:</template>
      </el-input>
      <el-select v-model="tampGood.goodtype" filterable placeholder="请选择商品类型" style="width: 100%">
        <el-option
          v-for="item in goodtype"
          :key="item.typeId"
          :label="item.typeName"
          :value="item.typeName">
        </el-option>
      </el-select>
      <el-input v-model="tampGood.goodlocation">
        <template slot="prepend">产地:</template>
      </el-input>
      <el-upload
        class="upload-demo"
        :action="apiBook.baseUrl + '/everyone/simpleUpload'"
        :on-success="getUrl"
        multiple
        :limit="1"
        :file-list="imgList">
        <el-button size="small" type="primary">点击上传图片</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addBlock = false">取 消</el-button>
    <el-button type="primary" @click="sentAdd">确 定</el-button>
  </span>
    </el-dialog></template>
    <d2-container-card>
      <el-table
        :data="goods"
        border
        style="width: 100%">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="goodname"
          label="商品名" width="200px">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.goodname }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          prop="goodprice"
          label="商品价格">
        </el-table-column>
        <el-table-column
          prop="goodlocation"
          label="商品产地">
        </el-table-column>
        <el-table-column
          prop="createtime"
          label="创建日期">
        </el-table-column>
        <el-table-column
          prop="updatetime"
          label="更新日期">
        </el-table-column>
        <el-table-column
          width="100"
          prop="goodsize"
          label="商品规格">
        </el-table-column>
        <el-table-column
          prop="goodtype"
          label="商品类型">
        </el-table-column>
        <el-table-column
          label="商品状态">
          <template slot-scope="scope">
            <el-button size="medium" style="margin: 1pc;font-weight:600" :type="scope.row.goodstatus =='live'?'primary':'danger'"><p v-text=scope.row.goodstatus></p></el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="goodnum"
          label="商品库存">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="400">
          <template slot-scope="scope">
            <el-button type="text" style="color: #E6A23C" @click="openUpdate(scope.row)">修改商品</el-button>
            <el-dialog
              append-to-body
              title="修改商品"
              :visible.sync="updateBlock"
              width="30%"
              :before-close="handleClose">
              <el-input
                prefix-icon="el-icon-document"
                disabled
                v-model="tampGood.goodid">
                <template slot="prepend">ID:</template>
              </el-input>
              <el-input
                v-model="tampGood.goodnum">
                <template slot="prepend">库存:</template>
              </el-input>
              <el-upload
                class="upload-demo"
                :action="apiBook.baseUrl + 'everyone/simpleUpload'"
                :on-success="getUrl"
                multiple
                :limit="1"
                :file-list="imgList">
                <el-button size="small" type="primary">点击上传图片</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
              <span slot="footer" class="dialog-footer">
    <el-button @click="updateBlock = false">取 消</el-button>
    <el-button type="primary" @click="sentUpdate">确 定</el-button>
  </span>
            </el-dialog>
            <el-button style="margin: 1pc;font-size: 1pc;color: red" @click="deleteGood(scope.row)" type="text" size="small">删除商品</el-button>
            <img style="width: 100px;height: 100px" :src="scope.row.goodurl">
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="changePage"
        :page-size="1"
        :total="maxPage">
      </el-pagination>
    </d2-container-card>
  </d2-container>
</template>

<script>
// eslint-disable-next-line standard/object-curly-even-spacing
import { getGoodList, getGoodType, getMaxGoodPage, addGood, updateGood, deleteGood } from '../../netWork/goodApi'
import { getAllFarmer, getRepresentFarmer } from '../../netWork/FarmerApi'
import { getAllRepresent } from '../../netWork/RepresentApi'
import apiBook from '../../netWork/apiBook'

export default {
  name: 'goodManager',
  data () {
    return {
      apiBook,
      goods: [],
      maxPage: null,
      addBlock: false,
      updateBlock: false,
      nameSame: false,
      represents: [],
      imgList: [],
      farmers: [],
      goodtype: [],
      tampGood: {
        goodid: null,
        goodname: null,
        goodstatus: null,
        farmerid: null,
        goodprice: null,
        goodlocation: null,
        representid: null,
        createtime: null,
        updatetime: null,
        goodnum: null,
        goodsize: null,
        goodurl: null,
        goodtype: null
      }
    }
  },
  mounted () {
    this.getDefaultGood()
    this.getMaxPage()
  },
  methods: {
    deleteGood (row) {
      deleteGood(row.goodid).then(res => {
        if (res.success){
          this.$message.success("删除成功")
          this.getDefaultGood()
        }else {
          this.$message.error("网络错误")
        }

      })

    },
    getUrl (response, file, fileList) {
      this.tampGood.goodurl = response.fileUrl
    },
    getDefaultGood () {
      let that = this
      getGoodList(1).then(res => {
        that.goods = res
      }).catch(error => {
        console.log(error)
        this.$message.error('network error')
      })
      getGoodType().then(res => {
        this.goodtype = res
      })
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
        getAllRepresent().then(res => {
          this.represents = res.represent
        }).catch(error => {
          console.log(error)
          this.$message.error('network error')
        })
      }
    },
    getMaxPage () {
      let that = this
      getMaxGoodPage().then(res => {
        that.maxPage = res
      }).catch(error => {
        this.$message.error('net work error' + error)
      })
    },
    changePage (val) {
      getGoodList(val).then(res => {
        this.goods = res
      }).catch(error => {
        console.log(error)
        this.$message.error('net work error')
      })
    },
    deleteOneGood () {

    },
    sentUpdate () {
      updateGood(this.tampGood).then(res => {
        if (res.success) {
          this.$message.success('修改成功')
          this.tampGood = {
            goodid: null,
            goodname: null,
            goodstatus: null,
            farmerid: null,
            goodprice: null,
            goodlocation: null,
            representid: null,
            createtime: null,
            updatetime: null,
            goodnum: null,
            goodsize: null,
            goodurl: null,
            goodtype: null
          }
          this.imgList = []
          this.updateBlock = false
          this.getDefaultGood()
        } else {
          this.$message.warning('啥情况？')
        }
      }).catch(error => {
        this.$message.error('网络错误')
      })
    },
    openUpdate (goods) {
      this.tampGood = goods
      this.updateBlock = true
    },

    sentAdd () {
      addGood(this.tampGood).then(res => {
        if (res.success) {
          this.addBlock = false
          this.$message.success('添加成功')
          this.getAllGoods()
        }
      }).catch(error => {
        this.$message.error('网络错误')
      })
    },
    openAdd () {
      this.addBlock = true
      this.tampGood = {
        goodid: null,
        goodname: null,
        goodstatus: null,
        farmerid: null,
        goodprice: null,
        goodlocation: null,
        representid: null,
        createtime: null,
        updatetime: null,
        goodnum: null,
        goodsize: null,
        goodurl: null,
        goodtype: null
      }
      this.imgList = []
    },

    clearTag () {
      this.nameSame = false
    },
    getAllGoods () {
      getGoodList(1).then(res => {
        this.goods = res
      }).catch(error => {
        this.$message.error('网络错误')
      })
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>

<style scoped>

</style>
