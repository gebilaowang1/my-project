import Vue from 'vue'

const changeList = {
  changeVideo: function (model2, taskScoreType, Uploaded) {
    if (model2 === '1') {
      taskScoreType = parseInt(model2)
      Uploaded = true
    } else if (model2 === '2') {
      taskScoreType = parseInt(model2)
      Uploaded = false
    } else if (model2 === '3') {
      taskScoreType = parseInt(model2)
    } else {
      taskScoreType = parseInt(model2)
    }
    return [taskScoreType, Uploaded]
  }
}
Vue.prototype.$changeList = changeList

export default {}
