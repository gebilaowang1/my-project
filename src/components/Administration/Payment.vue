<template>
    <div class="Positioning">
        <Breadcrumb　class="header_item">
            <BreadcrumbItem to="/Welcome"><Icon type="md-home" /> 首页</BreadcrumbItem>
            <BreadcrumbItem>行政管理</BreadcrumbItem>
            <BreadcrumbItem>付款提醒</BreadcrumbItem>
        </Breadcrumb>
        <div>
            <Card class="input">
                <Row>
                    <Col>
                        <Input v-model="getList.deptName" placeholder="付款名称" style="width:170px">
                            <Button type="success" @click="getMenuList" slot="append"><Icon type="ios-search" /></Button>
                        </Input>
                    </Col>
                    <Col>
                        <Select v-model="getList.pushId" style="width:170px"  class="List">
                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </Col>
                    <Col class="col">
                        <DatePicker type="datetimerange" format="yyyy-MM-dd HH:mm:ss" placeholder="推送日期" style="width: 200px"></DatePicker>
                    </Col>
                    <Col>
                        <Select v-model="getList.regionalManagerId" style="width:170px" class="List" placeholder="付款类型">
                            <Option v-for="item in regionList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </Col>
                    <Col>
                        <Select v-model="getList.shopNature" style="width:170px" class="List" placeholder="付款单位">
                            <Option v-for="item in storeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </Col>
                    <Col><Button type="success" class="searchButton" @click="getShowList">查询</Button></Col>
                    <Col><Button class="button" @click="clear">清空</Button></Col>
                </Row>
            </Card>
        </div>
        <div class="addButton"><Button type="success" @click="add">新增事件+</Button></div>
        <Table border :columns="columns12" :data="List" class="table" stripe>
        </Table>
        <template>
          <Page :total="total"
          :current="getList.current"
          @on-change="changepage"
          show-total
          class="footer"/>
        </template>
      <template>
        <Modal
        v-model="modal1"
        @on-ok="ok"
        @on-cancel="cancel"
        width="35%">
        <span slot="header" class="title">
        新增发布+
        </span>
        <Form class="main" ref="PaymentFromRef">
            <FormItem>
                <span  class="font">提醒编号：&nbsp; &nbsp;     {{this.currentdate}}</span>
            </FormItem>
            <FormItem>
                <span>付款类型：</span>
                <Select v-model="getList.regionalManagerId" style="width:300px" class="List" placeholder="付款类型">
                    <Option v-for="item in regionList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem>
                <span>付款单位：</span>
                <Select v-model="getList.shopNature" style="width:300px" class="List" placeholder="付款单位">
                    <Option v-for="item in storeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem>
                <span>付款名称：</span>
                <Input v-model="getList.deptName" placeholder="付款名称" class="List" style="width:300px"></Input>
            </FormItem>
            <FormItem>
                <span>被推送岗位：</span>
                 <Select v-model="addList.pushIdList" multiple style="width:300px" class="List">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem>
                <span>提醒到期时间：</span>
                <DatePicker type="date" style="width: 170px"  format="yyyy-MM-dd HH:mm:ss" @on-change="handleChange1"></DatePicker>
                <span class="List">提醒到期天数：</span>
                <Select v-model="getList.regionalManagerId" style="width:100px" placeholder="请选择">
                    <Option v-for="item in dayList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem>
                <span>事件内容：</span>
                <Input v-model="value6" type="textarea" :rows="4" placeholder="Enter something..." style="width:400px" class="largeIuput"/>
            </FormItem>
            <FormItem>
                <span>合同附件：</span>
                <Upload
                multiple
                action="//jsonplaceholder.typicode.com/posts/">
                    <Button icon="ios-camera" class="upload"></Button>
                </Upload>
            </FormItem>
          </Form>
        </Modal>
      </template>
    </div>
</template>

<script>
import { axiosApiList } from '../../assets/api/Orderapi.js'
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
          title: '提醒编号',
          key: 'pushSn'
        },
        {
          title: '付款类型',
          key: 'name'
        },
        {
          title: '付款单位',
          key: 'deptName'
        },
        {
          title: '付款名称',
          key: 'pushEvent'
        },
        {
          title: '推送岗位',
          key: 'deptTe'
        },
        {
          title: '推送详情',
          key: 'repeatDept'
        },
        {
          title: '创建日期',
          key: 'gmtCreate'
        }
      ],
      regionList: [
        {
          value: '11018',
          label: '房租'
        },
        {
          value: '11021',
          label: '物业费'
        },
        {
          value: '11022',
          label: '电话宽带费'
        },
        {
          value: '110046',
          label: '外网账号费'
        },
        {
          value: '110047',
          label: '其他费用'
        }
      ],
      regionList1: [
        {
          value: '1',
          label: '房租'
        },
        {
          value: '2',
          label: '物业费'
        },
        {
          value: '3',
          label: '电话宽带费'
        },
        {
          value: '4',
          label: '外网账号费'
        },
        {
          value: '5',
          label: '其他费用'
        }
      ],
      storeList: [
        {
          value: '1111',
          label: '系统管理'
        },
        {
          value: '3112',
          label: '万达店一店'
        },
        {
          value: '3122',
          label: '业务部'
        },
        {
          value: '3127',
          label: '区域经理李四'
        },
        {
          value: '3129',
          label: '江南店'
        },
        {
          value: '3130',
          label: '南兴店'
        },
        {
          value: '7',
          label: '新房部'
        },
        {
          value: '8',
          label: '运营部'
        },
        {
          value: '9',
          label: '人事部'
        },
        {
          value: '10',
          label: '财务部'
        },
        {
          value: '11',
          label: '新房市场部'
        },
        {
          value: '12',
          label: '权证部'
        },
        {
          value: '13',
          label: '总经办'
        },
        {
          value: '14',
          label: '综合管理部'
        },
        {
          value: '15',
          label: '行政部'
        },
        {
          value: '16',
          label: '新房项目部'
        },
        {
          value: '17',
          label: '新房直销部'
        },
        {
          value: '18',
          label: '科技公司'
        },
        {
          value: '19',
          label: '外网运营部'
        },
        {
          value: '20',
          label: '培训部'
        },
        {
          value: '21',
          label: '区域经理朵慕盛'
        },
        {
          value: '22',
          label: '杭州店'
        },
        {
          value: '23',
          label: '区域经理林祥'
        },
        {
          value: '24',
          label: '滨江店'
        },
        {
          value: '25',
          label: '下沙店'
        },
        {
          value: '26',
          label: '嘉兴店'
        },
        {
          value: '27',
          label: '滨海店'
        },
        {
          value: '28',
          label: '萧山店'
        },
        {
          value: '29',
          label: '区域经理封无极'
        },
        {
          value: '30',
          label: '大兴店'
        },
        {
          value: '31',
          label: '江干店'
        },
        {
          value: '32',
          label: '河南店'
        },
        {
          value: '33',
          label: '长春店'
        },
        {
          value: '34',
          label: '万达店'
        },
        {
          value: '35',
          label: '南格店'
        },
        {
          value: '36',
          label: '江南一店'
        },
        {
          value: '37',
          label: '江南二店'
        },
        {
          value: '38',
          label: '江南三店'
        },
        {
          value: '39',
          label: '尚道总经理部'
        },
        {
          value: '40',
          label: '尚道福总经理部'
        },
        {
          value: '41',
          label: '江南一店'
        },
        {
          value: '42',
          label: '江南二店'
        },
        {
          value: '43',
          label: '江南三店'
        },
        {
          value: '44',
          label: '尚道总经理部'
        },
        {
          value: '45',
          label: '尚道福总经理部'
        },
        {
          value: '46',
          label: '渠道总监部'
        },
        {
          value: '47',
          label: '渠道经理一部'
        },
        {
          value: '48',
          label: '渠道经理二部'
        },
        {
          value: '49',
          label: '渠道经理三部'
        },
        {
          value: '50',
          label: '驻场经理一部'
        },
        {
          value: '51',
          label: '驻场销售'
        },
        {
          value: '52',
          label: '驻场助理'
        },
        {
          value: '53',
          label: '渠道专员'
        },
        {
          value: '54',
          label: '渠道专员2'
        },
        {
          value: '55',
          label: '渠道专员3'
        },
        {
          value: '56',
          label: '驻场经理二部'
        },
        {
          value: '57',
          label: '驻场销售二部'
        },
        {
          value: '58',
          label: '东北二大区'
        },
        {
          value: '59',
          label: '人事二部'
        },
        {
          value: '60',
          label: '中亚新区'
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
        beginTime: '',
        current: 1,
        deptId: '',
        endTime: '',
        pushEvent: '',
        pushId: '',
        type: '',
        deptName: ''
      },
      List: [],
      total: '',
      currentdate: '',
      path_List: 'emp/payment/remind/remind_page',
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
    clear () {
      this.getList.beginTime = ''
      this.getList.deptId = ''
      this.getList.endTime = ''
      this.getList.pushEvent = ''
      this.getList.pushId = ''
      this.getList.type = ''
      this.getList.deptName = ''
      this.getList.shopNature = ''
    },
    changepage (newcurrent) {
      this.getList.current = newcurrent
      this.getMenuList()
    },
    getShowList () {
      this.getMenuList()
    },
    handleChange1 (data) {
      this.addList.remindTimeList.pushTime = data
      var arr = this.addList.remindTimeList.pushTime.split(' ')
      var beginTime = arr[0]
      var beginTime1 = beginTime.split('')[9] - 1
      var beginTime2 = beginTime.slice(0, 9).concat(beginTime1)
      this.addList.remindTimeList.pushTimeLocal = beginTime2 + 'T16:00:00.000Z'
      console.log(this.addList.remindTimeList.pushTimeLocal)
    },
    async ok () {
      this.addList.content = this.value6
      this.addList.pushEvent = this.getList.deptName
      this.addList.pushSn = this.currentdate
      this.addList.deptId = this.getList.shopNature
      this.addList.type = this.getList.regionalManagerId
      this.addList.remindTimeList.advanceDays = this.getList.regionalManagerId
      console.log(this.addList)
      const { data: res } = await this.$http.post('emp/payment/remind/save_remind', this.addList)
      console.log(res)
      this.getMenuList()
      this.resetPaymentFrom()
      this.$Message.info('确认成功')
    },
    cancel () {
      this.resetPaymentFrom()
      this.$Message.info('已取消')
    },
    getTime () {
      var date = new Date()
      // 以下代码依次是获取当前时间的年月日时分秒
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      var minute = date.getMinutes()
      var hour = date.getHours()
      var second = date.getSeconds()
      var Milliseconds = date.getMilliseconds()
      // 固定时间格式
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      if (hour >= 0 && hour <= 9) {
        hour = '0' + hour
      }
      if (minute >= 0 && minute <= 9) {
        minute = '0' + minute
      }
      if (second >= 0 && second <= 9) {
        second = '0' + second
      }
      if (Milliseconds >= 0 && Milliseconds <= 9) {
        Milliseconds = '00' + Milliseconds
      } else if (Milliseconds >= 10 && Milliseconds <= 99) {
        Milliseconds = '0' + Milliseconds
      }
      var currentdate = year + month + strDate + hour + minute + second + Milliseconds
      this.currentdate = currentdate
    },
    add () {
      this.modal1 = true
      this.getTime()
    },
    resetPaymentFrom () {
      this.$refs.PaymentFromRef.resetFields()
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
    margin-top: 110px;
}
.footer {
    position: absolute;
    right: 16px;
}
.addButton {
    position: absolute;
    right: 20px;
    top: 80px;
}
.col {
    margin-left: 30px;
}
.searchButton {
    margin-left: 120px;
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
