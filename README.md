# QGWeb - Quick Gulping your Websites

使用Gulp快速构建你的个人网站.

![](logo.png)

## 运作流程

项目运作的最简流程:

1. `npm install`
2. `npm run dev`

## 项目环境简要

### 

项目中将GulpFile分割成.task文件存放在gulpfile文件夹中, make.js负责将这些task文件按顺序打包成一个文件, 使用方式如下:

```
node make
```

当然, 在 npm scripts 中集成了监听gulpfile文件夹的钩子, 可以通过如下命令, 监听gulpfile文件夹并自动执行 npm make:

```
npm run watch_make
```

### ESLint规范

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

## 项目技术简要

### 目录说明

项目前端资源文件击中存放在resources文件夹中, 经过Gulp打包到dist目录, 其中中间文件存放在.tmp目录不会被git跟踪.

### CSS打包

#### nano CSS

即 Atom CSS, 方便写出 .fl (float: left) .fs20 (font-size: 20px) 等写法.

#### 普通CSS

普通文件将会打包至dist/css目录, 其中.less文件会先被编译为.css文件.

### JS打包

### UtilJS

即我们所说的工具或类库, 我们通常下载下来便是经过浏览器适配\混淆和最小化的JS文件, 所以这些JS不会经过Gulp处理.

### 普通JS & 逻辑JS

普通JS将会经过Babel编码, 和代码混淆.此部分JS文件通常与页面逻辑联系紧密, 所以存放在view/logic中.

## 图片打包

### 图片压缩

* 隔行扫描gif进行渲染
* 无损压缩jpg图片
* 去除SVG中冗余的ID等信息

### 图片缓存

一般情况下, 我们只压缩部分图片, 绝大部分图片压缩消耗大量的时间, 所以我们将使用gulp-chache进行缓存.

### pngquant

@see https://pngquant.org

## HTML打包

### 静态页面

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

    <!-- 真实的页面逻辑 -->
    <div class="body-con">
        
        @@include('./views/content/@standard.html')

    </div>

    <!-- 页脚 -->
    @@include('./views/comm/footer.html')
    
</body>

<!-- 通用的JS -->
<script src="./js/comm.js"></script>

</html>
```

comm文件夹中用来存放公用的代码片段, 比如官网的百度商桥, HTML文件通用的页眉页脚等.

content文件夹用来存放页面的真实页面逻辑, 也可以理解为我们将整个HTML文件拆分为了代码段构成和页面本身两个段落, content文件夹用于存放后者.

logic文件夹用来存放于页面逻辑上紧密联系的JS文件.

### 非静态页面

由于官网部分页面走的是SSR, 所以HTML打包需要经过特殊处理.

由于没有搭建前端服务器, 所以页面仍然需要前端写完再交由后端进行模板替换这种低效的操作, 此页面下简称为"模板HTML".

模板HTML在任务中以`standardHTMLTemplates`变量标出, 打包时将输出至dist/template目录, 由于页面携带header.html\footer.html等对于后端而言的冗余信息, 所以打包时, 同时将一份真实页面逻辑(即views/content文件夹下的HTML文件)存放至dist/template/content.

后端拉去代码之后, 将dist/template/content固存至相应的后端目录, 如果较之前文件有更新, 则重新编写模板文件. 编写模板文件之后, 需要使用正则替换, 将这段模板替换掉dist/template下完整的HTML对应的body-con真实页面逻辑部分.

## 项目资源打包

除了代码以外的东西都应该放在这个task中打包, 比如Robot.txt文件.

## 完整的项目运作流程

1. 组织编写前端资源文件
2. 修改资源文件对应的打包逻辑任务
3. `node make`
4. `gulp build`
5. 后端拉取最新代码
6. 拷贝dist目录至对应后端文件夹
7. 对应dist/template/content修改模板, 并替换dist/template, 之后拷贝至对应后端文件夹
8. 配置nginx, 运行后端环境

## TODO

1. 打包区分开发环境和线上环境
2. 小图标自动合成图片精灵