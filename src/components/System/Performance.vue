<template>
    <div class="Positioning">
        <Breadcrumb　class="header_item">
            <BreadcrumbItem to="/Welcome"><Icon type="md-home" /> 首页</BreadcrumbItem>
            <BreadcrumbItem>系统管理</BreadcrumbItem>
            <BreadcrumbItem>业绩播报</BreadcrumbItem>
        </Breadcrumb>
        <Card class="input">
            <Row>
                <Col>
                    <Input v-model="getList.search" placeholder="楼盘名称">
                        <Button type="success" @click="getMenuList" slot="append">查询</Button>
                    </Input>
                </Col>
                <Col class="col">
                    <DatePicker type="datetimerange" format="yyyy-MM-dd HH:mm:ss" placeholder="成交日期" style="width: 200px" @on-change="handleChange"></DatePicker>
                </Col>
                <Col>
                    <Select v-model="getList.type" style="width:170px" class="List" placeholder="交易类型">
                        <Option v-for="item in CommerceList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </Col>
                <Col>
                    <Select v-model="getList.urbanArea" style="width:150px" class="List" placeholder="部门">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </Col>
                <Col>
                    <Select v-model="getList.regionalManagerId" style="width:150px" placeholder="员工">
                        <Option v-for="item in regionList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </Col>
                <Col><Button type="success" class="button" @click="getShowList">查询</Button></Col>
                <Col><Button class="button">清空</Button></Col>
            </Row>
        </Card>
        <Table border :columns="columns12" :data="List" class="table" stripe>
        </Table>
        <template>
          <Page :total="total"
          :current="getList.current"
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
      Options: '',
      cityList: [
        {
          value: '1',
          label: '系统管理'
        },
        {
          value: '2',
          label: '新房部'
        },
        {
          value: '3',
          label: '业务部'
        },
        {
          value: '4',
          label: '运营部'
        },
        {
          value: '5',
          label: '财务部'
        },
        {
          value: '6',
          label: '总经办'
        },
        {
          value: '7',
          label: '综合管理部>'
        },
        {
          value: '8',
          label: '科技公司'
        },
        {
          value: '9',
          label: '中亚新区'
        }
      ],
      regionList: [
        {
          value: '1',
          label: '系统管理'
        },
        {
          value: '2',
          label: '新房部'
        },
        {
          value: '3',
          label: '业务部'
        },
        {
          value: '4',
          label: '运营部'
        },
        {
          value: '5',
          label: '财务部'
        },
        {
          value: '6',
          label: '总经办'
        },
        {
          value: '7',
          label: '综合管理部>'
        },
        {
          value: '8',
          label: '科技公司'
        },
        {
          value: '9',
          label: '中亚新区'
        }
      ],
      model1: '',
      columns12: [
        {
          title: '签约人',
          key: 'assetsNo'
        },
        {
          title: '成交楼盘',
          key: 'estate'
        },
        {
          title: '交易类型',
          key: 'leaderEmpName'
        },
        {
          title: '房源编号',
          key: 'houseSn'
        },
        {
          title: '成交金额',
          key: 'dealsFee'
        },
        {
          title: '成交日期',
          key: 'gmtCreate'
        }
      ],
      CommerceList: [
        {
          value: '1',
          label: '出租'
        },
        {
          value: '2',
          label: '出售'
        }
      ],
      getList: {
        beginTime: '',
        current: 1,
        endTime: '',
        search: '',
        type: ''
      },
      List: [],
      total: '',
      name: '',
      pathScrapping: "'/Scrapping'",
      path_List: 'emp/announcement/salesman_broadcast_page',
      method: 'post'
    }
  },
  created () {
    this.getMenuList()
  },
  methods: {
    async getMenuList () {
      await axiosApiList(this.path_List, this.getList, this.method).then(res => {
      console.log(res)
      this.total = res.data.data.total
      this.List = res.data.data.records
      })
    },
    changepage (newcurrent) {
      this.getList.current = newcurrent
      this.getMenuList()
    },
    getShowList () {
      this.getMenuList()
    },
    handleChange (data) {
      this.getList.beginTime = data[0]
      this.getList.endTime = data[1]
    },
    changepage (newcurrent) {
      this.getList.current = newcurrent
      this.getMenuList()
    }
  }
}
</script>

<style scoped>
.Positioning {
  position: absolute;
}
.input {
    position: absolute;
    top: 40px;
    width: 100%;
    background: rgb(224,233,224);
}
.List {
    margin-left: 30PX;
}
.button {
    margin-left: 30px;
}
.table {
    margin-top: 150px;
}
.footer {
    position: absolute;
    right: 16px;
}
.col {
    margin-left: 30px;
}
.Assets {
    margin-top: 35px;
    margin-right: 20px;
}
.Invoke {
    position: absolute;
    right: 220px;
}
.header_item {
    position: relative;
    top: -122px;
    left: 54px;
}
</style>
