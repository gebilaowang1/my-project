<template>
    <div class="Positioning">
        <Breadcrumb　class="header_item">
            <BreadcrumbItem to="/Welcome"><Icon type="md-home" /> 首页</BreadcrumbItem>
            <BreadcrumbItem>系统管理</BreadcrumbItem>
            <BreadcrumbItem>系统日志</BreadcrumbItem>
            <BreadcrumbItem>登陆日志</BreadcrumbItem>
        </Breadcrumb>
        <div>
            <Card class="input">
                <Row>
                    <Col class="col">
                        <DatePicker type="datetimerange" format="yyyy-MM-dd HH:mm:ss" placeholder="推送日期" style="width: 200px" @on-change="handleChange"></DatePicker>
                    </Col>
                    <Col>
                        <Select v-model="getList.platformType" style="width:170px" class="List" placeholder="付款类型">
                            <Option v-for="item in regionList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </Col>
                    <Col><Button type="success" class="searchButton" @click="getMenuList">查询</Button></Col>
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
      model1: '',
      columns12: [
        {
          title: '部门',
          key: 'deptName'
        },
        {
          title: '员工',
          key: 'empName'
        },
        {
          title: '账号',
          key: 'empNo'
        },
        {
          title: '设备名称',
          key: 'deviceName'
        },
        {
          title: '设备类型',
          key: 'deviceType'
        },
        {
          title: '登录时间',
          key: 'gmtCreate'
        },
        {
          title: '设备登录IP',
          key: 'ip'
        }
      ],
      regionList: [
        {
          value: 'PC',
          label: '电脑端'
        },
        {
          value: 'app',
          label: 'App'
        }
      ],
      getList: {
        beginTime: '',
        current: 1,
        size: 10,
        endTime: '',
        platformType: ''
      },
      List: [],
      total: '',
      currentdate: ''
    }
  },
  created () {
    this.getMenuList()
  },
  methods: {
    async getMenuList () {
      const { data: res } = await this.$http.get('http://172.16.10.16:8089/api/emp/base/emp_info/get_emp_login_reocrd?current=1&&size=10&&platformType=&&beginTime=&&endTime=', this.getList)
      console.log(res)
      this.List = res.data.records
      this.total = res.data.total
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
.searchButton {
    margin-left: 1020px;
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
