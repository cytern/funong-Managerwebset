<template>
    <d2-container>
      <template slot="header">销量统计（测试）</template>
      <el-row>
        <el-row :span="12">
          代表销售情况：
        </el-row>
        <br>
        <el-row :span="6">
          <el-input v-model="representId" placeholder="请输入代表id" style="width: 30%"></el-input>
          <el-button type="primary" @click="sendRepresentId" round>变更</el-button>
        </el-row>
      </el-row>
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark">
          <ve-histogram :data="tampData1"></ve-histogram>
        </div></el-col>
      </el-row>
      <el-row>
        <el-row :span="12">
          商品销售情况：
        </el-row>
        <br>
        <el-row :span="8">
          <el-input v-model="goodId" placeholder="请输入商品id" style="width: 30%"></el-input>
          <el-button type="primary" @click="sendGoodId" round>变更</el-button>
        </el-row>
      </el-row>
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark">
          <ve-histogram :data="tampData2"></ve-histogram>
        </div></el-col>
      </el-row>
    </d2-container>
</template>

<script>
  import { getDataViewByGood, getDataViewByRepresent } from '../../netWork/RepresentApi'

  export default {
    name: 'DataView',
    data: function () {
      return{
        tampData1: [],
        tampData2: [],
        goodId: null,
        representId: null,
      }

    },
    mounted () {
      this.getFirstSold()
    },
    methods: {
      getFirstSold () {
        let type = this.$store.state.type
        if (type == "represent"){
          let id = this.$store.state.typeId
          getDataViewByRepresent(id).then(res => {
            this.tampData1 =this.clearData(res.data)
          })
        }else {
          getDataViewByRepresent(1).then(res => {
            this.tampData1 =this.clearData(res.data)
          })
        }
        getDataViewByGood(23).then(res => {
          this.tampData2 = this.clearData(res.data)
        })
      },
      clearData(temp){
        let temp1 =temp
        let finishData = {
          columns: ['月份', '销量'],
          rows: []
        }
        for (let i = 0;i<temp1.length ;i++){
          let row = {
            '月份': temp1[i].date.toString(), '销量': temp1[i].num
          }
          finishData.rows.push(row)
        }
        return finishData
      },
      sendRepresentId () {
        getDataViewByRepresent(this.representId).then(res => {
          this.tampData1 =this.clearData(res.data)
        })
      },
      sendGoodId () {
        getDataViewByGood(this.goodId).then(res => {
          this.tampData2 = this.clearData(res.data)
        })
      }
    }
  }
</script>

<style scoped>

</style>
