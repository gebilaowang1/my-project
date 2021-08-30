import request from './request'

export function handleChangevideo (data, TimeBegin, TimeEnd, TimeLocal) {
  TimeBegin = data[0]
  TimeEnd = data[1]
  var arr = TimeBegin.split(' ')
  var arr1 = TimeEnd.split(' ')
  var beginTime = arr[0]
  var endTime = arr1[0]
  var beginTime1 = beginTime.split('')[9] - 1
  var endTime1 = endTime.split('')[9] - 1
  var beginTime2 = beginTime.slice(0, 9).concat(beginTime1)
  var endTime2 = endTime.slice(0, 9).concat(endTime1)
  TimeLocal = [beginTime2 + 'T16:00:00.000Z', endTime2 + 'T16:00:00.000Z']
  return [TimeBegin, TimeEnd, TimeLocal]
}
export function changeVideo (model2, taskScoreType, Uploaded) {
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
