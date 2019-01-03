<template>
  <div class="app-container">

    <div v-if="show=='list'">
      <div class="filter-container">
        <el-input :placeholder="$t('distributor.phone')" v-model="listQuery.phone" style="width: 200px;" class="n-filter-item"/>
        <el-input :placeholder="$t('distributor.openid')" v-model="listQuery.openid" style="width: 200px;" class="n-filter-item"/>
        <el-date-picker
            v-model="time"
            type="datetimerange"
            range-separator="至"
            :start-placeholder="$t('cash.begintime')"
            :end-placeholder="$t('cash.endtime')"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-time="['00:00:00','23:59:59']"
            class="n-filter-item">
        </el-date-picker>
        <el-select v-model="listQuery.isexchange" :placeholder="$t('cash.isexchange')" clearable class="n-filter-item" style="width:200px">
          <el-option v-for="item in isexchangeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
        </el-select>
        <el-button v-waves class="n-filter-item" type="primary" icon="el-icon-search" @click="getList">{{ $t('table.search') }}</el-button>
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
            <el-tag :type="scope.row.isexchange==1?'success':'danger'">{{ scope.row.isexchange==1?'已完成':'待处理' }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column min-width="120" align="center" label="申请时间" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.createtime }}</span>
          </template>
        </el-table-column>

        <el-table-column min-width="150" align="center" label="提现余额" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>￥{{ scope.row.money/100 }}</span>
          </template>
        </el-table-column>

        <el-table-column min-width="300" label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="danger" @click="handleOffLinePay(scope.$index, scope.row)">已线下支付</el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total>0" :total="total" :page.sync="listQuery.pagenum" :limit.sync="listQuery.pagesize" @pagination="getList" />
    
    </div>



  </div>
</template>

<script>
import { fetchList, offlineCash } from '@/api/cash'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import waves from '@/directive/waves'
import { Promise } from 'q';

export default {
  name: 'ProductList',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      isexchangeOptions: [
        { key: 1, display_name: '已完成' },
        { key: 0, display_name: '待处理' }
      ],

      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        pagenum: 1,
        pagesize: 10,
        phone: undefined,
        openid: undefined,
        isexchange: undefined,
        begintime: undefined,
        endtime: undefined
      },
      time: [],

      show: 'list'
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      if(this.time.length>0){
          this.listQuery.begintime = this.time[0]
      }
      if(this.time.length>1){
          this.listQuery.endtime = this.time[1]
      }
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
    handleOffLinePay(index, row) {
        this.$confirm('确认已完成线下支付?', '提示', {type: 'warning'}).then(()=>{
            offlineCash(row.id, 1).then(res=>{
                if(res.code == 0){
                    this.$message.success('处理成功')
                    this.getList()
                }else{
                    this.$message.error(res.msg)
                }
            })
        })
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
.n-filter-item {
    margin-bottom: 10px;
}
</style>
