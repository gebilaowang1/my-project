<template>
    <div class="Positioning">
        <Breadcrumb　class="header_item">
            <BreadcrumbItem to="/Welcome"><Icon type="md-home" /> 首页</BreadcrumbItem>
            <BreadcrumbItem>系统管理</BreadcrumbItem>
            <BreadcrumbItem>预设消息</BreadcrumbItem>
        </Breadcrumb>
        <Card class="input">
            <Row>
                <Col class="col">
                    <DatePicker type="datetimerange" format="yyyy-MM-dd HH:mm:ss" placeholder="成交日期" style="width: 200px" @on-change="handleChange"></DatePicker>
                </Col>
                <Col>
                    <Select v-model="getList.businessNature" style="width:170px" class="List" placeholder="发送岗位">
                        <Option v-for="item in CommerceList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </Col>
                <Col>
                    <Select v-model="getList.pushType" style="width:170px" class="List" placeholder="发布类型">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </Col>
                <Col><Button type="success" class="button" @click="getMenuList">查询</Button></Col>
                <Col><Button class="clear">清空</Button></Col>
            </Row>
            <Row class="Invoke">
                <Col><Button type="success" class="Assets" @click="add"> 发布预设 </Button></Col>
            </Row>
        </Card>

        <Table border :columns="columns12" :data="List" class="table" stripe>
          <template slot-scope="{ row }" slot="name">
            <span>{{ row.deptName }}</span>
            <span class="main">{{ row.empName }}</span>
          </template>
          <template slot-scope="{ row, index }" slot="action">
            <Button type="success" size="small" style="margin-right: 5px" @click="show(index)" class="push">编辑内容</Button>
            <Button type="error" size="small" @click="remove(row.presetId)" style="margin-left: 20px" class="push">取消发送</Button>
          </template>
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
                title="Common Modal dialog box title"
                width="27%">
                <span slot="header" class="title">
                    新增发布+
                </span>
                <Form class="main" ref="PaymentFromRef">
                    <FormItem>
                        <div>
                            <Checkbox
                                :indeterminate="indeterminate"
                                :value="checkAll"
                                @click.prevent.native="handleCheckAll">全选
                                </Checkbox>
                        </div>
                        <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
                            <div class="topfrist">
                                <Checkbox label="系统管理员" class="Checkboxfrist"></Checkbox>
                                <Checkbox label="经纪人" class="Checkboxsecond"></Checkbox>
                                <Checkbox label="店长" class="Checkboxthree"></Checkbox>
                                <Checkbox label="代理店长A" class="Checkboxfour"></Checkbox>
                            </div>
                            <div class="top">
                                <Checkbox label="代理店长B" class="Checkboxfrist"></Checkbox>
                                <Checkbox label="权证经理" class="Checkboxsecond"></Checkbox>
                                <Checkbox label="区域经理" class="Checkboxthree"></Checkbox>
                                <Checkbox label="总经理" class="Checkboxfour"></Checkbox>
                            </div>
                            <div class="top">
                                <Checkbox label="总部C" class="Checkboxfrist"></Checkbox>
                                <Checkbox label="总部D" class="Checkboxsecond"></Checkbox>
                                <Checkbox label="总部E" class="Checkboxthree"></Checkbox>
                                <Checkbox label="总部F" class="Checkboxfour"></Checkbox>
                            </div>
                            <div class="top">
                                <Checkbox label="区域总监" class="Checkboxfrist"></Checkbox>
                                <Checkbox label="VR专区" class="Checkboxsecond"></Checkbox>
                                <Checkbox label="证照专员" class="Checkboxthree"></Checkbox>
                                <Checkbox label="运营专员" class="Checkboxfour"></Checkbox>
                            </div>
                            <div class="top">
                                <Checkbox label="运营主管" class="Checkboxfrist"></Checkbox>
                                <Checkbox label="运营经理" class="Checkboxsecond"></Checkbox>
                                <Checkbox label="运营总监" class="Checkboxthree"></Checkbox>
                                <Checkbox label="行政专员" class="Checkboxfour"></Checkbox>
                            </div>
                            <div class="top">
                                <Checkbox label="行政主管" class="Checkboxfrist"></Checkbox>
                                <Checkbox label="行政经理" class="Checkboxsecond"></Checkbox>
                                <Checkbox label="人事专员" class="Checkboxthree"></Checkbox>
                                <Checkbox label="人事主管" class="Checkboxfour"></Checkbox>
                            </div>
                            <div class="top">
                                <Checkbox label="人事经理" class="Checkboxfrist"></Checkbox>
                                <Checkbox label="出纳" class="Checkboxsecond"></Checkbox>
                                <Checkbox label="门店会计" class="Checkboxthree"></Checkbox>
                                <Checkbox label="新房会计" class="Checkboxfour"></Checkbox>
                            </div>
                            <div class="top">
                                <Checkbox label="财务经理" class="Checkboxfrist"></Checkbox>
                                <Checkbox label="财务总监" class="Checkboxsecond"></Checkbox>
                                <Checkbox label="项目专员" class="Checkboxthree"></Checkbox>
                                <Checkbox label="项目经理" class="Checkboxfour"></Checkbox>
                            </div>
                            <div class="top">
                                <Checkbox label="市场专员" class="Checkboxfrist"></Checkbox>
                                <Checkbox label="市场经理" class="Checkboxsecond"></Checkbox>
                                <Checkbox label="市场总监" class="Checkboxthree"></Checkbox>
                                <Checkbox label="直销专员" class="Checkboxfour"></Checkbox>
                            </div>
                            <div class="top">
                                <Checkbox label="直销经理" class="Checkboxfrist"></Checkbox>
                                <Checkbox label="外网运营专员" class="Checkboxsecond"></Checkbox>
                                <Checkbox label="外网运营总监" class="Checkboxthree"></Checkbox>
                                <Checkbox label="培训专员" class="Checkboxfour"></Checkbox>
                            </div>
                            <div class="top">
                                <Checkbox label="培训主管" class="Checkboxfrist"></Checkbox>
                                <Checkbox label="培训经理" class="Checkboxsecond"></Checkbox>
                                <Checkbox label="贷款专员" class="Checkboxthree"></Checkbox>
                                <Checkbox label="交易专员" class="Checkboxfour"></Checkbox>
                            </div>
                            <div class="top">
                                <Checkbox label="网签专员" class="Checkboxfrist"></Checkbox>
                                <Checkbox label="权证主管" class="Checkboxsecond"></Checkbox>
                                <Checkbox label="权证总监" class="Checkboxthree"></Checkbox>
                                <Checkbox label="报备专员" class="Checkboxfour"></Checkbox>
                            </div>
                            <div class="top">
                                <Checkbox label="尚道总经理" class="Checkboxfrist"></Checkbox>
                                <Checkbox label="尚道副总经理" class="Checkboxsecond"></Checkbox>
                                <Checkbox label="渠道总监" class="Checkboxthree"></Checkbox>
                                <Checkbox label="渠道经理" class="Checkboxfour"></Checkbox>
                            </div>
                            <div class="top">
                                <Checkbox label="驻场助理" class="Checkboxfrist"></Checkbox>
                                <Checkbox label="驻场销售" class="Checkboxsecond"></Checkbox>
                                <Checkbox label="驻场经理" class="Checkboxthree"></Checkbox>
                                <Checkbox label="驻场高级经理" class="Checkboxfour"></Checkbox>
                            </div>
                            <div class="top">
                                <Checkbox label="渠道实习经理" class="Checkboxfrist"></Checkbox>
                                <Checkbox label="渠道正式经理" class="Checkboxsecond"></Checkbox>
                                <Checkbox label="渠道专员" class="Checkboxthree"></Checkbox>
                                <Checkbox label="尚道企划" class="Checkboxfour"></Checkbox>
                            </div>
                            <div class="top">
                                <Checkbox label="尚道行政" class="Checkboxfrist"></Checkbox>
                                <Checkbox label="圣诺设计总监" class="Checkboxsecond"></Checkbox>
                                <Checkbox label="圣诺主案设计" class="Checkboxthree"></Checkbox>
                                <Checkbox label="圣诺设计师" class="Checkboxfour"></Checkbox>
                            </div>
                            <div class="top">
                                <Checkbox label="圣诺工程总监" class="Checkboxfrist"></Checkbox>
                                <Checkbox label="经理" class="Checkboxsecond"></Checkbox>
                                <Checkbox label="圣诺市场专员" class="Checkboxthree"></Checkbox>
                                <Checkbox label="圣诺市场经理" class="Checkboxfour"></Checkbox>
                            </div>
                            <div class="top">
                                <Checkbox label="圣诺市场总监" class="Checkboxfrist"></Checkbox>
                                <Checkbox label="圣诺采购专员" class="Checkboxsecond"></Checkbox>
                                <Checkbox label="圣诺采购经理" class="Checkboxthree"></Checkbox>
                                <Checkbox label="圣诺采购总监" class="Checkboxfour"></Checkbox>
                            </div>
                            <div class="top">
                                <Checkbox label="圣诺财务总监" class="Checkboxfrist"></Checkbox>
                                <Checkbox label="圣诺会计专员" class="Checkboxsecond"></Checkbox>
                                <Checkbox label="圣诺预算员" class="Checkboxthree"></Checkbox>
                                <Checkbox label="圣诺企划专员" class="Checkboxfour"></Checkbox>
                            </div>
                            <div class="top">
                                <Checkbox label="圣诺企划经理" class="Checkboxfrist"></Checkbox>
                                <Checkbox label="圣诺企划总监" class="Checkboxsecond"></Checkbox>
                                <Checkbox label="圣诺工程监理" class="Checkboxthree"></Checkbox>
                                <Checkbox label="圣诺售后客服" class="Checkboxfour"></Checkbox>
                            </div>
                            <div class="top">
                                <Checkbox label="副总经理" class="Checkboxfrist"></Checkbox>
                                <Checkbox label="董事长" class="Checkboxsecond"></Checkbox>
                                <Checkbox label="会计" class="Checkboxthree"></Checkbox>
                                <Checkbox label="信贷经理" class="Checkboxfour"></Checkbox>
                            </div>
                            <div class="top">
                                <Checkbox label="金融专员" class="Checkboxfrist"></Checkbox>
                                <Checkbox label="招聘专员" class="Checkboxsecond"></Checkbox>
                                <Checkbox label="综管专员" class="Checkboxthree"></Checkbox>
                                <Checkbox label="前台" class="Checkboxfour"></Checkbox>
                            </div>
                            <div class="top">
                                <Checkbox label="保洁" class="Checkboxfrist"></Checkbox>
                                <Checkbox label="过户专员" class="Checkboxsecond"></Checkbox>
                                <Checkbox label="企划专员" class="Checkboxthree"></Checkbox>
                                <Checkbox label="企划主管" class="Checkboxfour"></Checkbox>
                            </div>
                            <div class="top">
                                <Checkbox label="培训讲师" class="Checkboxfrist"></Checkbox>
                                <Checkbox label="培训助教" class="Checkboxsecond"></Checkbox>
                                <Checkbox label="系统运维" class="Checkboxthree"></Checkbox>
                                <Checkbox label="独家专员" class="Checkboxfour"></Checkbox>
                            </div>
                            <div class="top">
                                <Checkbox label="业务副总" class="Checkboxfrist"></Checkbox>
                                <Checkbox label="新房副总" class="Checkboxsecond"></Checkbox>
                                <Checkbox label="信访经纪人" class="Checkboxthree"></Checkbox>
                                <Checkbox label="新房店长" class="Checkboxfour"></Checkbox>
                            </div>
                            <div class="top">
                                <Checkbox label="新房区域经理" class="Checkboxfrist"></Checkbox>
                                <Checkbox label="新房区域总监" class="Checkboxsecond"></Checkbox>
                            </div>
                        </CheckboxGroup>
                    </FormItem>
                    <FormItem>
                        <span>公告类型：</span>
                        <Select v-model="getList.shopNature" style="width:300px" placeholder="请选择">
                            <Option v-for="item in storeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <span>发布时间：</span>
                        <DatePicker type="datetimerange" format="yyyy-MM-dd HH:mm:ss" placeholder="成交日期" style="width: 300px" @on-change="handleChange"></DatePicker>
                    </FormItem>
                    <FormItem>
                        <span>发布内容：</span>
                        <Input v-model="value5" type="textarea" placeholder="Enter something..." style="width:400px" />
                    </FormItem>
                    <FormItem>
                        <div id="div1"></div>
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
      Options: '',
      indeterminate: true,
      checkAll: false,
      checkAllGroup: [],
      cityList: [
        {
          value: 'MESSAGE',
          label: '消息'
        },
        {
          value: 'TASK',
          label: '任务'
        }
      ],
      model1: '',
      columns12: [
        {
          title: '发布类型',
          key: 'assetsNo',
          align: 'center'
        },
        {
          title: '发布内容',
          key: 'pushEvent'
        },
        {
          title: '预设发送时间',
          key: 'pushTime'
        },
        {
          title: '发布岗位',
          key: 'houseSn'
        },
        {
          title: '发布人',
          slot: 'name',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center'
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
        endTime: ''
      },
      List: [],
      total: '',
      name: '',
      modal1: false,
      path_List: 'emp/preset_message/preset_message_page',
      method: 'post',
      presetMessageIdList: {
          presetMessageId: ''
      },
      path_remove: 'emp/preset_message/remove_preset_message'
    }
  },
  created () {
    this.getMenuList()
  },
  methods: {
    async getMenuList () {
      await axiosApiList(this.path_List, this.getList, this.method).then(res => {
      this.total = res.data.data.total
      this.List = res.data.data.records
      })
    },
    add () {
      this.modal1 = true
      const editor = new E('#div1')
      editor.create()
    },
    handleCheckAll () {
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false
      if (this.checkAll) {
        this.checkAllGroup = ['系统管理员', '经纪人', '店长', '代理店长A',
                              '代理店长B','权证经理','区域经理','总经理',
                              '总部C','总部D','总部E','总部F',
                              '区域总监','VR专区','证照专员','运营专员',
                              '运营主管','运营经理','运营总监','行政专员',
                              '行政主管','行政经理','人事专员','人事主管',
                              '人事经理','出纳','门店会计','新房会计',
                              '财务经理','财务总监','项目专员','项目经理',
                              '市场专员','市场经理','市场总监','直销专员',
                              '直销经理','外网运营专员','外网运营总监','培训专员',
                              '培训主管','培训经理','贷款专员','交易专员',
                              '网签专员','权证主管','权证总监','报备专员',
                              '尚道总经理','尚道副总经理','渠道总监','渠道经理',
                              '驻场助理','驻场销售','驻场经理','驻场高级经理',
                              '渠道实习经理','渠道正式经理','渠道专员','尚道企划',
                              '尚道行政','圣诺设计总监','圣诺主案设计','圣诺设计师',
                              '圣诺工程总监','经理','圣诺市场专员','圣诺市场经理',
                              '圣诺市场总监','圣诺采购专员','圣诺采购经理','圣诺采购总监',
                              '圣诺财务总监','圣诺会计专员','圣诺预算员','圣诺企划专员',
                              '圣诺企划经理','圣诺企划总监','圣诺工程监理','圣诺售后客服',
                              '副总经理','董事长','会计','信贷经理',
                              '金融专员','招聘专员','综管专员','前台',
                              '保洁','过户专员','企划专员','企划主管',
                              '培训讲师','培训助教','系统运维','独家专员',
                              '业务副总','新房副总','信访经纪人','新房店长',
                              '新房','区域经理','新房区域','总监',
                              '新房区域经理','新房区域总监'];
      } else {
        this.checkAllGroup = [];
      }
    },
    checkAllGroupChange (data) {
      if (data.length === 102) {
        this.indeterminate = false;
        this.checkAll = true;
      } else if (data.length > 0) {
        this.indeterminate = true;
        this.checkAll = false;
      } else {
        this.indeterminate = false;
        this.checkAll = false;
      }
    },
    handleChange (data) {
      this.getList.beginTime = data[0]
      this.getList.endTime = data[1]
    },
    changepage (newcurrent) {
      this.getList.current = newcurrent
      this.getMenuList()
    },
    async remove (data) {
      this.presetMessageIdList.presetMessageId = data
      await axiosApiList(this.path_remove, this.presetMessageIdList, this.method).then(res => {
      })
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
    margin-left: 800px;
}
.clear {
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
    right: 20px;
}
.Checkboxfrist {
    margin-left: 10px;
}
.Checkboxsecond {
    position: absolute;
    left: 120px;
}
.topfrist {
    border-top: 1px solid rgb(224,233,224);
}
.Checkboxthree {
    position: absolute;
    left: 230px;
}
.top {
    margin-top: -10px;
}
.Checkboxfour {
    position: absolute;
    left: 330px;
}
.title {
    margin-left: 200px;
}
.header_item {
    position: relative;
    top: -122px;
    left: 54px;
}
.delete {
    margin-left: 30px;
}
.push {
  width: 70px;
}
.main {
    margin-left: 50px;
}
</style>
