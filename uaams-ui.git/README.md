
### 安装
```bush
// 安装前请先确保已安装node和npm
// 需要提前在全局安装webpack和webpack-dev-server,如果已安装请忽略
npm install webpack -g
npm install webpack-dev-server -g

// 安装成功后,再安装依赖
npm install
```
### 运行
```bush
npm run dev （正常编译模式，注意：index.html里必须手动引用app.css，<link href="/antd/dist/app.css" rel="stylesheet" />，否则没有样式）

npm run hot （热替换编译模式，注意：热替换模式下index.html里去掉引用app.css）

npm run dist （发布生产版本，对代码进行混淆压缩，提取公共代码，分离css文件）
```

### 访问
在浏览器地址栏输入[http://127.0.0.1:8888](http://127.0.0.1:8888)
