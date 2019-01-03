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

        <el-table-column type="index" width="60" label="序号">
        </el-table-column>

        <el-table-column width="180" align="center" label="openid" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.openid }}</span>
          </template>
        </el-table-column>

        <el-table-column width="180" align="center" label="电话号码" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.phone }}</span>
          </template>
        </el-table-column>

        <el-table-column class-name="status-col" label="是否有效" width="110">
          <template slot-scope="scope">
            <el-tag :type="scope.row.isvalid==1?'success':'danger'">{{ scope.row.isvalid==1?'有效':'无效' }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column min-width="180" align="center" label="提成比例" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.description }}%</span>
          </template>
        </el-table-column>

        <el-table-column min-width="180" align="center" label="提成余额" show-overflow-tooltip>
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

  </div>
</template>

<script>
import { fetchList, fetchProduct, removeProduct, createProduct, updateProduct, createUnit, removeUnit, changeUnitStatus } from '@/api/distributor'
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
        phone: undefined,
        openid: undefined,
        isvalid: undefined
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
