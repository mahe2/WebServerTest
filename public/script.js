// GET请求处理
document.getElementById('getForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const params = new URLSearchParams();
    
    // 只添加有值的参数
    for (let [key, value] of formData.entries()) {
        if (value.trim()) {
            params.append(key, value);
        }
    }
    
    const resultBox = document.getElementById('getResult');
    resultBox.innerHTML = '<p>正在发送请求...</p>';
    resultBox.classList.add('show');
    
    try {
        const response = await fetch(`/api/test-get?${params.toString()}`);
        const data = await response.json();
        
        displayResult(resultBox, data, true);
    } catch (error) {
        displayResult(resultBox, { error: error.message }, false);
    }
});

// POST请求处理
document.getElementById('postForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const jsonData = document.getElementById('postData').value;
    const resultBox = document.getElementById('postResult');
    
    resultBox.innerHTML = '<p>正在发送请求...</p>';
    resultBox.classList.add('show');
    
    try {
        // 验证JSON格式
        let parsedData;
        try {
            parsedData = jsonData ? JSON.parse(jsonData) : {};
        } catch (jsonError) {
            throw new Error('JSON格式错误: ' + jsonError.message);
        }
        
        const response = await fetch('/api/test-post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(parsedData)
        });
        
        const data = await response.json();
        displayResult(resultBox, data, true);
    } catch (error) {
        displayResult(resultBox, { error: error.message }, false);
    }
});

// 文件上传处理
document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const fileInput = document.getElementById('fileInput');
    const description = document.getElementById('fileDescription').value;
    const resultBox = document.getElementById('uploadResult');
    
    if (!fileInput.files || fileInput.files.length === 0) {
        displayResult(resultBox, { error: '请选择要上传的文件' }, false);
        return;
    }
    
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    if (description) {
        formData.append('description', description);
    }
    
    resultBox.innerHTML = '<p>正在上传文件...</p>';
    resultBox.classList.add('show');
    
    try {
        const response = await fetch('/api/test-upload', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        displayResult(resultBox, data, data.success);
        
        // 上传成功后清空表单
        if (data.success) {
            e.target.reset();
            // 自动刷新文件列表
            setTimeout(loadUploadedFiles, 500);
        }
    } catch (error) {
        displayResult(resultBox, { error: error.message }, false);
    }
});

// 显示结果的通用函数
function displayResult(element, data, isSuccess) {
    element.classList.remove('success', 'error');
    element.classList.add(isSuccess ? 'success' : 'error');
    
    const title = isSuccess ? '✅ 成功' : '❌ 失败';
    
    element.innerHTML = `
        <h3>${title}</h3>
        <pre>${JSON.stringify(data, null, 2)}</pre>
    `;
    
    element.classList.add('show');
}

// 加载已上传文件列表
async function loadUploadedFiles() {
    const resultBox = document.getElementById('fileList');
    resultBox.innerHTML = '<p>正在加载文件列表...</p>';
    resultBox.classList.add('show');
    
    try {
        const response = await fetch('/api/uploaded-files');
        const data = await response.json();
        
        if (data.success && data.files.length > 0) {
            let html = `<h3>📁 共有 ${data.count} 个文件</h3>`;
            
            data.files.forEach((file, index) => {
                const uploadTime = new Date(file.uploadTime).toLocaleString('zh-CN');
                html += `
                    <div class="file-item">
                        <strong>${index + 1}. ${file.filename}</strong><br>
                        大小: ${file.sizeInKB} KB (${file.size} bytes)<br>
                        上传时间: ${uploadTime}
                    </div>
                `;
            });
            
            resultBox.innerHTML = html;
            resultBox.classList.add('success');
        } else {
            resultBox.innerHTML = '<h3>📁 暂无上传文件</h3>';
            resultBox.classList.add('success');
        }
        
        resultBox.classList.add('show');
    } catch (error) {
        displayResult(resultBox, { error: error.message }, false);
    }
}

// 页面加载时自动加载文件列表
window.addEventListener('load', () => {
    loadUploadedFiles();
});

// 添加示例数据按钮功能
document.addEventListener('DOMContentLoaded', () => {
    // 为POST请求的textarea添加默认示例
    const postData = document.getElementById('postData');
    if (postData && !postData.value) {
        postData.value = `{
  "username": "testuser",
  "email": "test@example.com",
  "message": "这是一条测试消息",
  "timestamp": "${new Date().toISOString()}"
}`;
    }
});
