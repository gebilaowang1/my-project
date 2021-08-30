<template>
    <div>
    <div class="body">
    <Breadcrumb　class="header_item">
        <BreadcrumbItem to="/Welcome"><Icon type="md-home" /> 首页</BreadcrumbItem>
        <BreadcrumbItem>行政管理</BreadcrumbItem>
        <BreadcrumbItem>卫生核查</BreadcrumbItem>
    </Breadcrumb>
    <Card class="card">
        <Row>
            <Col>
            <span>搜索：</span>
            <Input v-model="List.searchKey" placeholder="任务门店名称" style="width: 200px" />
            </Col>
            <Col class="col">
            <span>任务时间：</span>
            <DatePicker type="datetimerange" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择任务时间" style="width: 200px" @on-change="handleChangeTest"></DatePicker>
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
            <DatePicker type="datetimerange" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择上传时间" style="width: 200px" @on-change="handleChangeCreate"></DatePicker>
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
            <span>核查结果：</span>
            <Select v-model="model2" style="width:200px" class="List" placeholder="请选择核查详情" @on-change='changerank'>
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
        <TabPane label="今日核查">
            <Table border :columns="columns12" :data="getList" class="table"></Table>
                <template>
                    <Page :total="total"
                    :current="List.current"
                    @on-change="changepage"
                    show-total
                    class="footer"/>
                </template>
        </TabPane>
        <TabPane label="历史核查">
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
import { handleChangevideo } from '../../assets/api/Base.js'
import { axiosApiList } from '../../assets/api/Orderapi.js'
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
      columns12: [
        {
          title: '任务时间',
          key: 'gmtCreate'
        },
        {
          title: '任务名称',
          key: 'taskName'
        },
        {
          title: '核查区域',
          key: ''
        },
        {
          title: '推送门店',
          key: 'taskDeptName'
        },
        {
          title: '上传员工',
          key: 'uploadEmpName'
        },
        {
          title: '视频时间',
          key: 'uploadTime'
        },
        {
          title: '视频详情',
          key: 'companyNo'
        },
        {
          title: '核查结果',
          key: 'companyNo'
        }
      ],
      List: {
        bizType: 'clean_task',
        current: 1,
        deptIdList: [],
        empId: null,
        historyed: false,
        taskTimeBegin: '',
        taskTimeEnd: '',
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
      handleChangeTestList: [],
      handleChangeCreateList: [],
      changebooleanList: [],
      changeRankList: [],
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
    handleChangeTest (data) {
      this.handleChangeTestList = handleChangevideo(data, this.List.taskTimeBegin,
        this.List.taskTimeEnd, this.List.taskTimeLocal)
      this.List.taskTimeBegin = this.handleChangeTestList[0]
      this.List.taskTimeEnd = this.handleChangeTestList[1]
      this.List.taskTimeLocal = this.handleChangeTestList[2]
      console.log(this.List.taskTimeBegin, this.List.taskTimeEnd, this.List.taskTimeLocal)
    },
    handleChangeCreate (data) {
      this.handleChangeCreateList = handleChangevideo(data, this.List.uploadTimeBegin,
        this.List.uploadTimeEnd, this.List.uploadTimeLocal)
      this.List.uploadTimeBegin = this.handleChangeCreateList[0]
      this.List.uploadTimeEnd = this.handleChangeCreateList[1]
      this.List.uploadTimeLocal = this.handleChangeCreateList[2]
    },
    clear () {
      this.List.searchKey = ''
      this.model1 = ''
      this.model2 = ''
      this.List.taskScoreType = ''
    },
    changeboolean () {
      this.changebooleanList = this.$changeList.changeVideo(this.model1,
        this.List.videoUploadedLocal, this.List.videoUploaded)
      this.List.videoUploadedLocal = this.changebooleanList[0]
      this.List.videoUploaded = this.changebooleanList[1]
      console.log(this.List.videoUploadedLocal, this.List.videoUploaded)
    },
    changerank () {
      this.changeRankList = this.$changeList.changeVideo(this.model2,
        this.List.taskScoreType, '')
      this.List.taskScoreType = this.changeRankList[0]
      console.log(this.List.taskScoreType)
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
