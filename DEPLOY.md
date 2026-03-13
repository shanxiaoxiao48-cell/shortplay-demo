# Vercel 部署指南

## 方式一：通过 Vercel CLI 部署（推荐）

### 1. 登录 Vercel
```bash
vercel login
```

### 2. 部署到生产环境
```bash
vercel --prod
```

按提示操作：
- 选择 Vercel 账号/团队
- 确认项目名称（默认：shortplay-demo）
- 确认项目设置

部署完成后会显示生产环境 URL。

---

## 方式二：通过 Vercel 网页部署

### 1. 推送代码到 GitHub

```bash
# 在 GitHub 创建新仓库后
git remote add origin https://github.com/你的用户名/shortplay-demo.git
git branch -M main
git push -u origin main
```

### 2. 导入到 Vercel

1. 访问 https://vercel.com/new
2. 点击 "Import Git Repository"
3. 选择你的 GitHub 仓库
4. 点击 "Deploy"

Vercel 会自动检测配置并部署。

---

## 方式三：拖拽部署

1. 访问 https://vercel.com/new
2. 将整个项目文件夹拖拽到页面上
3. 等待自动部署完成

---

## 项目配置

项目已包含以下配置文件：

- `vercel.json` - Vercel 部署配置
- `index.html` - 入口文件
- `.gitignore` - Git 忽略文件

无需额外配置即可部署。

---

## 自动部署

连接 GitHub 仓库后，每次推送代码到 main 分支都会自动触发部署。

---

## 本地预览

```bash
vercel dev
```

在本地启动 Vercel 开发服务器，模拟生产环境。
