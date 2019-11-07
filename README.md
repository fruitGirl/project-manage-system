# project-manage-system 项目管理系统

## 目录结构
```
+-- assets                             资源文件（小文件）
+-- components                         组件
|   -- common                          通用纯组件
|   -- business                        业务组件
+-- constants                          常量文件
+-- layouts                            布局文件
+-- middleware                         中间件
+-- store                              vuex 数据层
|   -- index.js                        vuex 顶层的数据
|   -- login                           登录模块（分层）
|       -- actions.js                    
|       -- index.js
|       -- mutations.js
|       -- state.js
+-- pages                              页面
|   -- index.vue                       首页
|   -- auth
|       -- login.vue                   登录页（/auth/login)
+-- services                           请求服务
|   -- login.js                        登录页内的所有请求定义
+-- static                             静态文件（大文件）
+-- styles                             样式
+-- utils                              工具类
+-- .nuxt                              服务端和客户端打包文件
+-- ecosytem.config.js                 pm2 配置
+-- nuxt.config.js                     nuxt 配置(webpack)
+-- domain.config.js                   域名配置
+-- server                             自定义服务器配置
+-- .gitignore
+-- package.json
+-- READMD.md
```


## 项目用到的技术:
> * vue

> * vue-router

> * vuex

> * axios

> * eslint

## 开发规范
> * 创建page页面：在pages文件夹内，新建页面目录，在目录下创建同路径名的.vue文件，就可以在浏览器上访问到相对应的页面。例如：pages > auth > login, 地址栏：location.origin/auth/login。

> * 创建vuex数据管理模块：在store文件夹内，新建同页面名称一致的文件夹，在文件夹创建vuex各个模块（涉及组件公用状态和业务请求逻辑，必须使用vuex管理）。

> * 创建service请求模块：在services文件夹内容，新建同页面名称一致的文件，接口请求与mutations分离，方面统一管理接口定义。

> * 创建constants常量配置: 在constants文件夹内，新建同页面名称一致的文件，页面或者组件需要使用常量时，请在此处声明（剥离数据和view原则，便于后期维护）。

>* 组件区分页面组件和纯展示组件（展示组件命名需加pm前缀）

## 本地调试
```
$ npm install 
or 
$ yarn

npm run dev
```

## git 提交（改动）
git cz 替代 git commit 

测试环境使用分支
预发布环境使用release
线上环境使用master

## 部署（服务器端）
```
$ npm run generate (静态资源文件部署)

$ npm run deploy (服务端部署)
```

## SPA模式打包(已切换至jenkins打包)
```
$ npm run build:dev （构建开发环境）
$ npm run build:pro （构建生产环境）
```

### 维护者

moran

想了解更多请查看 [Nuxt.js docs](https://nuxtjs.org).

