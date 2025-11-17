const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000; // 云平台会自动分配端口
const HOST = '0.0.0.0'; // 监听所有网络接口，允许外部设备访问

// 确保uploads目录存在
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// 配置文件上传
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // 使用时间戳和原始文件名
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 限制文件大小为10MB
});

// CORS中间件 - 允许移动设备访问
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // 允许所有来源
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // 处理预检请求
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// 中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET请求测试接口
app.get('/api/test-get', (req, res) => {
  const params = req.query;
  res.json({
    success: true,
    message: 'GET请求成功',
    method: 'GET',
    timestamp: new Date().toISOString(),
    receivedParams: params,
    paramsCount: Object.keys(params).length
  });
});

// POST请求测试接口（JSON数据）
app.post('/api/test-post', (req, res) => {
  const data = req.body;
  res.json({
    success: true,
    message: 'POST请求成功',
    method: 'POST',
    timestamp: new Date().toISOString(),
    receivedData: data,
    dataType: typeof data,
    contentType: req.headers['content-type']
  });
});

// 文件上传测试接口
app.post('/api/test-upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: '没有接收到文件'
    });
  }

  res.json({
    success: true,
    message: '文件上传成功',
    method: 'POST',
    timestamp: new Date().toISOString(),
    file: {
      originalName: req.file.originalname,
      filename: req.file.filename,
      mimetype: req.file.mimetype,
      size: req.file.size,
      sizeInKB: (req.file.size / 1024).toFixed(2),
      path: req.file.path
    },
    additionalData: req.body
  });
});

// 获取已上传文件列表
app.get('/api/uploaded-files', (req, res) => {
  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: '读取文件列表失败',
        error: err.message
      });
    }

    const fileList = files.map(filename => {
      const filePath = path.join(uploadsDir, filename);
      const stats = fs.statSync(filePath);
      return {
        filename: filename,
        size: stats.size,
        sizeInKB: (stats.size / 1024).toFixed(2),
        uploadTime: stats.birthtime
      };
    });

    res.json({
      success: true,
      count: fileList.length,
      files: fileList
    });
  });
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: '服务器错误',
    error: err.message
  });
});

// 获取本机IP地址
function getLocalIPAddress() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // 跳过内部和非IPv4地址
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

// 启动服务器
app.listen(PORT, HOST, () => {
  const localIP = getLocalIPAddress();
  console.log(`===========================================`);
  console.log(`HTTP请求测试服务器已启动`);
  console.log(`本地访问: http://localhost:${PORT}`);
  console.log(`局域网访问: http://${localIP}:${PORT}`);
  console.log(`===========================================`);
  console.log(`\n📱 移动设备访问说明:`);
  console.log(`1. 确保手机和电脑在同一Wi-Fi网络`);
  console.log(`2. 在移动设备浏览器/App中使用: http://${localIP}:${PORT}`);
  console.log(`3. API接口:`);
  console.log(`   - GET:    http://${localIP}:${PORT}/api/test-get`);
  console.log(`   - POST:   http://${localIP}:${PORT}/api/test-post`);
  console.log(`   - UPLOAD: http://${localIP}:${PORT}/api/test-upload`);
  console.log(`===========================================\n`);
});
