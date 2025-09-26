const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function resetAndSeed() {
  try {
    console.log('🧹 清理现有数据...');
    
    // 清理所有媒体资源
    await prisma.mediaAsset.deleteMany({});
    console.log('✅ 已清理媒体资源');
    
    // 清理新闻数据
    await prisma.news.deleteMany({});
    console.log('✅ 已清理新闻数据');
    
    // 清理管理员用户
    await prisma.adminUser.deleteMany({});
    console.log('✅ 已清理用户数据');
    
    console.log('🌱 重新运行种子脚本...');
    
    // 重新运行种子脚本
    const { spawn } = require('child_process');
    
    const seedProcess = spawn('npm', ['run', 'db:seed'], {
      stdio: 'inherit',
      shell: true
    });
    
    seedProcess.on('close', (code) => {
      if (code === 0) {
        console.log('✅ 种子数据创建成功！');
      } else {
        console.error('❌ 种子数据创建失败');
      }
      process.exit(code);
    });
    
  } catch (error) {
    console.error('❌ 重置失败:', error);
    process.exit(1);
  }
}

resetAndSeed();