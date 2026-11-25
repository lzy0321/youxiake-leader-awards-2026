# 2026 游侠客年度领队盛典

游侠客 × OPPO 年度领队活动的移动端交互原型。

## 页面

- index.html：活动首页
- ranking.html：完整人气榜单
- leader-stories.html：领队故事投稿及审核状态演示
- photography.html：摄影展
- vote-details.html：票数详情

## 本地预览

在本目录启动静态服务器，例如 `python -m http.server 8080`，然后打开 http://localhost:8080 。

## 当前实现

纯 HTML、CSS、JavaScript，无需安装依赖或构建。投票、账号、审核和文章数据均为原型演示，使用浏览器 sessionStorage 保存；真实账号权限、投票、审核与内容读取需要服务端接口。图片和示例视频包含外部资源，预览时需要联网。微信图片分享依赖设备的系统分享支持，否则可下载海报后分享。
