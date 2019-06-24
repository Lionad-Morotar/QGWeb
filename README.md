# QGWeb - Quick Gulping your Websites

QGWeb, 一个简单的`gulp 3`模板项目, 可以快速将`gulp`融入到新项目的工作流, 以构建你的个人网站, 如企业展示网站, 官网, 个人博客等.

![logo](logo.png)

## 开发环境

项目运作的最简流程:

1. `npm install`
2. `npm run dev`

## 合成工作流

gulp 使用项目中的`gulpfile.babel.js`作打包流程的配置. 项目中将其分割成JS文件存放在gulpfile文件夹中, `./make.js`负责将这些task文件按顺序打包成一个文件, 使用方式如下:

```
node make
// 或者使用下 npm script 也可以
npm run dev
```

当然, 在 npm scripts 中集成了监听 gulpfile 文件变动, 自动重新执行`./make.js`文件的指令:

```
npm run watch_make
```

## 技术简要

### 目录说明

所有前端资源文件都集中存放在`resources`文件夹中, 经由`gulp`打包到`dist`目录.

`dist`目录没有添加到`.gitignore`文件中, 这意味着项目上线时你可以本地打包生成`dist`然后由服务端拉取, 或直接由服务器端打包.

此外, 还有`.tmp`作为中间文件夹, 此目录不会被`git`跟踪.

### CSS

普通文件将会打包至dist/css目录, 其中.less文件会先被编译为.css文件.

`css/nano`文件夹中引入了类`Atom CSS`写法, 已方便写出 .fl { float: left } .fs20 { font-size: 20px } 等写法.

### JS

`util/*.js`即工具库或类库, 通常下载下来已是混淆压缩后的代码, 所以这些JS不会经由Gulp处理.

`view/logic/*.js`存放与页面联系紧密的业务代码, 此类JS将会经过Babel编码及代码混淆等操作.

### 图片

已打开的图片压缩配置选项:

* 隔行扫描gif进行渲染
* 无损压缩jpg图片
* 去除SVG中冗余的ID等信息


### HTML

项目中, HTML被拆分成为了许多个逻辑碎片, views目录中, 主目录存放着每一个页面的主要构成, 可以从项目自带的@standard文件一览:

```
<!DOCTYPE html>
<html lang="zh-cn">

<head>

    <!-- 主要用来存放公共的头部文件 -->
    @@include('./views/comm/head-withJS.html')

</head>

<body>
    
    <!-- 页眉 -->
    @@include('./views/comm/header.html')

    <!-- 页脚 -->
    @@include('./views/comm/footer.html')
    
</body>

<!-- 通用逻辑 -->
<script src="./js/comm.js"></script>

</html>
```

### 非静态页面

由于官网部分页面走的是SSR, 所以HTML打包需要经过特殊处理.

由于没有搭建前端服务器, 所以页面仍然需要前端写完再交由后端进行模板替换这种低效的操作, 此页面下简称为"模板HTML".

模板HTML在任务中以`standardHTMLTemplates`变量标出, 打包时将输出至dist/template目录, 由于页面携带header.html\footer.html等对于后端而言的冗余信息, 所以打包时, 同时将一份真实页面逻辑(即views/content文件夹下的HTML文件)存放至dist/template/content.

后端拉去代码之后, 将dist/template/content固存至相应的后端目录, 如果较之前文件有更新, 则重新编写模板文件. 编写模板文件之后, 需要使用正则替换, 将这段模板替换掉dist/template下完整的HTML对应的body-con真实页面逻辑部分.

### 其它项目资源

除了代码以外的东西都应该放在这个task中处理, 比如`Robot.txt`

## ESLint规范

在[AlloyTeam](https://github.com/AlloyTeam/eslint-config-alloy)制作的Eslint规范上做了修改, 以方便针对VSCode做到`复制黏贴`即用的方便.

去除注释, 修改了一些规则, VSCode会在代码规范的下划线中提示对应的格式要求. 可根据团队或是个人使用再eslint.json有针对性地修改:

![VSCode ESLint 提示](https://i.imgur.com/9nXcBkQ.png)

![eslint.json](https://i.imgur.com/isROF8a.png)

此外, 再VSCode中使用ESLint, 推荐将JS,HTML等相关文件后缀加入校验, 在VSCode地设置中可以直接对ESLint.Validate进行修改:

```
"eslint.validate": [
    "javascript",
    "javascriptreact",
    "html",
    "vue",
    "typescript",
    "typescriptreact"
]
```