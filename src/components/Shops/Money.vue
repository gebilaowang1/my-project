<template>
    <div>
        <Card class="card">
            <Breadcrumb　class="header_item">
                <BreadcrumbItem to="/Welcome"><Icon type="md-home" /> 首页</BreadcrumbItem>
                <BreadcrumbItem>门店管理</BreadcrumbItem>
                <BreadcrumbItem>门店财务</BreadcrumbItem>
            </Breadcrumb>
            <Row>
                <Col span="10" class="data">
                  <DatePicker type="datetimerange" format="yyyy-MM-dd HH:mm:ss" placeholder="起止时间" style="width: 300px" @on-change="handleChange"></DatePicker>
                </Col>
                <Col>
                    <Button type="success" @click="dataList">查询</Button>
                    <Button @click="clear">清空</Button>
                </Col>
                <div class="caiwu">
                    财务统计：共 &nbsp; &nbsp; <span class="money"> {{total}} </span> &nbsp; &nbsp; 笔
                </div>
            </Row>
        </Card>
        <template>
            <Table border :columns="columns5" :data="moneyList" stripe></Table>
        </template>
        <template>
          <Page :total="total"
          :current="showList.current"
          @on-change="changepage"
          show-total
          class="footer"/>
        </template>
    </div>
</template>

<script>
import { axiosApiList } from '../../assets/api/Orderapi.js'
export default {
  data () {
    return {
      dataValue: ['', ''],
      columns5: [
        {
          title: '区域名称',
          key: 'regionalName'
        },
        {
          title: '门店名称',
          key: 'storeName'
        },
        {
          title: '责任店长',
          key: 'storeOwnerName'
        },
        {
          title: '门店固定资产',
          key: 'address'
        },
        {
          title: '耗品成本',
          key: 'date'
        },
        {
          title: '经纪人数量',
          key: 'name'
        },
        {
          title: '人均业绩',
          key: 'age'
        },
        {
          title: '应收业绩',
          key: 'address'
        },
        {
          title: '收入金额',
          key: 'date'
        },
        {
          title: '支出金额',
          key: 'name'
        },
        {
          title: '利润金额',
          key: 'age'
        },
        {
          title: '开票金额',
          key: 'address'
        }
      ],
      moneyList: [],
      showList: {
        beginTime: '',
        current: 1,
        endTime: ''
      },
      total: '',
      path_List: 'emp/finance/manage/store_finance_list',
      method: 'post'
    }
  },
  created () {
    this.getMoneyList()
  },
  methods: {
    async getMoneyList () {
      await axiosApiList(this.path_List, this.showList, this.method).then(res => {
      console.log(res)
      this.total = res.data.data.total
      this.List = res.data.data.records
      })
    },
    changepage (newcurrent) {
      this.showList.current = newcurrent
      this.getMoneyList()
    },
    dataList () {
      this.getMoneyList()
    },
    handleChange (data) {
      this.showList.beginTime = data[0]
      this.showList.endTime = data[1]
      console.log(this.showList.beginTime)
      console.log(this.showList.endTime)
    },
    clear () {
      this.showList.beginTime = ''
      this.showList.current = 1
      this.showList.endTime = ''
    }
  }
}
</script>

<style scoped>
.card {
    background-color: rgb(224,233,224);
    height: 150px;
}
.data {
    position: relative;
    top: 20px;
    z-index: 999;
}
Button {
    margin-left: 25px;
    position: relative;
    top: 20px
}
.money {
    font-family: Arial, Helvetica, sans-serif;
    color: red;
    font-size: 18px;
}
.caiwu {
    position: absolute;
    right: 20px;
    bottom: 15px;
}
.footer {
    position: absolute;
    right: 16px;
}
.header_item {
  position: relative;
  top: -139px;
  left: 37px;
}
</style>
