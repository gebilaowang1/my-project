<template>
    <div>
    <div class="body">
    <Breadcrumb　class="header_item">
        <BreadcrumbItem to="/Welcome"><Icon type="md-home" /> 首页</BreadcrumbItem>
        <BreadcrumbItem>系统管理</BreadcrumbItem>
        <BreadcrumbItem>系统日志</BreadcrumbItem>
        <BreadcrumbItem>推送日志</BreadcrumbItem>
    </Breadcrumb>
    <Card class="card">
        <Row>
            <Col class="col">
            <Select v-model="model4" style="width:200px" class="List" placeholder="请选择">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </Col>
            <Col>
            <Select v-model="model3" style="width:200px" class="List" placeholder="请选择">
                <Option v-for="item in roleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </Col>
            <Col class="col">
            <DatePicker type="datetimerange" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择任务时间" style="width: 200px" @on-change="handleChangeTest"></DatePicker>
            </Col>
            <Col class="rankcol">
            <Button type="success" class="button" @click="getVideoList">查询</Button>
            <Button class="button" @click="clear">清空</Button>
            </Col>
        </Row>
    </Card>
    </div>
    <div class="show">
    <Tabs type="card" @on-click="handlechangeuser">
        <TabPane label="员工">
            <Table border :columns="columns11" :data="getList" class="table"></Table>
                <template>
                    <Page :total="total"
                    :current="List.current"
                    @on-change="changepage"
                    show-total
                    class="footer"/>
                </template>
        </TabPane>
        <TabPane label="用户">
            <Table border :columns="columns12" :data="getListUser" class="table" stripe></Table>
                <template>
                    <Page :total="total"
                    :current="List.current"
                    @on-change="changepage1"
                    show-total
                    class="footer"/>
                </template>
        </TabPane>
    </Tabs>
    </div>
    </div>
</template>
<script>
import { axiosApiList } from '../../../assets/api/Orderapi.js'
export default {
  data () {
    return {
      cityList: [
        {
          value: '1',
          label: '系统管理'
        },
        {
          value: '2',
          label: '业务部'
        },
        {
          value: '3',
          label: '新房部'
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
          label: '综合管理部'
        },
        {
          value: '8',
          label: '科技公司'
        },
        {
          value: '',
          label: '中亚地产'
        }
      ],
      roleList: [
        {
          value: '1',
          label: '张三丰'
        },
        {
          value: '2',
          label: '王五'
        },
        {
          value: '3',
          label: '总经理'
        },
        {
          value: '4',
          label: '刘宏涛'
        }
      ],
      videoList: [
        {
          value: '1',
          label: '有'
        },
        {
          value: '2',
          label: '无'
        }
      ],
      rankList: [
        {
          value: '1',
          label: '优秀'
        },
        {
          value: '2',
          label: '合格'
        },
        {
          value: '3',
          label: '不合格'
        }
      ],
      columns11: [
        {
          title: '推送部门',
          key: 'bizDeptName'
        },
        {
          title: '推送员工',
          key: 'bizEmpName'
        },
        {
          title: '推送时间',
          key: 'gmtCreate'
        },
        {
          title: '推送标题',
          key: 'title'
        },
        {
          title: '推送内容',
          key: 'content'
        }
      ],
      columns12: [
        {
          title: '推送员工',
          key: 'bizUserName'
        },
        {
          title: '推送时间',
          key: 'gmtCreate'
        },
        {
          title: '推送标题',
          key: 'title'
        },
        {
          title: '推送内容',
          key: 'content'
        }
      ],
      List: {
        beginTime: "",
        current: 1,
        empId: "",
        endTime: "",
        type: "PUSH_LOG_EMP"
      },
      ListUser: {
        beginTime: "",
        current: 1,
        empId: "",
        endTime: "",
        type: "PUSH_LOG_USER"
      },
      getList: [],
      getListUser: [],
      total: '',
      model1: '',
      model2: '',
      model3: '',
      model4: '',
      handleChangeTestList: [],
      handleChangeCreateList: [],
      changebooleanList: [],
      changeRankList: [],
      path_getVideoList: 'emp/announcement/get_push_log_page',
      path_handlechangeuser: 'emp/announcement/get_push_log_page',
      method: 'post'
    }
  },
  created () {
    this.getVideoList()
  },
  methods: {
    async getVideoList () {
      await axiosApiList(this.path_getVideoList, this.List, this.method).then(res => {
      console.log(this.List)
      console.log(res)
      this.total = res.data.data.total
      this.getList = res.data.data.records
      })
    },
    async handlechangeuser () {
      await axiosApiList(this.path_handlechangeuser, this.ListUser, this.method).then(res => {
      console.log(res)
      this.total = res.data.data.total
      this.getListUser = res.data.data.records
      })
    },
    changepage (newcurrent) {
      this.List.current = newcurrent
      this.getVideoList()
    },
    changepage1 (newcurrent) {
      this.ListUser.current = newcurrent
      this.handlechangeuser()
    },
    handleChangeTest (data) {
      this.List.beginTime = data[0]
      this.ListUser.beginTime = data[0]
      this.List.endTime = data[1]
      this.ListUser.endTime = data[1]
    }
  }
}
</script>

<style scoped>
.body {
    height: 110px;
    background-color: rgb(240,240,240);
}
.card {
    background-color: rgb(224,233,224);
    height: 90px;
}
.col {
    margin-left: 25px;
}
.rankcol {
    margin-left: 780px;
}
.button {
    margin-left: 25px;
}
.show{
    margin-top: 30px;
}
.header_item {
    position: relative;
    top: -122px;
    left: 54px;
}
</style>
