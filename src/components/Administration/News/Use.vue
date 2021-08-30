<template>
    <div>
        <Card  class="main">
            <Form ref="PaymentFromRef">
                <FormItem class="List">
                    <span>申请编号：</span>
                    <Input v-model="this.currentdate" disabled style="width:300px"/>
                </FormItem>
                <FormItem class="List">
                    <span>申请标题：</span>
                    <Input v-model="this.value9" disabled placeholder="由管理员发起的资产领用申请" style="width:300px"/>
                </FormItem>
                <FormItem>
                    <span>事件内容：</span>
                    <Input v-model="this.value6" type="textarea" :rows="4" placeholder="输入申请事由" style="width:500px" class="largeIuput"/>
                </FormItem>
                <FormItem>
                    <span>物资名称：{{this.$store.state.name}}</span>
                </FormItem>
                <FormItem>
                    <span>领用日期：</span>
                    <DatePicker type="date" style="width: 170px"  format="yyyy-MM-dd HH:mm:ss" @on-change="handleChange1"></DatePicker>
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
          <Button class="Cancels" @click="close">取消</Button>
          <Button type="success" class="Submit" @click="handleChangeUse">提交</Button>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      currentdate: '',
      main: '',
      value9: '',
      value6: ''
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
    handleChangeUse () {
      this.getData()
    },
    close () {
      this.$router.push('/Assets')
    }
  }
}
</script>

<style scoped>
.main {
  width: 650px;
  height: 470px;
  margin-left: 50px;
  margin-top: 60px;
  border-radius: 25px;
}
.List {
  margin-top: 15px;
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
</style>
