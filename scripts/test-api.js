// 测试登录 API
async function testLoginAPI() {
  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@dbzj.edu.cn',
        password: 'admin123456'
      })
    });

    const data = await response.json();
    
    console.log('API 响应状态:', response.status);
    console.log('API 响应数据:', data);

    if (response.ok) {
      console.log('✅ 登录 API 测试成功');
    } else {
      console.log('❌ 登录 API 测试失败');
    }

  } catch (error) {
    console.error('API 测试错误:', error);
  }
}

// 如果是在 Node.js 环境中运行
if (typeof fetch === 'undefined') {
  console.log('请在浏览器控制台中运行此测试，或确保服务器正在运行');
} else {
  testLoginAPI();
}