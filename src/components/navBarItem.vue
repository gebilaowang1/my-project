<template>
  <div class="nav-bar-item-container">
    <Tag
      type="dot"
      :color="$store.state.homeDotColor"
      name="首页"
      checkable
      @on-change="handlechangewelcome"
      >首页
    </Tag>
    <Tag
      type="dot"
      :color="item.color"
      v-for="(item, index) in $store.state.navBarItem"
      :key="index"
      :name="item.name"
      closable
      checkable
      @on-change="handlechangetag"
      @on-close="handlechangeclosetag"
      >{{ item.name }}
    </Tag>
  </div>
</template>

<script>
export default {
  methods: {
    handlechangewelcome () {
      this.$router.push('/Welcome')
      this.$store.state.homeDotColor = 'success'
      for(let item of this.$store.state.navBarItem) {
        item.color = 'defalut'
      }
    },
    handlechangetag (checked, name) {
      let addobject = this.$router.options.routes[2].children.filter(
        (item) => {
          return item.name == name
        }
      )
      this.$router.push(addobject[0].path)

      this.$store.state.navBarItem.forEach(item => {
        item.color = 'defalut'
        if (item.name == name) {
          item.color = 'success'
        }
      });
    },
    handlechangeclosetag (event, name) {
     this.$store.state.navBarItem.forEach(item => {
        if (item.name == name) {
          const index = this.$store.state.navBarItem.indexOf(item)
          this.$store.state.navBarItem.splice(index, 1);
        } 
      })
    }
  }
}
</script>

<style scoped>
.nav-bar-item-container {
  height: 38px;
  line-height: 38px;
}
</style>
