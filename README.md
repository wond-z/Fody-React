## 项目结构

### 目录

```
├── dist                                // 默认的 build 输出目录
├── .husky                              // pre-commit hook
├── webpack.config.js                   // 全局配置文件及webpack配置文件
├── test                                // 测试目录
└── src                                 // 源码目录
    ├── assets                          // 公共的文件（如image、css、font等）
    ├── components                      // 项目组件
    ├── constants                       // 常量/接口地址等
    ├── routes                          // 路由
    ├── utils                           // 工具库
    ├── pages                           // 页面模块
        ├── Home                        // Home模块，建议组件统一大写开头
        ├── ...
    ├── App.tsx                         // react顶层文件
    ├── typing                          // ts类型文件
├── .editorconfig                       // IDE格式规范
├── .eslintignore                       // eslint忽略
├── .eslintrc                           // eslint配置文件
├── .gitignore                          // git忽略
├── .prettierrc                         // prettierc配置文件
├── .babelrc                         // babel配置文件
├── LICENSE.md                          // LICENSE
├── package.json                        // package
├── README.md                           // README
├── tsconfig.json                       // typescript配置文件
```

## 实现过程

### 项目初始化

首先从一个空目录开始，对项目初始化：

```shell
mkdir demo
cd demo
git init
npm init
```

#### React和Babel引入

对于一个React项目，我们首先要安装React，写一个Hello World！

安装我们主要的项目依赖：

```shell
npm i -S react react-dom
```

由于我们的浏览器不支持最新的ECMAScript语法，所以我们需要Babel来转义为ES5或者ES6。

安装我们的Babel来提高兼容性:

```shell
npm i -D @babel/core @babel/preset-env @babel/preset-react @babel/plugin-transform-runtime @babel/plugin-proposal-class-properties babel-loader

# 以下模块按需引用，这里未引入
npm i -D @babel/runtime
npm i -D @babel/plugin-proposal-object-rest-spread
npm i -D babel-preset-mobx
```

- @babel/core: babel转码的核心引擎
- @babel/babel-preset-env: 添加对ES5、ES6的支持
- @babel/babel-preset-react: 添加对JSX的支持
- @babel/plugin-transform-runtime
- @babel/plugin-proposal-class-properties: 对React中class的支持
- babel-loader

#### Webpack引入

```shell
npm i -D webpack webpack-cli webpack-dev-server html-webpack-plugin
```

- webpack: weback插件的核心依赖
- webpack-cli: 为插件提供命令行工具
- webpack-dev-server: 帮助启动live server
- html-webpack-plugin: 帮助创建HTML模版

#### Babel配置

.babelrc中添加基本配置:

```json
{
    "presets": ["@babel/preset-env", "@babel/preset-react"],
    "plugins": [
        "@babel/plugin-proposal-object-rest-spread",
        "@babel/plugin-transform-runtime"
    ]
}
```

##### Babel Plugin

Babel是代码转换器，借助Babel，我们可以使用最流行的js写法，而plugin就是实现Babel功能的核心。



![image.png](https://ucc.alicdn.com/pic/developer-ecology/5b403fd92c0a423a8a68e85ce7e0cf72.png)



这里的配置是为了支持react中class的写法。

##### Babel Preset

Babel的Plugin一般拆成尽可能小的粒度，开发者可以按需引进，例如ES6到ES5的功能，官方提供了20+插件，这样可以提高性能和扩展性，但是很多时候逐个引入就很让人头大，而Babel Preset就是为此而生，可以视为Presets是相关Plugins的集合。

- @babel/react: 支持了React所有的转码需求
- @babel/env: 不夸张滴讲，仅需要它自己内部的配置项，就可以完成现代JS工程几乎所有的转码需求

#### Webpack基本配置

新建一个webpack.config.js文件。

```js
// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
   entry: './src/index.js',
   output: {
      path: path.join(__dirname, '/dist'),
      filename: 'bundle.js'
   },
   devServer: {
      port: 8080,
      static: {
         directory: path.join(__dirname, "/")
      },
   },
   module: {
      rules: [
         {
            test: /\.js|jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
         },
         {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        }
      ]
   },
   plugins:[
       new HtmlWebpackPlugin({
            template: path.join(__dirname,'/src/index.html')
       })
   ]
}
```

- entry: 入口，开始打包的起点
- output: 打包文件的地址
- devServer: live server配置
- test: 使用loader的文件类型
- loader: 将要使用的loader

#### Package.json基本配置

```json
"scripts": {
    "start": "webpack serve --mode development --open --hot",
    "build": "webpack --mode production"
}
```

- mode: process.env.NODE_ENV --> development, 为modules和chunks启用有意义的名称
- open: 告诉server在服务启动后打开默认浏览器
- hot: 开启热更新

#### 写一个React Demo

目前的项目结构如下图所示：

```
├── node_modules
└── src
    ├── index.html
    ├── index.js
├── .babelrc
├── package-lock.json
├── package.json
├── webpack.config.js
```

js和html文件如下所示：

js:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

const App = () => {
	return (
		<div>
			<h1>Hello!</h1>
			<h2>Welcome to your First React App!</h2>
		</div>
	);
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);
```

html:

```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>React Web</title>
</head>
<body>
	<div id="root"></div>
	<script src="bundle.js"></script>
</body>
</html>
```

最后，只要start一下，项目就会启动在8080端口。
```shell
npm run start
```

#### TypeScript配置

```shell
npm install -D typescript ts-loader @types/node @types/react @types/react-dom
```

- typescript: TypeScript的主要引擎
- ts-loader: 转义.ts --> .js 并打包
- @types/node @types/react @types/react-dom: 对node、react、react dom类型的定义

同时在根目录加入tsconfig.json来对ts编译进行配置：

```
//_tsconfig.json_

{
  "compilerOptions": {
    "outDir": "./dist/",
    "noImplicitAny": true,
    "module": "es6",
    "target": "es5",
    "jsx": "react",
    "allowJs": true,
    "allowSyntheticDefaultImports": true,
    "moduleResolution": "Node"
  }
}
```

最后在webpack中添加对ts的支持。

##### 添加ts-loader：

```
//_webpack.config.js_
rules: [
    ...
    {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      loader: 'ts-loader'
    }
    ...
}
```

##### 设置resolve属性，来指定文件如何被解析：

```
//_webpack.config.js_
...
resolve: 
{
   extensions: [ '.tsx', '.ts', '.js' ],
}
...
```

##### rename入口：

```
//_webpack.config.js_
...
entry: "./src/index.tsx",
...
```

最后启动一下server来看一下ts配置是否正确。



![image.png](https://ucc.alicdn.com/pic/developer-ecology/fa92b4a3c58b496ea997a478bd70d5c4.png)



上述我们的配置其实相当于执行了一次：

```
npx create-react-app my-app --template typescript
```

在这种流程下很是麻烦，将 *.ts 提供给 TypeScript，然后将运行的结果提供给 Babel，而且还要借助很多loader。



![image.png](https://ucc.alicdn.com/pic/developer-ecology/7a35e03be53b47a39655c9c7a14f7080.png)



那么我们能不能简化一下这样的流程，因为Babel7中提供的babel-loader就可以完美进行编译ts，答案是可以的，这种方式直接简化了过程。



![image.png](https://ucc.alicdn.com/pic/developer-ecology/ea9a78d0227a4344b22c34e9e7f7d5b8.png)



```
module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: ['babel-loader']
      }
    ]
  },
```

并且在.babelrc中也只多了一行@babel/preset-typescript，这种配置更简单，而且打包速度更快一点，逻辑更加清晰。

那么为什么还要在项目中使用ts-loader呢？

- ts-loader 在内部是调用了 TypeScript 的官方编译器 -- tsc。所以，ts-loader 和 tsc 是共享 tsconfig.json，所以会提供完整的报错信息，ts-loader也与 vscode 提供的语法校验表现一致
- 而@babel/preset-typescript有的时候会无法提供完整的报错信息和类型提示
