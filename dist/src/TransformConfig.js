"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json = {
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
};
function transformWindow(windowConfig) {
    return {
        titleBarColor: windowConfig && windowConfig.navigationBarBackgroundColor,
        defaultTitle: windowConfig && windowConfig.navigationBarTitleText,
        pullRefresh: windowConfig && windowConfig.enablePullDownRefresh,
    };
}
function transformTabBarItem(itemConfig) {
    return {
        pagePath: itemConfig && itemConfig.pagePath,
        name: itemConfig && itemConfig.text,
    };
}
function transformTabBar(tabBarConfig) {
    return {
        textColor: tabBarConfig && tabBarConfig.color,
        selectedColor: tabBarConfig && tabBarConfig.selectedColor,
        backgroundColor: tabBarConfig && tabBarConfig.backgroundColor,
        items: tabBarConfig && tabBarConfig.list,
    };
}
function transform_config(weChatConfig) {
    const data = Object.assign(weChatConfig, {
        window: transformWindow(weChatConfig.window),
        tabBar: transformTabBar(weChatConfig.tabBar),
    });
    return JSON.stringify(data);
}
exports.transform_config = transform_config;
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
//# sourceMappingURL=TransformConfig.js.map