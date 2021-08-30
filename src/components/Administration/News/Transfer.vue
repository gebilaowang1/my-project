<template>
    <div>
        <Card  class="main">
            <Form ref="PaymentFromRef">
                <FormItem class="header">
                    <span>申请编号：</span>
                    <Input v-model="this.currentdate" disabled style="width:300px"/>
                </FormItem>
                <FormItem class="List">
                    <span>申请标题：</span>
                    <Input v-model="this.value9" disabled placeholder="由管理员发起的资产领用申请" style="width:300px"/>
                </FormItem>
                <FormItem class="List">
                    <span>申请事由：</span>
                    <Input v-model="this.value6" type="textarea" :rows="4" placeholder="输入申请事由" style="width:500px" class="largeIuput"/>
                </FormItem>
                <FormItem class="List">
                    <span>资产： {{this.create}}</span>
                    <Button type="success" @click="handlechangeAssets = true" class="choose">资产选择</Button>
                </FormItem>
                <FormItem class="List">
                    <span>接受负责人：</span>
                    <Select v-model="model1" style="width:200px" placeholder="请选择">
                        <Option v-for="item in regionList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Select v-model="model2" style="width:150px" placeholder="请选择" class="null">
                        <Option v-for="item in nullList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem class="List">
                    <span>新存放地点： </span>
                    <Input v-model="model3" style="width: 350px"></Input>
                </FormItem>
                <FormItem>
                    <span>转移方式：</span>
                    <Select v-model="model4" style="width:200px" placeholder="请选择">
                        <Option v-for="item in getList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <span>转移时间：</span>
                    <DatePicker type="date" style="width: 200px"  format="yyyy-MM-dd HH:mm:ss" @on-change="handleChange1"></DatePicker>
                </FormItem>
                <FormItem class="List">
                    <span>备注： </span>
                    <Input v-model="Notes" style="width: 510px"></Input>
                </FormItem>
                <FormItem class="List">
                    <span>合同附件：</span>
                    <Upload
                    multiple
                    action="//jsonplaceholder.typicode.com/posts/">
                        <Button icon="ios-camera" class="upload"></Button>
                    </Upload>
            </FormItem>
            </Form>
        </Card>
        <Card class="footer">
            <Form>
                <FormItem class="Flow">
                    <span class="Flow_font">流程</span>
                </FormItem>
                <FormItem>
                    <div class="Permission">
                        <span class="Permission_font">行政主管</span>
                    </div>
                    <div  class="Director">
                        <p class="Director_font">行政主管</p>
                        <p>1人审批</p>
                    </div>
                </FormItem>
            </Form>
        </Card>
        <div>
          <Button class="Cancels" @click="Cancels">取消</Button>
          <Button type="success" class="Submit">提交</Button>
        </div>
        <template>
            <Modal
            v-model="handlechangeAssets"
            @on-ok="ok"
            @on-cancel="cancel"
            width="50%">
                <span slot="header" class="title">
                    资产选择
                </span>
                <Table border :columns="columns12" :data="List" class="table" stripe @on-selection-change="handleChangeTable"></Table>
            </Modal>
        </template>
    </div>
</template>

<script>
import Bus from '../../../assets/Bus.js'
export default {
  data () {
    return {
      model4: '',
      model3: '',
      model2: '',
      model1: '',
      create: '',
      Options: '',
      handlechangeAssets: false,
      Notes: '',
      currentdate: '',
      main: '',
      value9: '',
      value6: '',
      value: '',
      getList: [
        {
          value: '1',
          label: '员工自拿'
        },
        {
          value: '2',
          label: '邮寄'
        }
      ],
      columns12: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '资产编号',
          key: 'gmtCreate'
        },
        {
          title: '资产名称',
          key: 'taskDeptPname'
        },
        {
          title: '入库时间',
          key: 'taskDeptName'
        },
        {
          title: '使用期限（年）',
          key: 'deptAddr'
        },
        {
          title: '资产价值',
          key: 'deptTe'
        },
        {
          title: '资产净值',
          key: 'repeatDept'
        }
      ],
      List: [
        {
          gmtCreate: 'GDZJ20210622152222796',
          taskDeptPname: '键盘',
          taskDeptName: '2021-06-22 15:22:23',
          deptAddr: 0,
          deptTe: 200,
          repeatDept: 20
        },
        {
          gmtCreate: 'GDZJ20210109150641704',
          taskDeptPname: '苹果电脑',
          taskDeptName: '2021-01-09 15:06:42',
          deptAddr: 0,
          deptTe: 90000,
          repeatDept: 15000
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
      nullList: []
    }
  },
  created () {
    this.getDate()
    this.getData()
  },
  methods: {
    getDate () {
      var date = new Date()
      // 以下代码依次是获取当前时间的年月日时分秒
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      var minute = date.getMinutes()
      var hour = date.getHours()
      var second = date.getSeconds()
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
      var currentdate = 'SP' + year + month + strDate + hour + minute + second
      this.currentdate = currentdate
    },
    getData () {
      Bus.$on('log', (content) => {
        this.main = content
        console.log(this.main)
      })
    },
    handleChangeTable (data) {
      this.Options = data
      console.log(this.Options)
      this.create = this.Options[0].gmtCreate
    },
    Cancels () {
      this.$router.push('/Assets')
    }
  }
}
</script>

<style scoped>
.main {
  width: 650px;
  height: 670px;
  margin-left: 50px;
  margin-top: 60px;
  border-radius: 25px;
}
.header {
  margin-top: 0px;
}
.upload {
  width: 70px;
  height: 70px;
  position: relative;
  left: 70px;
  top: -30px;
}
.footer {
  width: 650px;
  height: 200px;
  margin-top: 25px;
  border-radius: 25px;
  margin-left: 50px;
}
.Submit {
  margin-top: 20px;
  margin-left: 50px;
}
.Cancels {
  margin-top: 20px;
  margin-left: 270px;
}
.Flow {
  margin-top: 5px;
  margin-left: 15px;
}
.Flow_font {
  font-size: 18px;
  font-weight: 600px;
}
.Permission {
  background-color: rgb(46,119,247);
  color: white;
  width: 70px;
  height: 70px;
  border-radius: 10px;
  margin-top: -15px;
}
.Permission_font {
  line-height: 70px;
  padding-left: 6px;
}
.Director {
  position: relative;
  left: 80px;
  top: -70px;
}
.Director_font {
  font-size: 18px;
  font-weight: 900px;
}
.List {
  margin-top: -10px;
}
.title {
  padding-left: 270px;
  font-size: 20px;
  font-weight: 800px;
}
.choose {
  margin-left: 20px;
}
.null {
  margin-left: 30px;
}
</style>
