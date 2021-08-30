<template>
    <div class="Positioning">
        <Breadcrumb class="header_item">
            <BreadcrumbItem to="/Welcome"><Icon type="md-home" /> 首页</BreadcrumbItem>
            <BreadcrumbItem>系统管理</BreadcrumbItem>
            <BreadcrumbItem>系统日志</BreadcrumbItem>
            <BreadcrumbItem>房客日志</BreadcrumbItem>
        </Breadcrumb>
        <div>
            <Card class="input">
                <Row>
                    <Col>
                        发起员工
                        <Select v-model="getList.regionalManagerId" style="width:170px" class="List" placeholder="部门">
                            <Option v-for="item in regionList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </Col>
                    <Col>
                        <Select v-model="getList.regionalManagerId" style="width:170px" class="MList" placeholder="员工">
                            <Option v-for="item in regionList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </Col>
                    <Col class="col">
                        <DatePicker type="datetimerange" format="yyyy-MM-dd HH:mm:ss" placeholder="推送日期" style="width: 200px"  @on-change="handleChange"></DatePicker>
                    </Col>
                    <Col>
                        <Select v-model="getList.regionalManagerId" style="width:170px" class="List" placeholder="请选择类型">
                            <Option v-for="item in regionList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </Col>
                    <Col><Button type="success" class="button" @click="getMenuList">查询</Button></Col>
                    <Col><Button class="button" @click="clear">清空</Button></Col>
                </Row>
            </Card>
        </div>
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
import { axiosApiList } from '../../../assets/api/Orderapi.js'
export default {
  data () {
    return {
      addList: {
        annexList: [],
        content: '',
        deptId: '',
        pushEvent: '',
        pushIdList: [],
        pushSn: '',
        pushType: 'ROLE',
        remindTimeList: [
          {
            pushTime: '',
            advanceDays: '',
            pushTimeLocal: ''
          }
        ],
        type: ''
      },
      model10: '',
      modal1: false,
      value6: '',
      dayList: [
        {
          value: '1',
          label: '1'
        },
        {
          value: '2',
          label: '2'
        },
        {
          value: '3',
          label: '3'
        },
        {
          value: '4',
          label: '4'
        },
        {
          value: '5',
          label: '5'
        },
        {
          value: '6',
          label: '6'
        },
        {
          value: '7',
          label: '7'
        },
        {
          value: '8',
          label: '8'
        },
        {
          value: '9',
          label: '9'
        },
        {
          value: '10',
          label: '10'
        }
      ],
      cityList: [
        {
          value: '7037',
          label: '行政专员'
        },
        {
          value: '7038',
          label: '行政主管'
        },
        {
          value: '7036',
          label: '运营总监'
        },
        {
          value: '7046',
          label: '财务经理'
        },
        {
          value: '7043',
          label: '出纳'
        }
      ],
      model1: '',
      columns12: [
        {
          title: '类型',
          key: ''
        },
        {
          title: '行为描述',
          key: ''
        },
        {
          title: '客源姓名',
          key: 'customerName'
        },
        {
          title: '客源编号',
          key: 'customerSn'
        },
        {
          title: '房源编号',
          key: 'houseSn'
        },
        {
          title: '发起员工（部门）',
          key: 'deptName'
        },
        {
          title: '发起日期',
          key: 'gmtCreate'
        },
        {
          title: '附件',
          key: ''
        },
        {
          title: '录音',
          key: ''
        }
      ],
      regionList: [
        {
          value: '11018',
          label: '新增房源'
        },
        {
          value: '11021',
          label: '新增客源'
        },
        {
          value: '11022',
          label: '带看'
        },
        {
          value: '110046',
          label: '跟进电话'
        },
        {
          value: '110047',
          label: '委托独家'
        },{
          value: '11018',
          label: '意向金'
        },
        {
          value: '11021',
          label: '定金'
        },
        {
          value: '11022',
          label: '转归属'
        },
        {
          value: '110046',
          label: '获取下级客源电话'
        },
        {
          value: '110047',
          label: '跟进维护分销商'
        }
      ],
      businessList: [
        {
          value: '1',
          label: '营业'
        },
        {
          value: '2',
          label: '装修'
        },
        {
          value: '3',
          label: '关店'
        }
      ],
      CommerceList: [
        {
          value: '1',
          label: '个体户'
        },
        {
          value: '2',
          label: '小规模企业'
        },
        {
          value: '3',
          label: '一般纳税户'
        }
      ],
      getList: {
        beginTime: "",
        behaviorCode: "",
        bizCode: "",
        current: 1,
        endTime: "",
        queryMultilayer: false,
        queryPortionId: 10000,
        querySingleEmp: true,
        size: 10,
        regionalManagerId: ''
      },
      List: [],
      total: '',
      currentdate: '',
      path_List: 'emp/agent/all_behavior/operational_query_behavior_record',
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
    handleChange (data) {
      this.getList.beginTime = data[0]
      this.getList.endTime = data[1]
    },
    changepage (newcurrent) {
      this.getList.current = newcurrent
      this.getMenuList()
    },
    clear () {
      this.getList.regionalManagerId = '',
      this.getList.beginTime = '',
      this.getList.endTime = ''
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
    background-color: rgb(224,233,224);
    width: 100%;
}
.List {
    margin-left: 30PX;
}
.button {
    margin-left: 30px;
}
.table {
    margin-top: 100px;
}
.footer {
    position: absolute;
    right: 16px;
}
.addButton {
    position: absolute;
    right: 20px;
    top: 180px;
}
.col {
    margin-left: 30px;
}
.title {
  padding-left: 270px;
  font-size: 20px;
  font-weight: 800px;
}
.main {
  height: 600px;
  padding-left: 40px;
}
.font {
  font-size: 16px;
}
.largeIuput {
  margin-left: 30PX;
  margin-top: 70px;
}
.upload {
  width: 70px;
  height: 70px;
  margin-left: 30px;
}
.header_item {
    position: relative;
    top: -122px;
    left: 54px;
}
</style>
