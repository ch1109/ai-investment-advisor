# 部署指南

## 🚀 快速部署

### 1. Vercel 部署（推荐）

Vercel 是 Next.js 的官方部署平台，提供最佳的性能和体验。

#### 方法一：通过 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 在项目根目录运行
vercel

# 按照提示完成部署
```

#### 方法二：通过 Vercel 网站

1. 访问 [vercel.com](https://vercel.com)
2. 点击 "New Project"
3. 导入您的 GitHub 仓库
4. Vercel 会自动检测 Next.js 项目并进行部署
5. 部署完成后，您将获得一个 `.vercel.app` 域名

### 2. Netlify 部署

#### 使用静态文件部署

```bash
# 构建静态文件
npm run build

# 将 out/ 目录上传到 Netlify
# 或者使用 Netlify CLI
npm install -g netlify-cli
netlify deploy --prod --dir=out
```

#### 通过 Git 自动部署

1. 将代码推送到 GitHub
2. 在 [netlify.com](https://netlify.com) 创建新站点
3. 连接您的 GitHub 仓库
4. 设置构建命令：`npm run build`
5. 设置发布目录：`out`

### 3. GitHub Pages 部署

```bash
# 安装 gh-pages
npm install --save-dev gh-pages

# 在 package.json 中添加部署脚本
"scripts": {
  "deploy": "npm run build && gh-pages -d out"
}

# 部署到 GitHub Pages
npm run deploy
```

### 4. 其他静态托管平台

由于项目支持静态导出，可以部署到任何静态托管平台：

- **AWS S3 + CloudFront**
- **阿里云 OSS**
- **腾讯云 COS**
- **Firebase Hosting**

## 🔧 环境配置

### 生产环境优化

项目已经配置了以下优化：

1. **静态导出**：`next.config.ts` 中配置了 `output: 'export'`
2. **图片优化**：设置了 `images.unoptimized: true`
3. **尾部斜杠**：配置了 `trailingSlash: true`

### 自定义域名

#### Vercel

1. 在 Vercel 项目设置中点击 "Domains"
2. 添加您的自定义域名
3. 按照提示配置 DNS 记录

#### Netlify

1. 在 Netlify 项目设置中点击 "Domain management"
2. 添加自定义域名
3. 配置 DNS 记录

## 📊 性能监控

### 构建分析

查看构建输出中的包大小信息：

```
Route (app)                         Size  First Load JS    
┌ ○ /                             2.7 kB         158 kB
├ ○ /investment-planning         19.8 kB         271 kB
├ ○ /market-insights             5.96 kB         162 kB
├ ○ /portfolio-management        5.79 kB         247 kB
└ ○ /product-diagnosis           87.9 kB         254 kB
```

### 性能优化建议

1. **代码分割**：已通过 Next.js 自动实现
2. **图片优化**：考虑使用 WebP 格式
3. **字体优化**：使用系统字体减少加载时间
4. **缓存策略**：配置适当的 HTTP 缓存头

## 🔍 故障排除

### 常见问题

#### 1. 路由问题

如果在静态托管平台上遇到路由问题，确保：
- 配置了正确的重写规则
- 使用了 `trailingSlash: true` 配置

#### 2. 资源加载问题

如果静态资源无法加载：
- 检查 `next.config.ts` 中的 `basePath` 配置
- 确保资源路径正确

#### 3. 构建失败

如果构建失败：
- 检查 TypeScript 类型错误
- 确保所有依赖都已安装
- 查看构建日志中的具体错误信息

### 调试命令

```bash
# 本地构建测试
npm run build

# 本地预览构建结果
npm run start

# 检查 TypeScript 类型
npx tsc --noEmit

# 检查 ESLint 规则
npm run lint
```

## 📝 部署清单

在部署前，请确认：

- [ ] 所有功能都已测试
- [ ] 构建成功无错误
- [ ] 静态文件正确生成
- [ ] 路由配置正确
- [ ] 性能指标满足要求
- [ ] 移动端适配良好
- [ ] 浏览器兼容性测试通过

## 🔄 持续部署

### GitHub Actions 示例

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📞 支持

如果在部署过程中遇到问题，请：

1. 查看相关平台的官方文档
2. 检查项目的 GitHub Issues
3. 联系技术支持团队
