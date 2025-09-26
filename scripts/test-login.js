const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function testLogin() {
  try {
    const email = 'admin@dbzj.edu.cn';
    const password = 'admin123456';

    console.log('测试登录...');
    console.log('邮箱:', email);
    console.log('密码:', password);

    // 查找管理员用户
    const admin = await prisma.adminUser.findUnique({
      where: { email },
    });

    if (!admin) {
      console.log('❌ 用户不存在');
      return;
    }

    console.log('✅ 用户存在');
    console.log('用户ID:', admin.id);
    console.log('用户姓名:', admin.name);
    console.log('密码哈希:', admin.passwordHash);

    // 验证密码
    const isValidPassword = await bcrypt.compare(password, admin.passwordHash);
    
    if (isValidPassword) {
      console.log('✅ 密码验证成功');
    } else {
      console.log('❌ 密码验证失败');
      
      // 重新生成正确的密码哈希
      console.log('重新生成密码哈希...');
      const newHashedPassword = await bcrypt.hash(password, 12);
      
      await prisma.adminUser.update({
        where: { email },
        data: { passwordHash: newHashedPassword }
      });
      
      console.log('✅ 密码已重置');
    }

  } catch (error) {
    console.error('测试失败:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testLogin();