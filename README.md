# AI×投资 知识库

轻量级知识库系统，纯前端实现，无需后端数据库。

## ✨ 功能特性

### 核心功能
- 📊 **公司报告管理** - 添加、编辑、删除研究报告，支持评级和目标价
- 📡 **信息源管理** - 管理投资和AI学习相关的信息源
- 🏷️ **标签系统** - 灵活的标签分类，按标签筛选报告
- 🔍 **全文搜索** - 基于 Fuse.js 的模糊搜索，快速定位内容
- 💾 **数据持久化** - 使用 LocalStorage 存储，数据保存在本地
- 📤 **导入导出** - JSON 格式导入导出，方便备份和迁移

### 界面特性
- 🎨 **现代化UI** - Tailwind CSS，简洁美观
- 📱 **响应式设计** - 支持桌面和移动设备
- ⚡ **快速加载** - 纯前端，无需服务器渲染

## 🚀 快速开始

### 本地运行
直接用浏览器打开 `index.html` 即可：

```bash
# macOS
open index.html

# Linux
xdg-open index.html

# Windows
start index.html
```

或者使用本地服务器：

```bash
# Python 3
python -m http.server 8000

# Node.js (需要安装 http-server)
npx http-server
```

然后访问 `http://localhost:8000`

### 部署上线

#### 方案1：Vercel（推荐）
1. 注册 [Vercel](https://vercel.com) 账号
2. 安装 Vercel CLI: `npm i -g vercel`
3. 运行: `vercel`
4. 按提示完成部署

#### 方案2：Netlify
1. 注册 [Netlify](https://netlify.com) 账号
2. 拖拽文件夹到 Netlify 页面
3. 获得在线地址

#### 方案3：GitHub Pages
1. 创建 GitHub 仓库
2. 上传所有文件
3. Settings → Pages → 选择分支
4. 访问 `https://yourusername.github.io/repo-name`

#### 方案4：云服务器
上传到服务器的静态文件目录（如 `/var/www/html`）即可。

## 📖 使用说明

### 新建报告
1. 点击右上角「+ 新建」按钮
2. 填写标题、评级、标签等信息
3. 内容支持 HTML 格式
4. 保存后会自动出现在首页和报告列表

### 搜索功能
- 在搜索框输入关键词
- 实时搜索报告和信息源
- 点击结果快速跳转

### 标签筛选
- 在报告页面选择标签
- 自动筛选包含该标签的报告

### 数据备份
- 点击底部「导出数据」
- 保存 JSON 文件
- 需要时点击「导入数据」恢复

## 🎨 自定义

### 修改标签
编辑 `app.js` 中的 `getDefaultTags()` 函数：

```javascript
function getDefaultTags() {
    return [
        { id: 'your-tag', name: '你的标签', color: 'blue' },
        // 更多标签...
    ];
}
```

### 修改主题
修改 `style.css` 中的颜色变量，或直接使用 Tailwind CSS 类。

### 添加功能
所有逻辑在 `app.js` 中，可以自由扩展：
- 添加新的数据模型
- 扩展表单字段
- 添加新的页面

## 📁 文件结构

```
knowledge-base-v2/
├── index.html      # 主页面
├── style.css       # 样式文件
├── app.js          # 核心逻辑
└── README.md       # 说明文档
```

## 🔧 技术栈

- **HTML5** - 页面结构
- **Tailwind CSS** - UI 框架（CDN）
- **Vanilla JavaScript** - 核心逻辑
- **Fuse.js** - 模糊搜索
- **LocalStorage** - 数据持久化

## 📝 数据格式

### 报告数据
```json
{
  "id": "unique-id",
  "title": "京东方A (000725.SZ)",
  "type": "buy",
  "tags": ["display", "cycle"],
  "currentPrice": "4.18元",
  "targetPrice": "5.0-5.5元",
  "content": "<p>投资逻辑...</p>",
  "createdAt": "2026-02-21",
  "updatedAt": "2026-02-23"
}
```

### 信息源数据
```json
{
  "id": "unique-id",
  "name": "一凌策略研究",
  "type": "strategy",
  "platform": "公众号",
  "link": "",
  "description": "国金证券牟一凌团队",
  "tags": ["strategy"],
  "createdAt": "2026-02-23"
}
```

## 🚧 注意事项

- 数据保存在浏览器 LocalStorage 中，清除浏览器数据会丢失
- 建议定期导出备份
- 不同浏览器/设备的数据不互通
- 如需多设备同步，可以考虑使用云存储方案

## 📮 反馈与建议

如有问题或建议，请联系 OpenClaw 🦞

---

**最后更新：2026-02-24**
