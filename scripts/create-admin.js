const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    // 检查是否已存在管理员
    const existingAdmin = await prisma.adminUser.findUnique({
      where: { email: 'admin@dbzj.edu.cn' }
    });

    if (existingAdmin) {
      console.log('管理员账户已存在');
      return;
    }

    // 创建默认管理员账户
    const hashedPassword = await bcrypt.hash('admin123456', 12);

    const admin = await prisma.adminUser.create({
      data: {
        email: 'admin@dbzj.edu.cn',
        passwordHash: hashedPassword,
        name: '系统管理员',
      },
    });

    console.log('默认管理员账户创建成功:');
    console.log('邮箱: admin@dbzj.edu.cn');
    console.log('密码: admin123456');
    console.log('请在首次登录后修改密码！');

  } catch (error) {
    console.error('创建管理员账户失败:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();