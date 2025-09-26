const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkAdmin() {
  try {
    const admins = await prisma.adminUser.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      }
    });

    console.log('管理员账户列表:');
    if (admins.length === 0) {
      console.log('没有找到管理员账户');
    } else {
      admins.forEach((admin, index) => {
        console.log(`${index + 1}. 邮箱: ${admin.email}`);
        console.log(`   姓名: ${admin.name || '未设置'}`);
        console.log(`   创建时间: ${admin.createdAt}`);
        console.log('---');
      });
    }

  } catch (error) {
    console.error('检查管理员账户失败:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkAdmin();