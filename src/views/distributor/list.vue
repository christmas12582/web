<template>
  <div class="app-container">

    <div v-if="show=='list'">
      <div class="filter-container">
        <el-input :placeholder="$t('distributor.phone')" v-model="listQuery.phone" style="width: 200px;" class="filter-item"/>
        <el-input :placeholder="$t('distributor.openid')" v-model="listQuery.openid" style="width: 200px;" class="filter-item"/>
        <el-select v-model="listQuery.isvalid" :placeholder="$t('distributor.isvalid')" clearable class="filter-item" style="width:200px">
          <el-option v-for="item in isvalidOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
        </el-select>
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList">{{ $t('table.search') }}</el-button>
      </div>

      <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">

        <el-table-column type="index" width="60" align="center" label="序号">
        </el-table-column>

        <el-table-column width="240" align="center" label="openid" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.openid }}</span>
          </template>
        </el-table-column>

        <el-table-column width="150" align="center" label="电话号码" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.phone }}</span>
          </template>
        </el-table-column>

        <el-table-column class-name="status-col" label="是否有效" width="110">
          <template slot-scope="scope">
            <el-tag :type="scope.row.isvalid==1?'success':'danger'">{{ scope.row.isvalid==1?'有效':'无效' }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column min-width="120" align="center" label="提成比例" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.ratio }}%&nbsp;<el-button size="small" @click="handleRatio(scope.$index, scope.row)" type="text">修改</el-button></span>
          </template>
        </el-table-column>

        <el-table-column min-width="150" align="center" label="提成余额" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>￥{{ scope.row.money/100 }}</span>
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
    
      <el-dialog v-el-drag-dialog :visible.sync="ratioVisible" title="修改分销商提成比例" @dragDialog="handleDrag" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
        <el-form ref="ratioForm" :model="distributor" :rules="ratioRules" label-width="100px">
          <el-form-item label="提成比例" prop="ratio">
            <el-input ref="ratio" :placeholder="$t('distributor.ratio')" v-model="distributor.ratio" style="width: 300px;" class="filter-item"><template slot="append">%</template></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="submitRatio">保存</el-button>
            <el-button size="small" @click="cancelRatio">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>



  </div>
</template>

<script>
import { fetchList, changeRatio } from '@/api/distributor'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import waves from '@/directive/waves'
import elDragDialog from '@/directive/el-dragDialog'
import { Promise } from 'q';

export default {
  name: 'ProductList',
  components: { Pagination },
  directives: { waves, elDragDialog },
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
        phone: undefined,
        openid: undefined,
        isvalid: undefined
      },

      show: 'list',

      distributor: {
        userId: undefined,
        ratio: undefined
      },

      ratioVisible: false,

      ratioRules: {
        ratio: [
          {required: true, message: '请输入分销商提成比例', trigger: 'blur'}
        ]
      }
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
          this.list = response.data.list
          this.total = response.data.total
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
    handleRatio(index, row) {
      this.distributor.userId = row.id
      this.ratioVisible = true
      this.$refs.ratio.blur()
    },
    cancelRatio() {
      this.ratioVisible = false
      this.distributor.userId = undefined
      this.distributor.ratio = undefined
    },
    submitRatio() {
      this.$refs.ratioForm.validate(valid => {
        if(valid){
          this.$confirm('确认修改提成比例吗?', '提示', {type: 'warning'}).then(()=>{
            changeRatio(this.distributor.userId, this.distributor.ratio).then(res=>{
              if(res.code == 0){
                this.$message.success('保存成功')
                this.cancelRatio()
                this.getList()
              }else{
                this.$message.error(res.msg)
              }
            })
          }).catch(() => {})
        }else{
          return false
        }
      })
      
    },
    handleDrag() {
      this.$refs.ratio.blur()
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
</style>
