<template>
    <div class="Positioning">
        <Breadcrumb class="header_item">
            <BreadcrumbItem to="/Welcome"><Icon type="md-home" /> 首页</BreadcrumbItem>
            <BreadcrumbItem>系统管理</BreadcrumbItem>
            <BreadcrumbItem>系统日志</BreadcrumbItem>
            <BreadcrumbItem>楼盘日志</BreadcrumbItem>
        </Breadcrumb>
        <Table border :columns="columns12" :data="getList" class="table" stripe>
          <template slot-scope="{ row }" slot="name">
            <span>{{ row.operatorName }}</span>
            <span class="main">{{ row.operateDescr }}</span>
          </template>
        </Table>
        <template>
          <Page :total="total"
          :current="List.current"
          @on-change="changepage"
          show-total
          class="footer"/>
        </template>
    </div>
</template>

<script>
import { axiosApiList } from '../../../assets/api/Orderapi.js'
export default {
  data () {
    return {
      List: {
        tableName: 'biz_estate',
        size: 10,
        current: 1,
        operateDataId: 0
      },
      columns12: [
        {
          title: '类型',
          slot: 'name',
          align: 'center'
        },
        {
          title: '行为描述',
          key: 'operateContent'
        },
        {
          title: '楼盘名称',
          key: 'operateDataName'
        },
        {
          title: '操作员工',
          key: 'operatorName'
        },
        {
          title: '发起日期',
          key: 'gmtCreate'
        }
      ],
      path_List: 'emp/base/DataOperateRecord/get_record_list?tableName=biz_estate&size=10&current=1&operateDataId=0',
      method: 'get',
      getList: []
    }
  },
  created () {
    this.getMenuList()
  },
  methods: {
    async getMenuList () {
      await axiosApiList(this.path_List, this.List, this.method).then(res => {
      console.log(this.List)
      console.log(res)
      this.total = res.data.data.total
      this.getList = res.data.data.records
      })
    },
    changepage (newcurrent) {
      this.List.current = newcurrent
      this.getMenuList()
    }
  }
}
</script>

<style scoped>
.header {
    margin-top: -20px;
}
.header_item {
    position: relative;
    top: -72px;
    left: 54px;
}
.main {
    margin-left: 50px;
}
.table {
    background-color: rgb(217,230,217);
}
.Positioning {
    position: relative;
    top: -50px;
}
</style>
