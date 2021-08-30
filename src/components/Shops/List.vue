<template>
    <div class="Positioning">
        <Breadcrumb　class="header_item">
            <BreadcrumbItem to="/Welcome"><Icon type="md-home" /> 首页</BreadcrumbItem>
            <BreadcrumbItem>门店管理</BreadcrumbItem>
            <BreadcrumbItem>门店列表</BreadcrumbItem>
        </Breadcrumb>
        <Card class="input">
            <Row>
                <Col>
                    <Input v-model="getList.deptName" placeholder="门店名称">
                        <Button type="success" @click="getMenuList" slot="append">搜索</Button>
                    </Input>
                </Col>
                <Col>
                    <Select v-model="getList.urbanArea" style="width:170px" class="List" placeholder="城市区域">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </Col>
                <Col>
                    <Select v-model="getList.regionalManagerId" style="width:170px" class="List" placeholder="区域经理">
                        <Option v-for="item in regionList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </Col>
                <Col>
                    <Select v-model="getList.shopNature" style="width:170px" class="List" placeholder="门店性质">
                        <Option v-for="item in storeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </Col>
                <Col>
                    <Select v-model="getList.doBusinessStatus" style="width:170px" class="List" placeholder="营业状态">
                        <Option v-for="item in businessList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </Col>
                <Col>
                    <Select v-model="getList.businessNature" style="width:170px" class="List" placeholder="工商性质">
                        <Option v-for="item in CommerceList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </Col>
                <Col><Button type="success" class="button" @click="getShowList">查询</Button></Col>
                <Col><Button class="button">清空</Button></Col>
                <Col><Button type="success" class="button" @click="exportData1" ref="myTable">导出</Button></Col>
            </Row>
        </Card>
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
import { axiosApiList } from '../../assets/api/Orderapi.js'
export default {
  data () {
    return {
      cityList: [
        {
          value: '1',
          label: '南湖区'
        },
        {
          value: '2',
          label: '秀洲区'
        },
        {
          value: '3',
          label: '桐乡'
        },
        {
          value: '4',
          label: '海宁'
        },
        {
          value: '5',
          label: '海盐'
        },
        {
          value: '6',
          label: '嘉善'
        }
      ],
      model1: '',
      columns12: [
        {
          title: '门店编号',
          key: 'broadbandAccount'
        },
        {
          title: '门店名称',
          key: 'name'
        },
        {
          title: '责任店长',
          key: 'leaderEmpName'
        },
        {
          title: '门店地址',
          key: 'deptAddr'
        },
        {
          title: '门店类型',
          key: 'deptTe'
        },
        {
          title: '营业状态',
          key: 'repeatDept'
        },
        {
          title: '统一信用代码',
          key: 'companyNo'
        },
        {
          title: '执照照片',
          key: 'age'
        },
        {
          title: '工商性质',
          key: 'age'
        },
        {
          title: '免税额度',
          key: 'age'
        },
        {
          title: '城市区域',
          key: 'age'
        },
        {
          title: '区域经理',
          key: 'leaderEmpName'
        }
      ],
      regionList: [
        {
          value: '11018',
          label: '封无极'
        },
        {
          value: '11021',
          label: '万小江'
        },
        {
          value: '11022',
          label: '李四'
        },
        {
          value: '110046',
          label: '朵慕盛'
        },
        {
          value: '110047',
          label: '林祥'
        }
      ],
      storeList: [
        {
          value: '1',
          label: '直营门店'
        },
        {
          value: '2',
          label: '直管门店'
        },
        {
          value: '3',
          label: '合作门店'
        },
        {
          value: '4',
          label: '加盟门店'
        },
        {
          value: '5',
          label: '虚拟门店'
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
        current: 1,
        deptType: '2',
        size: 10,
        deptName: '',
        urbanArea: '',
        regionalManagerId: '',
        shopNature: '',
        doBusinessStatus: '',
        businessNature: ''
      },
      List: [],
      path_List: 'emp/dept/get_dept_page',
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
      this.getMenuList()
    },
    getShowList () {
      this.getMenuList()
    },
    exportData1 () {
      this.$refs.myTable.exportCsv({
        filename: '历史订单', // 导出Excel的名字
        original: false,
        columns: this.historyColumns, // table的每一列
        // orderid是订单编号，此处进行转换，因为orderid过长，不转换会变成科学计数法的格式
        data: this.exportdata1.map(k => {
          k.orderid = '\t' + k.orderid
          return k
        })
      })
    },
    data: function () {
      return {
        exportdata1: []
      }
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
}
.List {
    margin-left: 30PX;
}
.button {
    margin-left: 30px;
}
.table {
    margin-top: 90px;
}
.footer {
    position: absolute;
    right: 16px;
}
.header_item {
  position: relative;
  top: -122px;
  left: 54px;
}
</style>
