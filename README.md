# HTTP请求测试工具

一个简单易用的Web服务器项目，用于测试HTTP GET、POST请求和文件上传功能。

## 功能特性

✅ **GET请求测试** - 支持多个URL参数的GET请求测试  
✅ **POST请求测试** - 支持JSON格式数据的POST请求测试  
✅ **文件上传测试** - 支持单文件上传（最大10MB）  
✅ **实时反馈** - 在网页上实时显示请求结果  
✅ **文件管理** - 查看已上传的文件列表  
✅ **美观界面** - 现代化、响应式的用户界面  
✅ **移动设备支持** - 支持手机/平板访问，可在移动App中调用API  
✅ **CORS支持** - 允许跨域请求，方便移动应用开发测试

## 项目结构

```
WebServerTest/
├── server.js              # Express服务器主文件
├── package.json           # 项目配置和依赖
├── public/                # 静态文件目录
│   ├── index.html        # 主页面
│   ├── style.css         # 样式文件
│   └── script.js         # 前端JavaScript
└── uploads/               # 文件上传目录
```

## 安装步骤

### 1. 确保已安装Node.js

确保你的系统已安装Node.js（建议版本 >= 14.x）

```bash
node --version
npm --version
```

### 2. 安装依赖

在项目目录下运行：

```bash
npm install
```

这将安装以下依赖：
- **express**: Web服务器框架
- **multer**: 文件上传处理中间件
- **nodemon**: 开发时自动重启服务器（开发依赖）

## 运行项目

### 启动服务器

```bash
npm start
```

或使用开发模式（自动重启）：

```bash
npm run dev
```

### 访问应用

**本地访问（电脑浏览器）：**
```
http://localhost:3000
```

**移动设备访问（手机/平板）：**
```
http://你的电脑IP地址:3000
```

服务器启动后，会自动显示本机IP地址，命令行输出示例：
```
===========================================
HTTP请求测试服务器已启动
本地访问: http://localhost:3000
局域网访问: http://192.168.1.100:3000
===========================================

📱 移动设备访问说明:
1. 确保手机和电脑在同一Wi-Fi网络
2. 在移动设备浏览器/App中使用: http://192.168.1.100:3000
3. API接口:
   - GET:    http://192.168.1.100:3000/api/test-get
   - POST:   http://192.168.1.100:3000/api/test-post
   - UPLOAD: http://192.168.1.100:3000/api/test-upload
===========================================
```

## 使用说明

### 1. GET请求测试

- 在"GET 请求测试"区域填写参数（name, age, city等）
- 点击"发送GET请求"按钮
- 查看服务器返回的响应结果，包括接收到的参数

### 2. POST请求测试

- 在"POST 请求测试"区域的文本框中输入JSON格式数据
- 默认提供了示例JSON数据
- 点击"发送POST请求"按钮
- 查看服务器返回的响应结果，包括接收到的数据

示例JSON：
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "message": "这是一条测试消息"
}
```

### 3. 文件上传测试

- 点击"选择文件"按钮选择要上传的文件
- 可选：填写文件描述
- 点击"上传文件"按钮
- 查看上传结果，包括文件名、大小、类型等信息
- 上传的文件会保存在 `uploads/` 目录

### 4. 查看已上传文件

- 在"已上传文件列表"区域点击"刷新列表"按钮
- 查看所有已上传文件的详细信息（文件名、大小、上传时间）

## API接口说明

### GET /api/test-get

测试GET请求，支持任意URL参数

**示例：**
```
GET /api/test-get?name=John&age=25&city=北京
```

**响应：**
```json
{
  "success": true,
  "message": "GET请求成功",
  "method": "GET",
  "timestamp": "2025-11-17T...",
  "receivedParams": {
    "name": "John",
    "age": "25",
    "city": "北京"
  },
  "paramsCount": 3
}
```

### POST /api/test-post

测试POST请求，接收JSON数据

**请求：**
```json
{
  "username": "testuser",
  "email": "test@example.com"
}
```

**响应：**
```json
{
  "success": true,
  "message": "POST请求成功",
  "method": "POST",
  "timestamp": "2025-11-17T...",
  "receivedData": {
    "username": "testuser",
    "email": "test@example.com"
  },
  "dataType": "object",
  "contentType": "application/json"
}
```

### POST /api/test-upload

上传单个文件

**Content-Type:** `multipart/form-data`

**表单字段：**
- `file`: 文件（必需）
- `description`: 文件描述（可选）

**响应：**
```json
{
  "success": true,
  "message": "文件上传成功",
  "method": "POST",
  "timestamp": "2025-11-17T...",
  "file": {
    "originalName": "test.txt",
    "filename": "1234567890-test.txt",
    "mimetype": "text/plain",
    "size": 1024,
    "sizeInKB": "1.00",
    "path": "uploads/1234567890-test.txt"
  }
}
```

### GET /api/uploaded-files

获取已上传文件列表

**响应：**
```json
{
  "success": true,
  "count": 2,
  "files": [
    {
      "filename": "1234567890-test.txt",
      "size": 1024,
      "sizeInKB": "1.00",
      "uploadTime": "2025-11-17T..."
    }
  ]
}
```

## 技术栈

- **后端**: Node.js + Express
- **文件处理**: Multer
- **前端**: HTML5 + CSS3 + Vanilla JavaScript
- **异步请求**: Fetch API

## 移动设备/App开发测试

### 📱 如何在移动App中调用API

服务器已配置CORS支持，可以直接从移动应用发起HTTP请求：

**1. 确保网络连接**
- 手机和开发电脑必须在同一Wi-Fi网络
- 记下服务器启动时显示的局域网IP地址（如：192.168.1.100）

**2. 在移动App中使用**

以下是不同平台的示例代码：

**iOS (Swift)：**
```swift
// GET请求
let url = URL(string: "http://192.168.1.100:3000/api/test-get?name=test")!
let task = URLSession.shared.dataTask(with: url) { data, response, error in
    if let data = data {
        let json = try? JSONSerialization.jsonObject(with: data)
        print(json)
    }
}
task.resume()

// POST请求
var request = URLRequest(url: URL(string: "http://192.168.1.100:3000/api/test-post")!)
request.httpMethod = "POST"
request.setValue("application/json", forHTTPHeaderField: "Content-Type")
let body = ["username": "testuser", "email": "test@example.com"]
request.httpBody = try? JSONSerialization.data(withJSONObject: body)
```

**Android (Kotlin)：**
```kotlin
// 使用OkHttp
val client = OkHttpClient()

// GET请求
val request = Request.Builder()
    .url("http://192.168.1.100:3000/api/test-get?name=test")
    .build()

// POST请求
val json = JSONObject()
    .put("username", "testuser")
    .put("email", "test@example.com")

val body = RequestBody.create(
    "application/json".toMediaType(),
    json.toString()
)
val postRequest = Request.Builder()
    .url("http://192.168.1.100:3000/api/test-post")
    .post(body)
    .build()
```

**React Native：**
```javascript
// GET请求
fetch('http://192.168.1.100:3000/api/test-get?name=test')
  .then(response => response.json())
  .then(data => console.log(data));

// POST请求
fetch('http://192.168.1.100:3000/api/test-post', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: 'testuser',
    email: 'test@example.com'
  })
})
.then(response => response.json())
.then(data => console.log(data));

// 文件上传
const formData = new FormData();
formData.append('file', {
  uri: fileUri,
  type: 'image/jpeg',
  name: 'photo.jpg'
});
fetch('http://192.168.1.100:3000/api/test-upload', {
  method: 'POST',
  body: formData,
  headers: {
    'Content-Type': 'multipart/form-data',
  }
});
```

**Flutter：**
```dart
import 'package:http/http.dart' as http;
import 'dart:convert';

// GET请求
var response = await http.get(
  Uri.parse('http://192.168.1.100:3000/api/test-get?name=test')
);
var data = jsonDecode(response.body);

// POST请求
var postResponse = await http.post(
  Uri.parse('http://192.168.1.100:3000/api/test-post'),
  headers: {'Content-Type': 'application/json'},
  body: jsonEncode({'username': 'testuser', 'email': 'test@example.com'})
);
```

### ⚠️ 移动开发注意事项

1. **iOS App Transport Security (ATS)**：
   - iOS默认只允许HTTPS连接
   - 在Info.plist中添加以下配置允许HTTP：
   ```xml
   <key>NSAppTransportSecurity</key>
   <dict>
       <key>NSAllowsArbitraryLoads</key>
       <true/>
   </dict>
   ```

2. **Android网络权限**：
   - 在AndroidManifest.xml中添加网络权限：
   ```xml
   <uses-permission android:name="android.permission.INTERNET" />
   ```
   - Android 9+需要允许明文流量，在AndroidManifest.xml的application标签中添加：
   ```xml
   <application android:usesCleartextTraffic="true">
   ```

3. **防火墙设置**：
   - macOS可能需要允许Node.js接入网络
   - 系统偏好设置 → 安全性与隐私 → 防火墙选项

4. **IP地址变化**：
   - 每次重连Wi-Fi后IP可能变化
   - 建议每次都查看服务器启动时显示的IP

## 注意事项

1. 文件上传限制为10MB
2. 上传的文件保存在 `uploads/` 目录
3. 服务器默认运行在端口3000
4. 所有API返回JSON格式数据
5. 已启用CORS，支持跨域请求
6. 移动设备访问需在同一局域网内

## 开发建议

- 修改代码后使用 `npm run dev` 自动重启服务器
- 可以在 `server.js` 中修改端口号
- 可以在 `server.js` 中调整文件大小限制

## 故障排除

### 端口被占用
如果端口3000被占用，可以修改 `server.js` 中的 `PORT` 变量：
```javascript
const PORT = 3001; // 改为其他端口
```

### 文件上传失败
确保 `uploads/` 目录存在且有写入权限

### 依赖安装失败
尝试清除缓存后重新安装：
```bash
rm -rf node_modules package-lock.json
npm install
```

## 许可证

MIT License

## 作者

开发时间：2025年11月
