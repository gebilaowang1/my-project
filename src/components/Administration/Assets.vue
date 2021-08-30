<template>
    <div class="Positioning">
        <Breadcrumb　class="header_item">
            <BreadcrumbItem to="/Welcome"><Icon type="md-home" /> 首页</BreadcrumbItem>
            <BreadcrumbItem>行政管理</BreadcrumbItem>
            <BreadcrumbItem>固定资产</BreadcrumbItem>
        </Breadcrumb>
        <Card class="input">
            <Row>
                <Col>
                    <Input v-model="getList.search" placeholder="资产名称/资产编号">
                        <Button type="success" @click="getMenuList" slot="append">查询</Button>
                    </Input>
                </Col>
                <Col>
                    <Select v-model="getList.urbanArea" style="width:100px" class="List" placeholder="部门">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </Col>
                <Col>
                    <Select v-model="getList.regionalManagerId" style="width:100px" placeholder="员工">
                        <Option v-for="item in regionList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </Col>
                <Col class="col">
                    <span>早会日期：</span>
                    <DatePicker type="datetimerange" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择早会日期" style="width: 200px" @on-change="handleChange1"></DatePicker>
                </Col>
                <Col>
                    <Select v-model="getList.status" style="width:170px" class="List" placeholder="现状">
                        <Option v-for="item in CommerceList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </Col>
                <Col><Button type="success" class="button" @click="getShowList">查询</Button></Col>
                <Col><Button class="button">清空</Button></Col>
            </Row>
            <Row class="Invoke">
                <Col><Button type="success" class="Assets" @click="handleChangeUse">资产领用</Button></Col>
                <Col><Button type="success" class="Assets" @click="handleChangeStorage">入库</Button></Col>
                <Col><Button type="success" class="Assets" @click="handleChangeScrapping">报废</Button></Col>
                <Col><Button type="success" class="Assets" @click="handlechangeTransfer">转移</Button></Col>
                <Col><Button type="success" class="Derived">导出</Button></Col>
            </Row>
        </Card>
        <Table border :columns="columns12" :data="List" class="table" stripe @on-selection-change="handleChangeTable">
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
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '资产编号',
          key: 'assetsNo'
        },
        {
          title: '资产名称',
          key: 'name'
        },
        {
          title: '所属部门',
          key: 'leaderEmpName'
        },
        {
          title: '使用人',
          key: 'deptAddr'
        },
        {
          title: '入库时间',
          key: 'gmtCreate'
        },
        {
          title: '使用期限（年）',
          key: 'serviceLife'
        },
        {
          title: '资产价值',
          key: 'totalAmount'
        },
        {
          title: '资产净值',
          key: 'unitPrice'
        },
        {
          title: '资产现状',
          key: 'age'
        },
        {
          title: '附件',
          key: 'age'
        }
      ],
      CommerceList: [
        {
          value: '1',
          label: '未领用'
        },
        {
          value: '2',
          label: '已领用'
        },
        {
          value: '3',
          label: '已申请报废'
        },
        {
          value: '4',
          label: '已报废'
        }
      ],
      getList: {
        beginTime: '',
        current: 1,
        empId: '',
        endTime: '',
        search: '',
        status: '',
        type: '1'
      },
      List: [],
      total: '',
      name: '',
      pathScrapping: "'/Scrapping'",
      path_List: 'emp/assets/management/assets_management',
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
    handleChangeTable (data) {
      this.Options = data
      this.name = this.Options[0].name
    },
    handleChangeUse () {
      if (this.Options === '') {
        this.$Message.info('请选择资产')
      } else {
        this.$store.state.name = this.name
        this.$router.push('/Use')
      }
    },
    handleChangeStorage () {
      this.$router.push('/Storage')
    },
    handleChangeScrapping () {
      if (this.Options === '') {
        this.$Message.info('请选择资产')
      } else {
        this.$router.push('/Scrapping')
      }
    },
    handlechangeTransfer () {
      if (this.Options === '') {
        this.$Message.info('请选择资产')
      } else {
        this.$router.push('/Transfer')
      }
    },
    handleChange1 (data) {
      this.getList.beginTime = data[0]
      this.getList.endTime = data[1]
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
    top: 0px;
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
    margin-top: 110px;
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
    right: 80px;
}
.Derived {
  margin-top: 35px;
}
.header_item {
  position: relative;
  top: -122px;
  left: 54px;
}
</style>
