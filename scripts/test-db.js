const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testDatabase() {
  try {
    console.log('正在测试数据库连接...');
    
    // 测试连接
    await prisma.$connect();
    console.log('✅ 数据库连接成功');
    
    // 检查新闻数量
    const newsCount = await prisma.news.count();
    console.log(`📰 数据库中有 ${newsCount} 条新闻`);
    
    if (newsCount === 0) {
      console.log('⚠️  数据库中没有新闻数据，请运行种子脚本：npm run db:seed');
    } else {
      // 显示最新的3条新闻
      const latestNews = await prisma.news.findMany({
        take: 3,
        orderBy: { createdAt: 'desc' },
        select: {
          title: true,
          slug: true,
          createdAt: true,
        },
      });
      
      console.log('📋 最新的3条新闻：');
      latestNews.forEach((news, index) => {
        console.log(`${index + 1}. ${news.title} (${news.slug})`);
      });
    }
    
  } catch (error) {
    console.error('❌ 数据库连接失败:', error.message);
    
    if (error.code === 'P1001') {
      console.log('💡 请检查：');
      console.log('   1. PostgreSQL 是否正在运行');
      console.log('   2. DATABASE_URL 环境变量是否正确设置');
      console.log('   3. 数据库是否存在');
    }
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();