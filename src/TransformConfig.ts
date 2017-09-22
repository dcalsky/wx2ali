import fs = require('fs')
import path = require('path')

const json: any = {
  "pages": [
    "pages/index/index",
    "pages/logs/index"
  ],
  "window": {
    "navigationBarTitleText": "Demo"
  },
  "tabBar": {
    "list": [{
      "pagePath": "pages/index/index",
      "text": "首页"
    }, {
      "pagePath": "pages/logs/logs",
      "text": "日志"
    }]
  },
  "networkTimeout": {
    "request": 10000,
    "downloadFile": 10000
  },
  "debug": true
}

// TODO get the json from a file

interface weChatConfig {
  window: windowConfig,
  tabBar: tabBarConfig,
  pages: any,
  networkTimeout: any,
  debug: any,
}

interface windowConfig {
  navigationBarBackgroundColor: string,
  navigationBarTitleText: string,
  enablePullDownRefresh: boolean,
}

interface antWindowConfig {
  titleBarColor: string,
  defaultTitle: string,
  pullRefresh: boolean,
}

interface tabBarConfig {
  color: string,
  selectedColor: string,
  backgroundColor: string,
  list: itemConfig[],
}

interface itemConfig {
  pagePath: string,
  text: string,
}

function transformWindow(
  windowConfig: windowConfig,
): antWindowConfig {
  return {
    titleBarColor: windowConfig && windowConfig.navigationBarBackgroundColor,
    defaultTitle: windowConfig && windowConfig.navigationBarTitleText,
    pullRefresh: windowConfig && windowConfig.enablePullDownRefresh,
  }
}

function transformTabBarItem(itemConfig: itemConfig): {} {
  return {
    pagePath: itemConfig && itemConfig.pagePath,
    name: itemConfig && itemConfig.text,
  }
}

function transformTabBar(tabBarConfig: tabBarConfig): object {
  return {
    textColor: tabBarConfig && tabBarConfig.color,
    selectedColor: tabBarConfig && tabBarConfig.selectedColor,
    backgroundColor: tabBarConfig && tabBarConfig.backgroundColor,
    items: tabBarConfig && tabBarConfig.list,
  }
}

export function transform_config(weChatConfig: weChatConfig): string {
  const data = Object.assign(weChatConfig, {
    window: transformWindow(weChatConfig.window),
    tabBar: transformTabBar(weChatConfig.tabBar),
  })
  return JSON.stringify(data)
}

// function transformFromFile(programDir: string, outDir:string, cb?:(err:any) => void) {
//   fs.readFile(path.resolve(programDir, './app.json'), (err:any, data:Buffer) => {
//     if (err) throw err;
//     fs.writeFile(path.resolve(outDir, './app.json'), data.toString(), 'utf8', cb)
//   })
// }

// export {

// }


// transformFromFile('./test/miniprogram1', './anttest')

// export default transformFromFile
