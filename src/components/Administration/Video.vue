<template>
    <div>
    <div class="body">
    <Breadcrumb　class="header_item">
        <BreadcrumbItem to="/Welcome"><Icon type="md-home" /> 首页</BreadcrumbItem>
        <BreadcrumbItem>行政管理</BreadcrumbItem>
        <BreadcrumbItem>早会视频</BreadcrumbItem>
    </Breadcrumb>
    <Card class="card">
        <Row>
            <Col>
            <span>区域门店：</span>
            <Input v-model="List.searchKey" placeholder="请输入区域门店" style="width: 200px" />
            </Col>
            <Col class="col">
            <span>早会日期：</span>
            <DatePicker type="datetimerange" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择早会日期" style="width: 200px" @on-change="handleChange"></DatePicker>
            </Col>
            <Col class="col">
            <span>上传员工：</span>
            <Select v-model="model4" style="width:200px" class="List" placeholder="请选择">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </Col>
            <Col>
            <Select v-model="model3" style="width:80px" class="List" placeholder="请选择">
                <Option v-for="item in roleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </Col>
            <Col class="col">
            <span>上传时间：</span>
            <DatePicker type="datetimerange" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择上传时间" style="width: 200px" @on-change="handleChange1"></DatePicker>
            </Col>
            <Col class="col">
            <span>视频详情：</span>
            <Select v-model="model1" style="width:200px" class="List" placeholder="请选择视频详情" @on-change='changeboolean'>
                <Option v-for="item in videoList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </Col>
        </Row>
        <Row>
            <Col class="rankcol">
            <span>评级结果：</span>
            <Select v-model="model2" style="width:200px" class="List" placeholder="请选择评级结果" @on-change='changerank'>
                <Option v-for="item in rankList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </Col>
            <Col class="rankcol">
            <Button type="success" class="button" @click="getVideoList">查询</Button>
            <Button class="button" @click="clear">清空</Button>
            </Col>
        </Row>
    </Card>
    </div>
    <div class="show">
    <Tabs type="card" @on-click="changeList">
        <TabPane label="今日视频">
            <Table border :columns="columns12" :data="getList" class="table" stripe></Table>
                <template>
                    <Page :total="total"
                    :current="List.current"
                    @on-change="changepage"
                    show-total
                    class="footer"/>
                </template>
        </TabPane>
        <TabPane label="历史视频">
            <Table border :columns="columns12" :data="getList" class="table" stripe></Table>
                <template>
                    <Page :total="total"
                    :current="List.current"
                    @on-change="changepage"
                    show-total
                    class="footer"/>
                </template>
        </TabPane>
    </Tabs>
    </div>
    </div>
</template>
<script>
import { axiosApiList } from '../../assets/api/Orderapi.js'
import { handleChangevideo, changeVideo } from '../../assets/api/Base.js'
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
          label: 'A'
        },
        {
          value: '2',
          label: 'B'
        },
        {
          value: '3',
          label: 'C'
        },
        {
          value: '4',
          label: 'D'
        }
      ],
      columns12: [
        {
          title: '早会日期',
          key: 'gmtCreate'
        },
        {
          title: '区域名称',
          key: 'taskDeptPname'
        },
        {
          title: '门店名称',
          key: 'taskDeptName'
        },
        {
          title: '上传员工',
          key: 'deptAddr'
        },
        {
          title: '上传时间',
          key: 'deptTe'
        },
        {
          title: '视频详情',
          key: 'repeatDept'
        },
        {
          title: '评级',
          key: 'companyNo'
        }
      ],
      List: {
        bizType: 'morning_meeting',
        current: 1,
        deptIdList: [],
        empId: null,
        historyed: false,
        morningMeetingTimeBegin: '',
        morningMeetingTimeEnd: '',
        searchKey: '',
        size: 10,
        taskScoreType: '',
        taskTimeLocal: '',
        uploadEmpId: null,
        uploadTimeBegin: '',
        uploadTimeEnd: '',
        uploadTimeLocal: '',
        videoUploaded: null,
        videoUploadedLocal: ''
      },
      getList: [],
      total: '',
      model1: '',
      model2: '',
      model3: '',
      model4: '',
      importList: [],
      importList1: [],
      changeVideoList: [],
      changeVideoList1: [],
      path_List: 'emp/morning_meeting/get_morning_meeting_page',
      method: 'post'
    }
  },
  created () {
    this.getVideoList()
  },
  methods: {
    async getVideoList () {
      await axiosApiList(this.path_List, this.List, this.method).then(res => {
      console.log(res)
      this.total = res.data.data.total
      this.getList = res.data.data.records
      })
    },
    changepage (newcurrent) {
      this.List.current = newcurrent
      this.getVideoList()
    },
    changeList () {
      this.List.historyed = !this.List.historyed
      this.getVideoList()
    },
    handleChange (data) {
      this.importList = handleChangevideo(data, this.List.morningMeetingTimeBegin, this.List.morningMeetingTimeEnd, this.List.taskTimeLocal)
      this.List.morningMeetingTimeBegin = this.importList[0]
      this.List.morningMeetingTimeEnd = this.importList[1]
      this.List.taskTimeLocal = this.importList[2]
    },
    handleChange1 (data) {
      this.importList1 = handleChangevideo(data, this.List.uploadTimeBegin, this.List.uploadTimeEnd, this.List.taskTimeLocal)
      this.List.uploadTimeBegin = this.importList[0]
      this.List.uploadTimeEnd = this.importList[1]
      this.List.taskTimeLocal = this.importList[2]
    },
    clear () {
      this.List.searchKey = ''
      this.model1 = ''
      this.model2 = ''
      this.List.taskScoreType = ''
    },
    changeboolean () {
      this.changeVideoList1 = changeVideo(this.model1, this.List.videoUploadedLocal, this.List.videoUploaded)
      this.List.videoUploadedLocal = this.changeVideoList1[0]
      this.List.videoUploaded = this.changeVideoList1[1]
      console.log(this.changeVideoList1)
    },
    changerank () {
      this.changeVideoList = changeVideo(this.model2, this.List.taskScoreType, '')
      this.List.taskScoreType = this.changeVideoList[0]
    }
  }
}
</script>

<style scoped>
.body {
    height: 180px;
    background-color: rgb(240,240,240);
}
.card {
    background-color: rgb(224,233,224);
    height: 130px;
}
.col {
    margin-left: 25px;
}
.rankcol {
    margin-top: 20px;
}
.button {
    margin-left: 25px;
}
.show{
    margin-top: 30px;
}
.header_item {
    position: absolute;
    top: 20px;
    left: 270px;
    font-size: 14px;
}
</style>
