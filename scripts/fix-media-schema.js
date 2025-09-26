const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function fixMediaSchema() {
  try {
    console.log('正在修复媒体资源数据库模式...');
    
    // 检查当前数据
    const existingMedia = await prisma.mediaAsset.findMany();
    console.log(`发现 ${existingMedia.length} 个现有媒体资源`);
    
    if (existingMedia.length > 0) {
      console.log('清理现有数据以避免唯一约束冲突...');
      await prisma.mediaAsset.deleteMany({});
      console.log('✅ 已清理现有媒体资源');
    }
    
    console.log('✅ 数据库模式修复完成');
    console.log('💡 请运行以下命令完成更新：');
    console.log('   1. npm run db:push  # 推送模式更改');
    console.log('   2. npm run db:seed  # 重新填充数据');
    
  } catch (error) {
    console.error('❌ 修复失败:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixMediaSchema();