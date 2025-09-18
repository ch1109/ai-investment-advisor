#!/bin/bash

# AI 投资顾问 - Vercel 部署脚本
# 使用方法: ./scripts/deploy.sh

set -e

echo "🚀 开始部署 AI 投资顾问到 Vercel..."

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 检查是否安装了必要的工具
check_dependencies() {
    echo -e "${BLUE}📋 检查依赖项...${NC}"
    
    if ! command -v node &> /dev/null; then
        echo -e "${RED}❌ Node.js 未安装${NC}"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        echo -e "${RED}❌ npm 未安装${NC}"
        exit 1
    fi
    
    if ! command -v git &> /dev/null; then
        echo -e "${RED}❌ Git 未安装${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ 所有依赖项已安装${NC}"
}

# 检查项目状态
check_project() {
    echo -e "${BLUE}🔍 检查项目状态...${NC}"
    
    if [ ! -f "package.json" ]; then
        echo -e "${RED}❌ 未找到 package.json 文件${NC}"
        exit 1
    fi
    
    if [ ! -f "next.config.ts" ]; then
        echo -e "${RED}❌ 未找到 next.config.ts 文件${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ 项目文件完整${NC}"
}

# 安装依赖
install_dependencies() {
    echo -e "${BLUE}📦 安装依赖项...${NC}"
    npm install
    echo -e "${GREEN}✅ 依赖项安装完成${NC}"
}

# 运行测试和检查
run_checks() {
    echo -e "${BLUE}🧪 运行代码检查...${NC}"
    
    # TypeScript 类型检查
    echo -e "${YELLOW}检查 TypeScript 类型...${NC}"
    npx tsc --noEmit
    
    # ESLint 检查
    echo -e "${YELLOW}运行 ESLint 检查...${NC}"
    npm run lint
    
    echo -e "${GREEN}✅ 代码检查通过${NC}"
}

# 构建项目
build_project() {
    echo -e "${BLUE}🔨 构建项目...${NC}"
    npm run build
    echo -e "${GREEN}✅ 项目构建成功${NC}"
}

# 检查 Git 状态
check_git() {
    echo -e "${BLUE}📝 检查 Git 状态...${NC}"
    
    if [ -n "$(git status --porcelain)" ]; then
        echo -e "${YELLOW}⚠️  有未提交的更改${NC}"
        echo "未提交的文件:"
        git status --short
        
        read -p "是否要提交这些更改? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            git add .
            read -p "请输入提交信息: " commit_message
            git commit -m "$commit_message"
            echo -e "${GREEN}✅ 更改已提交${NC}"
        else
            echo -e "${YELLOW}⚠️  继续部署，但建议先提交更改${NC}"
        fi
    else
        echo -e "${GREEN}✅ Git 状态干净${NC}"
    fi
}

# 推送到 GitHub
push_to_github() {
    echo -e "${BLUE}📤 推送到 GitHub...${NC}"
    
    # 获取当前分支
    current_branch=$(git branch --show-current)
    
    # 推送到远程仓库
    git push origin "$current_branch"
    
    echo -e "${GREEN}✅ 代码已推送到 GitHub${NC}"
}

# 部署到 Vercel
deploy_to_vercel() {
    echo -e "${BLUE}🚀 部署到 Vercel...${NC}"
    
    if command -v vercel &> /dev/null; then
        echo -e "${YELLOW}使用 Vercel CLI 部署...${NC}"
        vercel --prod
    else
        echo -e "${YELLOW}Vercel CLI 未安装${NC}"
        echo -e "${BLUE}请按照以下步骤手动部署:${NC}"
        echo "1. 访问 https://vercel.com"
        echo "2. 登录您的账户"
        echo "3. 点击 'New Project'"
        echo "4. 选择您的 GitHub 仓库"
        echo "5. 配置项目设置并部署"
    fi
}

# 显示部署信息
show_deployment_info() {
    echo -e "${GREEN}🎉 部署流程完成！${NC}"
    echo
    echo -e "${BLUE}📚 相关文档:${NC}"
    echo "- 详细部署指南: VERCEL_DEPLOYMENT_GUIDE.md"
    echo "- 部署检查清单: DEPLOYMENT_CHECKLIST.md"
    echo "- 通用部署指南: DEPLOYMENT.md"
    echo
    echo -e "${BLUE}🔗 有用的链接:${NC}"
    echo "- Vercel 控制台: https://vercel.com/dashboard"
    echo "- Next.js 文档: https://nextjs.org/docs"
    echo "- 项目仓库: $(git remote get-url origin 2>/dev/null || echo '未配置')"
    echo
    echo -e "${YELLOW}💡 提示:${NC}"
    echo "- 部署后请检查所有功能是否正常"
    echo "- 建议配置自定义域名"
    echo "- 启用 Vercel Analytics 进行监控"
}

# 主函数
main() {
    echo -e "${GREEN}🤖 AI 投资顾问 - Vercel 部署脚本${NC}"
    echo "=================================="
    echo
    
    check_dependencies
    check_project
    install_dependencies
    run_checks
    build_project
    check_git
    push_to_github
    deploy_to_vercel
    show_deployment_info
    
    echo
    echo -e "${GREEN}✨ 部署脚本执行完成！${NC}"
}

# 运行主函数
main "$@"
