# Vercel 部署步骤指南

## 🚀 快速部署步骤

### 方法1：使用 Vercel CLI（推荐）

1. **登录 Vercel**
   ```bash
   vercel login
   ```
   - 在浏览器中完成认证
   - 或者访问：https://vercel.com/oauth/device?user_code=ZMTX-CQNM

2. **部署项目**
   ```bash
   vercel --prod
   ```
   - 选择创建新项目
   - 项目名称：`ai-investment-advisor-ue-compatible`
   - 确认配置

### 方法2：通过 Vercel 网站部署

1. **访问 Vercel 控制台**
   - 打开 https://vercel.com/dashboard
   - 点击 "New Project"

2. **导入项目**
   - 选择 "Import Git Repository"
   - 或者直接拖拽项目文件夹

3. **配置项目**
   - 项目名称：`ai-investment-advisor-ue-compatible`
   - Framework Preset: `Next.js`
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

## ⚙️ 环境配置

### 构建设置
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "devCommand": "npm run dev"
}
```

### 环境变量（如需要）
```
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

## 🔧 项目配置文件

### vercel.json
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    },
    {
      "source": "/static/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/",
      "destination": "/zh"
    }
  ]
}
```

### next.config.ts
```typescript
import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const nextConfig: NextConfig = {
  // Vercel deployment configuration
  images: {
    unoptimized: true
  },
  // 跳过静态生成错误
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default withNextIntl(nextConfig);
```

## 🎯 UE WebView 兼容性特性

### 已实施的兼容性修复
- ✅ Tailwind CSS 降级到 3.4.0
- ✅ 添加 CSS 前缀和降级方案
- ✅ 浏览器检测和自动适配
- ✅ Chrome 92 兼容性优化

### 测试页面
部署完成后，访问以下页面测试兼容性：
- `/test-ue-compatibility.html` - 兼容性测试页面
- `/zh` - 主应用入口

## 📋 部署后验证清单

### 功能测试
- [ ] 首页加载正常
- [ ] 投资规划功能正常
- [ ] 投资组合管理功能正常
- [ ] 市场洞察功能正常
- [ ] 产品诊断功能正常
- [ ] 语言切换功能正常

### UE WebView 兼容性测试
- [ ] CSS 样式正常显示
- [ ] 动画效果正常
- [ ] 交互功能正常
- [ ] 字体显示正常
- [ ] 布局不错乱

### 性能测试
- [ ] 页面加载速度 < 3秒
- [ ] 图表渲染正常
- [ ] 动画效果流畅
- [ ] 移动端适配良好

## 🚨 常见问题解决

### 构建失败
1. **检查依赖**
   ```bash
   npm install
   npm run build
   ```

2. **清理缓存**
   ```bash
   rm -rf .next node_modules
   npm install
   npm run build
   ```

### 运行时错误
1. **检查控制台错误**
   - 打开浏览器开发者工具
   - 查看 Console 和 Network 标签

2. **检查 Vercel 日志**
   - 在 Vercel 控制台查看构建和运行时日志

### UE WebView 问题
1. **CSS 样式不显示**
   - 检查 `/test-ue-compatibility.html` 页面
   - 确认兼容性 CSS 已加载

2. **JavaScript 错误**
   - 检查是否有不兼容的 API 调用
   - 查看浏览器控制台错误信息

## 📞 获取帮助

如果遇到问题，请提供：
1. Vercel 部署 URL
2. 错误信息截图
3. 浏览器控制台日志
4. UE 版本信息

## 🔗 相关链接

- [Vercel 文档](https://vercel.com/docs)
- [Next.js 部署指南](https://nextjs.org/docs/deployment)
- [项目兼容性指南](./UE_WEBVIEW_COMPATIBILITY_GUIDE.md)
