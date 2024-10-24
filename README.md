# PRD 生成器

这是一个使用 Next.js 和 OpenAI API 构建的 PRD（产品需求文档）生成器。

## 功能

- 用户认证（登录/注册）
- 生成详细的 PRD
- 版本历史管理
- 实时内容显示

## 技术栈

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- Supabase
- OpenAI API

## 安装和运行

1. 克隆仓库
2. 安装依赖：`npm install`
3. 创建 `.env.local` 文件并添加必要的环境变量
4. 运行开发服务器：`npm run dev`

## 环境变量

确保在 `.env.local` 文件中设置以下环境变量：

- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- OPENAI_API_KEY

## 注意

请不要将 `.env.local` 文件提交到版本控制系统中。
