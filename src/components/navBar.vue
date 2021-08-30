<template>
  <div class="nav-bar-container">
    <div class="btn-left">
      <Icon type="ios-arrow-back" />
    </div>
    <div class="scroll-container">
      <slot></slot>
    </div>
    <div class="btn-right">
      <Icon type="ios-arrow-forward" />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>

.nav-bar-container {
  position: relative;
  height: 38px;
  background-color: rgb(240,240,240);
  /* overflow: hidden; */
}
.btn-left {
  position: absolute;
  top: 0;
  left: 0;
  width: 28px;
  height: 38px;
  line-height: 38px;
  background-color: #fff;
  text-align: center;
  font-size: 25px;
  z-index: 9;
}
.scroll-container {
  position: absolute;
  white-space: nowrap;
  left: 30px;
}
.btn-right {
  position: absolute;
  top: 0;
  right: 0;
  width: 28px;
  height: 38px;
  line-height: 38px;
  background-color: #fff;
  text-align: center;
  font-size: 25px;
  z-index: 9;
}
</style>
