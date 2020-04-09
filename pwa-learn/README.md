

##  第五章 渐进式Web App ProgressiveWeb App

### 1.PWA简介 

**PWA组成技术**

- Service Worker

  - 服务工作线程
    - 常驻内存运行
    - 代理网络请求
    - 依赖HTTPS

- Promise 承诺限制流

  - 优化回调地狱
  - async/await 语法同步化
  - service worker Ap风格

- fetch 

  - 比XMLHTTPRequest更简洁

  - Promise 风格

    ````js
    fetch('/rest/use')
    .then(res => res.json)
    .then(info => )
    ````

- cache Api 支持资源的缓存系统

  - 缓存资源 css/scripts/image
  - 依赖service worker 代理网络请求
  - 支持离线程序运行

- Notification Api

  - 依赖用户授权
  - 适合在service work中推送



###  2.服务工作线程：Service Worker

安装http服务模块

`npm install  serve -g`

项目目录执行（pwa-learn） ： serve

```
   - Local:            http://localhost:5000       │
   │   - On Your Network:  http://192.168.0.101:5000 
```



### 3.承诺”控制流：Promise 



###  4.更优雅的请求：fetch 



### 5.资源的缓存系统：Cache API 



### 6.消息推送：Notification API 



###  7.如何在项目中开启PWA 


