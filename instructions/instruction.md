# **产品需求文档（PRD）**

## **项目概述**

**我们将创建一个网站，协助用户利用 OpenAI 的能力生成前端或后端项目的 PRD 原型文档。页面将与 OpenAI 的 API 进行交互。使用 Supabase 实现用户认证和数据存储。**

**使用到的技术栈包括 NextJS 14、shadcn、Tailwind 和 Lucid Icon。**

## **核心功能**

### **1. 内容收集和分析**

#### **1.1 表单功能**

* **目的：** 收集用户输入以生成 PRD 文档。
* **字段：**
  * **项目概述：**
  * **输入类型：** 文本
  * **描述：** 提供项目的高层次描述，包括主要功能、逻辑和技术栈。例如：“一个使用 NextJS 和 Bootstrap 的个人博客网站。”
  * **核心功能：**
  * **输入类型：** 文本
  * **描述：** 详细描述网站的核心功能，分为主要功能模块和子功能。例如：“登录系统、用户资料管理、博客文章创建。”
  * **文档：**
  * **输入类型：** 文本
  * **描述：** 包含使用的第三方 API 或框架的描述和代码示例。例如：“使用 Supabase 进行认证和数据存储，附带代码片段。”
  * **当前文件结构：**
  * **输入类型：** 文本
  * **描述：** 概述当前项目的文件结构，包括前端、后端和 API 详情。例如：“前端使用 NextJS，后端使用 Node.js，API 端点。”

#### **1.2 后端处理**

* **工作流程：**
  * **表单提交后，后端将四个字段拼接成一个文档，格式为：**`# 项目概述 + # 核心功能 + # 文档 + # 当前文件结构`。
  * **拼接的内容通过 OpenAI 的 API 发送，使用 GPT-4o 模型进行处理。**
  * **OpenAI 将数据扩展并格式化为 Markdown，创建详细的 PRD。**
  * **格式化后的 PRD 在前端显示给用户。并且采用openai的stream即时显示内容，而不是等待整个文档生成完成才返回。**
  * **在前端显示的 PRD 内容需要使用MDX插件显示样式更好看的版本。**

#### **1.3 版本控制**

* **目的：** 跟踪变化并维护 PRD 版本历史。
* **实现：**
  * **每次表单提交都会保存一个版本号，并与当前用户关联。**
  * **用户可以查看所有提交版本的列表并访问每个版本的内容。**

#### **1.4 实时内容显示**

* **目的：** 向用户提供即时反馈。
* **实现：**
  * **使用 OpenAI 的流式 API，增量显示内容，而不是等待整个文档生成完成。**
  * **显示的内容使用 Markdown 样式，并通过 mdxjs 解析。**

### **2. 用户登录和注册功能**

#### **2.1 登录**

* **目的：** 认证用户以访问平台。
* **实现：**
  * **用户在登录页面输入邮箱和密码。**
  * **验证成功后跳转到首页。**
  * **验证失败显示错误信息。**

#### **2.2 注册**

* **目的：** 允许新用户创建账户。
* **实现：**
  * **用户在注册页面输入邮箱、密码和确认密码。**
  * **验证无误后发送激活邮件。**
  * **激活后自动登录并跳转到首页。**

#### **2.3 退出**

* **目的：** 允许用户安全结束会话。
* **实现：**
  * **用户登录后显示退出按钮。**
  * **点击退出按钮后注销用户登录信息并跳转到登录页面。**

### **3. OpenAI 分析功能**

#### **3.1 数据分析**

* **目的：** 利用 OpenAI 的文本生成能力进行内容处理。
* **实现：**
  * **所有用户数据使用 GPT-4o 模型进行分析。**

#### **3.2 数据存储**

* **目的：** 保存分析后的数据并维护版本控制。
* **实现：**
  * **用户点击保存按钮后，分析后的内容与用户账户关联。**
  * **每次保存时，若内容有变化则创建一个新版本；内容相同则不重新保存。**

#### **3.3 历史记录和版本控制**

* **目的：** 提供用户提交历史的全面记录。
* **实现：**
  * **列表页显示所有版本的输入和输出内容，并与当前用户关联。**
  * **用户可以查看和比较每个版本的内容。**

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
