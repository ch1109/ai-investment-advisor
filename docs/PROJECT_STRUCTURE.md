# 项目结构说明

本文档详细说明了 AI 投顾演示项目的目录结构和文件组织方式。

## 📁 目录结构概览

```
ai-investment-advisor/
├── docs/                   # 📚 项目文档
├── tests/                  # 🧪 测试文件
├── src/                   # 💻 源代码
├── public/               # 🌐 静态资源
├── scripts/              # 🔧 脚本文件
└── 配置文件               # ⚙️ 项目配置
```

## 📚 docs/ - 项目文档

存放所有项目相关的文档，包括：

- `PRD.md` - 产品需求文档，详细描述项目功能和需求
- `DEPLOYMENT.md` - 通用部署指南
- `VERCEL_DEPLOYMENT_GUIDE.md` - Vercel 部署详细指南
- `VERCEL_DEPLOYMENT_STEPS.md` - Vercel 部署步骤
- `DEPLOYMENT_CHECKLIST.md` - 部署检查清单
- `DEPLOYMENT_SUCCESS.md` - 部署成功确认
- `UE_WEBVIEW_COMPATIBILITY_GUIDE.md` - UE WebView 兼容性指南

## 🧪 tests/ - 测试文件

存放各种测试和演示文件：

- `demo-test.html` - 基础演示测试页面
- `layout-comparison.html` - 布局对比测试
- `test-investment-planning.html` - 投资规划功能测试
- `test-market-insights.html` - 市场洞察功能测试
- `test-ue-compatibility.html` - UE 兼容性测试
- `test-url-params.html` - URL 参数测试

## 💻 src/ - 源代码

### src/app/ - Next.js 应用页面

使用 Next.js 13+ App Router 结构：

- `layout.tsx` - 根布局组件
- `page.tsx` - 首页
- `globals.css` - 全局样式
- `favicon.ico` - 网站图标
- `[locale]/` - 国际化路由
- `market-insights/` - 市场洞察页面
- `product-diagnosis/` - 产品诊断页面

### src/components/ - 可复用组件

- `ui/` - 基础 UI 组件库
- `layout/` - 布局相关组件
- `home/` - 首页专用组件
- `BrowserCompatibility.tsx` - 浏览器兼容性组件

### src/data/ - 数据层

- `mockData.ts` - 模拟数据，包含所有演示用的静态数据

### src/types/ - 类型定义

- `index.ts` - TypeScript 类型定义

### src/utils/ - 工具函数

- `browser-detection.ts` - 浏览器检测工具

### src/i18n/ - 国际化

- `config.ts` - 国际化配置
- `routing.ts` - 路由配置
- `i18n.ts` - 国际化主配置

### src/messages/ - 国际化文本

- `zh.json` - 中文文本
- `ja.json` - 日文文本

## 🌐 public/ - 静态资源

存放静态文件：

- `*.svg` - SVG 图标文件
- 其他静态资源

## 🔧 scripts/ - 脚本文件

- `deploy.sh` - 部署脚本

## ⚙️ 配置文件

项目根目录下的配置文件：

- `package.json` - NPM 包配置和依赖
- `package-lock.json` - 依赖锁定文件
- `next.config.ts` - Next.js 配置
- `tailwind.config.js` - Tailwind CSS 配置
- `postcss.config.mjs` - PostCSS 配置
- `tsconfig.json` - TypeScript 配置
- `eslint.config.mjs` - ESLint 配置
- `vercel.json` - Vercel 部署配置
- `middleware.ts` - Next.js 中间件

## 📋 文件组织原则

1. **按功能分类**: 文档、测试、源码分别存放
2. **层次清晰**: 每个目录都有明确的职责
3. **易于维护**: 相关文件集中存放，便于查找和修改
4. **标准化**: 遵循 Next.js 和现代前端项目的最佳实践

## 🔄 项目整理历史

本项目结构经过整理，主要变更：

1. **创建 docs/ 目录**: 将所有文档文件集中管理
2. **创建 tests/ 目录**: 将测试文件从根目录移动到专门目录
3. **清理重复文件**: 删除了重复的目录结构
4. **更新文档引用**: 修改了 README 中的文档路径引用

这样的结构使项目更加清晰、易于维护和扩展。
