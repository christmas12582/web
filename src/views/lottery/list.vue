<template>
  <div class="app-container">

    <div v-if="show=='list'">
      <div class="filter-container">
        <el-input :placeholder="$t('lottery.name')" v-model="listQuery.name" style="width: 200px;" class="filter-item"/>
        <el-select v-model="listQuery.isvalid" :placeholder="$t('lottery.isvalid')" clearable class="filter-item" style="width:200px">
          <el-option v-for="item in isvalidOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
        </el-select>
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList">{{ $t('table.search') }}</el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>
      </div>

      <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">

        <el-table-column type="index" width="60" label="序号">
        </el-table-column>

        <el-table-column width="180" align="center" label="活动名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column class-name="status-col" label="是否有效" width="110">
          <template slot-scope="scope">
            <el-tag :type="scope.row.isvalid==1?'success':'danger'">{{ scope.row.isvalid==1?'有效':'无效' }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column min-width="300" align="center" label="活动描述" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.description }}</span>
          </template>
        </el-table-column>

        <el-table-column min-width="300" label="操作">
          <template slot-scope="scope">
            <el-button size="small" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
            <el-button size="small" @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleRemove(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total>0" :total="total" :page.sync="listQuery.pagenum" :limit.sync="listQuery.pagesize" @pagination="getList" />
    </div>

    <div v-if="show=='detail'">
      <div class="lottery-detail-box">
        <div class="lottery-detail-item lottery-detail-basic-box">
          <div class="lottery-detail-basic-image">
            <img :src="lottery.product.icon"/>
          </div>
          <div class="lottery-detail-basic-text">
            <div class="lottery-detail-basic-text-item">
              <span class="lottery-detail-basic-text-name">{{lottery.product.name}}</span>
            </div>
            <div class="lottery-detail-basic-text-item">
              <span class="lottery-detail-basic-text-description">描述：{{lottery.product.description?lottery.product.description:'无'}}</span>
            </div>
            <div class="lottery-detail-basic-text-item lottery-detail-unit-box">
              <div class="lottery-detail-unit" v-for="item in lottery.unit" :key="item.id">
                <el-tag :type="item.isvalid==1?'success':'danger'">
                  <div class="lottery-detail-unit-item lottery-detail-unit-name">{{item.name}}</div>
                  <div class="lottery-detail-unit-item lottery-detail-unit-price">￥{{item.price/100}}</div>
                </el-tag>
              </div>
            </div>
            <div class="lottery-detail-basic-text-item" v-if="lottery.unit.length>0">
              <span class="lottery-detail-basic-text-invalid">*红色为无效规格</span>
            </div>
            <div class="lottery-detail-basic-text-item lottery-detail-botton">
              <el-button size="small" @click="showView('list')">返回</el-button>
              <el-button size="small" type="danger" @click="showView('edit')">编辑</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="show=='edit' || show=='add'">
      <el-row class="goods-form-area">
        <el-col :span="12">
          <el-form ref="lotteryForm" :model="lottery" :rules="lotteryRules" label-width="100px">
            <el-form-item label="活动图片" prop="product.icon">
              <el-upload
                :multiple="false"
                :limit="1"
                :file-list="fileList"
                :on-remove="handleImageRemove"
                :on-success="handleImageSuccess"
                :before-upload="beforeImageUpload"
                class="editor-slide-upload"
                :action="service+'/fileupload/multiUpload'"
                list-type="picture-card">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="活动名称" prop="product.name">
              <el-input :placeholder="$t('lottery.name')" v-model="lottery.product.name"/>
            </el-form-item>
            <el-form-item label="活动描述">
              <el-input type="textarea" :autosize="{minRows: 6}" :placeholder="$t('lottery.description')" v-model="lottery.product.description"/>
            </el-form-item>
            <el-form-item label="活动规格" prop="unit">
              <div class="unit-box" v-for="(item, index) in lottery.unit" :key="index">

              </div>
              <div class="unit-box">
                <el-input :placeholder="$t('lottery.unitName')" v-model="lottery.noneUnit.name"/>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button size="small" @click="showView('list')">取消</el-button>
              <el-button size="small" type="primary" @click="handleSubmit">保存</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { fetchList, fetchProduct, removeProduct, createProduct, updateProduct, createUnit, removeUnit } from '@/api/lottery'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import waves from '@/directive/waves'
import { Promise } from 'q';

export default {
  name: 'ProductList',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      isvalidOptions: [
        { key: 1, display_name: '有效' },
        { key: 0, display_name: '无效' }
      ],

      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        pagenum: 1,
        pagesize: 10,
        name: undefined,
        isvalid: undefined
      },
      lottery: {
        product: {},
        unit: [],
        noneUnit: {}
      },

      show: 'list',

      fileList: [],

      lotteryRules: {
        product: {
          name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'}
          ],
          icon: [
            {required: true, message: '请上传活动图片', trigger: 'change'}
          ]
        },
        unit: [
          { type: 'array', required: true, message: '请至少添加一个活动规格', trigger: 'change' }
        ]
      },

      service: process.env.BASE_API
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        if(response.code==0){
          this.list = response.data
          this.total = 5
          this.listLoading = false
        }
      })
    },
    handleSizeChange(val) {
      this.listQuery.pagesize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pagenum = val
      this.getList()
    },
    handleDetail(index, row) {
      fetchProduct(row.id).then(response => {
        if(response.code==0){
          this.lottery = response.data
          this.fileList = []
          if(this.lottery.product.icon!=null && this.lottery.product.icon!=''){
            this.fileList.push({name: this.lottery.product.name, url: this.lottery.product.icon})
          }
          this.lottery.noneUnit = {}
          this.showView('detail')
        }
      })
    },
    handleUpdate(index, row) {
      fetchProduct(row.id).then(response => {
        if(response.code==0){
          this.lottery = response.data
          this.fileList = []
          if(this.lottery.product.icon!=null && this.lottery.product.icon!=''){
            this.fileList.push({name: this.lottery.product.name, url: this.lottery.product.icon})
          }
          this.lottery.noneUnit = {}
          this.showView('edit')
        }
      })
    },
    handleRemove(index, row) {
      this.$confirm('确认删除【'+row.name+'】吗?', '提示', {type: 'warning'}).then(()=>{
        this.listLoading = true
        removeProduct(row.id).then(res=>{
          this.listLoading = false
          if(res.code==0){
            this.$message.success('删除成功')
            this.getList()
          }
        })
      }).catch(() => {})
    },
    showView(view) {
      this.show = view
    },
    handleCreate(){
      this.lottery = {
        product: {},
        unit: [],
        noneUnit: {}
      }
      this.fileList = []
      this.showView('add')
    },
    handleImageRemove(file, fileList) {
      this.lottery.product.icon = ''
    },
    handleImageSuccess(response, file, fileList) {
      if(response.code==200){
        this.lottery.product.icon = response.data[0]
      }
    },
    beforeImageUpload(file) {

    },
    handleSubmit() {
      if(this.show == 'add'){
        createProduct(this.lottery.product).then(response=>{
          if(response.code==0){
            let productid = response.data
            if(this.lottery.unit.length>0){
              let unitList = []
              this.lottery.unit.forEach(item=>{
                item.productid = productid
                unitList.push(new Promise((resolve, reject)=>{
                  createUnit(item).then(res=>{
                    if(res.code==0){
                      resolve()
                    }else{
                      reject(res.msg)
                    }
                  })
                }))
              })
              Promise.all(unitList).then(r=>{
                this.$message.success('保存成功')
              },error=>{
                this.$message.error(error)
              })
            }else{
              this.$message.success('保存成功')
            }
          }else{
            this.$message.error(response.msg)
          }
        })
      }else if(this.show == 'edit'){
        updateProduct(this.lottery.product).then(response=>{
          if(response.code==0){
            if(this.lottery.unit.length>0){
              let unitList = []
              this.lottery.unit.forEach(item=>{
                if(item.id==undefined || item.id==null || item.id==''){
                  item.productid = this.lottery.product.id
                  unitList.push(new Promise((resolve, reject)=>{
                    createUnit(item).then(res=>{
                      if(res.code==0){
                        resolve()
                      }else{
                        reject(res.msg)
                      }
                    })
                  }))
                }
              })
              if(unitList.length>0){
                Promise.all(unitList).then(r=>{
                  this.$message.success('保存成功')
                },error=>{
                  this.$message.error(error)
                })
              }else{
                this.$message.success('保存成功')
              }
            }else{
              this.$message.success('保存成功')
            }
          }else{
            this.$message.error(response.msg)
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
.lottery-detail-box{
  display: flex;
  flex-direction: column;
  .lottery-detail-item{
    width: 100%;
  }
  .lottery-detail-basic-box{
    display: flex;
    .lottery-detail-basic-image{
      width: 300px;
      flex-shrink: 0;
      img{
        width: 100%;
        max-width: 100%;
      }
    }
    .lottery-detail-basic-text{
      flex-grow: 1;
      padding-left: 18px;
      .lottery-detail-basic-text-item{
        width: 100%;
        font: 12px/1.5 tahoma,arial,'Hiragino Sans GB','\5b8b\4f53',sans-serif;
        line-height: 21px;
        min-height: 35px;
      }
      .lottery-detail-basic-text-name{
        font-size: 16px;
        font-weight: 700;
        color: #3C3C3C;
      }
      .lottery-detail-basic-text-description{
        margin-top: 15px;
        background: #eef1f6;
        padding: 15px 16px;
        line-height: 36px;
        font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
        display: block;
      }
      .lottery-detail-basic-text-invalid{
        color: #F40;
        font-size: 8px;
      }
    }
  }
  .lottery-detail-unit-box{
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    .lottery-detail-unit{
      padding: 10px 10px 10px 0;
      .lottery-detail-unit-item{
        display: inline-block;
      }
      .lottery-detail-unit-price{
        color: #F40;
        font-family: verdana,arial;
      }
    }
  }
}
.lottery-detail-botton{
  width: 100%;
  margin-top: 30px;
}
</style>
