# HTTP请求方法测试指南

## 📚 所有支持的HTTP方法

你的服务器现在支持以下HTTP方法：

---

## 1️⃣ GET - 获取数据

**用途**：查询、读取数据

### 测试方法

**浏览器地址栏**：
```
http://localhost:3000/api/test-get?name=Tom&age=25
```

**JavaScript**：
```javascript
fetch('http://localhost:3000/api/test-get?name=Tom&age=25')
  .then(res => res.json())
  .then(data => console.log(data));
```

**curl命令**：
```bash
curl "http://localhost:3000/api/test-get?name=Tom&age=25"
```

**参数特点**：
- ✅ 参数在URL中（`?key=value&key2=value2`）
- ✅ 可以直接在浏览器测试
- ⚠️ 参数会显示在地址栏
- ⚠️ 长度有限制

---

## 2️⃣ POST - 创建数据

**用途**：提交表单、创建新资源

### 测试方法

**JavaScript**：
```javascript
fetch('http://localhost:3000/api/test-post', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: '张三',
    email: 'zhang@example.com',
    age: 25
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

**curl命令**：
```bash
curl -X POST http://localhost:3000/api/test-post \
  -H "Content-Type: application/json" \
  -d '{"username":"张三","email":"zhang@example.com","age":25}'
```

**iOS (Swift)**：
```swift
var request = URLRequest(url: URL(string: "http://localhost:3000/api/test-post")!)
request.httpMethod = "POST"
request.setValue("application/json", forHTTPHeaderField: "Content-Type")
let body = ["username": "张三", "email": "zhang@example.com", "age": 25]
request.httpBody = try? JSONSerialization.data(withJSONObject: body)
```

**参数特点**：
- ✅ 参数在请求体中（不可见）
- ✅ 支持大量数据
- ✅ 支持复杂数据结构
- ⚠️ 需要设置Content-Type

---

## 3️⃣ PUT - 更新数据（完整更新）

**用途**：更新整个资源

### 测试方法

**JavaScript**：
```javascript
fetch('http://localhost:3000/api/test-put', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    id: 123,
    name: '李四',
    email: 'li@example.com',
    phone: '13800138000'
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

**curl命令**：
```bash
curl -X PUT http://localhost:3000/api/test-put \
  -H "Content-Type: application/json" \
  -d '{"id":123,"name":"李四","email":"li@example.com"}'
```

**参数特点**：
- ✅ 用于替换整个资源
- ✅ 参数在请求体中
- ⚠️ 通常需要提供完整数据

---

## 4️⃣ PATCH - 更新数据（部分更新）

**用途**：只更新资源的某些字段

### 测试方法

**JavaScript**：
```javascript
fetch('http://localhost:3000/api/test-patch', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    id: 123,
    email: 'newemail@example.com'  // 只更新邮箱
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

**curl命令**：
```bash
curl -X PATCH http://localhost:3000/api/test-patch \
  -H "Content-Type: application/json" \
  -d '{"id":123,"email":"newemail@example.com"}'
```

**PUT vs PATCH**：
- PUT：替换整个资源（需要所有字段）
- PATCH：只修改部分字段

---

## 5️⃣ DELETE - 删除数据

**用途**：删除指定资源

### 测试方法

**JavaScript**：
```javascript
fetch('http://localhost:3000/api/test-delete?id=123', {
  method: 'DELETE'
})
.then(res => res.json())
.then(data => console.log(data));
```

**curl命令**：
```bash
curl -X DELETE "http://localhost:3000/api/test-delete?id=123"
```

**iOS (Swift)**：
```swift
var request = URLRequest(url: URL(string: "http://localhost:3000/api/test-delete?id=123")!)
request.httpMethod = "DELETE"
```

**参数特点**：
- ✅ 参数通常在URL中（指定要删除的ID）
- ✅ 可以不带请求体
- ⚠️ 操作不可逆

---

## 6️⃣ 文件上传（特殊的POST）

**用途**：上传文件

### 测试方法

**HTML表单**：
```html
<form action="/api/test-upload" method="POST" enctype="multipart/form-data">
  <input type="file" name="file">
  <input type="text" name="description" placeholder="文件描述">
  <button type="submit">上传</button>
</form>
```

**JavaScript**：
```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('description', '这是一张图片');

fetch('http://localhost:3000/api/test-upload', {
  method: 'POST',
  body: formData
  // 注意：不要设置Content-Type，浏览器会自动设置
})
.then(res => res.json())
.then(data => console.log(data));
```

**curl命令**：
```bash
curl -X POST http://localhost:3000/api/test-upload \
  -F "file=@/path/to/your/file.jpg" \
  -F "description=测试图片"
```

**参数特点**：
- ✅ 使用 `multipart/form-data` 格式
- ✅ 可以同时传文件和其他数据
- ⚠️ 文件大小限制为10MB

---

## 📊 快速对比表

| 方法 | 用途 | 参数位置 | 幂等性 | 安全性 | 常见场景 |
|------|------|----------|--------|--------|----------|
| **GET** | 查询 | URL | ✅ | ⚠️ | 获取列表、查看详情 |
| **POST** | 创建 | Body | ❌ | ✅ | 注册、提交表单、上传文件 |
| **PUT** | 完整更新 | Body | ✅ | ✅ | 更新用户资料 |
| **PATCH** | 部分更新 | Body | ✅ | ✅ | 修改单个字段 |
| **DELETE** | 删除 | URL | ✅ | ⚠️ | 删除记录 |

---

## 🎯 实战练习

### 练习1：用Postman测试所有接口

1. 下载Postman：https://www.postman.com/downloads/
2. 创建新请求，测试以下接口：
   - GET: `http://localhost:3000/api/test-get?name=测试`
   - POST: `http://localhost:3000/api/test-post`
   - PUT: `http://localhost:3000/api/test-put`
   - PATCH: `http://localhost:3000/api/test-patch`
   - DELETE: `http://localhost:3000/api/test-delete?id=123`

### 练习2：在浏览器控制台测试

1. 打开 http://localhost:3000
2. 按F12打开开发者工具
3. 在Console中粘贴上面的JavaScript代码测试

### 练习3：在移动App中测试

使用README.md中的移动端代码示例，替换URL为新的接口。

---

## 🔧 故障排查

### 问题1：POST/PUT请求返回空对象
**原因**：缺少中间件解析Body  
**解决**：确保有这行代码
```javascript
app.use(express.json());
```

### 问题2：文件上传失败
**原因**：未配置multer或Content-Type错误  
**解决**：使用FormData，不要手动设置Content-Type

### 问题3：移动App调用失败
**原因**：CORS未配置  
**解决**：已在server.js中配置，确保服务器已重启

---

## 💡 最佳实践

1. **RESTful API设计**：
   - GET：获取资源
   - POST：创建资源
   - PUT/PATCH：更新资源
   - DELETE：删除资源

2. **参数传递**：
   - 查询条件 → URL参数（GET）
   - 创建/更新数据 → 请求体（POST/PUT）
   - 资源标识 → URL路径（`/user/:id`）

3. **状态码使用**：
   - 200：成功
   - 201：创建成功
   - 400：请求错误
   - 404：未找到
   - 500：服务器错误

---

## 📚 延伸学习

- HTTP协议详解：https://developer.mozilla.org/zh-CN/docs/Web/HTTP
- RESTful API设计：https://restfulapi.net/
- Express官方文档：http://expressjs.com/zh-cn/

有任何疑问随时问我！😊
