const ant_data = require('./antdata.json')
const wx_data = require('./wxdata.json')
const similarity = require('similarity')

const wx_keys = Object.keys(wx_data)
const ant_keys = Object.keys(ant_data)

export function get_property_mapping() {
  return wx_keys.map(key => {
    const wx_key = key.split('.')[1]
    let similarity_list = {}
    let max_v = 0
    let max_key = ant_keys[0]
    ant_keys.map((_key, i) => {
      const ant_key = _key.split('.')[1]
      const similar_v = similarity(wx_key, ant_key)
      if (similar_v >= max_v) {
        max_v = similar_v
        max_key = _key
      }
    })
    const wx_params = wx_data[key]['params'] || {}
    const ant_params = ant_data[max_key]['params'] || {}
  
    if (max_v === 1) {
      // 1 -> 2
      if (compare_params(wx_params, ant_params)) {
        return {
          from: key,
          to: max_key
        }
      }
    } else if (max_v >= 0.6) {
      // 1 -> 4
      const result = is_same_params(wx_params, ant_params)
      if (result) {
        // console.log(`${key} -> ${max_key}: ${max_v}`)
        return {
          from: key,
          to: max_key
        }
      }
    } else {
      // Warning 1
    }
  })
}

function compare_params(wx_params: object, ant_params: object) {
  const wx_params_keys = Object.keys(wx_params)
  const ant_params_keys = Object.keys(ant_params)

  for (let wx_param_index in wx_params_keys) {
    const wx_param = wx_params_keys[wx_param_index]
    if (!(wx_param in ant_params)) {
      // 2 -> warnig level 2
    } else if (wx_param['type'] && wx_param['type'] === 'Function') {
      // 2 -> 3
      // 3 -> Waring level 1
    } else {
      // 2 -> 3
      // 3 > correct
      return true
    }
  }
  return false
}

function is_same_params(wx_params: object, ant_params: object) {
  return Object.keys(wx_params).every(e => {
    return e in ant_params
  })
}


