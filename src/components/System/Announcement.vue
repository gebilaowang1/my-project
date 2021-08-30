<template>
    <div  class="Positioning">
        <Breadcrumb　class="header_item">
            <BreadcrumbItem to="/Welcome"><Icon type="md-home" /> 首页</BreadcrumbItem>
            <BreadcrumbItem>系统管理</BreadcrumbItem>
            <BreadcrumbItem>公告内容</BreadcrumbItem>
        </Breadcrumb>
        <Card class="input">
            <Row>
                <Col>
                    <Input v-model="getList.search" placeholder="资产名称/资产编号">
                        <Button type="success" @click="getMenuList" slot="append">查询</Button>
                    </Input>
                </Col>
                <Col>
                    <Select v-model="getList.type" style="width:200px" class="List" placeholder="部门">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </Col>
                <Col class="col">
                    <DatePicker type="datetimerange" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择早会日期" style="width: 200px" @on-change="handleChange"></DatePicker>
                </Col>
                <Col><Button type="success" class="button" @click="getShowList">查询</Button></Col>
                <Col :span="8"><Button class="button">清空</Button></Col>
            </Row>
        </Card>
        <Button class="Release" type="success" @click="add">新增发布</Button>
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
                title="Common Modal dialog box title"
                width="45%">
                <span slot="header" class="title">
                    新增发布+
                </span>
                <Form class="main" ref="PaymentFromRef">
                    <FormItem>
                        <span>公告类型：</span>
                        <Select v-model="getList.shopNature" style="width:300px" class="List" placeholder="请选择">
                            <Option v-for="item in storeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <span>公告标题：</span>
                        <Input v-model="getList.deptName" class="List" style="width:300px"></Input>
                    </FormItem>
                    <FormItem>
                        <span>公告序号：</span>
                        <Input v-model="getList.deptName" class="List" style="width:300px"></Input>
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
import E from 'wangeditor'
export default {
  data () {
    return {
      Options: '',
      modal1: false,
      cityList: [
        {
          value: 'LATEST',
          label: '最新'
        },
        {
          value: 'BUSINESS',
          label: '业务'
        },
        {
          value: 'PERSONNEL',
          label: '人事'
        },
        {
          value: 'ADMINISTRATIVE',
          label: '行政'
        },
        {
          value: 'FINANCE',
          label: '财务'
        },
        {
          value: 'TRANSACTION',
          label: '交易'
        },
        {
          value: 'COMMON_TEMPLATES',
          label: '常用模板>'
        },
        {
          value: 'OTHER',
          label: '其他'
        }
      ],
      model1: false,
      columns12: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '公告标题',
          key: 'title',
          align: 'center'
        },
        {
          title: '公告序号',
          key: 'sort',
          width: '100px',
          align: 'center'
        },
        {
          title: '分类',
          key: 'title',
          align: 'center'
        },
        {
          title: '发布人',
          key: 'deptName',
          align: 'center'
        },
        {
          title: '发布日期',
          key: 'gmtCreate',
          align: 'center'
        },
        {
          title: '操作',
          key: 'serviceLife',
          align: 'center'
        }
      ],
      storeList: [
        {
          value: '1',
          label: '业务'
        },
        {
          value: '2',
          label: '人事'
        },
        {
          value: '3',
          label: '行政'
        },
        {
          value: '4',
          label: '财务'
        },
        {
          value: '5',
          label: '交易'
        },
        {
          value: '6',
          label: '常用模板'
        },
        {
          value: '7',
          label: '其他'
        }
      ],
      getList: {
        beginTime: '',
        current: 1,
        endTime: '',
        search: '',
        type: '',
        shopNature: ''
      },
      List: [],
      total: '',
      name: '',
      path_List: 'emp/announcement/announcement_page',
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
      console.log(this.getList.current)
      this.getMenuList()
    },
    getShowList () {
      this.getMenuList()
    },
    add () {
      this.modal1 = true
      const editor = new E('#div1')
      editor.create()
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
    width: 100%;
    background: rgb(224,233,224);
}
.List {
    margin-left: 20PX;
}
.button {
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
    right: 220px;
}
.Release {
    position: absolute;
    top: 120px;
    right: 30px;
}
.title {
    padding-left: 370px;
    font-size: 20px;
    font-weight: 800px;
}
.header_item {
    position: relative;
    top: -122px;
    left: 54px;
}
</style>
