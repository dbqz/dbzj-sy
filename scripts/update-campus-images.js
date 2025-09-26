const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updateCampusImages() {
    try {
        console.log('正在更新校园图片...');

        // 删除现有的校园媒体资源
        await prisma.mediaAsset.deleteMany({
            where: {
                category: {
                    in: ['hero', 'buildings', 'workshops', 'activities', 'facilities']
                }
            }
        });

        console.log('已清理旧的校园媒体资源');

        // 创建新的校园媒体资源
        const campusMediaData = [
            // 校园英雄背景图
            {
                url: "https://youke1.picui.cn/s1/2025/09/21/68d013d71378c.jpg",
                type: "image",
                title: "校园全貌",
                description: "定边职教中心300亩校园全景鸟瞰图，展现学校宏伟规模和优美环境",
                category: "hero",
            },
            // 校园建筑
            {
                url: "https://youke1.picui.cn/s1/2025/09/21/68d013838d22c.png",
                type: "image",
                title: "教学楼",
                description: "现代化的教学楼，配备先进的多媒体教室和实验设备",
                category: "buildings",
            },
            {
                url: "https://youke1.picui.cn/s1/2025/09/21/68d012e8c07ed.png",
                type: "image",
                title: "办公楼",
                description: "学校行政办公中心，为师生提供各类服务",
                category: "buildings",
            },
            {
                url: "https://youke1.picui.cn/s1/2025/09/21/68d012e8c238e.png",
                type: "image",
                title: "音乐楼",
                description: "专业的音乐教学楼，为艺术类专业提供优质的教学环境",
                category: "buildings",
            },
            {
                url: "https://youke1.picui.cn/s1/2025/09/21/68d013840247d.png",
                type: "image",
                title: "学生宿舍",
                description: "舒适的学生宿舍，为学生提供良好的生活环境",
                category: "buildings",
            },
            {
                url: "https://youke1.picui.cn/s1/2025/09/21/68d012e981202.png",
                type: "image",
                title: "实训中心",
                description: "现代化的实训中心，配备各类专业实训设备",
                category: "buildings",
            },
            // 校园设施
            {
                url: "https://youke1.picui.cn/s1/2025/09/21/68d012e9ecdd1.png",
                type: "image",
                title: "读书廊",
                description: "优雅的读书环境，为师生提供安静的学习空间",
                category: "facilities",
            },
            {
                url: "https://youke1.picui.cn/s1/2025/09/21/68d01383c0a16.png",
                type: "image",
                title: "操场",
                description: "标准化体育场地，支持各类体育活动和比赛",
                category: "facilities",
            },
            {
                url: "https://youke1.picui.cn/s1/2025/09/21/68d012e8e4373.png",
                type: "image",
                title: "篮球排球场",
                description: "专业的球类运动场地，丰富学生的体育活动",
                category: "facilities",
            },
            {
                url: "https://youke1.picui.cn/s1/2025/09/21/68d01383cf630.png",
                type: "image",
                title: "学生食堂",
                description: "干净卫生的学生食堂，提供营养丰富的餐食",
                category: "facilities",
            },
        ];

        for (const mediaItem of campusMediaData) {
            await prisma.mediaAsset.create({
                data: mediaItem,
            });
        }

        console.log(`✅ 成功创建 ${campusMediaData.length} 个校园媒体资源`);

        // 显示统计信息
        const stats = await prisma.mediaAsset.groupBy({
            by: ['category'],
            _count: true,
        });

        console.log('\n📊 校园媒体资源统计：');
        stats.forEach(stat => {
            console.log(`   ${stat.category}: ${stat._count} 个`);
        });

    } catch (error) {
        console.error('❌ 更新校园图片失败:', error);
    } finally {
        await prisma.$disconnect();
    }
}

updateCampusImages();