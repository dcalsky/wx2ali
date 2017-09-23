const ant_data = require('./antdata.json')
const wx_data = require('./wxdata.json')
const similarity = require('similarity')

export function get_property_mapping() {
  const wx_keys = Object.keys(wx_data)
  const ant_keys = Object.keys(ant_data)

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
    const ant_key = max_key.split('.')[1]

    if (max_v === 1) {
      // 1 -> 2
      const result = compare_params(wx_params, ant_params)
      if (result === true) {
        return {
          from: wx_key,
          to: ant_key
        }
      } else {
        return {
          level: result,
          key: wx_key
        }
      }
    } else if (max_v >= 0.6) {
      // 1 -> 4
      return is_same_params(wx_params, ant_params) ? {
        from: wx_key,
        to: ant_key
      } : {
        level: 3,
        key: wx_key
      }
    } else {
      // Warning 3
      return {
        level: 3,
        key: wx_key
      }
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
      return 2
    } else if (wx_param['type'] && wx_param['type'] === 'Function') {
      // 2 -> 3
      // 3 -> Waring level 1
      return 1
    } else {
      // 2 -> 3
      // 3 > correct
      return true
    }
  }
}

function is_same_params(wx_params: object, ant_params: object) {
  return Object.keys(wx_params).every(e => {
    return e in ant_params
  })
}


