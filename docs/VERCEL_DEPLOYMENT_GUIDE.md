# Vercel 部署指南

## 📋 项目概述

这是一个基于 Next.js 15 的 AI 投资顾问演示应用，支持中文和日文双语，具有以下特性：

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **国际化**: next-intl
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **图表**: Recharts
- **部署**: 已优化用于 Vercel 部署

## 🚀 快速部署到 Vercel

### 方法一：通过 Vercel 网站部署（推荐）

1. **准备 GitHub 仓库**
   ```bash
   # 确保代码已推送到 GitHub
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **连接 Vercel**
   - 访问 [vercel.com](https://vercel.com)
   - 使用 GitHub 账号登录
   - 点击 "New Project"
   - 选择您的 GitHub 仓库

3. **配置项目设置**
   - **Project Name**: `ai-investment-advisor` (或您喜欢的名称)
   - **Framework Preset**: Next.js (自动检测)
   - **Root Directory**: `ai-investment-advisor` (如果项目在子目录中)
   - **Build Command**: `npm run build` (默认)
   - **Output Directory**: `.next` (默认)
   - **Install Command**: `npm install` (默认)

4. **环境变量配置**
   - 在 "Environment Variables" 部分添加：
     ```
     NODE_ENV=production
     NEXT_PUBLIC_APP_URL=https://your-project-name.vercel.app
     ```

5. **部署**
   - 点击 "Deploy" 按钮
   - 等待构建完成（通常需要 2-3 分钟）
   - 部署成功后获得 `.vercel.app` 域名

### 方法二：通过 Vercel CLI 部署

1. **安装 Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **登录 Vercel**
   ```bash
   vercel login
   ```

3. **部署项目**
   ```bash
   cd ai-investment-advisor
   vercel
   ```

4. **按照提示配置**
   - Set up and deploy? `Y`
   - Which scope? 选择您的账户
   - Link to existing project? `N`
   - What's your project's name? `ai-investment-advisor`
   - In which directory is your code located? `./`

5. **生产部署**
   ```bash
   vercel --prod
   ```

## ⚙️ 高级配置

### 自定义域名

1. **在 Vercel 控制台中**
   - 进入项目设置
   - 点击 "Domains" 标签
   - 添加您的自定义域名
   - 按照提示配置 DNS 记录

2. **DNS 配置示例**
   ```
   Type: CNAME
   Name: www (或 @)
   Value: cname.vercel-dns.com
   ```

### 环境变量管理

在 Vercel 控制台的 "Settings" → "Environment Variables" 中添加：

```bash
# 生产环境
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com

# 可选：分析工具
NEXT_PUBLIC_VERCEL_ANALYTICS=true
```

### 性能优化配置

项目已包含以下优化配置：

1. **next.config.ts 优化**
   - 图片优化设置
   - 国际化配置
   - 构建优化

2. **vercel.json 配置**
   - 缓存策略
   - 安全头设置
   - 路由重写规则

## 🔧 构建和部署验证

### 本地验证

```bash
# 安装依赖
npm install

# 本地构建测试
npm run build

# 本地预览构建结果
npm run start
```

### 部署后验证

1. **功能测试**
   - [ ] 首页加载正常
   - [ ] 投资规划功能正常
   - [ ] 投资组合管理功能正常
   - [ ] 市场洞察功能正常
   - [ ] 产品诊断功能正常
   - [ ] 语言切换功能正常

2. **性能测试**
   - [ ] 页面加载速度 < 3秒
   - [ ] 图表渲染正常
   - [ ] 动画效果流畅
   - [ ] 移动端适配良好

3. **SEO 检查**
   - [ ] 页面标题正确
   - [ ] Meta 描述完整
   - [ ] 结构化数据正确

## 🚨 常见问题解决

### 构建失败

1. **TypeScript 错误**
   ```bash
   # 检查类型错误
   npx tsc --noEmit
   ```

2. **依赖问题**
   ```bash
   # 清理并重新安装
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **内存不足**
   - 在 Vercel 设置中增加构建内存限制
   - 或优化代码减少构建时内存使用

### 运行时错误

1. **路由问题**
   - 检查 `vercel.json` 中的重写规则
   - 确保国际化路由配置正确

2. **静态资源加载失败**
   - 检查 `next.config.ts` 中的 `basePath` 配置
   - 确保资源路径正确

### 性能问题

1. **首次加载慢**
   - 启用 Vercel Analytics 分析性能
   - 考虑代码分割优化

2. **图片加载慢**
   - 使用 WebP 格式
   - 配置适当的图片尺寸

## 📊 监控和分析

### Vercel Analytics

在项目设置中启用：
- **Web Analytics**: 页面访问统计
- **Speed Insights**: 性能监控
- **Audience**: 用户行为分析

### 自定义监控

可以集成第三方监控工具：
- Google Analytics
- Sentry (错误监控)
- LogRocket (用户会话录制)

## 🔄 持续部署

### 自动部署

Vercel 会自动监听 GitHub 仓库变化：
- **主分支推送** → 自动部署到生产环境
- **其他分支推送** → 自动创建预览部署
- **Pull Request** → 自动创建预览链接

### 部署钩子

可以配置部署钩子来触发其他操作：
```bash
# 部署成功后的钩子示例
curl -X POST "https://api.example.com/deploy-webhook" \
  -H "Content-Type: application/json" \
  -d '{"status": "deployed", "url": "'$VERCEL_URL'"}'
```

## 📞 技术支持

如果在部署过程中遇到问题：

1. 查看 [Vercel 官方文档](https://vercel.com/docs)
2. 检查 [Next.js 部署指南](https://nextjs.org/docs/deployment)
3. 查看项目的 GitHub Issues
4. 联系技术支持团队

---

**部署成功后，您的 AI 投资顾问应用将在 `https://your-project-name.vercel.app` 上线！**
