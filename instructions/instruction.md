# **产品需求文档（PRD）**

## **项目概述**

**我们将创建一个网站，协助用户利用 OpenAI 的能力生成前端或后端项目的 PRD 原型文档。页面将与 OpenAI 的 API 进行交互。使用 Supabase 实现用户认证和数据存储。**

**使用到的技术栈包括 NextJS 14、shadcn、Tailwind 和 Lucid Icon。**

## **核心功能**
### 1. 内容收集和分析

#### 1.1 表单功能

- **目的：** 收集用户输入以生成 PRD 文档。
- **字段：**
  - **项目概述：**
    - **输入类型：** 文本
    - **描述：** 提供项目的高层次描述，包括主要功能、逻辑和技术栈。例如：“一个使用 NextJS 和 Bootstrap 的个人博客网站。”
  - **核心功能：**
    - **输入类型：** 文本
    - **描述：** 详细描述网站的核心功能，分为主要功能模块和子功能。例如：“登录系统、用户资料管理、博客文章创建。”
  - **文档：**
    - **输入类型：** 文本
    - **描述：** 包含使用的第三方 API 或框架的描述和代码示例。例如：“使用 Supabase 进行认证和数据存储，附带代码片段。”
  - **当前文件结构：**
    - **输入类型：** 文本
    - **描述：** 概述当前项目的文件结构，包括前端、后端和 API 详情。例如：“前端使用 NextJS，后端使用 Node.js，API 端点。”

#### 1.2 后端处理

- **工作流程：**
  - 表单提交后，后端将四个字段拼接成一个文档，格式为：`# 项目概述 + # 核心功能 + # 文档 + # 当前文件结构`。
  - 拼接的内容通过 OpenAI 的 API 发送，使用 GPT-4o 模型进行处理。
  - OpenAI 将数据扩展并格式化为 Markdown，创建详细的 PRD。

#### 1.3 版本控制

- **目的：** 跟踪变化并维护 PRD 版本历史。
- **实现：**
  - 每次表单提交都会保存一个版本号，并与当前用户关联。
  - 用户可以查看所有提交版本的列表并访问每个版本的内容。

#### 1.4 实时内容显示

- **目的：** 向用户提供即时反馈。
- **实现：**
  - 使用 OpenAI 的流式 API，增量显示内容，而不是等待整个文档生成完成。
  - **注意：** 展示的内容为原始 Markdown 数据，不进行处理，但样式排版需要优化。
  - **注意：** 在此处，提供“复制按钮”和“下载按钮”。“复制按钮”点击后复制 Markdown 原数据，“下载按钮”下载 Markdown 数据并保存文件，文件名为i"nstrution.md"。

### 2. 用户登录和注册功能

#### 2.1 登录

- **目的：** 认证用户以访问平台。
- **实现：**
  - 用户在登录页面输入邮箱和密码。
  - 验证成功后跳转到首页。
  - 验证失败显示错误信息。

#### 2.2 注册

- **目的：** 允许新用户创建账户。
- **实现：**
  - 用户在注册页面输入邮箱、密码和确认密码。
  - 验证无误后发送激活邮件。
  - 激活后自动登录并跳转到首页。

#### 2.3 退出

- **目的：** 允许用户安全结束会话。
- **实现：**
  - 用户登录后显示退出按钮。
  - 点击退出按钮后注销用户登录信息并跳转到登录页面。

### 3. OpenAI 分析功能

#### 3.1 数据分析

- **目的：** 利用 OpenAI 的文本生成能力进行内容处理。
- **实现：**
  - 所有用户数据使用 GPT-4o 模型进行分析。

#### 3.2 数据存储

- **目的：** 保存分析后的数据并维护版本控制。
- **实现：**
  - 用户点击保存按钮后，分析后的内容与用户账户关联。
  - 每次保存时，若内容有变化则创建一个新版本；内容相同则不重新保存。

#### 3.3 历史记录和版本控制

- **目的：** 提供用户提交历史的全面记录。
- **实现：**
  - 列表页显示所有版本的输入和输出内容，并与当前用户关联。
  - 用户可以查看和比较每个版本的内容。

### 4. PRD 列表和详情页面

#### 4.1 PRD 列表页面

- **目的：** 允许用户管理多个 PRD 主题。
- **实现：**
  - 用户可以创建多个 PRD 主题，每个主题包含一个标题和原始内容字段（项目概述、核心功能、文档、当前文件结构）。
  - 列表页面显示所有 PRD 主题及其标题。
  - 用户可以选择查看和编辑每个主题的详细内容。

#### 4.2 PRD 详情页面

- **目的：** 显示单个 PRD 主题的详细内容及其历史版本。
- **实现：**
  - 详情页面显示所选 PRD 主题的标题和原始内容字段（项目概述、核心功能、文档、当前文件结构）。
  - 打开详情页时，最后一个版本的 “项目概述，核心功能，文档，当前文件结构” 字段内容需要加载显示。并且最后一个版本的 “生成的 PRD” 内容需要显示。
  - 点击历史列表里的查看此版本按钮后，这个版本的 “项目概述，核心功能，文档，当前文件结构” 字段内容需要加载显示。
  - 用户可以查看和管理该主题的所有历史版本。
  - 历史版本追加版本字段，默认值为v0，更新一个版本后为v1。以此类推，每个新版本数字累加1。
  - 历史版本需要显示版本号、创建时间、查看此版本按钮。
  - “生成的 PRD：” 这一行显示当前加载的历史版本的版本号。

### 5. Landing Page

#### 5.1 PRD 排版和样式
- **目的：** 创建一个吸引用户的首页，包含 Header, Hero, Features 和 Footer 部分。
- **实现：**
  - **Header：** 复用 PRD 列表页的 Header 部分。
  - **Hero：** 包含一个引人注目的标题和简短描述，并提供关键的行动按钮。
  - **Features：** 展示产品的主要功能，使用图标和简要描述。
  - **Footer：** 包含版权信息和导航链接。

#### 5.2 访问路径
  - **Landing Page** 作为整站首页。
  - **PRD 列表页** 通过其他链接访问，不再作为首页。

## **文档（Doc）**

### **示例：初始化 Supabase**

```
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://crcpdgurvyuingwgonsl.supabase.co';
const supabaseAnonKey = 'your-supabase-anon-key';
const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;
```

### **示例：检查用户是否存在**

```
async function checkUser() {
 const { data: { user } } = await supabase.auth.getUser();
 setUser(user);
}
```

### **示例：从数据库获取数据**

```
async function fetchCountries() {
 const { data, error } = await supabase
   .from('countries')
   .select('*');
 if (error) {
   console.error('Error fetching countries:', error);
   setError('Failed to fetch countries');
 } else {
   setCountries(data || []);
 }
}
```

### **示例：向数据库创建数据**

```
async function createCountry() {
 if (newCountry.trim() === '') return;
 const { data, error } = await supabase
   .from('countries')
   .insert([{ name: newCountry }]);
 if (error) {
   console.error('Error creating country:', error);
   setError('Failed to create country');
 } else {
   setNewCountry('');
   fetchCountries();
 }
}
```

### **示例：提交登录**

```
async function handleLogin(e: React.FormEvent) {
 e.preventDefault();
 const { data, error } = await supabase.auth.signInWithPassword({
   email,
   password,
 });
 if (error) {
   setError(error.message);
 } else {
   setUser(data.user);
   setEmail('');
   setPassword('');
 }
}
```

### **示例：提交注册**

```
async function handleRegister(e: React.FormEvent) {
 e.preventDefault();
 const { data, error } = await supabase.auth.signUp({
   email,
   password,
 });
 if (error) {
   setError(error.message);
 } else {
   setError('Registration successful. Please check your email to confirm your account.');
   setEmail('');
   setPassword('');
 }
}
```

### **示例：提交登出**

```
async function handleLogout() {
 await supabase.auth.signOut();
 setUser(null);
}
```

### **示例：OpenAI GPT-4o 响应**

```
const openai = new OpenAI({
 apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
 baseURL: process.env.NEXT_PUBLIC_OPENAI_API_BASE, // 自定义 API URL
 dangerouslyAllowBrowser: true // 注意：这只是为了演示，生产环境中应使用服务器端 API 调用
});
const response = await openai.chat.completions.create({
 model: "gpt-4o",
 messages: [
   { role: "user", content: `${prompt} 上述是我想要构建的项目，如何组织我的项目文件？（尽量少创建文件）帮助我在原始 PRD 中添加细节，使开发人员能够清晰对齐项目实施；不创建实际代码，只创建 PRD，包括文件结构在内，包含所有提供的文档（包括示例代码和响应，这些都是重要的背景资料）` }
 ],
 temperature: 0.7,
 max_tokens: 10000
});
```
### **示例：Hero 组件**

```
<section className="py-16 md:py-24 bg-white overflow-x-clip">
  <div className="relative max-w-screen-xl w-full mx-auto px-4 before:absolute before:w-full before:max-w-md before:h-40 before:pointer-events-none before:bg-gradient-to-br before:from-yellow-200 before:to-orange-300 before:blur-[100px] before:left-0 before:-translate-x-1/4 before:top-0 before:translate-y-1/2 after:absolute after:w-full after:max-w-md after:h-20 after:pointer-events-none after:bg-gradient-to-br after:from-amber-300 after:to-yellow-200 after:blur-[100px] after:left-0 md:after:translate-x-1/2 after:top-0 after:translate-y-1/2">
    <div className="w-full flex flex-col md:flex-row gap-8 items-center z-10 relative">
      <div className="flex-1 min-w-0">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Marketing website done with NextJS</h1>
        <p className="text-lg md:text-xl text-zinc-700 w-full md:w-5/6 leading-8 mb-8">Startup Boilerplate is a open-source starter template for marketing website &amp; landing pages. Built with NextJS and TailwindCSS for launch your startup in days.</p>
        <div className="flex flex-col sm:flex-row gap-3 items-center"><a href="#" className="bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center gap-2 h-12 px-6 rounded cursor-pointer w-full sm:w-auto">
            <div className="w-6 h-6"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="currentColor" fill-rule="evenodd" d="M8.38 7.194a5.41 5.41 0 0 1 9.952 2.605a4.478 4.478 0 1 1 .191 8.951H6.875A5.875 5.875 0 1 1 8.38 7.194M12 15.75c.18 0 .345-.063.475-.17l2.494-1.994a.75.75 0 0 0-.938-1.172L12.75 13.44V10a.75.75 0 0 0-1.5 0v3.44l-1.282-1.025a.75.75 0 1 0-.937 1.172l2.498 1.998a.747.747 0 0 0 .465.166z" clip-rule="evenodd"></path>
              </svg></div>
            <div>Get boilerplate</div>
          </a><a href="#" className="border border-solid border-zinc-300 bg-white/50 hover:bg-zinc-100/50 text-zinc-800 flex items-center justify-center gap-2 h-12 px-6 rounded cursor-pointer w-full sm:w-auto">
            <div className="w-6 h-6"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"></path>
              </svg></div>
            <div>Github Repo</div>
          </a></div>
      </div>
      <div className="flex-1 min-w-0"><img alt="Astronaut in the air" loading="lazy" width="1324" height="949" decoding="async" data-nimg="1" className="object-contain mx-auto" style="color:transparent" src="/_next/static/media/image.0728c329.svg"></div>
    </div>
  </div>
</section>
```

### **示例：Features 组件**
```
<section className="py-8 sm:py-16 bg-white">
  <div className="max-w-screen-xl mx-auto px-6 lg:px-16">
    <div className="mb-14 text-center">
      <div className="py-1.5 inline-block px-6 bg-indigo-100 rounded-full text-sm font-medium text-indigo-600 text-center mb-8">Features</div>
      <h2 className="text-3xl md:text-4xl text-center font-bold text-gray-900 mb-2">Revolutionary Features</h2>
      <p className="text-lg font-normal text-gray-500 max-w-md md:max-w-2xl mx-auto">Provides advanced features like time tracking, integrating with third party apps (calendar / Google drive), creating subtasks.</p>
    </div>
    <div className="flex justify-center items-center gap-x-5 gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8">
      <div className="relative w-full text-center max-md:max-w-sm max-md:mx-auto group md:w-2/5 lg:w-1/4">
        <div className="bg-indigo-50 rounded-lg flex justify-center items-center mb-5 w-20 h-20 mx-auto cursor-pointer transition-all duration-500 group-hover:bg-indigo-600"><svg className="stroke-indigo-600 transition-all duration-500 group-hover:stroke-white" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 27.5L15 25M15 25V21.25M15 25L20 27.5M8.75 14.375L12.5998 11.0064C13.1943 10.4862 14.1163 10.6411 14.5083 11.327L15.4917 13.048C15.8837 13.7339 16.8057 13.8888 17.4002 13.3686L21.25 10M2.5 2.5H27.5M26.25 2.5V13.25C26.25 17.0212 26.25 18.9069 25.0784 20.0784C23.9069 21.25 22.0212 21.25 18.25 21.25H11.75C7.97876 21.25 6.09315 21.25 4.92157 20.0784C3.75 18.9069 3.75 17.0212 3.75 13.25V2.5" stroke="" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg></div>
        <h4 className="text-lg font-medium text-gray-900 mb-3 capitalize">Revolutionary Projectview</h4>
        <p className="text-sm font-normal text-gray-500">plan and structure work how you want. Quickly organizing tasks.</p>
      </div>
      <div className="relative w-full text-center max-md:max-w-sm max-md:mx-auto group md:w-2/5 lg:w-1/4">
        <div className="bg-pink-50 rounded-lg flex justify-center items-center mb-5 w-20 h-20 mx-auto cursor-pointer transition-all duration-500 group-hover:bg-pink-600"><svg className="stroke-pink-600 transition-all duration-500 group-hover:stroke-white" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 7.5C2.5 4.73858 4.73858 2.5 7.5 2.5C10.2614 2.5 12.5 4.73858 12.5 7.5C12.5 10.2614 10.2614 12.5 7.5 12.5C4.73858 12.5 2.5 10.2614 2.5 7.5Z" stroke="" stroke-width="2"></path>
            <path d="M2.5 22.5C2.5 20.143 2.5 18.9645 3.23223 18.2322C3.96447 17.5 5.14298 17.5 7.5 17.5C9.85702 17.5 11.0355 17.5 11.7678 18.2322C12.5 18.9645 12.5 20.143 12.5 22.5C12.5 24.857 12.5 26.0355 11.7678 26.7678C11.0355 27.5 9.85702 27.5 7.5 27.5C5.14298 27.5 3.96447 27.5 3.23223 26.7678C2.5 26.0355 2.5 24.857 2.5 22.5Z" stroke="" stroke-width="2"></path>
            <path d="M17.5 7.5C17.5 5.14298 17.5 3.96447 18.2322 3.23223C18.9645 2.5 20.143 2.5 22.5 2.5C24.857 2.5 26.0355 2.5 26.7678 3.23223C27.5 3.96447 27.5 5.14298 27.5 7.5C27.5 9.85702 27.5 11.0355 26.7678 11.7678C26.0355 12.5 24.857 12.5 22.5 12.5C20.143 12.5 18.9645 12.5 18.2322 11.7678C17.5 11.0355 17.5 9.85702 17.5 7.5Z" stroke="" stroke-width="2"></path>
            <path d="M17.5 22.5C17.5 19.7386 19.7386 17.5 22.5 17.5C25.2614 17.5 27.5 19.7386 27.5 22.5C27.5 25.2614 25.2614 27.5 22.5 27.5C19.7386 27.5 17.5 25.2614 17.5 22.5Z" stroke="" stroke-width="2"></path>
          </svg></div>
        <h4 className="text-lg font-medium text-gray-900 mb-3 capitalize">App Integrations</h4>
        <p className="text-sm font-normal text-gray-500">Bring all your tools and data together. Also join with hundreds of other apps.</p>
      </div>
      <div className="relative w-full text-center max-md:max-w-sm max-md:mx-auto group md:w-2/5 lg:w-1/4">
        <div className="bg-teal-50 rounded-lg flex justify-center items-center mb-5 w-20 h-20 mx-auto cursor-pointer transition-all duration-500 group-hover:bg-teal-600"><svg className="stroke-teal-600 transition-all duration-500 group-hover:stroke-white" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.75 26.25H26.25M6.25 22.875C4.86929 22.875 3.75 21.8676 3.75 20.625V12.75C3.75 11.5074 4.86929 10.5 6.25 10.5C7.63071 10.5 8.75 11.5074 8.75 12.75V20.625C8.75 21.8676 7.63071 22.875 6.25 22.875ZM15 22.875C13.6193 22.875 12.5 21.8676 12.5 20.625V9.375C12.5 8.13236 13.6193 7.125 15 7.125C16.3807 7.125 17.5 8.13236 17.5 9.375V20.625C17.5 21.8676 16.3807 22.875 15 22.875ZM23.75 22.875C22.3693 22.875 21.25 21.8676 21.25 20.625V6C21.25 4.75736 22.3693 3.75 23.75 3.75C25.1307 3.75 26.25 4.75736 26.25 6V20.625C26.25 21.8676 25.1307 22.875 23.75 22.875Z" stroke="" stroke-width="2" stroke-linecap="round"></path>
          </svg></div>
        <h4 className="text-lg font-medium text-gray-900 mb-3 capitalize">Data Reporting</h4>
        <p className="text-sm font-normal text-gray-500">Get real time insight into progress and allows teams to track their work habits</p>
      </div>
      <div className="relative w-full text-center max-md:max-w-sm max-md:mx-auto group md:w-2/5 lg:w-1/4">
        <div className="bg-orange-50 rounded-lg flex justify-center items-center mb-5 w-20 h-20 mx-auto cursor-pointer transition-all duration-500 group-hover:bg-orange-600"><svg className="stroke-orange-600 transition-all duration-500 group-hover:stroke-white" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.4167 12.0833V21.25M5.41667 21.25V20.8333C5.41667 19.262 5.41667 18.4763 5.90482 17.9882C6.39298 17.5 7.17865 17.5 8.75 17.5H22.0833C23.6547 17.5 24.4404 17.5 24.9285 17.9882C25.4167 18.4763 25.4167 19.262 25.4167 20.8333V21.25M15.4167 9.16667C13.8453 9.16667 13.0596 9.16667 12.5715 8.67851C12.0833 8.19036 12.0833 7.40468 12.0833 5.83333C12.0833 4.26198 12.0833 3.47631 12.5715 2.98816C13.0596 2.5 13.8453 2.5 15.4167 2.5C16.988 2.5 17.7737 2.5 18.2618 2.98816C18.75 3.47631 18.75 4.26198 18.75 5.83333C18.75 7.40468 18.75 8.19036 18.2618 8.67851C17.7737 9.16667 16.988 9.16667 15.4167 9.16667ZM7.08333 25.8333C7.08333 26.7538 6.33714 27.5 5.41667 27.5C4.49619 27.5 3.75 26.7538 3.75 25.8333C3.75 24.9129 4.49619 24.1667 5.41667 24.1667C6.33714 24.1667 7.08333 24.9129 7.08333 25.8333ZM17.0833 25.8333C17.0833 26.7538 16.3371 27.5 15.4167 27.5C14.4962 27.5 13.75 26.7538 13.75 25.8333C13.75 24.9129 14.4962 24.1667 15.4167 24.1667C16.3371 24.1667 17.0833 24.9129 17.0833 25.8333ZM27.0833 25.8333C27.0833 26.7538 26.3371 27.5 25.4167 27.5C24.4962 27.5 23.75 26.7538 23.75 25.8333C23.75 24.9129 24.4962 24.1667 25.4167 24.1667C26.3371 24.1667 27.0833 24.9129 27.0833 25.8333Z" stroke="" stroke-width="2" stroke-linecap="round"></path>
          </svg></div>
        <h4 className="text-lg font-medium text-gray-900 mb-3 capitalize">Workflow Builder</h4>
        <p className="text-sm font-normal text-gray-500">Automated processes to coordinate your teams and increase communication.</p>
      </div>
    </div>
  </div>
</section>
```

### **Footer 组件**
```
<footer className="bg-white text-zinc-900 py-8">
  <div className="max-w-screen-xl mx-auto px-4 flex flex-col items-center gap-4">
    <div>
      <div className="select-none flex items-center">
        <div className="mr-2"><img alt="Tailsc Logo" loading="lazy" width="30" height="30" decoding="async" data-nimg="1" style="color:transparent" src="/logo.svg"></div>
        <div className="text-xl __className_3ac6c1">Tailsc</div>
      </div>
    </div>
    <p className="text-base text-center text-zinc-500 mx-auto max-w-2xl">Get started over 100+ UI components, sections and pages built with Tailwind CSS.</p>
    <ul className="flex flex-1 min-w-0 justify-center items-center gap-8">
      <li><a className="text-zinc-900 hover:text-blue-500" href="#">Home</a></li>
      <li><a className="text-zinc-900 hover:text-blue-500" href="#">Product</a></li>
      <li><a className="text-zinc-900 hover:text-blue-500" href="#">Blog</a></li>
      <li><a className="text-zinc-900 hover:text-blue-500" href="#">About</a></li>
      <li><a className="text-zinc-900 hover:text-blue-500" href="#">Contact</a></li>
    </ul>
    <div className="text-sm text-zinc-500 text-center">© 2024 Tailsc. All Rights Reserved.</div>
  </div>
</footer>
```
## **当前文件结构**

```
├── README.md
├── app
│   ├── favicon.ico
│   ├── fonts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components.json
├── lib
│   ├── supabaseClient.js
│   └── utils.ts
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── src
│   ├── App.js
│   └── supabaseClient.js
├── tailwind.config.ts
└── tsconfig.json
```
