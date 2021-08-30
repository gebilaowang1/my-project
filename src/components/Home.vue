<template>
    <div class="layout">
        <Layout :style="{minHeight: '100vh'}">
            <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses" accordion @on-select="handleClickIncreseNavBarItem">
                    <Submenu name="门店管理">
                        <template slot="title">
                            <Icon type="ios-navigate"></Icon>
                            门店管理
                        </template>
                        <MenuItem name="门店列表" class="Item1" to="/List">门店列表</MenuItem>
                        <MenuItem name="门店财务" class="Item1" to="/Money">门店财务</MenuItem>
                    </Submenu>
                    <Submenu name="2">
                        <template slot="title">
                            <Icon type="ios-navigate"></Icon>
                            行政管理
                        </template>
                        <MenuItem name="早会视频" class="Item1" to="/Video">早会视频</MenuItem>
                        <MenuItem name="卫生核查" class="Item1" to="/Sanitation">卫生核查</MenuItem>
                        <MenuItem name="付款提醒" class="Item1" to="/Payment">付款提醒</MenuItem>
                        <MenuItem name="固定资产" class="Item1" to="/Assets">固定资产</MenuItem>
                        <MenuItem name="日常耗品" class="Item1" to="/Consumables">日常耗品</MenuItem>
                    </Submenu>
                    <Submenu name="3">
                        <template slot="title">
                            <Icon type="ios-navigate"></Icon>
                            系统管理
                        </template>
                        <MenuItem name="公告内容" class="Item1" to="/Announcement">公告内容</MenuItem>
                        <MenuItem name="业绩播报" class="Item1" to="/Performance">业绩播报</MenuItem>
                        <MenuItem name="预设消息" class="Item1" to="/Presets">预设消息</MenuItem>
                        <Submenu name="系统日志">
                            <template slot="title">
                                系统日志
                            </template>
                            <MenuItem name="登陆日志" class="Item1" to="/Logbook">登陆日志</MenuItem>
                            <MenuItem name="房客日志" class="Item1" to="/Lodger">房客日志</MenuItem>
                            <MenuItem name="楼盘日志" class="Item1" to="/Estate">楼盘日志</MenuItem>
                            <MenuItem name="推送日志" class="Item1" to="/push">推送日志</MenuItem>
                        </Submenu>
                    </Submenu>
                </Menu>
            </Sider>
            <Layout>
                <Header :style="{padding: 0}" class="layout-header-bar">
                    <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
                    <Button type="success" class="back" @click="logout">退出登录</Button>
                </Header>
                <Content :style="{padding: '0 16px 16px'}">
                  <nav-bar>
                    <nav-bar-item></nav-bar-item>
                  </nav-bar>
                  <div class="main"><router-view></router-view></div>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>

<script>
import NavBar from './navBar.vue'
import NavBarItem from './navBarItem.vue'
export default {
  data () {
    return {
      isCollapsed: false,
      menuList: [],
      userPass: {
        empNo: '123456',
        password: '123456'
      },
      getList: {
        current: 1,
        deptType: '2',
        size: 10
      }
    }
  },
  computed: {
    rotateIcon () {
      return [
        'menu-icon',
        this.isCollapsed ? 'rotate-icon' : ''
      ]
    },
    menuitemClasses () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    }
  },
  methods: {
    collapsedSider () {
      this.$refs.side1.toggleCollapse()
    },
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/Login')
    },
    handleClickIncreseNavBarItem (name) {
      for (let item of this.$store.state.navBarItem) {
        item.color = 'default'
      }
      const option = { name, color: 'default' }
      if (JSON.stringify(this.$store.state.navBarItem).indexOf(JSON.stringify(option)) === -1) {
        this.$store.state.navBarItem.push({ 'name': name, 'color': 'success' })
      } else {
         this.$store.state.navBarItem.forEach( item => {
           if (item.name == name) {
             item.color = 'success'
           }
         });
      }
    }
  },
  components: {
    NavBar,
    NavBarItem
  }
}
</script>

<style lang="less" scoped>
.layout{
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-header-bar{
  background: #fff;
  box-shadow: 0 1px 1px rgba(0,0,0,.1);
}
.layout-logo-left{
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}
.menu-icon{
  transition: all .3s;
}
.rotate-icon{
  transform: rotate(-90deg);
}
.menu-item span{
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width .2s ease .2s;
}
.menu-item i{
  transform: translateX(0px);
  transition: font-size .2s ease, transform .2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span{
  width: 0px;
  transition: width .2s ease;
}
.collapsed-menu i{
  transform: translateX(5px);
  transition: font-size .2s ease .2s, transform .2s ease .2s;
  vertical-align: middle;
  font-size: 22px;
}
.body {
  height: 100%;
  margin: 0;
  padding: 0;
  min-width: 1366px;
}
.Header {
  position: relative;
  bottom: 10px;
  left: 20px;
}
.Item {
    background: #002141;
    color: white;
    font-size: 20px;
    font-family: Microsoft Yahei;
    font-weight: 600;
}
.Item1 {
    background: #001223;
    color: white;
}
.back {
  float: right;
  margin-right: 40px;
  margin-top: 16px;
}
.main {
  margin-top: 40px;
}
</style>
