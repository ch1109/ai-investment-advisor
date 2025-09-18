# AI 投顾演示应用

这是一个基于 Next.js 开发的 AI 投资顾问演示应用，展示了四大核心功能：投资规划与模拟、投资组合管理、市场洞察和金融产品诊断。

## 🚀 功能特性

### 1. 投资规划与模拟
- 三步式投资规划流程
- AI 生成个性化投资方案
- 交互式收益预测图表
- 资产配置可视化

### 2. 投资组合管理
- 全景资产视图仪表盘
- 智能风险预警系统
- 一键再平衡功能演示
- 实时持仓监控

### 3. 市场洞察
- 市场情绪指数仪表盘
- AI 解读热点事件
- 个性化机会推送
- 一键生成新闻总结

### 4. 金融产品诊断
- 产品搜索和分析
- 360° 诊断报告
- 雷达图对比分析
- 智能产品推荐

## 🛠 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **图表**: Recharts
- **图标**: Heroicons
- **部署**: 支持静态导出

## 📦 安装和运行

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
# 构建应用
npm run build

# 启动生产服务器
npm start
```

### 静态导出（用于静态部署）

```bash
# 构建并导出静态文件
npm run build

# 导出的文件将在 out/ 目录中
```

## 🌐 部署

### Vercel 部署（推荐）

项目已完全优化用于 Vercel 部署：

1. **快速部署**
   ```bash
   # 推送代码到 GitHub
   git push origin main

   # 在 vercel.com 导入项目，自动部署
   ```

2. **详细部署指南**
   - 查看 [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md) 获取完整部署说明
   - 包含环境配置、自定义域名、性能优化等

3. **部署特性**
   - ✅ 自动构建和部署
   - ✅ 预览部署（PR 和分支）
   - ✅ 边缘网络加速
   - ✅ 内置分析和监控
   - ✅ 自动 HTTPS 证书

### 其他部署选项

项目同时支持多种部署方式：

- **Netlify**: 查看 [DEPLOYMENT.md](./DEPLOYMENT.md)
- **GitHub Pages**: 支持静态导出
- **AWS S3 + CloudFront**: 企业级部署
- **阿里云 OSS**: 国内访问优化

## 📁 项目结构

```
src/
├── app/                    # Next.js App Router 页面
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页
│   ├── investment-planning/
│   ├── portfolio-management/
│   ├── market-insights/
│   └── product-diagnosis/
├── components/            # 可复用组件
│   ├── ui/               # 基础 UI 组件
│   ├── layout/           # 布局组件
│   └── home/             # 首页组件
├── data/                 # 模拟数据
├── types/                # TypeScript 类型定义
└── ...
```

## 🎨 设计特性

- **响应式设计**: 适配桌面端和移动端
- **现代化 UI**: 使用 Tailwind CSS 构建
- **流畅动画**: Framer Motion 提供的交互动画
- **数据可视化**: Recharts 图表库
- **无障碍访问**: 遵循 WCAG 标准

## 📊 演示数据

所有演示数据都硬编码在 `src/data/mockData.ts` 中，包括：
- 投资规划结果
- 投资组合数据
- 市场情绪指数
- 新闻事件和洞察
- 产品诊断报告

## 🔧 自定义配置

### 修改演示数据

编辑 `src/data/mockData.ts` 文件来自定义演示数据。

### 调整样式主题

在 `src/app/globals.css` 中修改 CSS 变量来调整主题色彩。

### 添加新功能

1. 在 `src/app/` 中创建新的页面目录
2. 在 `src/components/layout/Header.tsx` 中添加导航链接
3. 在 `src/app/page.tsx` 中添加功能卡片

## 📝 许可证

MIT License
